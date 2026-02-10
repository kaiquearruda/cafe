
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { User, UserRole, CoffeeQuote, Production, Tip, Interest, SubscriptionPlan, PriceAlert, InventoryItem, ChatSession, ChatMessage } from './types';
import { INITIAL_QUOTES, INITIAL_TIPS } from './constants';
import { getChatAutoReply } from './services/geminiService';
import Layout from './components/Layout';
import LandingPage from './views/LandingPage';
import DashboardProducer from './views/DashboardProducer';
import DashboardBuyer from './views/DashboardBuyer';
import MarketView from './views/MarketView';
import ProductionManagement from './views/ProductionManagement';
import TipsView from './views/TipsView';
import AdminPanel from './views/AdminPanel';
import SubscriptionView from './views/SubscriptionView';
import ChatView from './views/ChatView';

const PRODUCER_ID = 'usr_producer_1';
const BUYER_ID = 'usr_buyer_1';

const ChatRouteWrapper: React.FC<{
  chatSessions: ChatSession[];
  productions: Production[];
  user: User | null;
  onSendMessage: (sessionId: string, text: string) => void;
  onCloseDeal: (sessionId: string) => void;
}> = ({ chatSessions, productions, user, onSendMessage, onCloseDeal }) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = chatSessions.find(s => s.id === sessionId);
  const prod = productions.find(p => p.id === session?.productionId);
  
  if (!user || !session || !prod) return <Navigate to="/dashboard" replace />;
  
  return (
    <ChatView 
      session={session} 
      currentUser={user} 
      production={prod} 
      onSendMessage={onSendMessage} 
      onBack={() => navigate('/dashboard')} 
      onCloseDeal={onCloseDeal} 
    />
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState<CoffeeQuote[]>(INITIAL_QUOTES || []);
  const [tips, setTips] = useState<Tip[]>(INITIAL_TIPS || []);
  const [productions, setProductions] = useState<Production[]>([
    {
      id: 'prod_mock1',
      producerId: PRODUCER_ID,
      coffeeType: 'Arábica',
      harvest: '2023/2024',
      volume: 450,
      quality: 'Bourbon Amarelo • Natural • SCA 86pts',
      desiredPrice: 1420,
      location: 'Carmo de Minas, MG',
      isPublic: true,
      status: 'available',
      createdAt: new Date().toISOString()
    }
  ]);

  const [interests, setInterests] = useState<Interest[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', type: 'Em Coco', bags: 450, description: 'Lote Secador 02' }
  ]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleLogin = async (email: string, pass: string) => {
    setIsAuthenticating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      let role = UserRole.PRODUCER;
      let userId = PRODUCER_ID;
      
      if (email.toLowerCase().includes('admin')) {
        role = UserRole.ADMIN;
        userId = 'usr_admin_1';
      } else if (email.toLowerCase().includes('comprador')) {
        role = UserRole.BUYER;
        userId = BUYER_ID;
      }

      const mockUser: User = {
        id: userId,
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        plan: 'elite',
        isPremium: true,
        isBlocked: false,
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      setAllUsers(prev => prev.find(u => u.id === mockUser.id) ? prev : [...prev, mockUser]);
      navigate(role === UserRole.ADMIN ? '/admin' : '/dashboard');
    } catch (e) {
      console.error("Login failed", e);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignup = async (name: string, email: string, pass: string, role: UserRole) => {
    setIsAuthenticating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        plan: 'free',
        isPremium: false,
        isBlocked: false,
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      setAllUsers(prev => [...prev, mockUser]);
      navigate('/dashboard');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleSendMessage = async (sessionId: string, text: string) => {
    if (!user) return;
    const newMessage: ChatMessage = { id: Date.now().toString(), senderId: user.id, text, timestamp: new Date().toISOString() };
    
    setChatSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, newMessage], lastUpdate: newMessage.timestamp } : s));

    const session = chatSessions.find(s => s.id === sessionId);
    const prod = productions.find(p => p.id === session?.productionId);
    
    if (session && prod) {
      setTimeout(async () => {
        const partnerRole = user.role === UserRole.PRODUCER ? 'BUYER' : 'PRODUCER';
        const partnerId = user.role === UserRole.PRODUCER ? session.buyerId : session.producerId;
        const replyText = await getChatAutoReply([...session.messages, newMessage], partnerRole as any, prod.quality);
        const reply: ChatMessage = { id: Date.now().toString() + "_r", senderId: partnerId, text: replyText, timestamp: new Date().toISOString() };
        setChatSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, reply], lastUpdate: reply.timestamp } : s));
      }, 2000);
    }
  };

  const handleCloseDeal = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (!session) return;
    setChatSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'closed' } : s));
    setProductions(prev => prev.map(p => p.id === session.productionId ? { ...p, status: 'sold' } : p));
    navigate('/dashboard');
  };

  if (!user) return <LandingPage onLogin={handleLogin} onSignup={handleSignup} isAuthenticating={isAuthenticating} />;

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/market" element={<MarketView quotes={quotes} />} />
        <Route path="/tips" element={<TipsView tips={tips} />} />
        <Route path="/chat/:sessionId" element={<ChatRouteWrapper chatSessions={chatSessions} productions={productions} user={user} onSendMessage={handleSendMessage} onCloseDeal={handleCloseDeal} />} />
        
        {user.role === UserRole.PRODUCER && (
          <>
            <Route path="/dashboard" element={<DashboardProducer userPlan={user.plan} quotes={quotes} productions={productions.filter(p => p.producerId === user.id)} interests={interests} priceAlerts={priceAlerts} inventory={inventory} onSetInventory={setInventory} onAddAlert={(t, p) => setPriceAlerts([{id: Date.now().toString(), coffeeType: t, targetPrice: p, isTriggered: false, createdAt: new Date().toISOString()}, ...priceAlerts])} onRemoveAlert={(id) => setPriceAlerts(prev => prev.filter(a => a.id !== id))} onNavigate={navigate} />} />
            <Route path="/production" element={<ProductionManagement productions={productions.filter(p => p.producerId === user.id)} onAdd={(p) => setProductions(prev => [{...p, id: 'p_'+Date.now(), producerId: user.id, status: 'available', createdAt: new Date().toISOString()}, ...prev])} onDelete={(id) => setProductions(prev => prev.filter(p => p.id !== id))} />} />
            <Route path="/billing" element={<SubscriptionView currentPlan={user.plan} onUpgrade={(p) => setUser({...user, plan: p})} />} />
          </>
        )}

        {user.role === UserRole.BUYER && (
          <Route path="/dashboard" element={<DashboardBuyer availableCoffee={productions.filter(p => p.status === 'available')} onExpressInterest={(pId) => navigate(`/chat/new_${pId}`)} />} />
        )}

        {user.role === UserRole.ADMIN && (
          <Route path="/admin" element={<AdminPanel quotes={quotes} updateQuote={(id, price) => setQuotes(prev => prev.map(q => q.id === id ? {...q, currentPrice: price} : q))} tips={tips} onAddTip={(t) => setTips(prev => [{...t, id: 't_'+Date.now(), date: new Date().toISOString()}, ...prev])} buyers={allUsers.filter(u => u.role === UserRole.BUYER)} onToggleBlock={(id) => setAllUsers(prev => prev.map(u => u.id === id ? {...u, isBlocked: !u.isBlocked} : u))} interests={interests} productions={productions} />} />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
