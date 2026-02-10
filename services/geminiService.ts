
import { GoogleGenAI } from "@google/genai";
import { CoffeeQuote, ChatMessage } from "../types";

/**
 * Generates a strategic suggestion for coffee producers based on current market quotes.
 */
export const getMarketSuggestion = async (quotes: CoffeeQuote[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Como um consultor especialista no mercado de café brasileiro, analise os seguintes dados:
    ${quotes.map(q => `${q.type}: Preço atual R$ ${q.currentPrice}, Preço anterior R$ ${q.lastPrice}`).join('\n')}
    
    Forneça uma sugestão estratégica curta (máximo 3 frases) para um produtor sobre vender ou segurar sua produção hoje.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Mantenha atenção às variações cambiais e climáticas para decidir o melhor momento de venda.";
  } catch (error: any) {
    console.warn("Gemini Market Suggestion Error (Quota probably reached):", error);
    
    // Fallback logic for 429 or other errors
    const arabica = quotes.find(q => q.type === 'Arábica');
    if (arabica && arabica.currentPrice > arabica.lastPrice) {
      return "O mercado de Arábica mostra tendência de alta. Se possível, segure lotes de alta pontuação para capturar prêmios melhores na próxima semana.";
    }
    return "A volatilidade atual sugere cautela. Recomendamos fixar preços apenas para cobrir custos operacionais imediatos e aguardar estabilidade do dólar.";
  }
};

/**
 * Simulates a response from a buyer or producer in the chat.
 */
export const getChatAutoReply = async (
  messages: ChatMessage[], 
  role: 'BUYER' | 'PRODUCER', 
  productionInfo: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const context = messages.slice(-5).map(m => `${m.senderId}: ${m.text}`).join('\n');
  const persona = role === 'BUYER' 
    ? "Você é um comprador de café de uma grande exportadora. Você é profissional, direto e busca qualidade."
    : "Você é um produtor de café experiente. Você valoriza seu grão e busca um preço justo.";

  const prompt = `
    ${persona}
    Lote em negociação: ${productionInfo}
    
    Histórico recente da conversa:
    ${context}
    
    Responda à última mensagem de forma natural, curta (máximo 2 frases) e profissional. 
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 100
      }
    });

    return response.text?.trim() || "Entendido. Vamos alinhar os próximos passos da negociação.";
  } catch (error: any) {
    console.warn("Chat Auto Reply Gemini Error (Quota probably reached):", error);
    
    // Professional fallback replies
    if (role === 'BUYER') {
      return "Entendido. Gostaria de solicitar uma amostra deste lote para análise em nosso laboratório. Como podemos proceder?";
    } else {
      return "Este lote possui uma complexidade sensorial única e pontuação SCA garantida. Podemos agendar uma visita ou envio de amostra?";
    }
  }
};
