
import React from 'react';
import { 
  Coffee, TrendingUp, ArrowRight, Globe, Zap, 
  Mail, Lock, User as UserIcon, Loader2, Play, 
  ShieldCheck, Leaf, ShoppingBag, Chrome,
  BarChart3, Users, Sprout, Shield, Sparkles
} from 'lucide-react';
import { UserRole } from '../types';

interface LandingPageProps {
  onLogin: (email: string, pass: string) => void;
  onSignup: (name: string, email: string, pass: string, role: UserRole) => void;
  isAuthenticating: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup, isAuthenticating }) => {
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState<UserRole>(UserRole.PRODUCER);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      onLogin(email, password);
    } else {
      onSignup(name, email, password, role);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onLogin('google_user@gmail.com', 'google_auth_token');
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] font-sans text-[#3e2723] selection:bg-[#2e7d32] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-[#fdfcf8]/80 backdrop-blur-2xl border-b border-[#3e2723]/5 h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-[#3e2723] rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-[#2e7d32] transition-all duration-500 group-hover:rotate-6">
              <Coffee className="text-white" size={26} />
            </div>
            <span className="text-2xl font-black font-serif tracking-tighter uppercase leading-none">Café<span className="text-[#2e7d32]">Conecta</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-[11px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Ecossistema</a>
            <a href="#market" className="text-[11px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Mercado Vivo</a>
            <button 
              onClick={() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#3e2723] text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#2e7d32] hover:shadow-2xl hover:shadow-[#2e7d32]/20 transition-all active:scale-95"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2e7d32]/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 space-y-12">
            <div className="inline-flex items-center gap-3 bg-[#2e7d32]/10 text-[#2e7d32] px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.15em] border border-[#2e7d32]/20 animate-in fade-in slide-in-from-left duration-700">
              <Zap size={14} className="fill-current" /> O Futuro do Café é Inteligente
            </div>
            
            <h1 className="text-8xl md:text-[10rem] font-black font-serif leading-[0.82] tracking-tighter text-[#3e2723] animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Negocie na <span className="text-[#2e7d32] italic">Origem.</span> <br />
              Venda para o <span className="relative">Mundo.<span className="absolute bottom-4 left-0 w-full h-4 bg-[#fbbf24]/30 -z-10"></span></span>
            </h1>

            <p className="text-2xl text-gray-500 max-w-2xl leading-relaxed font-medium animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
              A plataforma definitiva que une a tradição do campo à tecnologia de ponta. Cotações reais, IA preditiva e conexões globais.
            </p>

            <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
              <button 
                onClick={() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#2e7d32] text-white px-14 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-widest flex items-center gap-4 shadow-3xl shadow-[#2e7d32]/30 hover:scale-105 transition-all group"
              >
                Criar Minha Conta Grátis 
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </button>
              
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-[#fdfcf8] bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-[#fdfcf8] bg-[#3e2723] flex items-center justify-center text-white text-xs font-black">
                  +1k
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="bg-white p-8 rounded-[3rem] shadow-4xl border border-gray-100 relative z-20 hover:-rotate-2 transition-transform duration-500">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Market</span>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase text-green-500">NY SPOT</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-end justify-between border-b border-gray-50 pb-4">
                  <div>
                    <p className="text-xs font-black text-[#3e2723]">Arábica Especial</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Saca 60kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#2e7d32]">R$ 1.250</p>
                    <p className="text-[9px] font-black text-green-500">+1.24%</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-black text-[#3e2723]">Robusta/Conilon</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Saca 60kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#3e2723]">R$ 840</p>
                    <p className="text-[9px] font-black text-red-400">-0.42%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-[#2e7d32] p-8 rounded-[2.5rem] shadow-4xl text-white z-10 hidden md:block rotate-3 hover:rotate-0 transition-transform duration-500">
               <Sprout size={32} className="mb-4" />
               <p className="text-xs font-black uppercase tracking-widest leading-tight">Sugestão Gemini IA:</p>
               <p className="text-xl font-bold italic opacity-90 mt-2">"Mercado em alta: Ótimo momento para fixação de lotes..."</p>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black font-serif tracking-tight">O Ecossistema Completo</h2>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">Ferramentas desenhadas para a realidade de quem vive o café.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">
          {/* Card 1: IA Insight */}
          <div className="md:col-span-4 lg:col-span-8 bg-[#3e2723] rounded-[3.5rem] p-12 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2e7d32]/20 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md mb-10">
                <Sparkles size={32} className="text-[#fbbf24]" />
              </div>
              <div>
                <h3 className="text-5xl font-black font-serif mb-6 leading-none">Inteligência Artificial Gemini</h3>
                <p className="text-xl text-white/50 leading-relaxed max-w-lg font-medium">
                  Analise o mercado em segundos. Nossa IA cruza dados de clima, câmbio e estoques globais para sugerir o melhor momento de venda da sua produção.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Market App */}
          <div className="md:col-span-4 lg:col-span-4 bg-white rounded-[3.5rem] p-12 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-2xl transition-all group">
             <div>
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#2e7d32] mb-10 group-hover:scale-110 transition-transform">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-4xl font-black font-serif mb-6 leading-tight">Preço SPOT em Tempo Real</h3>
             </div>
             <p className="text-gray-400 font-medium leading-relaxed">
               Acesso direto às bolsas de NY e Londres, adaptado para o valor da saca no seu porto de referência.
             </p>
          </div>

          {/* Card 3: Global Buyer */}
          <div className="md:col-span-2 lg:col-span-4 bg-[#fdfcf8] rounded-[3.5rem] p-12 border border-[#3e2723]/10 shadow-inner flex flex-col justify-between hover:bg-white hover:shadow-2xl transition-all">
             <div className="w-16 h-16 bg-[#3e2723] rounded-2xl flex items-center justify-center text-white mb-10">
                <Globe size={32} />
             </div>
             <div>
                <h3 className="text-3xl font-black font-serif mb-4 leading-tight">Exportação Direta</h3>
                <p className="text-sm text-gray-500 font-medium">Conectamos você a torrefações e exportadoras premium sem intermediários desnecessários.</p>
             </div>
          </div>

          {/* Card 4: Security */}
          <div className="md:col-span-2 lg:col-span-8 bg-[#2e7d32] rounded-[3.5rem] p-12 text-white flex flex-col lg:flex-row gap-12 items-center group">
             <div className="lg:flex-1 space-y-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                   <Shield size={32} />
                </div>
                <h3 className="text-5xl font-black font-serif leading-none">Negociações Blindadas</h3>
                <p className="text-white/60 text-lg font-medium">Contratos digitais e garantia CaféConecta. Segurança total do aceite ao pagamento.</p>
             </div>
             <div className="w-full lg:w-1/2 h-64 bg-black/10 rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                <BarChart3 size={120} className="text-white/5 opacity-50 group-hover:scale-125 transition-transform duration-700" />
             </div>
          </div>
        </div>
      </section>

      {/* Auth Section Redesigned */}
      <section id="auth" className="py-40 bg-[#3e2723] relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
           <div className="grid grid-cols-12 gap-8 rotate-12 scale-150">
              {Array.from({length: 48}).map((_, i) => <Coffee key={i} size={64} className="text-white" />)}
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="text-white space-y-10">
            <h2 className="text-7xl font-black font-serif leading-none tracking-tighter">O campo nunca foi <br /> <span className="text-[#2e7d32]">tão digital.</span></h2>
            <div className="space-y-6">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#2e7d32] border border-white/10 shadow-xl"><Users size={24} /></div>
                  <div>
                     <p className="text-xl font-bold">Comunidade Global</p>
                     <p className="text-white/40 font-medium text-sm italic">Junte-se a centenas de produtores de elite.</p>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#2e7d32] border border-white/10 shadow-xl"><ShieldCheck size={24} /></div>
                  <div>
                     <p className="text-xl font-bold">Certificação Facilitada</p>
                     <p className="text-white/40 font-medium text-sm italic">Exiba seus laudos SCA e Rainforest.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e7d32]/5 rounded-full -mr-16 -mt-16"></div>
            
            <header className="mb-12 text-center">
               <h3 className="text-4xl font-black font-serif mb-2">Acesso Restrito</h3>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Criptografia de Ponta a Ponta</p>
            </header>

            <div className="flex gap-2 mb-10 bg-gray-50 p-1.5 rounded-2xl">
              <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-white shadow-xl text-[#3e2723]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Entrar
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-white shadow-xl text-[#3e2723]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {authMode === 'signup' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Seu Nome ou Fazenda</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Eu sou um:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setRole(UserRole.PRODUCER)}
                        className={`py-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${role === UserRole.PRODUCER ? 'border-[#2e7d32] bg-[#2e7d32]/5 text-[#2e7d32]' : 'border-gray-50 text-gray-300 hover:border-gray-200'}`}
                      >
                        <Leaf size={28} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Produtor</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setRole(UserRole.BUYER)}
                        className={`py-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${role === UserRole.BUYER ? 'border-[#2e7d32] bg-[#2e7d32]/5 text-[#2e7d32]' : 'border-gray-50 text-gray-300 hover:border-gray-200'}`}
                      >
                        <ShoppingBag size={28} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Comprador</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail Profissional</label>
                <div className="relative">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm shadow-inner" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha Segura</label>
                <div className="relative">
                   <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#2e7d32] font-bold text-sm shadow-inner" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isAuthenticating}
                className="w-full bg-[#3e2723] text-white py-6 rounded-[2rem] font-black text-[12px] uppercase tracking-widest hover:bg-[#2e7d32] transition-all flex justify-center items-center gap-4 shadow-3xl shadow-[#3e2723]/30 active:scale-95"
              >
                {isAuthenticating ? <Loader2 className="animate-spin" /> : (authMode === 'login' ? 'Entrar no Ecossistema' : 'Criar Minha Conta')}
              </button>

              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-white px-4 text-gray-300">ou</span></div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl border-2 border-gray-100 hover:border-[#2e7d32]/30 hover:bg-gray-50 transition-all font-black text-[11px] uppercase tracking-widest"
              >
                {isGoogleLoading ? <Loader2 className="animate-spin text-[#2e7d32]" /> : (
                  <>
                    <Chrome size={20} className="text-[#d93025]" />
                    Continuar com Google
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 max-w-7xl mx-auto border-t border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-2 space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3e2723] rounded-xl flex items-center justify-center"><Coffee className="text-white" size={22} /></div>
                  <span className="text-xl font-black font-serif tracking-tighter uppercase">CaféConecta</span>
               </div>
               <p className="text-xl text-gray-400 font-medium max-w-sm">Transformando a cafeicultura brasileira através da tecnologia e inteligência de dados.</p>
               <div className="flex gap-4">
                  {/* Social Icons Placeholder */}
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 bg-gray-50 rounded-xl hover:bg-[#2e7d32] hover:text-white transition-all cursor-pointer"></div>)}
               </div>
            </div>
            <div>
               <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-gray-300">Plataforma</h4>
               <ul className="space-y-4 text-sm font-bold text-[#3e2723]/60">
                  <li className="hover:text-[#2e7d32] cursor-pointer transition-colors">Cotações SPOT</li>
                  <li className="hover:text-[#2e7d32] cursor-pointer transition-colors">Gemini Insights</li>
                  <li className="hover:text-[#2e7d32] cursor-pointer transition-colors">Planos & Preços</li>
               </ul>
            </div>
            <div>
               <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-gray-300">Suporte</h4>
               <ul className="space-y-4 text-sm font-bold text-[#3e2723]/60">
                  <li className="hover:text-[#2e7d32] cursor-pointer transition-colors">FAQ</li>
                  <li className="hover:text-[#2e7d32] cursor-pointer transition-colors">Falar com Agrônomo</li>
                  <li className="hover:text-[#2e7d32] cursor-pointer transition-colors">Privacidade</li>
               </ul>
            </div>
         </div>
         <div className="mt-24 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">© 2024 CaféConecta. Todos os direitos reservados.</p>
            <div className="flex items-center gap-8 text-[10px] font-black text-gray-300 uppercase tracking-widest">
               <span>Feito para o Produtor</span>
               <span>v4.0 Agrotech</span>
            </div>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
        .shadow-4xl { box-shadow: 0 50px 100px -20px rgba(62,39,35,0.12), 0 30px 60px -30px rgba(62,39,35,0.15); }
        .shadow-3xl { box-shadow: 0 35px 60px -15px rgba(46,125,50,0.15); }
      `}} />
    </div>
  );
};

export default LandingPage;
