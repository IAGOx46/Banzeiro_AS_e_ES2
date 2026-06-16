import { getWeather } from "./weatherService";

describe("getWeather", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("normaliza os dados retornados pela OpenWeather", async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        name: "Itacoatiara",
        main: {
          temp: 28.6,
          humidity: 82,
          temp_max: 31.2,
          temp_min: 24.4
        },
        rain: { "1h": 12 },
        wind: { speed: 3 },
        weather: [{ description: "chuva leve", icon: "10d" }]
      })
    });

    await expect(getWeather()).resolves.toEqual({
      city: "Itacoatiara",
      temp: 29,
      humidity: 82,
      rain: 12,
      wind: 15,
      max: 36,
      min: 22,
      description: "chuva leve",
      icon: "10d"
    });
  });

  test("usa chuva zero quando a API nao retorna rain", async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        name: "Itacoatiara",
        main: {
          temp: 27,
          humidity: 70,
          temp_max: 30,
          temp_min: 23
        },
        wind: { speed: 2 },
        weather: [{ description: "nublado", icon: "03d" }]
      })
    });

    const weather = await getWeather();

    expect(weather.rain).toBe(0);
  });
});
