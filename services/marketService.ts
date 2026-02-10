
const TWELVE_DATA_KEY = '16486fb8b01949e2affa7733daa44527';

export interface GlobalIndicator {
  symbol: string;
  priceUSD: number;
  priceBRL: number;
  changePercent: string;
  exchangeRate: number;
}

/**
 * Busca dados reais da Twelve Data para a AAPL e converte para BRL
 */
export const fetchGlobalMarketData = async (): Promise<GlobalIndicator | null> => {
  try {
    // 1. Buscar cotação da AAPL
    const stockUrl = `https://api.twelvedata.com/time_series?apikey=${TWELVE_DATA_KEY}&symbol=AAPL&interval=1day&outputsize=2`;
    // 2. Buscar taxa de câmbio USD/BRL
    const exchangeUrl = `https://api.twelvedata.com/price?symbol=USD/BRL&apikey=${TWELVE_DATA_KEY}`;

    const [stockRes, exchangeRes] = await Promise.all([
      fetch(stockUrl),
      fetch(exchangeUrl)
    ]);

    const stockData = await stockRes.json();
    const exchangeData = await exchangeRes.json();

    if (stockData.status === 'error' || !stockData.values) {
      console.error('Erro Twelve Data Stock:', stockData.message);
      return null;
    }

    const latest = stockData.values[0];
    const previous = stockData.values[1];
    
    const priceUSD = parseFloat(latest.close);
    const prevPriceUSD = parseFloat(previous.close);
    const exchangeRate = parseFloat(exchangeData.price);
    
    const priceBRL = priceUSD * exchangeRate;
    const changePercent = (((priceUSD - prevPriceUSD) / prevPriceUSD) * 100).toFixed(2);

    return {
      symbol: 'AAPL (Apple Inc.)',
      priceUSD,
      priceBRL,
      changePercent,
      exchangeRate
    };
  } catch (error) {
    console.error('Falha ao conectar com a API de mercado:', error);
    return null;
  }
};
