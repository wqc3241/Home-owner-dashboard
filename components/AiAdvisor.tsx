import React, { useState, useRef, useEffect } from 'react';
import { getHomeAdvice } from '../services/geminiService';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { HomeProfile } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const AiAdvisor: React.FC<{ home: HomeProfile }> = ({ home }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: `Hi! I'm your Home Assistant. I know about your property at ${home.address}. Ask me about maintenance, renovation costs, or maximizing your home value!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Context string for the AI
    const context = `
      Address: ${home.address}
      Value: $${home.currentValue}
      Sqft: ${home.sqft}
      Built: ${home.yearBuilt}
      Beds: ${home.beds}
      Baths: ${home.baths}
    `;

    const responseText = await getHomeAdvice(userMsg.text, context);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3">
        <div className="bg-brand-100 p-2 rounded-lg">
            <Sparkles size={20} className="text-brand-600" />
        </div>
        <div>
            <h2 className="font-bold text-gray-900">AI Home Advisor</h2>
            <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
            </p>
        </div>
      </div>
      
      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' ? 'bg-gray-200' : 'bg-brand-600 text-white'
                }`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className={`rounded-2xl p-4 text-sm shadow-sm ${
                msg.sender === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
             </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative flex items-center gap-2 max-w-3xl mx-auto">
            <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about maintenance, value, or repairs..."
            className="flex-1 bg-gray-100 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner"
            />
            <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-brand-600 text-white p-3 rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
            >
            <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default AiAdvisor;