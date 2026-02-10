
import React from 'react';
import { CoffeeQuote, Tip, User, Interest, Production, PriceChangeLog } from '../types';
import { 
  Save, RefreshCw, Plus, Trash2, Edit3, Users, 
  ShieldAlert, ShieldCheck, Mail, Calendar, ExternalLink, 
  Search, History, X, Info, Coffee, ArrowRight,
  TrendingUp, TrendingDown, Zap, MapPin
} from 'lucide-react';

interface AdminPanelProps {
  quotes: CoffeeQuote[];
  updateQuote: (id: string, newPrice: number) => void;
  priceLogs: PriceChangeLog[];
  tips: Tip[];
  onAddTip: (tip: Omit<Tip, 'id' | 'date'>) => void;
  buyers: User[];
  onToggleBlock: (id: string) => void;
  interests: Interest[];
  productions: Production[];
  onToggleFeatured: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  quotes, updateQuote, priceLogs, tips, onAddTip, buyers, onToggleBlock, interests, productions, onToggleFeatured 
}) => {
  const [activeTab, setActiveTab] = React.useState<'quotes' | 'tips' | 'buyers' | 'lots'>('quotes');
  const [selectedBuyer, setSelectedBuyer] = React.useState<User | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [newPrices, setNewPrices] = React.useState<Record<string, number>>(
    Object.fromEntries(quotes.map(q => [q.id, q.currentPrice]))
  );

  const [newTip, setNewTip] = React.useState({
    title: '',
    content: '',
    category: 'Market' as any
  });

  const handleUpdatePrice = (id: string) => {
    updateQuote(id, newPrices[id]);
  };

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTip(newTip);
    setNewTip({ title: '', content: '', category: 'Market' });
    alert('Dica cadastrada!');
  };

  const filteredBuyers = buyers.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBuyerInterests = (buyerId: string) => {
    return interests.filter(i => i.buyerId === buyerId);
  };

  const getProductionDetails = (prodId: string) => {
    return productions.find(p => p.id === prodId);
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#3e2723] tracking-tight">Painel Administrativo</h2>
          <p className="text-gray-500 font-medium">Controle operacional e gestão de ecossistema.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'quotes' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Cotações
          </button>
          <button 
            onClick={() => setActiveTab('lots')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'lots' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Lotes
          </button>
          <button 
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'tips' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Conteúdo
          </button>
          <button 
            onClick={() => setActiveTab('buyers')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'buyers' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Compradores
          </button>
        </div>
      </header>

      {/* Seção: Cotações */}
      {activeTab === 'quotes' && (
        <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4">
          <section className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-green-50 rounded-xl">
                  <RefreshCw size={24} className="text-[#2e7d32]" />
                </div>
                <h3 className="text-2xl font-black text-[#3e2723]">Atualizar Preços</h3>
              </div>
              <div className="space-y-6">
                {quotes.map(quote => (
                  <div key={quote.id} className="p-6 bg-[#fdfcf8] rounded-3xl border border-gray-100 flex flex-col group hover:border-[#2e7d32] transition-colors shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-black text-xl text-[#3e2723]">{quote.type}</p>
                      <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-gray-100 font-bold uppercase text-gray-400">NY ICE</span>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Novo Preço (R$)</label>
                      <div className="flex gap-3">
                        <input 
                          type="number" 
                          className="flex-1 bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-bold text-lg"
                          value={newPrices[quote.id]}
                          onChange={(e) => setNewPrices({...newPrices, [quote.id]: Number(e.target.value)})}
                        />
                        <button 
                          onClick={() => handleUpdatePrice(quote.id)}
                          className="bg-[#3e2723] text-white px-6 rounded-2xl hover:bg-[#2e7d32] transition-all flex items-center justify-center shadow-lg active:scale-95"
                        >
                          <Save size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col max-h-[700px]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3e2723]/5 rounded-xl text-[#3e2723]">
                  <History size={24} />
                </div>
                <h3 className="text-2xl font-black text-[#3e2723]">Log de Auditoria</h3>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {priceLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
                  <Info size={48} className="mb-4" />
                  <p className="font-black text-xs uppercase tracking-widest">Nenhuma alteração registrada no sistema ainda</p>
                </div>
              ) : (
                priceLogs.map(log => (
                  <div key={log.id} className="p-5 bg-[#fdfcf8] rounded-[2rem] border border-gray-50 shadow-sm hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${log.coffeeType === 'Arábica' ? 'bg-[#2e7d32]' : 'bg-[#8d6e63]'}`}></span>
                        <p className="font-black text-[#3e2723] uppercase text-xs tracking-tighter">{log.coffeeType}</p>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{new Date(log.timestamp).toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 mb-3 shadow-inner">
                      <div className="flex-1 text-center">
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-0.5">De</p>
                        <p className="font-black text-gray-400 text-sm">R$ {log.oldPrice.toLocaleString('pt-BR')}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300" />
                      <div className="flex-1 text-center">
                        <p className="text-[9px] font-black text-[#2e7d32] uppercase mb-0.5">Para</p>
                        <p className="font-black text-[#2e7d32] text-lg">R$ {log.newPrice.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}

      {/* Seção: Gestão de Lotes */}
      {activeTab === 'lots' && (
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-orange-50 rounded-xl">
              <Zap size={24} className="text-orange-500" />
            </div>
            <h3 className="text-2xl font-black text-[#3e2723]">Moderação de Marketplace</h3>
          </div>

          <div className="grid gap-6">
            {productions.filter(p => p.isPublic).map(p => (
              <div key={p.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-[#fdfcf8] rounded-[2.5rem] border border-gray-100 hover:border-orange-200 transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                  <Coffee size={24} className="text-[#3e2723]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-lg text-[#3e2723] truncate">{p.quality}</h4>
                    {p.isFeatured && (
                      <span className="bg-orange-100 text-orange-600 px-3 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-sm">
                        <Zap size={10} fill="currentColor" /> Destaque
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {p.location}</span>
                    <span className="flex items-center gap-1">R$ {p.desiredPrice}</span>
                    <span>Safra {p.harvest}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => onToggleFeatured(p.id)}
                    className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                      p.isFeatured 
                        ? 'bg-orange-500 text-white hover:bg-orange-600' 
                        : 'bg-white text-gray-500 border border-gray-100 hover:border-orange-200'
                    }`}
                  >
                    <Zap size={14} fill={p.isFeatured ? "currentColor" : "none"} />
                    {p.isFeatured ? 'Remover Destaque' : 'Marcar Destaque'}
                  </button>
                </div>
              </div>
            ))}
            {productions.filter(p => p.isPublic).length === 0 && (
              <div className="py-20 text-center text-gray-300 font-black uppercase tracking-widest bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                Nenhum lote público para moderar
              </div>
            )}
          </div>
        </section>
      )}

      {/* Seção: Gestão de Conteúdo */}
      {activeTab === 'tips' && (
        <section className="grid md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
          <div className="md:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-8 flex items-center gap-2 text-[#3e2723]">
              <Plus size={20} className="text-[#2e7d32]" />
              Nova Publicação
            </h3>
            <form onSubmit={handleAddTip} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Título do Artigo</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm"
                  value={newTip.title}
                  onChange={(e) => setNewTip({...newTip, title: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Categoria Técnica</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm appearance-none"
                  value={newTip.category}
                  onChange={(e) => setNewTip({...newTip, category: e.target.value})}
                >
                  <option value="Market">Mercado</option>
                  <option value="Management">Manejo</option>
                  <option value="Storage">Armazenamento</option>
                  <option value="Strategy">Estratégia</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conteúdo do Especialista</label>
                <textarea 
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm min-h-[200px]"
                  value={newTip.content}
                  onChange={(e) => setNewTip({...newTip, content: e.target.value})}
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#3e2723] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2e7d32] transition-all shadow-xl active:scale-95"
              >
                Publicar Agora
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-8 flex items-center gap-2 text-[#3e2723]">
              <Edit3 size={20} className="text-[#2e7d32]" />
              Artigos Ativos
            </h3>
            <div className="space-y-4">
              {tips.map(tip => (
                <div key={tip.id} className="flex items-center justify-between p-6 bg-[#fdfcf8] rounded-3xl border border-gray-50 group hover:border-gray-200 transition-all">
                  <div>
                    <p className="font-black text-[#3e2723] text-lg group-hover:text-[#2e7d32] transition-colors">{tip.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase bg-white px-2 py-0.5 rounded-lg border border-gray-100">{tip.category}</span>
                      <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">{tip.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Seção: Gestão de Compradores */}
      {activeTab === 'buyers' && (
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-in slide-in-from-bottom-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-[#3e2723]">Gestão de Compradores</h3>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar por nome ou e-mail..."
                className="w-full bg-gray-50 border-none rounded-2xl px-12 py-3 font-bold text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="text-left pb-4 px-4 font-black">Comprador</th>
                  <th className="text-left pb-4 px-4 font-black">E-mail</th>
                  <th className="text-left pb-4 px-4 font-black">Plano</th>
                  <th className="text-left pb-4 px-4 font-black">Status</th>
                  <th className="text-right pb-4 px-4 font-black">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBuyers.map(buyer => (
                  <tr key={buyer.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white ${buyer.isBlocked ? 'bg-gray-300' : 'bg-blue-600 shadow-md'}`}>
                          {buyer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-[#3e2723]">{buyer.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Mail size={14} className="text-gray-300" />
                        {buyer.email}
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        buyer.plan === 'elite' ? 'bg-[#2e7d32]/10 text-[#2e7d32]' : 
                        buyer.plan === 'pro' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {buyer.plan}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${buyer.isBlocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {buyer.isBlocked ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                        {buyer.isBlocked ? 'Bloqueado' : 'Ativo'}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setSelectedBuyer(buyer)}
                          className="p-2 bg-white text-gray-400 hover:text-blue-600 rounded-lg border border-gray-100 shadow-sm"
                        >
                          <History size={18} />
                        </button>
                        <button 
                          onClick={() => onToggleBlock(buyer.id)}
                          className={`p-2 bg-white rounded-lg border border-gray-100 shadow-sm transition-all ${buyer.isBlocked ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'}`}
                        >
                          {buyer.isBlocked ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {selectedBuyer && (
        <div className="fixed inset-0 z-[100] bg-[#3e2723]/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setSelectedBuyer(null)}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#3e2723] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-10 md:p-14">
              <div className="flex items-center gap-6 mb-10">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-black text-white ${selectedBuyer.isBlocked ? 'bg-gray-300' : 'bg-blue-600 shadow-xl'}`}>
                  {selectedBuyer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-3xl font-black text-[#3e2723]">{selectedBuyer.name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-sm font-bold text-gray-500"><Mail size={14} /> {selectedBuyer.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h5 className="text-lg font-black text-[#3e2723] flex items-center gap-2 border-b border-gray-100 pb-4">
                  <History size={20} className="text-blue-600" />
                  Interesses Registrados
                </h5>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                  {getBuyerInterests(selectedBuyer.id).length === 0 ? (
                    <div className="py-10 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <Info size={32} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-xs font-bold text-gray-400 uppercase">Nenhum interesse registrado</p>
                    </div>
                  ) : (
                    getBuyerInterests(selectedBuyer.id).map(interest => {
                      const prod = getProductionDetails(interest.productionId);
                      return (
                        <div key={interest.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Coffee size={18} className="text-[#2e7d32]" />
                            <div>
                              <p className="font-black text-[#3e2723] text-sm">{prod?.quality || 'Lote Removido'}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase">{prod?.location}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  onClick={() => onToggleBlock(selectedBuyer.id)}
                  className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                    selectedBuyer.isBlocked ? 'bg-green-600 text-white' : 'bg-orange-500 text-white'
                  }`}
                >
                  {selectedBuyer.isBlocked ? 'Desbloquear' : 'Bloquear'}
                </button>
                <button 
                  onClick={() => setSelectedBuyer(null)}
                  className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3e272320; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default AdminPanel;
