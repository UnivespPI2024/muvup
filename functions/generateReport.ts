import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro no servidor: Chave da API do Gemini não foi encontrada." }),
    };
  }

  try {
    const healthData = event.body ? JSON.parse(event.body) : {};
    
    const prompt = `
      Você é um assistente de saúde e fitness.
      Analise os seguintes dados de saúde de um usuário, que já estão resumidos.
      BASEIE-SE ESTRITAMENTE E APENAS NOS NÚMEROS FORNECIDOS. Não invente valores.
      
      Gere um relatório conciso com as seguintes seções em Markdown:
      
      **Pontos Positivos:**
      * Comente sobre os pontos positivos, mencionando os números exatos.
      
      **Pontos de Melhora:**
      * Sugira melhorias com base nos dados. Se os dados forem bons, sugira como mantê-los.
      
      Seja direto e use uma linguagem simples.

      Dados Resumidos para Análise:
      ${JSON.stringify(healthData, null, 2)}
    `;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    console.log("Resposta completa da API Gemini:", JSON.stringify(data, null, 2));

    if (data.candidates && data.candidates[0]?.content?.parts) {
      const reportText = data.candidates[0].content.parts[0].text;
      return {
        statusCode: 200,
        body: JSON.stringify({ report: reportText }),
      };
    } else {
      const errorMessage = data.promptFeedback?.blockReason || data.error?.message || "A API não retornou um relatório válido.";
      console.error("Erro ou bloqueio da API Gemini:", errorMessage);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `A IA não conseguiu processar a solicitação: ${errorMessage}` }),
      };
    }
  } catch (err) {
    console.error("❌ Erro na execução da function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno na função do servidor." }),
    };
  }
};

export { handler };