
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Coffee, LogOut, Menu, User as UserIcon, LayoutDashboard, ShoppingCart, TrendingUp, BookOpen, Settings, CreditCard } from 'lucide-react';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = React.useMemo(() => {
    if (!user) return [];
    const items = [];
    
    if (user.role === UserRole.PRODUCER) {
      items.push(
        { path: '/dashboard', label: 'Painel Geral', icon: LayoutDashboard },
        { path: '/market', label: 'Cotações', icon: TrendingUp },
        { path: '/production', label: 'Minha Produção', icon: Coffee },
        { path: '/tips', label: 'Dicas Técnicas', icon: BookOpen },
        { path: '/billing', label: 'Assinatura', icon: CreditCard },
      );
    } else if (user.role === UserRole.BUYER) {
      items.push(
        { path: '/dashboard', label: 'Explorar Lotes', icon: ShoppingCart },
        { path: '/market', label: 'Monitorar Preços', icon: TrendingUp },
        { path: '/tips', label: 'Análises Técnicas', icon: BookOpen },
      );
    } else if (user.role === UserRole.ADMIN) {
      items.push(
        { path: '/admin', label: 'Painel Admin', icon: Settings },
        { path: '/market', label: 'Cotações Global', icon: TrendingUp },
        { path: '/tips', label: 'Gestão de Conteúdo', icon: BookOpen },
      );
    }
    return items;
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fdfcf8]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-[#3e2723] text-white p-8 sticky top-0 h-screen shadow-2xl z-40">
        <div className="flex items-center gap-3 mb-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2e7d32] rounded-xl flex items-center justify-center shadow-lg">
              <Coffee className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold font-serif tracking-tight">CaféConecta</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all
                ${isActive 
                  ? 'bg-[#2e7d32] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 mb-4 flex items-center gap-3 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#8d6e63] flex items-center justify-center text-white shrink-0">
              <UserIcon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Membro {user?.plan === 'free' ? 'Básico' : user?.plan === 'pro' ? 'Profissional' : 'Elite'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#3e2723] text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="text-[#2e7d32]" size={24} />
          <span className="text-xl font-bold font-serif">CaféConecta</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          <Menu />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-[#3e2723] p-8 text-white animate-in slide-in-from-top duration-300">
          <div className="flex justify-end mb-10">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-3xl">&times;</button>
          </div>
          <nav className="space-y-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  w-full flex items-center gap-4 text-2xl font-bold 
                  ${isActive ? 'text-[#2e7d32]' : ''}
                `}
              >
                <item.icon size={28} />
                {item.label}
              </NavLink>
            ))}
            <div className="pt-8 mt-8 border-t border-white/10">
              <button onClick={onLogout} className="text-red-400 font-bold text-2xl flex items-center gap-4">
                <LogOut size={28} /> Sair
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
