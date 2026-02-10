
import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, User, Production, ChatMessage } from '../types';
import { Send, ArrowLeft, Coffee, MapPin, Package, CheckCircle2, ShieldCheck, Info, Loader2 } from 'lucide-react';

interface ChatViewProps {
  session: ChatSession;
  currentUser: User;
  production: Production;
  onSendMessage: (sessionId: string, text: string) => void;
  onBack: () => void;
  onCloseDeal: (sessionId: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ session, currentUser, production, onSendMessage, onBack, onCloseDeal }) => {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };
    scrollToBottom();
  }, [session.messages, isPartnerTyping]);

  useEffect(() => {
    if (session.messages.length > 0) {
      const lastMsg = session.messages[session.messages.length - 1];
      if (lastMsg.senderId === currentUser.id) {
        setIsPartnerTyping(true);
      } else {
        setIsPartnerTyping(false);
      }
    }
  }, [session.messages, currentUser.id]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    
    setIsSending(true);
    onSendMessage(session.id, inputText);
    setInputText('');
    
    setTimeout(() => setIsSending(false), 500);
  };

  const partnerName = currentUser.role === 'PRODUCER' ? 'Comprador' : 'Produtor';

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-500">
      <header className="bg-[#3e2723] p-6 text-white flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2e7d32] rounded-2xl flex items-center justify-center shadow-lg">
              <Coffee size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight leading-none mb-1">{production.quality}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#2e7d32]">Negociação Ativa</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
           <ShieldCheck size={18} className="text-[#2e7d32]" />
           <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Garantia CaféConecta</span>
        </div>
      </header>

      <div className="bg-[#fdfcf8] p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-center md:justify-start shrink-0">
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-xl border border-gray-100 shadow-sm">
          <Package size={14} className="text-gray-400" />
          <span className="text-xs font-black text-[#3e2723]">{production.volume} Sacas</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-xl border border-gray-100 shadow-sm">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-xs font-black text-[#3e2723]">{production.location}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-xl border border-green-100 shadow-sm ml-auto">
          <span className="text-[10px] font-black text-gray-400 uppercase">Preço Ref:</span>
          <span className="text-xs font-black text-[#2e7d32]">R$ {production.desiredPrice}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/30 custom-scrollbar scroll-smooth">
        {session.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
            <Info size={48} />
            <p className="font-black text-xs uppercase tracking-widest">Inicie a negociação enviando uma mensagem</p>
          </div>
        ) : (
          <>
            {session.messages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                  <div className={`max-w-[75%] p-5 rounded-[2rem] shadow-sm relative ${
                    isMine 
                      ? 'bg-[#3e2723] text-white rounded-tr-none' 
                      : 'bg-white text-[#3e2723] rounded-tl-none border border-gray-100'
                  }`}>
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <span className={`text-[8px] font-black uppercase tracking-tighter ${isMine ? 'text-white/40' : 'text-gray-300'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMine && <CheckCircle2 size={10} className="text-[#2e7d32]" />}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isPartnerTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-left-2">
                <div className="bg-white/50 px-5 py-3 rounded-2xl border border-gray-100 flex items-center gap-3">
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{partnerName} está digitando...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="p-6 bg-white border-t border-gray-100 shrink-0">
        {session.status === 'closed' || production.status === 'sold' ? (
          <div className="bg-green-50 p-6 rounded-[2rem] text-center border-2 border-dashed border-[#2e7d32]/30 animate-in fade-in duration-700">
            <CheckCircle2 size={32} className="mx-auto text-[#2e7d32] mb-2" />
            <p className="font-black text-[#2e7d32] uppercase tracking-widest">Negócio Finalizado com Sucesso</p>
            <p className="text-[10px] text-green-700/60 font-bold mt-1">Este lote não está mais disponível para venda.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSend} className="flex gap-3">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escreva sua proposta ou dúvida..."
                className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-[#2e7d32] transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="bg-[#2e7d32] text-white p-4 rounded-2xl hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                {isSending ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
              </button>
            </form>
            
            <div className="flex justify-between items-center px-2">
               <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#3e2723] transition-colors">
                 Anexar Laudo SCA
               </button>
               <button 
                 onClick={() => {
                   if(window.confirm('Deseja oficializar a venda deste lote? O lote será marcado como VENDIDO no marketplace.')) {
                     onCloseDeal(session.id);
                   }
                 }}
                 className="bg-[#3e2723] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2e7d32] transition-all shadow-md active:scale-95"
               >
                 Fechar Negócio Agora
               </button>
            </div>
          </div>
        )}
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3e272320; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default ChatView;
