
import React from 'react';
import { CoffeeQuote, Tip, User, Interest, Production } from '../types';
import { 
  Save, RefreshCw, Plus, Trash2, Edit3, Users, 
  ShieldAlert, ShieldCheck, Mail, Calendar, ExternalLink, 
  Search, History, X, Info, Coffee
} from 'lucide-react';

interface AdminPanelProps {
  quotes: CoffeeQuote[];
  updateQuote: (id: string, newPrice: number) => void;
  tips: Tip[];
  onAddTip: (tip: Omit<Tip, 'id' | 'date'>) => void;
  buyers: User[];
  onToggleBlock: (id: string) => void;
  interests: Interest[];
  productions: Production[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  quotes, updateQuote, tips, onAddTip, buyers, onToggleBlock, interests, productions 
}) => {
  const [activeTab, setActiveTab] = React.useState<'quotes' | 'tips' | 'buyers'>('quotes');
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
    alert('Cotação atualizada com sucesso!');
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
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'quotes' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Cotações
          </button>
          <button 
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'tips' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Conteúdo
          </button>
          <button 
            onClick={() => setActiveTab('buyers')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'buyers' ? 'bg-[#3e2723] text-white shadow-md' : 'text-gray-400 hover:text-[#3e2723]'}`}
          >
            Compradores
          </button>
        </div>
      </header>

      {/* Seção: Cotações */}
      {activeTab === 'quotes' && (
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-50 rounded-xl">
              <RefreshCw size={24} className="text-[#2e7d32]" />
            </div>
            <h3 className="text-2xl font-black text-[#3e2723]">Gerenciar Preços de Mercado</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {quotes.map(quote => (
              <div key={quote.id} className="p-8 bg-[#fdfcf8] rounded-3xl border border-gray-100 flex flex-col justify-between group hover:border-[#2e7d32] transition-colors">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <p className="font-black text-2xl text-[#3e2723]">{quote.type}</p>
                    <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-gray-100 font-bold uppercase text-gray-400">NY ICE / Bolsa</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Novo Preço da Saca (R$)</label>
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
                </div>
                <p className="text-[10px] text-gray-400 italic mt-6 font-medium">Sincronizado em: {new Date(quote.updatedAt).toLocaleString('pt-BR')}</p>
              </div>
            ))}
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
                  <div className="flex gap-2">
                    <button className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl border border-gray-50 hover:border-red-100 transition-all shadow-sm">
                      <Trash2 size={18} />
                    </button>
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
                  <th className="text-left pb-4 px-4 font-black">Cadastro</th>
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
                          <p className="text-[10px] font-bold text-gray-400 uppercase">ID: {buyer.id}</p>
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
                    <td className="py-5 px-4 text-sm font-bold text-gray-400">
                      {buyer.createdAt}
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
                          title="Ver Histórico de Interesses"
                        >
                          <History size={18} />
                        </button>
                        <button 
                          onClick={() => onToggleBlock(buyer.id)}
                          className={`p-2 bg-white rounded-lg border border-gray-100 shadow-sm transition-all ${buyer.isBlocked ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'}`}
                          title={buyer.isBlocked ? "Desbloquear Conta" : "Bloquear Conta"}
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
          
          {filteredBuyers.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <Users size={48} className="mx-auto text-gray-200" />
              <p className="text-gray-400 font-bold uppercase tracking-widest">Nenhum comprador encontrado</p>
            </div>
          )}
        </section>
      )}

      {/* Modal: Detalhes do Comprador e Histórico de Interesses */}
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
                    <span className="text-xs font-black text-gray-300 uppercase tracking-widest">•</span>
                    <span className="flex items-center gap-1 text-sm font-bold text-gray-500"><Calendar size={14} /> Membro desde {selectedBuyer.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h5 className="text-lg font-black text-[#3e2723] flex items-center gap-2">
                    <History size={20} className="text-blue-600" />
                    Histórico de Interesse em Lotes
                  </h5>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black uppercase">
                    {getBuyerInterests(selectedBuyer.id).length} Ações
                  </span>
                </div>

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
                        <div key={interest.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-white transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              {/* Fix: Coffee icon was missing from imports */}
                              <Coffee size={18} className="text-[#2e7d32]" />
                            </div>
                            <div>
                              <p className="font-black text-[#3e2723] text-sm">{prod?.quality || 'Lote Removido'}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{prod?.coffeeType} • {prod?.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Interessado em</p>
                            <p className="text-xs font-bold text-[#3e2723]">{new Date(interest.createdAt).toLocaleDateString('pt-BR')}</p>
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
                    selectedBuyer.isBlocked 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {selectedBuyer.isBlocked ? 'Desbloquear Acesso' : 'Bloquear Comprador'}
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
    </div>
  );
};

export default AdminPanel;
