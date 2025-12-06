import React, { useState } from 'react';
import { 
  Video, Zap, CheckCircle2, Clock, BarChart3, Film, PenTool, 
  MessageSquare, ChevronDown, ChevronUp, BrainCircuit, 
  LayoutTemplate, MessageCircle, Menu, X, Instagram, Youtube, PlayCircle
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
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-base font-bold transition-all duration-200 uppercase tracking-wide rounded-sm cursor-pointer";
  const variants = {
    primary: "bg-accent-600 hover:bg-accent-500 text-white shadow-lg shadow-accent-900/20 hover:shadow-accent-900/40 hover:-translate-y-0.5",
    secondary: "bg-white text-neutral-900 hover:bg-neutral-200 hover:-translate-y-0.5",
    outline: "border border-neutral-700 hover:border-accent-500 text-neutral-300 hover:text-white bg-transparent"
  };

  const combinedClasses = `${baseStyles} ${(variants as any)[variant]} ${className}`;

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>{children}</a>;
  }
  return <button className={combinedClasses} {...props}>{children}</button>;
};

// Componente isolado de Vídeo - Agora funciona como Link
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
      <a 
        href={video.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden group hover:border-accent-500 transition-colors"
      >
        {/* Área da Capa */}
        <div className="aspect-video w-full bg-black relative overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
            <div className="w-16 h-16 bg-accent-600/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
              <PlayCircle className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-accent-500 transition-colors">{video.title}</h3>
            <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold mt-1 group-hover:text-neutral-400">{video.category}</p>
          </div>
          <Youtube className="w-6 h-6 text-neutral-600 group-hover:text-red-600 transition-colors" />
        </div>
      </a>
    </FadeIn>
  );
};

// --- DATA ---

const services = [
  { title: "Vídeos Curtos (Reels/TikTok)", icon: Zap, features: ["Edição dinâmica", "Cortes inteligentes", "Headlines fortes", "Música trend"] },
  { title: "Vídeos Comerciais (IA/Híbrido)", icon: BrainCircuit, features: ["Animações fluidas", "Narração IA ou humana", "Roteiro profissional", "Qualidade Ads"] },
  { title: "Vídeos Institucionais", icon: LayoutTemplate, features: ["Foco em autoridade", "Edição limpa", "Storytelling da marca", "Acabamento premium"] },
  { title: "Roteiros Profissionais", icon: PenTool, features: ["Estrutura lógica", "Ganchos de retenção", "CTAs claros", "Copy persuasiva"] },
  { title: "Consultoria Expressa", icon: MessageSquare, features: ["Chamada de 20 min", "Análise de perfil", "Direcionamento", "Sem enrolação"] }
];

const testimonials = [
  { text: "Recebi exatamente o que pedi — direto, claro e profissional.", author: "Ricardo M., Empresário" },
  { text: "O vídeo aumentou minhas conversões em poucos dias. O roteiro fez toda a diferença.", author: "Ana P., Mentora de Vendas" },
  { text: "Finalmente alguém que entrega o que promete sem ficar dando voltas.", author: "Carlos E., Gestor de Tráfego" }
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
          <div className="font-bold text-xl tracking-tighter text-white z-50">
            ALEX<span className="text-accent-500">SOUZA</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            {['Sobre', 'Serviços', 'Portfólio', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
             <a href={socialLinks.instagram} target="_blank" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
             </a>
             <Button variant="primary" className="py-2 px-4 text-xs" href={socialLinks.whatsapp}>Orçamento</Button>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <div className="inline-block mb-6 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-sm text-xs font-bold tracking-widest text-accent-500 uppercase">
                Produção de Vídeo Profissional
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Criação de vídeos para seu negócio <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">que entregam resultado.</span>
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
        <section id="sobre" className="py-24 px-4 bg-neutral-950">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-accent-500 block"></span>
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
                <div key={i} className="bg-neutral-900 p-6 border border-neutral-800 rounded-sm hover:border-accent-500/50 transition-colors flex items-start gap-4">
                  <item.icon className="text-accent-500 w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold">{item.title}</h3>
                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="py-24 px-4 bg-neutral-900/50">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Serviços Oferecidos</h2>
              <p className="text-neutral-400 mt-2">Soluções completas de audiovisual e texto.</p>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="bg-neutral-900 p-8 h-full border border-neutral-800 hover:border-accent-500 transition-all duration-300 rounded-sm group hover:-translate-y-1">
                    <service.icon className="w-10 h-10 text-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <ul className="space-y-3">
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
                  <div key={i} className="flex items-center gap-4 bg-neutral-900/50 p-4 border-l-2 border-accent-600">
                    <CheckCircle2 className="text-accent-500 w-5 h-5 shrink-0" />
                    <span className="text-white font-medium">{item}</span>
                  </div>
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
                  <div className="relative h-full">
                    <div className="bg-neutral-850 p-6 pt-12 border border-neutral-800 h-full relative z-10 hover:bg-neutral-800 transition-colors">
                      <span className="text-6xl font-black text-neutral-800/50 absolute top-2 right-4 select-none pointer-events-none">0{idx + 1}</span>
                      <h3 className="text-xl font-bold text-white mb-2 relative z-10">{step.title}</h3>
                      <p className="text-neutral-400 relative z-10">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.4} className="text-center mt-12">
              <p className="text-white font-semibold flex items-center justify-center gap-2">
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

            <FadeIn delay={0.4} className="mt-12 flex justify-center gap-4 flex-wrap">
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
            <FadeIn className="text-center bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-10 md:p-16 rounded-sm relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                Faça um orçamento agora
              </h2>
              <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                Cada projeto tem uma necessidade única. Entre em contato direto comigo para receber uma proposta alinhada ao seu objetivo, sem burocracia.
              </p>
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button href={socialLinks.whatsapp} className="py-5 px-8 text-lg w-full sm:w-auto">
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
            </FadeIn>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section className="py-20 px-4 bg-neutral-950">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="bg-neutral-900 p-8 border border-neutral-800 relative">
                <div className="text-accent-500 text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                <p className="text-neutral-300 italic mb-6 relative z-10 pt-4 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-3 border-t border-neutral-800 pt-4">
                  <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-xs font-bold text-neutral-500">
                    {t.author.charAt(0)}
                  </div>
                  <p className="text-white font-bold text-sm">{t.author}</p>
                </div>
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
                  <div key={idx} className="border border-neutral-800 bg-neutral-900 rounded-sm overflow-hidden">
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
                          initial={{ height: 0 }} 
                          animate={{ height: "auto" }} 
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-neutral-400 border-t border-neutral-800/50">
                            <p className="mt-4 leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Quer um vídeo para divulgar <br/><span className="text-accent-500">sua empresa ou produto?</span>
            </h2>
            <p className="text-neutral-400 mb-10 text-lg">
              Sem promessas vazias. Trabalho sério para quem quer crescer.
            </p>
            
            <Button href={socialLinks.whatsapp} className="py-4 px-10 text-lg animate-pulse hover:animate-none">
              Solicitar Orçamento
            </Button>

            <div className="mt-20 pt-8 border-t border-neutral-900 text-neutral-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; {new Date().getFullYear()} Alex Souza.</p>
              <div className="flex items-center gap-6">
                 <a href={socialLinks.instagram} target="_blank" className="hover:text-white transition-colors">Instagram</a>
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