import React, { useState } from 'react';
import { 
  Video, Zap, CheckCircle2, Clock, BarChart3, Film, PenTool, 
  MessageSquare, ChevronDown, ChevronUp, BrainCircuit, 
  LayoutTemplate, MessageCircle, Menu, X, Instagram, Youtube, PlayCircle, ArrowRight, ExternalLink, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { youtubeVideos, instagramPosts, socialLinks } from './portfolio';

// --- FUNÇÃO AUXILIAR PARA EXTRAIR ID DO YOUTUBE ---
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- COMPONENTS ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Button = ({ children, variant = 'primary', href, onClick, className = '', ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-base font-bold transition-all duration-200 uppercase tracking-wide rounded-sm cursor-pointer relative overflow-hidden group";
  const variants = {
    primary: "bg-accent-600 text-white shadow-lg shadow-accent-900/20 hover:shadow-accent-500/50 hover:-translate-y-1",
    secondary: "bg-white text-neutral-900 hover:bg-neutral-200 hover:-translate-y-1 shadow-lg shadow-white/10",
    outline: "border border-neutral-700 hover:border-accent-500 text-neutral-300 hover:text-white bg-transparent hover:bg-neutral-800"
  };

  const combinedClasses = `${baseStyles} ${(variants as any)[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
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

// Componente Card YouTube
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
            <motion.div 
              className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm"
              whileHover={{ scale: 1.2 }}
            >
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

// Componente Card Instagram
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

// --- DATA ---

const services = [
  { title: "Vídeos Curtos", subtitle: "Reels & TikTok", icon: Zap, features: ["Edição dinâmica", "Cortes inteligentes", "Headlines fortes", "Música trend"] },
  { title: "Comerciais", subtitle: "Ads & VSL", icon: BrainCircuit, features: ["Animações fluidas", "Narração IA/Humana", "Roteiro profissional", "Alta conversão"] },
  { title: "Institucional", subtitle: "Branding", icon: LayoutTemplate, features: ["Autoridade visual", "Edição limpa", "Storytelling", "Acabamento premium"] },
  { title: "Roteiros", subtitle: "Copywriting", icon: PenTool, features: ["Lógica de vendas", "Ganchos de retenção", "CTAs claros", "Persuasão"] },
  { title: "Consultoria", subtitle: "Express", icon: MessageSquare, features: ["Chamada de 20 min", "Análise de perfil", "Direcionamento", "Sem enrolação"] }
];

const testimonials = [
  { text: "Recebi exatamente o que pedi — direto, claro e profissional.", author: "Ricardo M.", role: "Empresário" },
  { text: "O vídeo aumentou minhas conversões em poucos dias. O roteiro fez toda a diferença.", author: "Ana P.", role: "Mentora de Vendas" },
  { text: "Finalmente alguém que entrega o que promete sem ficar dando voltas.", author: "Carlos E.", role: "Gestor de Tráfego" }
];

const faqs = [
  { q: "Em quanto tempo recebo o vídeo?", a: "O prazo médio é de 2 a 5 dias úteis, dependendo da complexidade do projeto. Prazos de urgência podem ser negociados." },
  { q: "Posso pedir alterações?", a: "Sim. O orçamento inclui uma rodada de ajustes pontuais. Alterações estruturais no roteiro após aprovação serão cobradas à parte." },
  { q: "Que tipo de vídeo você faz?", a: "Foco em vídeos para internet: Reels, TikTok, anúncios (Ads), VSLs curtas e institucionais para redes sociais." },
  { q: "Como funciona o pagamento?", a: "50% no ato da contratação para reserva de agenda e início do roteiro/edição, e 50% na entrega do arquivo final." },
  { q: "Você usa IA no processo?", a: "Sim, utilizo IA de forma estratégica para otimizar roteiros, melhorar qualidade de áudio e criar elementos visuais quando necessário." }
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative flex items-center gap-2 ${
                  currentPage === item.id 
                    ? 'text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {/* Indicador de ativo */}
                {currentPage === item.id && (
                   <motion.div 
                     layoutId="navbar-indicator"
                     className="absolute inset-0 bg-neutral-800 rounded-full border border-neutral-700"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                )}
                
                {/* Conteúdo do botão */}
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
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
            <motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[calc(100vh-80px)]">
              <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                  <FadeIn>
                    <motion.div className="inline-block mb-6 px-4 py-1.5 bg-neutral-900/50 backdrop-blur-md border border-accent-500/30 rounded-full text-xs font-bold tracking-widest text-accent-400 uppercase shadow-lg shadow-accent-500/10 cursor-default">
                      Produção de Vídeo Profissional
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
                      Criação de vídeos para seu negócio <br className="hidden md:block"/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">que entregam resultado.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                      Conteúdo profissional, direto e claro. Feito para engajar, vender e gerar autoridade.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button href={socialLinks.whatsapp}>Solicitar Orçamento</Button>
                      <Button variant="secondary" onClick={() => navigateTo('portfolio')}>Ver Portfólio</Button>
                    </div>
                  </FadeIn>
                </div>
              </section>
              
              {/* Destaque rápido de diferenciais na home */}
              <section className="py-12 border-t border-neutral-900 bg-neutral-950">
                 <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-neutral-500 font-medium text-sm">
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-500"/> Edição Dinâmica</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-500"/> Roteiros Estratégicos</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-500"/> Entrega Rápida</span>
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
                   
                   <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                      <div className="bg-neutral-900 p-8 border border-neutral-800 rounded-sm relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-purple-600"></div>
                        <h3 className="text-2xl font-bold text-white mb-4">Alex Souza</h3>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                          Especialista em criação de conteúdo e edição estratégica. Meu foco é transformar ideias brutas em material visual polido, lógico e rentável.
                        </p>
                        <p className="text-neutral-400 leading-relaxed">
                          Não vendo fórmulas mágicas. Vendo técnica e clareza. Meu estilo é firme e objetivo, focado na qualidade da entrega.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        {[
                          { icon: CheckCircle2, title: "Objetividade", desc: "Direto ao ponto. Economizo seu tempo." },
                          { icon: Clock, title: "Prazos", desc: "Cronograma é compromisso." },
                          { icon: BarChart3, title: "Resultado", desc: "Vídeos estruturados para converter." }
                        ].map((item, i) => (
                          <div key={i} className="bg-neutral-900/50 p-4 border border-neutral-800 rounded-sm flex items-center gap-4">
                            <item.icon className="text-accent-500 w-6 h-6 shrink-0" />
                            <div>
                              <h3 className="text-white font-bold">{item.title}</h3>
                              <p className="text-neutral-500 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Prova Social no Sobre */}
                   <div className="border-t border-neutral-800 pt-16">
                      <h3 className="text-2xl font-bold text-white mb-8 text-center">O que dizem os clientes</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                          <div key={idx} className="bg-neutral-900 p-6 border border-neutral-800 rounded-sm">
                            <p className="text-neutral-400 italic mb-4 text-sm">"{t.text}"</p>
                            <p className="text-white font-bold text-xs">— {t.author}, <span className="text-accent-500">{t.role}</span></p>
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
                      <p className="text-neutral-400 max-w-2xl mx-auto">Soluções completas de audiovisual e texto para elevar o nível do seu negócio.</p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                      {services.map((service, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                          <div className="bg-neutral-900 p-8 h-full border border-neutral-800 hover:border-accent-500 transition-colors rounded-sm group">
                            <service.icon className="w-12 h-12 text-accent-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                            <p className="text-xs font-bold text-accent-500 uppercase tracking-widest mb-6">{service.subtitle}</p>
                            <ul className="space-y-3 border-t border-neutral-800 pt-6">
                              {service.features.map((feat, fIdx) => (
                                <li key={fIdx} className="text-neutral-400 text-sm flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 bg-neutral-600 group-hover:bg-accent-500 rounded-full transition-colors"></span>
                                  {feat}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </FadeIn>
                      ))}
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-sm">
                       <h3 className="text-2xl font-bold text-white mb-8 text-center">Como funciona o processo</h3>
                       <div className="grid md:grid-cols-4 gap-8">
                          {[
                            { title: "Briefing", desc: "Você me envia a ideia." },
                            { title: "Estrutura", desc: "Crio o roteiro e lógica." },
                            { title: "Produção", desc: "Edição, ajustes e IA." },
                            { title: "Entrega", desc: "Arquivo pronto." }
                          ].map((step, idx) => (
                            <div key={idx} className="relative text-center">
                              <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 border border-neutral-700">{idx + 1}</div>
                              <h4 className="text-white font-bold mb-2">{step.title}</h4>
                              <p className="text-neutral-500 text-sm">{step.desc}</p>
                            </div>
                          ))}
                       </div>
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

          {/* --- PÁGINA CONTATO --- */}
          {currentPage === 'contato' && (
             <motion.div key="contato" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="min-h-screen flex flex-col justify-center">
                <section className="py-20 px-4">
                   <div className="max-w-4xl mx-auto">
                      <div className="text-center bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-10 md:p-20 rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                          
                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Vamos tirar seu projeto do papel?
                          </h2>
                          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Entre em contato agora para um orçamento personalizado. Sem compromisso, direto e rápido.
                          </p>
                          
                          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                            <Button href={socialLinks.whatsapp} className="py-5 px-8 text-lg w-full sm:w-auto">
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

                          {/* FAQ no Contato */}
                          <div className="text-left border-t border-neutral-800 pt-10">
                            <h3 className="text-xl font-bold text-white mb-6 text-center">Dúvidas Frequentes</h3>
                            <div className="space-y-4 max-w-2xl mx-auto">
                              {faqs.map((faq, idx) => (
                                <div key={idx} className="border border-neutral-800 bg-neutral-900/50 rounded-sm overflow-hidden">
                                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-800">
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

      {/* FOOTER FIXO (SEMPRE VISÍVEL) */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-8 text-center text-sm text-neutral-600">
         <p>&copy; {new Date().getFullYear()} Alex Souza. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}