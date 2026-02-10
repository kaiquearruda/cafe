
import React from 'react';
import { CoffeeQuote } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Clock, Globe } from 'lucide-react';

interface MarketViewProps {
  quotes: CoffeeQuote[];
}

const MarketView: React.FC<MarketViewProps> = ({ quotes }) => {
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#3e2723]/5 pb-8">
        <div>
          <h2 className="text-5xl font-black text-[#3e2723] tracking-tighter font-serif">Mercado <span className="text-[#2e7d32]">Global</span></h2>
          <p className="text-gray-500 font-medium flex items-center gap-2 mt-2">
            <Clock size={16} className="text-[#2e7d32]" /> 
            Última atualização: {today} às 16:30 (Horário Brasília)
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl text-[#3e2723] text-xs font-black uppercase tracking-widest border border-gray-100 shadow-sm">
          <Globe size={18} className="text-[#2e7d32]" /> Fonte: NY ICE / B3
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        {quotes.map((quote) => {
          const diff = quote.currentPrice - quote.lastPrice;
          const percent = (diff / quote.lastPrice) * 100;
          const chartData = quote.history7d.map((val, i) => ({ 
            day: i === 6 ? 'Hoje' : `${i + 1}d`, 
            price: val 
          }));

          return (
            <div key={quote.id} className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl hover:shadow-[#3e2723]/5 transition-all duration-500 group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black text-[#3e2723] group-hover:text-[#2e7d32] transition-colors">{quote.type}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Tipo 6, Bebida Dura • Saca 60kg</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-tighter ${
                  diff > 0 ? 'bg-green-50 text-green-700 border border-green-100' : diff < 0 ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-gray-50 text-gray-700'
                }`}>
                  {diff > 0 ? <TrendingUp size={16} /> : diff < 0 ? <TrendingDown size={16} /> : <Minus size={16} />}
                  {percent > 0 ? '+' : ''}{percent.toFixed(2)}%
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Preço SPOT</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-[#3e2723] tracking-tighter">R$ {quote.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <span className="text-lg font-bold text-gray-300">/saca</span>
                </div>
              </div>

              <div className="h-64 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id={`colorPrice-${quote.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={diff >= 0 ? "#2e7d32" : "#d32f2f"} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={diff >= 0 ? "#2e7d32" : "#d32f2f"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} 
                      dy={15} 
                    />
                    <YAxis hide domain={['dataMin - 30', 'dataMax + 30']} />
                    <Tooltip 
                      formatter={(val: number) => [`R$ ${val.toFixed(2)}`, 'Cotação']}
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(62,39,35,0.1)', padding: '16px', fontWeight: 900 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={diff >= 0 ? "#2e7d32" : "#d32f2f"} 
                      fillOpacity={1} 
                      fill={`url(#colorPrice-${quote.id})`} 
                      strokeWidth={5}
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#3e2723] p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2e7d32]/10 rounded-full -mr-48 -mt-48 blur-[80px] transition-all group-hover:bg-[#2e7d32]/20"></div>
        <div className="relative z-10 space-y-4">
          <span className="bg-[#fbbf24] text-[#3e2723] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Premium Elite</span>
          <h3 className="text-4xl font-black text-white leading-tight">Relatórios de <span className="text-[#fbbf24]">Safra Mundial</span></h3>
          <p className="text-white/50 max-w-lg font-medium">Análise macroeconômica semanal sobre estoques do Vietnã e clima na América Central direto no seu dashboard.</p>
        </div>
        <button className="relative z-10 bg-[#2e7d32] text-white font-black px-12 py-5 rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-[#2e7d32]/30 whitespace-nowrap active:scale-95 text-sm uppercase tracking-widest">
          Desbloquear Dados Elite
        </button>
      </div>
    </div>
  );
};

export default MarketView;
