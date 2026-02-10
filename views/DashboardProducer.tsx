
import React from 'react';
import { CoffeeQuote, Production, Interest, SubscriptionPlan, PriceAlert, InventoryItem } from '../types';
import { getMarketSuggestion } from '../services/geminiService';
import { 
  Sparkles, ArrowRight, TrendingUp, Package, Crown, 
  Plus, Droplets, Thermometer, Zap, BellRing, Trash2,
  Warehouse, DollarSign, CloudRain, MessageSquare,
  TrendingDown, Minus, Clock, Calendar, Wallet, Coffee
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
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = React.useState(false);
  
  const [newAlert, setNewAlert] = React.useState({ type: 'Arábica' as 'Arábica' | 'Robusta', price: 0 });
  const [newItem, setNewItem] = React.useState({ type: 'Beneficiado' as any, bags: 0, description: '' });

  const isPremium = userPlan !== 'free';
  const arabicaQuote = quotes.find(q => q.type === 'Arábica');
  const robustaQuote = quotes.find(q => q.type === 'Robusta');

  // Cálculo de Patrimônio Estimado
  const totalBags = inventory.reduce((acc, curr) => acc + curr.bags, 0);
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

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    onSetInventory([...inventory, { id: Date.now().toString(), ...newItem }]);
    setIsInventoryModalOpen(false);
    setNewItem({ type: 'Beneficiado', bags: 0, description: '' });
  };

  // Add missing function to remove items from inventory
  const handleRemoveInventory = (id: string) => {
    onSetInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* 1. Top Performance Bar (High Level Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#2e7d32]">
            <Wallet size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Patrimônio em Grão</p>
            <h4 className="text-2xl font-black text-[#3e2723]">R$ {estimatedValue.toLocaleString('pt-BR')}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <CloudRain size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clima: Patrocínio/MG</p>
            <div className="flex items-center gap-2">
              <h4 className="text-2xl font-black text-[#3e2723]">24°C</h4>
              <span className="text-[10px] font-bold text-blue-400 uppercase">30% chuva</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Arábica (Hoje)</p>
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-black text-[#3e2723]">R$ {arabicaQuote?.currentPrice.toFixed(0)}</h4>
              <span className="text-[10px] font-bold text-green-500">+1.2%</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
            <MessageSquare size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Negociações</p>
            <h4 className="text-2xl font-black text-[#3e2723]">{interests.length} <span className="text-xs text-gray-300 font-bold uppercase">Ativas</span></h4>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 2. IA Strategic Card - The "Heart" of the SaaS */}
        <div className="lg:col-span-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#2e7d32] to-[#8d6e63] rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#3e2723] rounded-[3rem] p-10 md:p-14 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2e7d32]/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
                  <Sparkles size={32} className="text-[#fbbf24]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-black tracking-tight font-serif">Gemini Intelligence</h3>
                    {isPremium && <Crown size={18} className="text-[#fbbf24]" />}
                  </div>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Análise Preditiva de Mercado v4.2</p>
                </div>
              </div>

              <div className="min-h-[140px] flex items-center bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-sm shadow-inner mb-10">
                {loadingSuggestion ? (
                  <div className="flex items-center gap-4 animate-pulse">
                    <div className="w-2 h-2 bg-[#fbbf24] rounded-full"></div>
                    <span className="text-sm font-black uppercase tracking-widest opacity-60">Processando indicadores globais...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-medium leading-relaxed italic font-serif opacity-90">
                    {isPremium ? `"${suggestion}"` : "Assine o Plano Elite para liberar a análise macroeconômica da Gemini e otimizar sua venda."}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => onNavigate('market')} className="bg-[#2e7d32] text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#3e2723] transition-all flex items-center gap-3 shadow-2xl shadow-black/20 active:scale-95">
                  Ver Tendências <TrendingUp size={18} />
                </button>
                <button onClick={() => onNavigate('tips')} className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                  Análises Técnicas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Negotiation Center */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col h-full">
           <div className="flex items-center justify-between mb-10">
             <div>
               <h3 className="text-2xl font-black text-[#3e2723] tracking-tight">Negociações</h3>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Interesses de compra</p>
             </div>
             <div className="w-12 h-12 bg-[#fbbf24]/10 rounded-2xl flex items-center justify-center text-[#fbbf24]">
               <Zap size={24} />
             </div>
           </div>

           <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
             {interests.length === 0 ? (
               <div className="text-center py-20 opacity-20 bg-gray-50 rounded-[2rem]">
                 <Package className="mx-auto mb-4" size={48} />
                 <p className="text-[10px] font-black uppercase tracking-widest">Nenhuma proposta ativa</p>
               </div>
             ) : (
               interests.map(interest => {
                 const prod = productions.find(p => p.id === interest.productionId);
                 const isSold = prod?.status === 'sold';
                 return (
                   <div key={interest.id} className={`p-5 rounded-[2rem] border transition-all flex items-center justify-between group/item ${isSold ? 'bg-gray-50/50 opacity-50' : 'bg-[#fdfcf8] border-transparent hover:border-[#2e7d32]/30 hover:bg-white hover:shadow-xl hover:shadow-[#3e2723]/5 shadow-sm'}`}>
                      <div className="min-w-0">
                        <p className="font-black text-[#3e2723] text-sm truncate">{interest.buyerName}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight truncate flex items-center gap-2">
                           <Coffee size={10} className="text-[#2e7d32]" />
                           {prod?.quality || 'Lote Removido'}
                        </p>
                      </div>
                      <button 
                        onClick={() => onNavigate(`chat_${interest.id}`)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isSold ? 'bg-gray-200 text-gray-400' : 'bg-white text-[#2e7d32] border border-gray-100 hover:bg-[#2e7d32] hover:text-white shadow-sm'}`}
                        disabled={isSold}
                      >
                        <MessageSquare size={20} />
                      </button>
                   </div>
                 );
               })
             )}
           </div>
        </div>

        {/* 4. Inventory Bento Box */}
        <div className="lg:col-span-5 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#fdfcf8] rounded-2xl border border-gray-100 shadow-sm text-[#3e2723]">
                <Warehouse size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#3e2723] tracking-tight">Estoque Real</h3>
                <p className="text-[10px] text-[#2e7d32] font-black uppercase tracking-widest">{totalBags} sacas totais</p>
              </div>
            </div>
            <button 
              onClick={() => setIsInventoryModalOpen(true)}
              className="bg-[#2e7d32] text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#2e7d32]/20 active:scale-90"
            >
              Adicionar <Plus size={16} className="inline ml-1" />
            </button>
          </div>

          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-3 custom-scrollbar">
            {inventory.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <Package className="mx-auto text-gray-200 mb-2" size={32} />
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Sem café registrado</p>
              </div>
            ) : (
              inventory.map(item => (
                <div key={item.id} className="group p-6 bg-[#fdfcf8] rounded-[2rem] border border-transparent hover:border-[#2e7d32]/20 hover:bg-white transition-all flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center border border-gray-100 group-hover:bg-green-50 transition-colors">
                      <span className="text-xl font-black text-[#3e2723] leading-none">{item.bags}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Sacas</span>
                    </div>
                    <div>
                      <p className="font-black text-[#3e2723] text-lg leading-tight">{item.type}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[140px] mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-xs font-black text-[#2e7d32]">R$ {(item.bags * (item.type === 'Robusta' ? (robustaQuote?.currentPrice || 0) : (arabicaQuote?.currentPrice || 0))).toLocaleString('pt-BR')}</p>
                      <p className="text-[8px] font-bold text-gray-300 uppercase">Valuation Mercado</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveInventory(item.id)}
                      className="text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5. Price Alerts & Triggers */}
        <div className="lg:col-span-7 bg-[#fdfcf8] p-10 rounded-[3rem] border border-gray-100 shadow-inner overflow-hidden relative">
          <div className="absolute bottom-0 right-0 p-8 opacity-5 text-[#3e2723]">
             <TrendingUp size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-[#3e2723] border border-gray-100">
                  <BellRing size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#3e2723] tracking-tight">Gatilhos de Venda</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Monitoramento via WhatsApp</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className="bg-[#3e2723] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#2e7d32] transition-all shadow-lg active:scale-95"
              >
                Novo Gatilho +
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {priceAlerts.length === 0 ? (
                <div className="col-span-2 text-center py-20 bg-white/50 rounded-[2.5rem] border border-dashed border-[#3e2723]/10">
                  <p className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Nenhum monitoramento ativo</p>
                </div>
              ) : (
                priceAlerts.map(alert => (
                  <div key={alert.id} className={`p-8 rounded-[2.5rem] border transition-all flex flex-col justify-between group ${alert.isTriggered ? 'bg-[#2e7d32] border-[#2e7d32] text-white shadow-2xl shadow-[#2e7d32]/40 scale-105' : 'bg-white border-gray-100 shadow-sm hover:border-[#2e7d32]/20'}`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block ${alert.isTriggered ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {alert.coffeeType}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[10px] opacity-40 font-bold">R$</span>
                          <h4 className="text-4xl font-black tracking-tighter leading-none">{alert.targetPrice.toLocaleString('pt-BR')}</h4>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${alert.isTriggered ? 'bg-white/20' : 'bg-[#fdfcf8] border border-gray-100'}`}>
                        {alert.isTriggered ? <Sparkles className="animate-pulse" /> : <Clock className="text-gray-300" />}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-black/5 pt-6">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${alert.isTriggered ? 'text-white/80' : 'text-gray-400'}`}>
                        {alert.isTriggered ? 'Gatilho Atingido!' : 'Aguardando mercado...'}
                      </p>
                      <button onClick={() => onRemoveAlert(alert.id)} className={`p-2 rounded-xl transition-all ${alert.isTriggered ? 'hover:bg-white/20 text-white' : 'hover:bg-red-50 text-red-300 hover:text-red-500'}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS (Identical Logic, but updated styling) */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-[110] bg-[#3e2723]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-4xl p-12 relative border border-gray-100">
            <button onClick={() => setIsAlertModalOpen(false)} className="absolute top-10 right-10 text-gray-300 hover:text-[#3e2723]"><Trash2 size={24}/></button>
            <h3 className="text-4xl font-black text-[#3e2723] mb-2 tracking-tight">Novo Gatilho</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Monitorar cotação em tempo real</p>
            <form onSubmit={(e) => { e.preventDefault(); onAddAlert(newAlert.type, newAlert.price); setIsAlertModalOpen(false); }} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Variedade</label>
                <div className="flex gap-3">
                  {['Arábica', 'Robusta'].map(t => (
                    <button 
                      key={t}
                      type="button" 
                      onClick={() => setNewAlert({...newAlert, type: t as any})} 
                      className={`flex-1 py-5 rounded-2xl font-black text-sm transition-all border-2 ${newAlert.type === t ? 'bg-[#3e2723] text-white border-[#3e2723]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preço Alvo (R$/Saca)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-6 font-black text-3xl text-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 outline-none"
                  value={newAlert.price}
                  onChange={(e) => setNewAlert({...newAlert, price: Number(e.target.value)})}
                  placeholder="0.00"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-[#2e7d32] text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-[#2e7d32]/20 hover:scale-105 transition-all">
                Ativar Gatilho <Sparkles size={16} className="inline ml-1" />
              </button>
            </form>
          </div>
        </div>
      )}

      {isInventoryModalOpen && (
        <div className="fixed inset-0 z-[110] bg-[#3e2723]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-4xl p-12 relative">
            <button onClick={() => setIsInventoryModalOpen(false)} className="absolute top-10 right-10 text-gray-300 hover:text-[#3e2723]"><Trash2 size={24}/></button>
            <h3 className="text-4xl font-black text-[#3e2723] mb-2 tracking-tight">Armazenar Grão</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Atualizar balanço físico da propriedade</p>
            <form onSubmit={handleAddInventory} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Estado Físico</label>
                <select 
                  className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm appearance-none focus:ring-4 focus:ring-[#2e7d32]/10"
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                >
                  <option value="Em Coco">Em Coco</option>
                  <option value="Beneficiado">Beneficiado</option>
                  <option value="Escolha">Escolha</option>
                  <option value="Robusta">Robusta (Conilon)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Qtd. Sacas</label>
                  <input 
                    type="number" 
                    className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm"
                    value={newItem.bags}
                    onChange={(e) => setNewItem({...newItem, bags: Number(e.target.value)})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lote</label>
                  <input 
                    type="text" 
                    placeholder="Ref. Secador"
                    className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-xs"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#3e2723] text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95">
                Registrar no Armazém
              </button>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3e272315; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3e272330; }
        h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
      `}} />
    </div>
  );
};

export default DashboardProducer;
