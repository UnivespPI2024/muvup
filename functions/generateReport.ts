import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const handler: Handler = async (event) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro no servidor: Chave da API não configurada." }),
    };
  }

  // Inicializa o SDK
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // Configuramos o modelo 1.5-flash que é mais estável na camada gratuita
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    // Chamada usando o SDK
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reportText = response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report: reportText }),
    };

  } catch (err: any) {
    console.error("❌ Erro na execução da function:", err);

    // Tratamento específico para erro de cota (429)
    if (err.message?.includes("429") || err.status === 429) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Limite de requisições atingido. Tente novamente em alguns segundos." }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno ao processar o relatório de IA." }),
    };
  }
};

export { handler };