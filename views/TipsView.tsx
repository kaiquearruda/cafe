
import React from 'react';
import { Tip } from '../types';
import { 
  TrendingUp, Coffee, Warehouse, Target, LucideProps, ChevronRight, 
  X, Send, User, Mail, MessageSquare, CheckCircle, Loader2
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
  const [selectedTip, setSelectedTip] = React.useState<Tip | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmitConsultancy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsFormOpen(false);
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="max-w-2xl">
        <h2 className="text-4xl font-black text-[#3e2723] mb-3">Biblioteca Técnica</h2>
        <p className="text-gray-500 font-medium text-lg leading-relaxed">
          Conhecimento técnico e estratégico para maximizar a produtividade e qualidade do seu café.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip, index) => (
          <article 
            key={tip.id} 
            onClick={() => setSelectedTip(tip)}
            className="group bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#3e2723]/5 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-6"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="h-44 bg-[#fdfcf8] border-b border-gray-50 flex items-center justify-center relative group-hover:bg-[#3e2723] transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="p-6 rounded-[2rem] bg-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                {React.createElement(categoryIcons[tip.category], { 
                  size: 48, 
                  className: `transition-colors duration-500 ${categoryColors[tip.category].text}` 
                })}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[tip.category].bg} ${categoryColors[tip.category].text}`}>
                  {categoryLabels[tip.category]}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(tip.date).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <h3 className="text-2xl font-black mb-4 text-[#3e2723] leading-tight group-hover:text-[#2e7d32] transition-colors duration-300">
                {tip.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                {tip.content}
              </p>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-[#2e7d32] font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                Ler Artigo Completo
                <div className="bg-green-50 p-2 rounded-xl group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-white p-12 rounded-[3rem] border border-gray-100 text-center shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2e7d32] via-[#8d6e63] to-[#2e7d32] opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
        <h3 className="text-3xl font-black mb-4 text-[#3e2723]">Dúvida com a Lavouras?</h3>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto font-medium">Nossos engenheiros agrônomos estão online para auxiliar com solo, manejo e controle de pragas.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#3e2723] text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#2e7d32] hover:shadow-xl hover:shadow-[#2e7d32]/20 transition-all active:scale-95"
          >
            Falar com Engenheiro Agrônomo
          </button>
          <button className="bg-white text-[#3e2723] border-2 border-[#3e2723]/10 px-10 py-4 rounded-2xl font-black text-sm hover:border-[#3e2723] transition-all">
            Materiais de Apoio PDF
          </button>
        </div>
      </div>

      {selectedTip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setSelectedTip(null)}
              className="absolute top-6 right-6 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className={`h-4 border-b ${categoryColors[selectedTip.category].bg}`}></div>
            <div className="p-10 md:p-14">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[selectedTip.category].bg} ${categoryColors[selectedTip.category].text} mb-6 inline-block`}>
                {categoryLabels[selectedTip.category]}
              </span>
              <h3 className="text-4xl font-black text-[#3e2723] mb-8 leading-tight">{selectedTip.title}</h3>
              <div className="prose prose-stone max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {selectedTip.content}
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Postado em {new Date(selectedTip.date).toLocaleDateString('pt-BR')}</p>
                <button onClick={() => setSelectedTip(null)} className="text-[#2e7d32] font-black text-sm">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#3e2723]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#3e2723] transition-colors"
            >
              <X size={24} />
            </button>
            <div className="p-10 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#2e7d32]/10 rounded-2xl flex items-center justify-center text-[#2e7d32]">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#3e2723]">Suporte Técnico</h3>
                  <p className="text-gray-500 font-medium">Sua dúvida será analisada por um especialista agrícola.</p>
                </div>
              </div>
              {isSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in">
                  <div className="w-20 h-20 bg-green-50 text-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h4 className="text-2xl font-black text-[#3e2723]">Solicitação Enviada!</h4>
                  <p className="text-gray-500 max-w-xs mx-auto">Em breve nosso agrônomo entrará em contato com a análise técnica para sua propriedade.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitConsultancy} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Proprietário / Nome</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input type="text" required placeholder="Ex: João da Fazenda" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] outline-none transition-all font-bold text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">E-mail para resposta</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input type="email" required placeholder="contato@cafe.com.br" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] outline-none transition-all font-bold text-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Qual o foco da sua dúvida?</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] outline-none transition-all font-bold text-sm appearance-none">
                      <option>Pragas e Doenças (Broca, Ferrugem...)</option>
                      <option>Nutrição e Adubação do Solo</option>
                      <option>Qualidade de Bebida e Pós-colheita</option>
                      <option>Planejamento de Plantio / Bienalidade</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Descreva o cenário</label>
                    <textarea 
                      required
                      placeholder="Ex: Notei manchas amareladas no talhão norte após a florada..."
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] outline-none transition-all font-bold text-sm min-h-[120px]"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3e2723] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#2e7d32] hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Solicitar Análise Grátis</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsView;
