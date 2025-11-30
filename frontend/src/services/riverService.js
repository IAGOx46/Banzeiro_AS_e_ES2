// src/services/riverService.js

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export async function getRiverLevels(cidade) {
  try {
    const ref = collection(db, "nivel_rio", cidade, "registros");

    // Ordena pela data mais recente
    const q = query(ref, orderBy("data", "desc"));

    const snapshot = await getDocs(q);

    const registros = snapshot.docs.map((doc) => {
      const d = doc.data();

      const dataConvertida = d.data?.toDate
        ? d.data.toDate()              // Firestore Timestamp
        : new Date(d.data);            // string → Date

      return {
        id: doc.id,
        data: dataConvertida,
        nivel: Number(d.nivel) || 0
      };
    });

    // Retorna apenas os 5 últimos
    return registros.slice(0, 5);

  } catch (error) {
    console.error("Erro ao buscar níveis:", error);
    return [];
  }
}
