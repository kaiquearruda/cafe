
import { CoffeeQuote, Tip, SubscriptionPlan } from './types';

// Função auxiliar para gerar preços realistas baseados no dia atual
const getTodayBasePrice = (base: number) => {
  const dayOfMonth = new Date().getDate();
  return base + (Math.sin(dayOfMonth) * 15);
};

export const PLAN_DETAILS = {
  free: {
    name: 'Essencial',
    price: 0,
    maxLots: 1,
    features: ['Cotações diárias', '1 lote ativo', 'Dicas técnicas básicas', 'Suporte por e-mail']
  },
  pro: {
    name: 'Crescimento',
    price: 49.90,
    maxLots: 10,
    features: ['Análise de IA (Gemini)', '10 lotes ativos', 'Alertas via WhatsApp', 'Selo de Produtor Verificado', 'Histórico de 30 dias']
  },
  elite: {
    name: 'Escala',
    price: 149.90,
    maxLots: Infinity,
    features: ['Lotes ilimitados', 'Destaque no topo das buscas', 'Relatórios PDF/Excel', 'Consultoria mensal com agrônomos', 'Acesso antecipado a compradores']
  }
};

export const INITIAL_QUOTES: CoffeeQuote[] = [
  {
    id: '1',
    type: 'Arábica',
    currentPrice: getTodayBasePrice(1250.50),
    lastPrice: 1240.00,
    history7d: [1220, 1235, 1240, 1238, 1245, 1240, getTodayBasePrice(1250.50)],
    history30d: Array.from({ length: 30 }, (_, i) => 1100 + Math.random() * 200),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'Robusta',
    currentPrice: getTodayBasePrice(840.20),
    lastPrice: 855.00,
    history7d: [870, 865, 860, 858, 855, 850, getTodayBasePrice(840.20)],
    history30d: Array.from({ length: 30 }, (_, i) => 750 + Math.random() * 150),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_TIPS: Tip[] = [
  {
    id: '1',
    category: 'Market',
    title: 'Análise Climática e Bolsa de NY',
    content: 'O mercado futuro de café arábica em Nova York tem reagido às previsões de chuvas abaixo da média nas principais regiões produtoras. Para o produtor brasileiro, o momento exige cautela. Se você possui café de qualidade superior (84+ pontos), a recomendação técnica é aguardar a consolidação da safra para buscar prêmios maiores no mercado de cafés especiais.',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '2',
    category: 'Management',
    title: 'Controle Estratégico da Broca-do-café',
    content: 'A broca-do-café é uma das pragas de maior impacto econômico. O controle deve começar com o repasse rigoroso, eliminando os frutos remanescentes. Métodos biológicos com o fungo Beauveria bassiana têm demonstrado alta eficácia. Consulte o formulário técnico do CaféConecta para ajustar o cronograma de pulverização conforme a florada da sua região.',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '3',
    category: 'Storage',
    title: 'Excelência na Secagem em Terreiro',
    content: 'A qualidade da bebida final é decidida no pós-colheita. Para evitar fermentações indesejadas, mantenha camadas finas nos primeiros dias de secagem. O revolvimento deve ocorrer de 12 a 15 vezes por dia. O café deve atingir a umidade ideal de 11% para ensaque seguro, garantindo a preservação dos óleos essenciais que definem a nota do café.',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '4',
    category: 'Strategy',
    title: 'Bienalidade e Nutrição do Solo',
    content: 'O café apresenta o fenômeno da bienalidade (um ano de alta produção seguido por um de baixa). Para mitigar esse impacto, a nutrição pós-colheita é vital. A adubação nitrogenada e potássica parcelada garante que a planta recupere o vigor para a próxima florada. Uma análise foliar em janeiro é recomendada para corrigir carências nutricionais críticas de micronutrientes como Boro e Zinco.',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '5',
    category: 'Management',
    title: 'Planejamento de Adubação via Solo',
    content: 'O parcelamento da adubação é crucial para evitar perdas por lixiviação. A primeira aplicação deve ocorrer logo após a florada, coincidindo com o início das chuvas. Utilize sempre análises de solo recentes (máximo 6 meses) para evitar desperdício de insumos e garantir o equilíbrio químico necessário para o enchimento dos grãos.',
    date: new Date().toISOString().split('T')[0]
  }
];
