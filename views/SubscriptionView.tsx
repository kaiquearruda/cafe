
import React from 'react';
import { PLAN_DETAILS } from '../constants';
import { SubscriptionPlan } from '../types';
import { Check, Star, Zap, Crown, Loader2, ShieldCheck } from 'lucide-react';

interface SubscriptionViewProps {
  currentPlan: SubscriptionPlan;
  onUpgrade: (plan: SubscriptionPlan) => void;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ currentPlan, onUpgrade }) => {
  const [loadingPlan, setLoadingPlan] = React.useState<SubscriptionPlan | null>(null);

  const handleSelect = async (plan: SubscriptionPlan) => {
    setLoadingPlan(plan);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onUpgrade(plan);
    setLoadingPlan(null);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block bg-[#2e7d32]/10 text-[#2e7d32] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Escolha sua Categoria
        </div>
        <h2 className="text-5xl font-black text-[#3e2723] leading-tight">Sua Produção com <span className="text-[#2e7d32]">Inteligência</span></h2>
        <p className="text-xl text-gray-500">Escolha o nível de ferramentas que sua fazenda precisa hoje.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 px-4">
        {(Object.keys(PLAN_DETAILS) as SubscriptionPlan[]).map((planKey) => {
          const plan = PLAN_DETAILS[planKey];
          const isCurrent = currentPlan === planKey;
          const isPro = planKey === 'pro';
          const isLoading = loadingPlan === planKey;

          return (
            <div 
              key={planKey}
              className={`relative bg-white rounded-[2.5rem] p-10 border-2 transition-all duration-500 hover:shadow-3xl flex flex-col ${
                isCurrent ? 'border-[#2e7d32] shadow-lg' : isPro ? 'border-[#8d6e63]/20 shadow-sm' : 'border-gray-100'
              }`}
            >
              {isPro && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#3e2723] px-6 py-2 rounded-full text-xs font-black uppercase flex items-center gap-2 shadow-lg ring-4 ring-white">
                  <Star size={14} fill="currentColor" /> Recomendado para Produtores
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    planKey === 'free' ? 'bg-gray-100 text-gray-400' : 
                    planKey === 'pro' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-[#2e7d32]/10 text-[#2e7d32]'
                  }`}>
                    {planKey === 'free' && <Zap size={24} />}
                    {planKey === 'pro' && <Crown size={24} />}
                    {planKey === 'elite' && <Crown size={24} />}
                  </div>
                  <h3 className="text-2xl font-black text-[#3e2723] uppercase tracking-tight">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#3e2723]">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                  <span className="text-gray-400 font-medium">/mês</span>
                </div>
              </div>

              <div className="flex-1 space-y-5 mb-12">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Recursos inclusos:</p>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-base text-gray-600 list-none font-medium">
                    <div className="mt-1 bg-green-50 rounded-full p-0.5">
                      <Check size={16} className="text-[#2e7d32]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </div>

              <button
                onClick={() => handleSelect(planKey)}
                disabled={isCurrent || !!loadingPlan}
                className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95 ${
                  isCurrent 
                    ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-default' 
                    : isLoading
                    ? 'bg-[#3e2723] text-white opacity-80 cursor-wait'
                    : isPro 
                    ? 'bg-[#3e2723] text-white hover:bg-[#2e7d32] shadow-xl hover:shadow-[#2e7d32]/20' 
                    : 'bg-[#2e7d32] text-white hover:bg-[#1b5e20] shadow-xl hover:shadow-[#2e7d32]/20'
                }`}
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" /> Ativando...</>
                ) : isCurrent ? (
                  'Plano Atual'
                ) : (
                  `Ativar Plano ${plan.name}`
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 text-[#2e7d32] font-bold">
          <ShieldCheck size={20} />
          Pagamento Criptografado e Seguro
        </div>
        <p className="text-gray-400 text-sm leading-relaxed px-8">
          Sua transação é processada em ambiente seguro. Cancele ou altere seu plano a qualquer momento diretamente pelo painel de controle da sua conta.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionView;
