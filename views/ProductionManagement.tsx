
import React from 'react';
import { Production } from '../types';
// Added missing Coffee icon import
import { Plus, Trash2, MapPin, Package, Award, X, Sparkles, Droplets, Thermometer, Filter, Layers, Coffee } from 'lucide-react';

interface ProductionManagementProps {
  productions: Production[];
  // Fix: Omit 'status' from the expected payload because App.tsx handleAddProduction sets it to 'available' by default.
  onAdd: (p: Omit<Production, 'id' | 'createdAt' | 'producerId' | 'status'>) => void;
  onDelete: (id: string) => void;
}

const ProductionManagement: React.FC<ProductionManagementProps> = ({ productions, onAdd, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    coffeeType: 'Arábica' as 'Arábica' | 'Robusta',
    harvest: '2024/2025',
    volume: 100,
    quality: '',
    desiredPrice: 1350,
    location: '',
    isPublic: true,
    variety: 'Catuaí 144',
    process: 'Natural',
    sieve: '16 acima',
    score: '84'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Monta a string de qualidade técnica antes de enviar
    const technicalQuality = `${formData.variety} • ${formData.process} • Peneira ${formData.sieve} • SCA ${formData.score}pts`;
    // Fix: Pass data without 'status' as required by the updated onAdd signature.
    onAdd({
      ...formData,
      quality: technicalQuality
    });
    setIsModalOpen(false);
    setFormData({ ...formData, variety: '', score: '84', location: '' });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#3e2723]/5 pb-10">
        <div>
          <h2 className="text-6xl font-black text-[#3e2723] tracking-tighter font-serif">Gestão de <span className="text-[#2e7d32]">Estoques</span></h2>
          <p className="text-gray-500 font-medium mt-3 text-lg border-l-2 border-[#2e7d32] pl-4">Rastreabilidade completa e exposição comercial de seus lotes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2e7d32] text-white px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#1b5e20] transition-all shadow-2xl shadow-[#2e7d32]/30 active:scale-95 group"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform" /> Novo Lote Comercial
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {productions.length === 0 ? (
          <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-[#3e2723]/10">
            <Layers className="mx-auto text-gray-100 mb-8" size={80} />
            <p className="text-2xl font-black text-gray-300 uppercase tracking-[0.2em]">Seu armazém virtual está vazio</p>
            <button onClick={() => setIsModalOpen(true)} className="mt-6 text-[#2e7d32] font-black uppercase text-xs tracking-widest hover:underline">Começar agora</button>
          </div>
        ) : (
          productions.map((p) => (
            <div key={p.id} className="bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-3xl transition-all group animate-in slide-in-from-bottom-6">
              <div className="bg-[#3e2723] p-8 flex justify-between items-start text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Coffee size={120} /></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2e7d32] shadow-[0_0_10px_#2e7d32]"></div>
                    <span className="font-black text-[10px] uppercase tracking-[0.2em]">{p.coffeeType}</span>
                  </div>
                  <h4 className="text-xl font-bold font-serif opacity-90 leading-tight">Safra {p.harvest}</h4>
                </div>
                <div className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  ID #{p.id.slice(-4)}
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-[#3e2723] mb-2 leading-tight group-hover:text-[#2e7d32] transition-colors">{p.quality}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} className="text-[#2e7d32]" />
                    <span className="text-[11px] font-black uppercase tracking-widest">{p.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#fdfcf8] p-5 rounded-3xl border border-gray-100 shadow-inner">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Disponível</p>
                    <p className="text-xl font-black text-[#3e2723]">{p.volume} <span className="text-[10px] opacity-40">Sacas</span></p>
                  </div>
                  <div className="bg-[#fdfcf8] p-5 rounded-3xl border border-gray-100 shadow-inner">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Preço Ref.</p>
                    <p className="text-xl font-black text-[#2e7d32]">R$ {p.desiredPrice}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
                  <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${p.isPublic ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-400'}`}>
                    {p.isPublic ? '• Ativo no Marketplace' : 'Reservado'}
                  </div>
                  <button 
                    onClick={() => onDelete(p.id)}
                    className="p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#3e2723]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 p-3 bg-gray-100 rounded-full text-gray-300 hover:text-[#3e2723] hover:bg-gray-100 transition-all"><X size={24}/></button>
            <form onSubmit={handleSubmit} className="p-12 md:p-16 space-y-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-[#2e7d32]/10 rounded-[2rem] text-[#2e7d32] shadow-inner">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#3e2723] tracking-tighter">Entrada de Lote</h3>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Preencha os dados técnicos da saca</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Classificação</label>
                  <select 
                    className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm appearance-none focus:ring-2 focus:ring-[#2e7d32] shadow-sm"
                    value={formData.coffeeType}
                    onChange={(e) => setFormData({...formData, coffeeType: e.target.value as any})}
                  >
                    <option value="Arábica">Arábica (Specialty)</option>
                    <option value="Robusta">Robusta (Fine Canephora)</option>
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Ano da Colheita</label>
                  <input type="text" className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm shadow-sm" value={formData.harvest} onChange={(e) => setFormData({...formData, harvest: e.target.value})} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Variedade Botânica</label>
                  <input type="text" placeholder="Ex: Catuaí, Bourbon..." className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm shadow-sm" value={formData.variety} onChange={(e) => setFormData({...formData, variety: e.target.value})} required />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Método de Processo</label>
                  <select 
                    className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm appearance-none shadow-sm"
                    value={formData.process}
                    onChange={(e) => setFormData({...formData, process: e.target.value})}
                  >
                    <option value="Natural">Natural (Terreiro)</option>
                    <option value="Cereja Descascado">CD (Pulped Natural)</option>
                    <option value="Fully Washed">Lavado (Washed)</option>
                    <option value="Honey">Honey Process</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Peneira</label>
                  <input type="text" placeholder="16 acima" className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm shadow-sm" value={formData.sieve} onChange={(e) => setFormData({...formData, sieve: e.target.value})} required />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nota SCA/Global</label>
                  <input type="number" step="0.5" className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm shadow-sm text-[#2e7d32]" value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})} required />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Volume (Sacas)</label>
                  <input type="number" className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm shadow-sm" value={formData.volume} onChange={(e) => setFormData({...formData, volume: Number(e.target.value)})} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Preço Alvo (R$/Saca)</label>
                  <input type="number" className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-xl text-[#2e7d32] shadow-sm" value={formData.desiredPrice} onChange={(e) => setFormData({...formData, desiredPrice: Number(e.target.value)})} required />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Origem (Cidade/UF)</label>
                  <input type="text" placeholder="Ex: Patrocínio, MG" className="w-full bg-[#fdfcf8] border-none rounded-2xl px-6 py-5 font-black text-sm shadow-sm" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#3e2723] text-white py-7 rounded-[2rem] font-black text-[12px] uppercase tracking-widest hover:bg-[#2e7d32] transition-all shadow-3xl shadow-[#3e2723]/30 active:scale-[0.98] mt-4">
                Validar e Listar Lote
              </button>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3e272320; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default ProductionManagement;
