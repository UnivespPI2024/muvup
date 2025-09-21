import { Handler } from "@netlify/functions";
import admin from "./firebaseAdmin";

const db = admin.firestore();

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método não permitido, use POST" }),
      };
    }

    // Parse do JSON enviado pelo app
    const body = event.body ? JSON.parse(event.body) : {};

    console.log("📥 Dados recebidos do app:", body);

    // Salva os dados no Firestore na coleção "healthData"
    await db.collection("healthData").add({
      ...body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Dados salvos no Firebase!" }),
    };
  } catch (err) {
    console.error("❌ Erro na function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno" }),
    };
  }
};

export { handler };

