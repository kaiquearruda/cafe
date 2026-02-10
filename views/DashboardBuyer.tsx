
import React from 'react';
import { Production } from '../types';
import { Search, MapPin, Package, Award, ArrowRight, Coffee, Filter, Zap, MessageSquare, Star, ShieldCheck } from 'lucide-react';

interface DashboardBuyerProps {
  availableCoffee: Production[];
  onExpressInterest: (productionId: string) => void;
}

const DashboardBuyer: React.FC<DashboardBuyerProps> = ({ availableCoffee, onExpressInterest }) => {
  const [filter, setFilter] = React.useState('');
  const [coffeeType, setCoffeeType] = React.useState('Todos');

  const filtered = availableCoffee.filter(p => {
    const matchesSearch = (p.location?.toLowerCase().includes(filter.toLowerCase()) || 
                          p.quality?.toLowerCase().includes(filter.toLowerCase()));
    const matchesType = coffeeType === 'Todos' || p.coffeeType === coffeeType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h2 className="text-5xl font-black text-[#3e2723] tracking-tighter font-serif">Marketplace <span className="text-[#2e7d32]">Premium</span></h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl mt-2">
            Acesso exclusivo aos melhores lotes da safra brasileira, com procedência verificada.
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
           <div className="flex flex-col items-center">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Disponíveis</p>
             <p className="text-2xl font-black text-[#2e7d32]">{availableCoffee.length}</p>
           </div>
           <div className="w-px h-10 bg-gray-100"></div>
           <div className="flex flex-col items-center">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Regiões</p>
             <p className="text-2xl font-black text-[#3e2723]">12</p>
           </div>
        </div>
      </header>

      {/* Advanced Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[3rem] shadow-xl border border-gray-50">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
          <input 
            type="text" 
            placeholder="Buscar por variedade, região ou pontuação SCA..."
            className="w-full pl-16 pr-6 py-6 rounded-3xl bg-[#fdfcf8] border-none focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm shadow-inner"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none py-6 px-8 rounded-3xl bg-[#fdfcf8] border-none font-black text-[10px] uppercase tracking-widest focus:ring-2 focus:ring-[#2e7d32] shadow-sm"
            value={coffeeType}
            onChange={(e) => setCoffeeType(e.target.value)}
          >
            <option value="Todos">Todas Variedades</option>
            <option value="Arábica">Arábica</option>
            <option value="Robusta">Robusta</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.length === 0 ? (
          <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-[#3e2723]/5">
            <Coffee className="mx-auto text-gray-200 mb-6" size={80} />
            <p className="text-xl font-black text-gray-300 uppercase tracking-[0.2em]">Nenhum lote compatível no momento</p>
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-2 duration-500">
              <div className="relative h-56 bg-gray-200 overflow-hidden">
                <img 
                  src={p.coffeeType === 'Arábica' ? "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80&w=800"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt="Lote" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#3e2723] flex items-center gap-1.5 shadow-lg">
                    <Zap size={12} className="text-[#2e7d32]" /> Destaque
                  </div>
                  <div className="bg-[#2e7d32]/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck size={12} /> Verificado
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{p.coffeeType} • Safra {p.harvest}</p>
                   <h3 className="text-2xl font-black font-serif leading-tight">{p.quality || "Blend Especial"}</h3>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
                   <MapPin size={14} className="text-[#2e7d32]" /> {p.location}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-[#fdfcf8] p-5 rounded-3xl border border-gray-50 flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-gray-400 shadow-sm">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-300 uppercase mb-0.5">Disponível</p>
                      <p className="text-sm font-black text-[#3e2723]">{p.volume} <span className="text-[10px] font-bold text-gray-300">Sacas</span></p>
                    </div>
                  </div>
                  <div className="bg-[#fdfcf8] p-5 rounded-3xl border border-gray-50 flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-[#fbbf24] shadow-sm">
                      <Star size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-300 uppercase mb-0.5">SCA Pontos</p>
                      <p className="text-sm font-black text-[#3e2723]">84+</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Preço Sugerido</p>
                    <p className="text-3xl font-black text-[#2e7d32] tracking-tighter">R$ {p.desiredPrice.toLocaleString('pt-BR')}</p>
                  </div>
                  <button 
                    onClick={() => onExpressInterest(p.id)}
                    className="w-14 h-14 bg-[#3e2723] text-white rounded-2xl hover:bg-[#2e7d32] transition-all shadow-xl active:scale-90 flex items-center justify-center group/btn"
                  >
                    <MessageSquare size={24} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardBuyer;
