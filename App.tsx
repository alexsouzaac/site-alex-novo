
import React, { useState } from 'react';
import { 
  Video, Zap, CheckCircle2, Clock, BarChart3, Film, PenTool, 
  MessageSquare, ChevronDown, ChevronUp, BrainCircuit, 
  LayoutTemplate, MessageCircle, Menu, X, Instagram, Youtube, PlayCircle, ExternalLink, Home, Handshake, CalendarCheck, Sparkles, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { youtubeVideos, instagramPosts, socialLinks, partners, profileImage } from './portfolio';

// --- FUNÇÃO AUXILIAR ---
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- COMPONENTS ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Button = ({ children, variant = 'primary', href, onClick, className = '', ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-base font-bold transition-all duration-200 uppercase tracking-wide rounded-sm cursor-pointer relative overflow-hidden group w-full md:w-auto";
  const variants = {
    primary: "bg-accent-600 text-white shadow-lg shadow-accent-900/20 hover:shadow-accent-500/50 hover:-translate-y-1",
    secondary: "bg-white text-neutral-900 hover:bg-neutral-200 hover:-translate-y-1 shadow-lg shadow-white/10",
    outline: "border border-neutral-700 hover:border-accent-500 text-neutral-300 hover:text-white bg-transparent hover:bg-neutral-800"
  };

  const combinedClasses = `${baseStyles} ${(variants as any)[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </>
  );

  if (href) {
    return <motion.a whileTap={{ scale: 0.95 }} href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>{content}</motion.a>;
  }
  
  return <motion.button whileTap={{ scale: 0.95 }} onClick={onClick} className={combinedClasses} {...props}>{content}</motion.button>;
};

// --- PARTNER TICKER ---
const PartnerTicker = ({ onNavigate }: { onNavigate: () => void }) => {
  if (partners.length === 0) return null;

  const tickerItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <div 
      className="w-full bg-neutral-950 border-b border-neutral-800 py-4 overflow-hidden relative cursor-pointer group select-none z-30"
      onClick={onNavigate}
    >
      <div className="absolute left-0 top-0 bottom-0 w-10 md:w-32 z-10 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-10 md:w-32 z-10 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none"></div>

      <motion.div 
        className="flex items-center gap-16 w-max pl-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {tickerItems.map((partner, idx) => (
           <div key={idx} className="flex items-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900 shrink-0">
                <img src={partner.image} alt={partner.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div>
                 <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider whitespace-nowrap">{partner.name}</p>
              </div>
           </div>
        ))}
      </motion.div>
    </div>
  );
};

// Cards
const YoutubeCard: React.FC<{ video: { link: string; title: string; category: string }; idx: number }> = ({ video, idx }) => {
  const videoId = getYoutubeId(video.link);
  if (!videoId) return null;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <FadeIn delay={idx * 0.1}>
      <motion.a 
        href={video.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden group relative"
        whileHover={{ y: -5, borderColor: '#ef4444' }}
      >
        <div className="aspect-video w-full bg-black relative overflow-hidden">
          <motion.img 
            src={thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover opacity-80"
            whileHover={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <motion.div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm" whileHover={{ scale: 1.2 }}>
              <PlayCircle className="w-6 h-6 text-white fill-white ml-1" />
            </motion.div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between bg-neutral-900 relative z-10">
          <div>
            <h3 className="font-bold text-white text-base leading-tight group-hover:text-red-500 transition-colors line-clamp-1">{video.title}</h3>
            <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold mt-1">{video.category}</p>
          </div>
          <Youtube className="w-5 h-5 text-neutral-600 group-hover:text-red-500 transition-colors" />
        </div>
      </motion.a>
    </FadeIn>
  );
};

const InstagramCard: React.FC<{ post: { link: string; title: string; category: string }; idx: number }> = ({ post, idx }) => {
  return (
    <FadeIn delay={idx * 0.1}>
      <motion.a 
        href={post.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden group relative h-full flex flex-col"
        whileHover={{ y: -5, borderColor: '#d62976' }}
      >
        <div className="aspect-square w-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
          <Instagram className="w-16 h-16 text-white drop-shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
          <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> Abrir Post
          </div>
        </div>
        <div className="p-4 bg-neutral-900 relative z-10 flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-white text-base leading-tight group-hover:text-pink-500 transition-colors">{post.title}</h3>
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold mt-1">{post.category}</p>
        </div>
      </motion.a>
    </FadeIn>
  );
};

const PartnerCard: React.FC<{ partner: any; idx: number }> = ({ partner, idx }) => {
  return (
    <FadeIn delay={idx * 0.1} className="w-full max-w-md flex-grow">
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-8 flex flex-col items-center text-center hover:border-accent-500 transition-all group hover:-translate-y-1 h-full">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-accent-500/30 group-hover:border-accent-500 transition-colors shadow-lg">
          <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
        <p className="text-accent-500 text-xs font-bold uppercase tracking-widest mb-4">{partner.role}</p>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow whitespace-pre-line">{partner.description}</p>
        
        <div className="flex flex-col gap-3 w-full">
          <Button href={partner.link} variant="outline" className="w-full text-xs py-2 px-4 hover:bg-accent-600 hover:border-accent-600 hover:text-white">
             <CalendarCheck className="w-4 h-4 mr-2" />
             {partner.buttonText || "Agendar Serviço"}
          </Button>

          {partner.instagram && (
            <Button href={partner.instagram} variant="secondary" className="w-full text-xs py-2 px-4">
              <Instagram className="w-4 h-4 mr-2" />
              Conheça o Profissional
            </Button>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

// --- DATA ---
const services = [
  { title: "Vídeos Curtos", subtitle: "Reels & TikTok", icon: Zap, features: ["Feitos com IAs poderosas", "Edição dinâmica", "Cortes inteligentes", "Música trend"] },
  { title: "Comerciais", subtitle: "Ads & VSL", icon: BrainCircuit, features: ["Animações fluidas", "Narração IA ou Humana", "Roteiro profissional", "Qualidade Ads"] },
  { title: "Institucional", subtitle: "Branding", icon: LayoutTemplate, features: ["Autoridade visual", "Edição limpa", "Storytelling", "Acabamento premium"] },
  { title: "Roteiros", subtitle: "Copywriting", icon: PenTool, features: ["Lógica de vendas", "Ganchos de retenção", "CTAs claros", "Persuasão"] },
  { title: "Consultoria", subtitle: "Conteúdo", icon: MessageSquare, features: ["Chamada de 20 min", "Análise de perfil", "Direcionamento", "Estratégia"] }
];

const faqs = [
  { q: "Em quanto tempo recebo o vídeo?", a: "O prazo médio é de 2 a 5 dias úteis, dependendo da complexidade do projeto. Prazos de urgência podem ser negociados." },
  { q: "Posso pedir alterações?", a: "Sim. O orçamento inclui uma rodada de ajustes pontuais. Alterações estruturais no roteiro após aprovação serão cobradas à parte." },
  { q: "Que tipo de vídeo você faz?", a: "Foco em vídeos para internet: Reels, TikTok, anúncios (Ads) e institucionais para redes sociais." },
  { q: "Como funciona o pagamento?", a: "50% no ato da contratação para reserva de agenda e início do roteiro/edição, e 50% na entrega do arquivo final. Pagamento via PIX." },
  { q: "Você usa IA no processo?", a: "Sim, sou especialista em IA. Utilizo para otimizar roteiros, melhorar qualidade de áudio e criar elementos visuais exclusivos." }
];

// --- APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);
  
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'sobre', label: 'Sobre' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'parcerias', label: 'Parcerias', icon: Handshake },
    { id: 'contato', label: 'Contato' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-accent-500 selection:text-white overflow-x-hidden flex flex-col">
      
      {/* HEADER FIXO */}
      <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-2xl tracking-tighter text-white z-50 cursor-pointer"
            onClick={() => navigateTo('inicio')}
          >
            ALEX<span className="text-accent-500">SOUZA</span>
          </motion.div>

          <nav className="hidden md:flex gap-1 items-center">
            {navItems.map((item, i) => (
              <motion.button 
                key={item.id} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigateTo(item.id)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 relative flex items-center gap-1.5 ${
                  currentPage === item.id 
                    ? 'text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {currentPage === item.id && (
                   <motion.div 
                     layoutId="navbar-indicator"
                     className="absolute inset-0 bg-neutral-800 rounded-full border border-neutral-700"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
             <motion.a 
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.1, rotate: 5 }}
               href={socialLinks.instagram} 
               target="_blank" 
               className="text-neutral-400 hover:text-white transition-colors"
             >
                <Instagram className="w-5 h-5" />
             </motion.a>
             <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                <Button variant="primary" className="py-2 px-4 text-xs" href={socialLinks.whatsapp}>Orçamento</Button>
             </motion.div>
          </div>

          <button className="md:hidden z-50 text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-neutral-950 border-b border-neutral-800 p-4 flex flex-col gap-2 md:hidden shadow-2xl"
            >
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => navigateTo(item.id)}
                  className={`text-lg font-medium py-3 px-4 rounded-sm text-left transition-colors flex items-center gap-3 ${
                    currentPage === item.id ? 'bg-accent-600 text-white' : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.label}
                </button>
              ))}
              <Button href={socialLinks.whatsapp} className="w-full mt-4">Fazer Orçamento</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CONTEÚDO DINÂMICO (PÁGINAS) */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          
          {/* --- PÁGINA INÍCIO --- */}
          {currentPage === 'inicio' && (
            <motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
              
              {/* TICKER DE PARCEIROS */}
              <div className="w-full z-20">
                 <PartnerTicker onNavigate={() => navigateTo('parcerias')} />
              </div>

              <section className="relative flex-grow py-16 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
                
                {/* Background Tech Elements */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 mt-8">
                  <FadeIn>
                    <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-neutral-900/80 backdrop-blur-md border border-accent-500/30 rounded-full text-xs font-bold tracking-widest text-accent-400 uppercase shadow-lg shadow-accent-500/10 cursor-default">
                      <Sparkles className="w-3 h-3" />
                      Especialista em produção de vídeos com IA
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
                      Criamos vídeos profissionais utilizando as IAs <br className="hidden md:block"/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-purple-500">mais avançadas do mercado.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                      Conteúdo exclusivo para seu negócio.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button href={socialLinks.whatsapp}>Solicitar Orçamento</Button>
                      <Button variant="secondary" onClick={() => navigateTo('portfolio')}>Ver Portfólio</Button>
                    </div>
                  </FadeIn>
                </div>
              </section>
              
              <section className="py-12 border-t border-neutral-900 bg-neutral-950 mt-auto">
                 <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-neutral-500 font-medium text-sm">
                    <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-accent-500"/> Inteligência Artificial</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-500"/> Alta Definição</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent-500"/> Entrega Rápida</span>
                 </div>
              </section>
            </motion.div>
          )}

          {/* --- PÁGINA SOBRE --- */}
          {currentPage === 'sobre' && (
            <motion.div key="sobre" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-screen">
              <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                   <FadeIn className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-white mb-4">Sobre o Profissional</h2>
                      <div className="w-20 h-1 bg-accent-500 mx-auto rounded-full"></div>
                   </FadeIn>
                   
                   <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="bg-neutral-900 p-8 border border-neutral-800 rounded-sm relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-purple-600"></div>
                        <h3 className="text-2xl font-bold text-white mb-4">Alex Souza</h3>
                        <p className="text-neutral-400 leading-relaxed mb-6 font-medium text-lg">
                          Especialista em geração de vídeos com IA.
                        </p>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                          Foco em:
                        </p>
                        <ul className="space-y-2 text-neutral-300">
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" /> Criação de Histórias (Infantis, Comunicados, Promoção)</li>
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" /> Consultoria para elaboração de conteúdo para suas redes Sociais</li>
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" /> Edição avançada com Inteligência Artificial</li>
                        </ul>
                      </div>
                      <div className="grid gap-4">
                        {[
                          { icon: BrainCircuit, title: "Tecnologia de Ponta", desc: "Uso das IAs mais recentes." },
                          { icon: Clock, title: "Agilidade", desc: "Produção rápida e eficiente." },
                          { icon: BarChart3, title: "Estratégia", desc: "Conteúdo pensado para engajar." }
                        ].map((item, i) => (
                          <div key={i} className="bg-neutral-900/50 p-4 border border-neutral-800 rounded-sm flex items-center gap-4 hover:border-accent-500/50 transition-colors">
                            <item.icon className="text-accent-500 w-6 h-6 shrink-0" />
                            <div>
                              <h3 className="text-white font-bold">{item.title}</h3>
                              <p className="text-neutral-500 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* --- PÁGINA SERVIÇOS --- */}
          {currentPage === 'servicos' && (
            <motion.div key="servicos" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="min-h-screen">
               <section className="py-20 px-4">
                 <div className="max-w-6xl mx-auto">
                    <FadeIn className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-white mb-4">Meus Serviços</h2>
                      <p className="text-neutral-400 max-w-2xl mx-auto">
                        Soluções de alto nível impulsionadas por Inteligência Artificial.
                      </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                      {services.map((service, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                          <div className="bg-neutral-900/60 backdrop-blur-sm p-8 h-full border border-neutral-800 hover:border-accent-500 hover:bg-neutral-900 transition-all duration-300 rounded-lg group relative overflow-hidden shadow-lg">
                            {/* Glow Effect */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl group-hover:bg-accent-500/20 transition-all"></div>
                            
                            <service.icon className="w-12 h-12 text-white bg-accent-600 p-2.5 rounded-lg mb-6 shadow-lg shadow-accent-500/20 group-hover:scale-105 transition-transform" />
                            
                            <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                            <p className="text-xs font-bold text-accent-500 uppercase tracking-widest mb-6">{service.subtitle}</p>
                            
                            <ul className="space-y-3 border-t border-neutral-800 pt-6">
                              {service.features.map((feat, fIdx) => (
                                <li key={fIdx} className="text-neutral-400 text-sm flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 bg-neutral-600 group-hover:bg-accent-400 rounded-full transition-colors shrink-0"></div>
                                  {feat}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                 </div>
               </section>
            </motion.div>
          )}

          {/* --- PÁGINA PORTFÓLIO --- */}
          {currentPage === 'portfolio' && (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
              <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                   <FadeIn className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-white mb-4">Portfólio</h2>
                      <p className="text-neutral-400">Trabalhos recentes selecionados.</p>
                   </FadeIn>

                   <div className="mb-20">
                      <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <Youtube className="text-red-500 w-6 h-6" />
                        <h3 className="text-xl font-bold text-white">Destaques YouTube</h3>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        {youtubeVideos.map((video, idx) => (
                          <YoutubeCard key={idx} video={video} idx={idx} />
                        ))}
                      </div>
                   </div>

                   <div>
                      <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <Instagram className="text-pink-500 w-6 h-6" />
                        <h3 className="text-xl font-bold text-white">Destaques Instagram</h3>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        {instagramPosts.map((post, idx) => (
                          <InstagramCard key={idx} post={post} idx={idx} />
                        ))}
                      </div>
                   </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* --- PÁGINA PARCERIAS --- */}
          {currentPage === 'parcerias' && (
            <motion.div key="parcerias" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
              <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                   <FadeIn className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-white mb-4">Nossas Parcerias</h2>
                      <p className="text-neutral-400 max-w-2xl mx-auto">
                        Conheça os profissionais e empresas de excelência com quem desenvolvo projetos e conteúdo.
                      </p>
                   </FadeIn>

                   {partners.length > 0 ? (
                     <div className="flex flex-wrap justify-center gap-8">
                       {partners.map((partner, idx) => (
                         <PartnerCard key={idx} partner={partner} idx={idx} />
                       ))}
                     </div>
                   ) : (
                     <div className="text-center text-neutral-500 p-10 border border-neutral-800 border-dashed rounded-sm">
                       Nenhuma parceria cadastrada no momento.
                     </div>
                   )}
                </div>
              </section>
            </motion.div>
          )}

          {/* --- PÁGINA CONTATO --- */}
          {currentPage === 'contato' && (
             <motion.div key="contato" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="min-h-screen flex flex-col justify-center">
                <section className="py-20 px-4">
                   <div className="max-w-4xl mx-auto">
                      <div className="text-center bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-10 md:p-20 rounded-lg relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                          
                          {/* FOTO DE PERFIL CENTRALIZADA */}
                          <div className="flex justify-center mb-8 relative z-10">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-neutral-800 shadow-2xl ring-2 ring-accent-500/50">
                              <img src={profileImage} alt="Alex Souza" className="w-full h-full object-cover" />
                            </div>
                          </div>

                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight relative z-10">
                            Vamos tirar seu projeto do papel?
                          </h2>
                          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                            Entre em contato agora para um orçamento personalizado. Sem compromisso, direto e rápido.
                          </p>
                          
                          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 mb-16">
                            <Button href={socialLinks.whatsapp} className="py-5 px-8 text-lg w-full sm:w-auto shadow-xl shadow-accent-600/20">
                              <span className="flex items-center justify-center gap-3">
                                <MessageCircle className="w-6 h-6" />
                                Chamar no WhatsApp
                              </span>
                            </Button>
                            <Button href={socialLinks.instagram} variant="secondary" className="py-5 px-8 text-lg w-full sm:w-auto">
                              <span className="flex items-center justify-center gap-3">
                                <Instagram className="w-6 h-6" />
                                Instagram
                              </span>
                            </Button>
                          </div>

                          <div className="text-left border-t border-neutral-800 pt-10">
                            <h3 className="text-xl font-bold text-white mb-6 text-center">Dúvidas Frequentes</h3>
                            <div className="space-y-4 max-w-2xl mx-auto">
                              {faqs.map((faq, idx) => (
                                <div key={idx} className="border border-neutral-800 bg-neutral-900/50 rounded-sm overflow-hidden hover:border-neutral-700 transition-colors">
                                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-4 text-left">
                                    <span className="font-bold text-neutral-300 text-sm">{faq.q}</span>
                                    {openFaq === idx ? <ChevronUp className="w-4 h-4 text-accent-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                                  </button>
                                  {openFaq === idx && <div className="p-4 pt-0 text-neutral-400 text-sm mt-2">{faq.a}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                      </div>
                   </div>
                </section>
             </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER FIXO */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-8 text-center text-sm text-neutral-600">
         <p>&copy; {new Date().getFullYear()} Alex Souza. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
