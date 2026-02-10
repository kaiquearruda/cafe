
import React, { useState } from 'react';
import { Tip } from '../types';
import { 
  TrendingUp, Coffee, Warehouse, Target, LucideProps, ChevronRight, 
  X, Send, User, Mail, MessageSquare, CheckCircle, Loader2, Sparkles,
  Stethoscope, Sprout, FileText
} from 'lucide-react';

interface TipsViewProps {
  tips: Tip[];
}

const categoryIcons: Record<Tip['category'], React.ComponentType<LucideProps>> = {
  'Market': TrendingUp,
  'Management': Coffee,
  'Storage': Warehouse,
  'Strategy': Target
};

const categoryLabels: Record<Tip['category'], string> = {
  'Market': 'Mercado',
  'Management': 'Manejo',
  'Storage': 'Armazenamento',
  'Strategy': 'Estratégia'
};

const categoryColors: Record<Tip['category'], {bg: string, text: string}> = {
  'Market': { bg: 'bg-green-50', text: 'text-green-600' },
  'Management': { bg: 'bg-blue-50', text: 'text-blue-600' },
  'Storage': { bg: 'bg-orange-50', text: 'text-orange-600' },
  'Strategy': { bg: 'bg-purple-50', text: 'text-purple-600' }
};

const TipsView: React.FC<TipsViewProps> = ({ tips }) => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black text-[#3e2723] mb-3 tracking-tighter font-serif">Biblioteca <span className="text-[#2e7d32]">Técnica</span></h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed border-l-4 border-[#2e7d32] pl-6">
            Conhecimento estratégico e manejo avançado para maximizar o valor da sua safra.
          </p>
        </div>
      </header>

      {/* Seção de Suporte Agronômico */}
      <section className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="bg-[#3e2723] p-12 text-white flex flex-col justify-center space-y-6">
            <div className="w-16 h-16 bg-[#2e7d32] rounded-2xl flex items-center justify-center mb-4">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-4xl font-black font-serif">Consultoria <span className="text-[#2e7d32]">Agronômica</span></h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Está com problemas na lavoura ou dúvida sobre manejo? Envie sua questão técnica para nossa rede de especialistas parceiros.
            </p>
            <div className="space-y-4 pt-6">
               <div className="flex items-center gap-4">
                  <CheckCircle className="text-[#2e7d32]" size={20} />
                  <span className="font-bold text-sm">Resposta em até 48h</span>
               </div>
               <div className="flex items-center gap-4">
                  <CheckCircle className="text-[#2e7d32]" size={20} />
                  <span className="font-bold text-sm">Análise de fotos e laudos</span>
               </div>
            </div>
          </div>
          
          <div className="p-12 bg-[#fdfcf8]">
            {showSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} />
                </div>
                <h4 className="text-2xl font-black text-[#3e2723]">Dúvida Enviada!</h4>
                <p className="text-gray-500 font-medium">Um engenheiro agrônomo analisará sua solicitação e responderá no seu e-mail de cadastro.</p>
                <button onClick={() => setShowSuccess(false)} className="text-[#2e7d32] font-black text-sm uppercase tracking-widest hover:underline">Enviar outra dúvida</button>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Descrição do Problema</label>
                  <textarea 
                    required
                    placeholder="Descreva detalhadamente o que está ocorrendo em sua plantação..."
                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 font-bold text-sm focus:ring-2 focus:ring-[#2e7d32] outline-none transition-all min-h-[150px] shadow-sm"
                  ></textarea>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 hover:border-[#2e7d32] hover:text-[#2e7d32] transition-all cursor-pointer">
                  <FileText size={24} />
                  <span className="text-xs font-black uppercase tracking-widest">Anexar fotos da planta/solo</span>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#3e2723] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2e7d32] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Enviar para Agrônomo</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Grid de Artigos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <article 
            key={tip.id} 
            onClick={() => setSelectedTip(tip)}
            className="group bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
          >
            <div className="h-44 bg-[#fdfcf8] border-b border-gray-50 flex items-center justify-center relative">
              <div className="p-6 rounded-[2rem] bg-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                {React.createElement(categoryIcons[tip.category], { 
                  size: 48, 
                  className: categoryColors[tip.category].text 
                })}
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[tip.category].bg} ${categoryColors[tip.category].text}`}>
                  {categoryLabels[tip.category]}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(tip.date).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <h3 className="text-2xl font-black mb-4 text-[#3e2723] leading-tight group-hover:text-[#2e7d32] transition-colors">
                {tip.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-1 line-clamp-3">
                {tip.content}
              </p>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-[#2e7d32] font-black text-[10px] uppercase tracking-widest">
                Ler Artigo Completo
                <div className="bg-green-50 p-2.5 rounded-2xl group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedTip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedTip(null)}
              className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="p-12 md:p-16">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[selectedTip.category].bg} ${categoryColors[selectedTip.category].text} mb-8 inline-block`}>
                {categoryLabels[selectedTip.category]}
              </span>
              <h3 className="text-4xl font-black text-[#3e2723] mb-8 leading-tight font-serif">{selectedTip.title}</h3>
              <div className="prose prose-stone max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line font-medium">
                  {selectedTip.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsView;
