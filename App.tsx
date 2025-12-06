import React, { useState } from 'react';
import { 
  Video, Zap, CheckCircle2, Clock, BarChart3, Film, PenTool, 
  MessageSquare, ChevronDown, ChevronUp, BrainCircuit, 
  LayoutTemplate, MessageCircle, Menu, X, Instagram, Youtube, PlayCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioVideos, socialLinks } from './portfolio';

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

const Button = ({ children, variant = 'primary', href, className = '', ...props }: any) => {
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
  return <motion.button whileTap={{ scale: 0.95 }} className={combinedClasses} {...props}>{content}</motion.button>;
};

// Componente isolado de Vídeo - Agora funciona como Link com animação
interface VideoCardProps {
  video: {
    link: string;
    title: string;
    category: string;
  };
  idx: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, idx }) => {
  const videoId = getYoutubeId(video.link);

  if (!videoId) return null;

  // URL da Thumbnail de Alta Qualidade
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <FadeIn delay={idx * 0.1}>
      <motion.a 
        href={video.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden group relative"
        whileHover={{ y: -5, borderColor: '#3b82f6' }}
        transition={{ duration: 0.3 }}
      >
        {/* Área da Capa */}
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
              className="w-16 h-16 bg-accent-600/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm"
              whileHover={{ scale: 1.2, backgroundColor: '#dc2626' }}
            >
              <PlayCircle className="w-8 h-8 text-white fill-white ml-1" />
            </motion.div>
          </div>
        </div>

        {/* Descrição */}
        <div className="p-5 flex items-center justify-between bg-neutral-900 z-10 relative">
          <div>
            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-accent-500 transition-colors">{video.title}</h3>
            <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold mt-1 group-hover:text-neutral-400">{video.category}</p>
          </div>
          <Youtube className="w-6 h-6 text-neutral-600 group-hover:text-red-600 transition-colors" />
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-accent-500 selection:text-white overflow-x-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl tracking-tighter text-white z-50"
          >
            ALEX<span className="text-accent-500">SOUZA</span>
          </motion.div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            {['Sobre', 'Serviços', 'Portfólio', 'Contato'].map((item, i) => (
              <motion.a 
                key={item} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
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

          <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-neutral-950 border-b border-neutral-800 p-4 flex flex-col gap-4 md:hidden shadow-2xl"
            >
              {['Sobre', 'Serviços', 'Portfólio', 'Contato'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  onClick={closeMenu}
                  className="text-lg font-medium text-neutral-300 hover:text-accent-500 py-2 border-b border-neutral-900"
                >
                  {item}
                </a>
              ))}
              <Button href={socialLinks.whatsapp} className="w-full mt-2">Fazer Orçamento</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
          {/* Animated Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }}></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-6 px-4 py-1.5 bg-neutral-900/50 backdrop-blur-md border border-accent-500/30 rounded-full text-xs font-bold tracking-widest text-accent-400 uppercase shadow-lg shadow-accent-500/10 cursor-default"
              >
                Produção de Vídeo Profissional
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Criação de vídeos para seu negócio <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">que entregam resultado.</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Conteúdo profissional, direto e claro. <br/>Feito para engajar, vender e gerar autoridade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href={socialLinks.whatsapp}>Solicitar Orçamento</Button>
                <Button variant="secondary" href="#portfolio">Ver Portfólio</Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="py-24 px-4 bg-neutral-950 relative">
          <div className="absolute left-0 top-20 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl"></div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-accent-500 block shadow-[0_0_15px_rgba(59,130,246,0.5)]"></span>
                Quem é Alex Souza?
              </h2>
              <div className="space-y-4 text-neutral-300 text-lg leading-relaxed">
                <p>Sou especialista em criação de conteúdo e edição estratégica. Transformo ideias brutas em material visual polido, lógico e rentável.</p>
                <p>Não vendo fórmulas mágicas. Vendo técnica e clareza. Meu estilo é firme e objetivo, focado na qualidade da entrega.</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="grid gap-4">
              {[
                { icon: CheckCircle2, title: "Objetividade", desc: "Direto ao ponto. Economizo seu tempo." },
                { icon: Clock, title: "Prazos", desc: "Cronograma é compromisso." },
                { icon: BarChart3, title: "Resultado", desc: "Vídeos estruturados para converter." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 10, borderColor: '#3b82f6', backgroundColor: '#171717' }}
                  className="bg-neutral-900/50 p-6 border border-neutral-800 rounded-sm transition-colors flex items-start gap-4 group"
                >
                  <item.icon className="text-accent-500 w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-white font-bold group-hover:text-accent-400 transition-colors">{item.title}</h3>
                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </FadeIn>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="py-24 px-4 bg-neutral-900 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Serviços Oferecidos</h2>
              <p className="text-neutral-400 mt-2">Soluções completas de audiovisual e texto.</p>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <motion.div 
                    whileHover={{ y: -10, borderColor: '#3b82f6' }}
                    className="bg-neutral-950 p-8 h-full border border-neutral-800 transition-colors rounded-sm group relative"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent-500/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-accent-500/10 transition-colors"></div>
                    <service.icon className="w-10 h-10 text-accent-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                    <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-xs font-bold text-accent-500 uppercase tracking-widest mb-4">{service.subtitle}</p>
                    <ul className="space-y-3">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-neutral-400 text-sm flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-neutral-700 group-hover:bg-accent-500 rounded-full transition-colors"></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="py-20 px-4 bg-neutral-950 border-y border-neutral-900">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-10 text-center">Por que contratar?</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Clareza e profissionalismo absoluto",
                  "Entrega rápida e previsível",
                  "Processo simples e organizado",
                  "Vídeos que realmente engajam",
                  "Uso estratégico de IA para impacto",
                  "Comunicação limpa que funciona"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="flex items-center gap-4 p-4 border-l-2 border-accent-600 rounded-r-sm transition-colors cursor-default"
                  >
                    <CheckCircle2 className="text-accent-500 w-5 h-5 shrink-0" />
                    <span className="text-white font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="py-24 px-4 bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Como funciona o processo</h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Briefing", desc: "Você me envia a ideia ou objetivo." },
                { title: "Estrutura", desc: "Eu crio o roteiro e a lógica." },
                { title: "Produção", desc: "Faço a edição, ajustes e IA." },
                { title: "Entrega", desc: "Vídeo final pronto para postar." }
              ].map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <motion.div 
                    className="relative h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-neutral-850 p-6 pt-12 border border-neutral-800 h-full relative z-10 hover:border-accent-500/50 transition-colors group">
                      <motion.span 
                        className="text-6xl font-black text-neutral-800 absolute top-2 right-4 select-none pointer-events-none group-hover:text-neutral-700 transition-colors"
                        whileHover={{ scale: 1.2, rotate: -10 }}
                      >
                        0{idx + 1}
                      </motion.span>
                      <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-accent-400 transition-colors">{step.title}</h3>
                      <p className="text-neutral-400 relative z-10 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.4} className="text-center mt-12">
              <p className="text-white font-semibold flex items-center justify-center gap-2 bg-neutral-800/50 inline-block px-6 py-2 rounded-full border border-neutral-800">
                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                Zero complicação. Zero perda de tempo.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* PORTFOLIO (YOUTUBE LINK EXTERNO) */}
        <section id="portfolio" className="py-24 px-4 bg-neutral-950">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Portfólio</h2>
              <p className="text-neutral-400 mt-2">Confira meus trabalhos recentes. Clique para assistir no YouTube.</p>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {portfolioVideos.map((video, idx) => (
                <VideoCard key={idx} video={video} idx={idx} />
              ))}
            </div>

            <FadeIn delay={0.4} className="mt-16 flex justify-center gap-4 flex-wrap">
              <Button href={socialLinks.youtube} variant="outline" className="gap-2">
                <PlayCircle className="w-5 h-5" />
                Ver Canal Completo
              </Button>
              <Button href={socialLinks.instagram} variant="outline" className="gap-2">
                <Instagram className="w-5 h-5" />
                Ver Reels no Instagram
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* ORÇAMENTO */}
        <section id="orcamento" className="py-24 px-4 bg-neutral-900">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="text-center bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-10 md:p-16 rounded-sm relative overflow-hidden shadow-2xl group"
              >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none group-hover:bg-accent-600/20 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -ml-16 -mb-16 pointer-events-none group-hover:bg-purple-600/20 transition-colors duration-500"></div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                  Faça um orçamento agora
                </h2>
                <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                  Cada projeto tem uma necessidade única. Entre em contato direto comigo para receber uma proposta alinhada ao seu objetivo, sem burocracia.
                </p>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                  <Button href={socialLinks.whatsapp} className="py-5 px-8 text-lg w-full sm:w-auto shadow-xl shadow-accent-900/30">
                    <span className="flex items-center justify-center gap-3">
                       <MessageCircle className="w-6 h-6" />
                       WhatsApp: (68) 99973-6712
                    </span>
                  </Button>
                  <Button href={socialLinks.instagram} variant="secondary" className="py-5 px-8 text-lg w-full sm:w-auto">
                    <span className="flex items-center justify-center gap-3">
                       <Instagram className="w-6 h-6" />
                       Instagram
                    </span>
                  </Button>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section className="py-20 px-4 bg-neutral-950">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <motion.div 
                  whileHover={{ y: -5, borderColor: '#525252' }}
                  className="bg-neutral-900 p-8 border border-neutral-800 relative h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="text-accent-500 text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                    <p className="text-neutral-300 italic mb-6 relative z-10 pt-4 leading-relaxed">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-neutral-800 pt-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.author}</p>
                      <p className="text-accent-500 text-xs font-semibold uppercase">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-4 bg-neutral-900/50">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-10 text-center">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <motion.div 
                    key={idx} 
                    className="border border-neutral-800 bg-neutral-900 rounded-sm overflow-hidden"
                    whileHover={{ borderColor: '#404040' }}
                  >
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-neutral-800 transition-colors"
                    >
                      <span className="font-bold text-neutral-200">{faq.q}</span>
                      {openFaq === idx ? <ChevronUp className="w-5 h-5 text-accent-500" /> : <ChevronDown className="w-5 h-5 text-neutral-500" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-neutral-900"
                        >
                          <div className="p-5 pt-0 text-neutral-400 border-t border-neutral-800/50">
                            <p className="mt-4 leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contato" className="bg-neutral-950 pt-24 pb-10 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Quer um vídeo para divulgar <br/><span className="text-accent-500">sua empresa ou produto?</span>
            </h2>
            <p className="text-neutral-400 mb-10 text-lg">
              Sem promessas vazias. Trabalho sério para quem quer crescer.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button href={socialLinks.whatsapp} className="py-4 px-10 text-lg shadow-2xl shadow-accent-500/20">
                Solicitar Orçamento <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <div className="mt-20 pt-8 border-t border-neutral-900 text-neutral-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; {new Date().getFullYear()} Alex Souza.</p>
              <div className="flex items-center gap-6">
                 <a href={socialLinks.instagram} target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                   <Instagram className="w-4 h-4" /> Instagram
                 </a>
                 <span className="w-1 h-1 bg-neutral-800 rounded-full"></span>
                 <span>Design Objetivo.</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}