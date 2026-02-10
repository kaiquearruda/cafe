
import React from 'react';
import { CoffeeQuote, Production, Interest, SubscriptionPlan, PriceAlert, InventoryItem } from '../types';
import { getMarketSuggestion } from '../services/geminiService';
import { 
  Sparkles, ArrowRight, TrendingUp, Package, Crown, 
  Plus, Droplets, Thermometer, Zap, BellRing, Trash2,
  Warehouse, DollarSign, CloudRain, MessageSquare,
  TrendingDown, Minus, Clock, Calendar, Wallet, Coffee as CoffeeIcon
} from 'lucide-react';

interface DashboardProducerProps {
  userPlan: SubscriptionPlan;
  quotes: CoffeeQuote[];
  productions: Production[];
  interests: Interest[];
  priceAlerts: PriceAlert[];
  inventory: InventoryItem[];
  onSetInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  onAddAlert: (type: 'Arábica' | 'Robusta', price: number) => void;
  onRemoveAlert: (id: string) => void;
  onNavigate: (view: string) => void;
}

const DashboardProducer: React.FC<DashboardProducerProps> = ({ 
  userPlan, quotes, productions, interests, priceAlerts, inventory, onSetInventory, onAddAlert, onRemoveAlert, onNavigate 
}) => {
  const [suggestion, setSuggestion] = React.useState<string>("");
  const [loadingSuggestion, setLoadingSuggestion] = React.useState(false);
  
  const isPremium = userPlan !== 'free';
  const arabicaQuote = quotes.find(q => q.type === 'Arábica');
  const robustaQuote = quotes.find(q => q.type === 'Robusta');

  const estimatedValue = inventory.reduce((acc, curr) => {
    const q = curr.type === 'Robusta' ? (robustaQuote?.currentPrice || 0) : (arabicaQuote?.currentPrice || 0);
    return acc + (curr.bags * q);
  }, 0);

  React.useEffect(() => {
    if (isPremium) {
      const fetchSuggestion = async () => {
        setLoadingSuggestion(true);
        const text = await getMarketSuggestion(quotes);
        setSuggestion(text);
        setLoadingSuggestion(false);
      };
      fetchSuggestion();
    }
  }, [quotes, isPremium]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* 1. Bento Box Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[#2e7d32] group-hover:scale-110 transition-transform">
            <Wallet size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Patrimônio Líquido em Grão</p>
            <h4 className="text-4xl font-black text-[#3e2723] tracking-tighter">R$ {estimatedValue.toLocaleString('pt-BR')}</h4>
          </div>
          <div className="mt-6 flex items-center gap-4 relative z-10">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <TrendingUp size={12} className="text-[#2e7d32]" />
              <span className="text-[10px] font-black text-[#2e7d32] uppercase">+4.2% est. hoje</span>
            </div>
            <button onClick={() => onNavigate('/production')} className="text-[10px] font-black text-gray-400 uppercase hover:text-[#3e2723] transition-colors">Detalhar Estoque</button>
          </div>
        </div>

        <div className="bg-[#fdfcf8] p-8 rounded-[2.5rem] border border-gray-100 shadow-inner flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Clima (Sua Região)</p>
            <div className="flex items-center gap-3">
              <CloudRain size={24} className="text-blue-500" />
              <h4 className="text-3xl font-black text-[#3e2723]">24°C</h4>
            </div>
          </div>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter mt-4">Previsão: Chuvas isoladas</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Interesses Ativos</p>
            <div className="flex items-center gap-3">
              <MessageSquare size={24} className="text-orange-500" />
              <h4 className="text-3xl font-black text-[#3e2723]">{interests.length}</h4>
            </div>
          </div>
          <button onClick={() => onNavigate('/dashboard')} className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">Ver Propostas</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 2. IA Strategic Insight */}
        <div className="lg:col-span-8 bg-[#3e2723] rounded-[3.5rem] p-10 md:p-14 text-white overflow-hidden relative group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2e7d32]/20 rounded-full blur-[100px] -mr-40 -mt-40 transition-all group-hover:bg-[#2e7d32]/30"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <header className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
                <Sparkles size={32} className="text-[#fbbf24] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-black tracking-tight font-serif">Gemini Strategist</h3>
                  {isPremium && <Crown size={18} className="text-[#fbbf24]" />}
                </div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Insights preditivos em tempo real</p>
              </div>
            </header>

            <div className="flex-1 bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-sm shadow-inner mb-10 group-hover:bg-white/10 transition-colors">
              {loadingSuggestion ? (
                <div className="flex flex-col gap-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
                </div>
              ) : (
                <p className="text-2xl font-medium leading-relaxed italic opacity-90 font-serif">
                  {isPremium ? `"${suggestion}"` : "Assine o Plano Elite para liberar a análise macroeconômica da Gemini e otimizar sua margem de lucro."}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('/market')} className="bg-[#2e7d32] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#3e2723] transition-all flex items-center gap-2 shadow-xl">
                Monitorar Tendências <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Real-time Market Ticker */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
           <header className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-[#3e2723] tracking-tight">Cotações SPOT</h3>
              <div className="flex items-center gap-2 bg-green-50 text-[#2e7d32] px-3 py-1 rounded-full text-[9px] font-black uppercase">
                 <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full animate-ping"></div>
                 Ao Vivo
              </div>
           </header>

           <div className="space-y-6">
              {[arabicaQuote, robustaQuote].map(quote => quote && (
                <div key={quote.id} className="p-6 bg-[#fdfcf8] rounded-3xl border border-transparent hover:border-gray-100 hover:bg-white transition-all shadow-sm group">
                  <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{quote.type} NY</span>
                     <TrendingUp size={16} className="text-[#2e7d32]" />
                  </div>
                  <div className="flex items-end gap-2">
                     <h4 className="text-3xl font-black text-[#3e2723]">R$ {quote.currentPrice.toLocaleString('pt-BR')}</h4>
                     <span className="text-[10px] font-bold text-green-500 mb-1">+1.24%</span>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <span>Dólar Comercial</span>
                 <span className="text-[#3e2723]">R$ 5,42</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProducer;
