
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      onLogin(email, password);
    } else {
      onSignup(name, email, password, role);
    }
  };

  const handleQuickLogin = (type: 'produtor' | 'comprador') => {
    const emailMap = {
      produtor: 'produtor@cafeconecta.com',
      comprador: 'comprador@cafeconecta.com'
    };
    onLogin(emailMap[type], 'demo123');
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] font-sans text-[#3e2723] selection:bg-[#2e7d32] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#2e7d32]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8d6e63]/5 rounded-full blur-[100px]"></div>
      </div>

      <nav className="fixed top-0 w-full z-[100] bg-[#fdfcf8]/80 backdrop-blur-2xl border-b border-[#3e2723]/5 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-[#3e2723] rounded-xl flex items-center justify-center shadow-xl group-hover:bg-[#2e7d32] transition-all duration-500 group-hover:rotate-6">
              <Coffee className="text-white" size={20} />
            </div>
            <span className="text-xl font-black font-serif tracking-tighter uppercase">Café<span className="text-[#2e7d32]">Conecta</span></span>
          </div>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#3e2723] text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#2e7d32] transition-all shadow-lg active:scale-95"
            >
              Acessar Painel
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-2 bg-[#2e7d32]/10 text-[#2e7d32] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#2e7d32]/20 animate-in fade-in slide-in-from-top duration-700">
            <Sparkles size={14} /> IA Aplicada ao Agronegócio
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-black font-serif leading-[0.85] tracking-tighter animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            Inteligência real <br />
            <span className="text-[#2e7d32] italic">para o seu grão.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
            A primeira plataforma brasileira que une a tradição da colheita à potência da inteligência artificial preditiva.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-600">
            <button 
              onClick={() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#2e7d32] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-[#2e7d32]/30 hover:scale-105 transition-all group"
            >
              Começar Gratuitamente <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section id="auth" className="py-24 px-6 bg-white border-y border-[#3e2723]/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl font-black font-serif tracking-tight">Experimente o Ecossistema</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button onClick={() => handleQuickLogin('produtor')} className="group p-8 bg-[#3e2723] rounded-3xl text-left hover:bg-[#2e7d32] transition-all duration-500 shadow-xl">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6"><Leaf size={24} /></div>
                <h4 className="text-xl font-black text-white mb-2">Painel Produtor</h4>
                <p className="text-white/60 text-sm font-medium">Gestão de estoque e insights via Gemini.</p>
              </button>
              <button onClick={() => handleQuickLogin('comprador')} className="group p-8 bg-white border border-gray-100 rounded-3xl text-left hover:border-[#2e7d32]/30 hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-[#2e7d32] group-hover:text-white transition-colors"><ShoppingBag size={24} /></div>
                <h4 className="text-xl font-black text-[#3e2723] mb-2">Painel Comprador</h4>
                <p className="text-gray-400 text-sm font-medium">Marketplace direto com a origem.</p>
              </button>
            </div>
          </div>

          <div className="bg-[#fdfcf8] p-10 md:p-14 rounded-[3.5rem] shadow-3xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-2 mb-10 bg-white p-1.5 rounded-2xl shadow-sm">
                <button type="button" onClick={() => setAuthMode('login')} className={`flex-1 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-[#3e2723] text-white shadow-lg' : 'text-gray-400'}`}>Entrar</button>
                <button type="button" onClick={() => setAuthMode('signup')} className={`flex-1 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-[#3e2723] text-white shadow-lg' : 'text-gray-400'}`}>Criar Conta</button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-[#2e7d32] outline-none font-bold text-sm" placeholder="fazenda@exemplo.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-[#2e7d32] outline-none font-bold text-sm" required />
              </div>
              <button type="submit" disabled={isAuthenticating} className="w-full bg-[#3e2723] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2e7d32] transition-all flex justify-center items-center gap-3 shadow-xl">
                {isAuthenticating ? <Loader2 className="animate-spin" size={18} /> : (authMode === 'login' ? 'Acessar' : 'Cadastrar')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
