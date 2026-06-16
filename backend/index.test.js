const request = require('supertest');

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(() => ({ credential: true }))
  },
  firestore: Object.assign(
    jest.fn(() => null),
    {
      FieldValue: {
        serverTimestamp: jest.fn(() => 'server-timestamp')
      }
    }
  )
}));

process.env.SERVICE_ACCOUNT_PATH = './package.json';

const { createApp } = require('./index');

function createDatabaseMock() {
  const get = jest.fn();
  const add = jest.fn();
  const orderBy = jest.fn(() => ({ get }));
  const collection = jest.fn(() => ({ orderBy, add }));

  return {
    db: { collection },
    collection,
    orderBy,
    get,
    add
  };
}

describe('Banzeiro backend', () => {
  test('responde a rota basica de saude', async () => {
    const app = createApp();

    await request(app)
      .get('/')
      .expect(200)
      .expect('Banzeiro backend OK');
  });

  test('lista alertas ordenados por data de criacao', async () => {
    const mock = createDatabaseMock();
    mock.get.mockResolvedValue({
      docs: [
        { id: '1', data: () => ({ text: 'Rio subindo' }) },
        { id: '2', data: () => ({ text: 'Chuva intensa' }) }
      ]
    });
    const app = createApp(mock.db);

    const response = await request(app).get('/api/alerts').expect(200);

    expect(mock.collection).toHaveBeenCalledWith('alerts');
    expect(mock.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    expect(response.body).toEqual([
      { id: '1', text: 'Rio subindo' },
      { id: '2', text: 'Chuva intensa' }
    ]);
  });

  test('cria alerta com texto e timestamp do servidor', async () => {
    const mock = createDatabaseMock();
    mock.add.mockResolvedValue({ id: 'alerta-1' });
    const app = createApp(mock.db);

    const response = await request(app)
      .post('/api/alerts')
      .send({ text: 'Nivel critico' })
      .expect(200);

    expect(mock.collection).toHaveBeenCalledWith('alerts');
    expect(mock.add).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'Nivel critico' })
    );
    expect(response.body).toEqual({ id: 'alerta-1' });
  });

  test('retorna erro 500 quando Firestore nao esta disponivel', async () => {
    const app = createApp(null);

    const response = await request(app).get('/api/alerts').expect(500);

    expect(response.body.error).toBe('Firestore nao inicializado');
  });
});
