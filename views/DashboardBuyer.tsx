
import React from 'react';
import { Production } from '../types';
import { Search, MapPin, Package, Award, ArrowRight, Coffee, Filter, Zap, MessageSquare } from 'lucide-react';

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
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-5xl font-black text-[#3e2723] tracking-tighter font-serif">Explorar <span className="text-[#2e7d32]">Safras</span></h2>
          <p className="text-gray-500 font-medium mt-2">Conecte-se diretamente com a origem e garanta lotes exclusivos.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <div className="px-4 py-1 border-r border-gray-50">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Disponíveis</p>
             <p className="text-xl font-black text-[#2e7d32]">{availableCoffee.length} Lotes</p>
           </div>
           <div className="px-4 py-1">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Regiões</p>
             <p className="text-xl font-black text-[#3e2723]">Brasil</p>
           </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
          <input 
            type="text" 
            placeholder="Buscar por região, variedade ou pontuação..."
            className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none py-5 px-6 rounded-2xl bg-gray-50 border-none font-black text-[10px] uppercase tracking-widest focus:ring-2 focus:ring-[#2e7d32] appearance-none"
            value={coffeeType}
            onChange={(e) => setCoffeeType(e.target.value)}
          >
            <option value="Todos">Todos os Grãos</option>
            <option value="Arábica">Arábica</option>
            <option value="Robusta">Robusta</option>
          </select>
          <button className="p-5 bg-[#3e2723] text-white rounded-2xl hover:bg-[#2e7d32] transition-colors shadow-lg">
            <Filter size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.length === 0 ? (
          <div className="col-span-full py-40 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-[#3e2723]/5">
            <Coffee className="mx-auto text-gray-200 mb-6" size={80} />
            <p className="text-xl font-black text-gray-300 uppercase tracking-[0.2em]">Nenhum lote compatível no momento</p>
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={p.coffeeType === 'Arábica' ? "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80&w=800"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Lote" 
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#3e2723] flex items-center gap-2">
                  <Zap size={14} className="text-[#2e7d32]" /> Destaque
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2e7d32] bg-[#2e7d32]/5 px-3 py-1 rounded-md mb-3 inline-block">
                      {p.coffeeType} • Safra {p.harvest}
                    </span>
                    <h3 className="text-2xl font-black text-[#3e2723] leading-tight">{p.quality || "Blend Especial"}</h3>
                    <p className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
                      <MapPin size={14} className="text-[#2e7d32]" /> {p.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl text-[#3e2723]">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Volume</p>
                      <p className="text-sm font-black text-[#3e2723]">{p.volume} Sacas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl text-[#2e7d32]">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Pontuação</p>
                      <p className="text-sm font-black text-[#3e2723]">84+ pts</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Expectativa</p>
                    <p className="text-3xl font-black text-[#2e7d32]">R$ {p.desiredPrice}</p>
                  </div>
                  <button 
                    onClick={() => onExpressInterest(p.id)}
                    className="bg-[#3e2723] text-white px-6 py-4 rounded-2xl hover:bg-[#2e7d32] transition-all shadow-xl active:scale-95 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"
                  >
                    Negociar <MessageSquare size={18} />
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
