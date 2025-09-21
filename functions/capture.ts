import { Handler } from '@netlify/functions';

const handler: Handler = async (event:any) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método não permitido, use POST" }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};

    console.log("📥 Dados recebidos do app:", body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Dados recebidos com sucesso!",
        received: body,
      }),
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
