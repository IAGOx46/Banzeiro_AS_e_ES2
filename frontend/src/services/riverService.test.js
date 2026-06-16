import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getRiverLevels } from "./riverService";

jest.mock("../firebase", () => ({
  db: { name: "db" }
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn()
}));

describe("getRiverLevels", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.console.error = jest.fn();
    collection.mockReturnValue({ path: "nivel_rio/Itacoatiara-AM/registros" });
    orderBy.mockReturnValue({ order: "data-desc" });
    query.mockReturnValue({ query: true });
  });

  test("busca, converte e limita os cinco registros mais recentes", async () => {
    const docs = Array.from({ length: 6 }, (_, index) => ({
      id: `doc-${index}`,
      data: () => ({
        data: { toDate: () => new Date(2026, 0, index + 1) },
        nivel: String(10 + index)
      })
    }));
    getDocs.mockResolvedValue({ docs });

    const result = await getRiverLevels("Itacoatiara-AM");

    expect(collection).toHaveBeenCalledWith(
      { name: "db" },
      "nivel_rio",
      "Itacoatiara-AM",
      "registros"
    );
    expect(orderBy).toHaveBeenCalledWith("data", "desc");
    expect(query).toHaveBeenCalledWith(
      { path: "nivel_rio/Itacoatiara-AM/registros" },
      { order: "data-desc" }
    );
    expect(result).toHaveLength(5);
    expect(result[0]).toEqual({
      id: "doc-0",
      data: new Date(2026, 0, 1),
      nivel: 10
    });
  });

  test("retorna lista vazia quando o Firestore falha", async () => {
    getDocs.mockRejectedValue(new Error("falha"));

    await expect(getRiverLevels("Itacoatiara-AM")).resolves.toEqual([]);
  });
});
