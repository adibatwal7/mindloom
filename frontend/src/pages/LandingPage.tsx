import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Shield, PlayCircle, Activity, Brain, Clock,
  Heart, CameraOff, Sparkles, ShieldCheck,
  Smile, LineChart, ArrowRight, Lock, UserCheck,
  AlertCircle, Menu, X, ChevronDown, Quote,
  Star, CheckCircle, Zap, Users,
} from 'lucide-react';
import Button from '../components/ui/Button';

const ease = [0.16, 1, 0.3, 1] as const;

const FadeIn = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [consentGiven, setConsentGiven] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const videoScale  = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleStart = () => {
    if (consentGiven) {
      window.scrollTo(0, 0);
      navigate('/session');
    } else {
      document.getElementById('consent-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemo = () => {
    window.scrollTo(0, 0);
    navigate('/dashboard?demo=true');
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-primaryText font-sans overflow-x-hidden">

      {/* ════════════════════════ NAVBAR ════════════════════════ */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/88 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_1px_0_rgba(0,0,0,0.03)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-indigo-400/30 blur-md" />
                <img src="/assets/logo.png" alt="MindLoom" className="relative h-10 w-10 object-contain rounded-xl" />
              </div>
              <span className={`font-bold text-xl tracking-tight font-display transition-colors duration-500 ${
                scrolled ? 'text-primaryText' : 'text-white'
              }`}>
                MindLoom
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:flex items-center space-x-1"
            >
              {[
                { label: 'How It Works', id: 'how-it-works' },
                { label: 'For Parents',  id: 'testimonials' },
                { label: 'Privacy',      id: 'privacy' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-slate-600 hover:text-primaryText hover:bg-indigo-50'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex items-center space-x-3"
            >
              <button
                onClick={handleDemo}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  scrolled ? 'text-slate-600 hover:text-primaryText' : 'text-white/80 hover:text-white'
                }`}
              >
                View Demo
              </button>
              <Button
                size="sm"
                onClick={() => scrollTo('consent-section')}
                className={`rounded-full px-6 text-sm font-semibold transition-all duration-500 ${
                  scrolled
                    ? 'bg-primary text-white shadow-lg shadow-indigo-900/15 hover:bg-primary-deep'
                    : 'bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/25 text-white'
                }`}
              >
                Start Session
              </Button>
            </motion.div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-xl"
            >
              <div className="px-6 py-6 space-y-1">
                {[
                  { label: 'How It Works', id: 'how-it-works' },
                  { label: 'For Parents',  id: 'testimonials' },
                  { label: 'Privacy',      id: 'privacy' },
                ].map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Button size="md" variant="ghost" onClick={handleDemo} className="w-full rounded-2xl text-slate-700 hover:bg-slate-50">View Demo</Button>
                  <Button size="md" onClick={() => scrollTo('consent-section')} className="w-full rounded-2xl bg-primary text-white shadow-md">Start Session</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] w-full flex flex-col justify-center overflow-hidden"
      >
        {/* Video with parallax scale */}
        <motion.div className="absolute inset-0 z-0 origin-center" style={{ scale: videoScale }}>
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Deep midnight navy → indigo overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0D1B3E]/70 via-[#1A1040]/50 to-[#0D1B3E]/75" />

        {/* Ambient orbs — blue + violet */}
        <motion.div
          animate={{ y: [0, -28, 0], opacity: [0.2, 0.45, 0.2], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[8%] w-[36vw] h-[36vw] min-w-[280px] min-h-[280px] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none z-[2]"
        />
        <motion.div
          animate={{ y: [0, 36, 0], opacity: [0.15, 0.38, 0.15], scale: [1, 1.18, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-1/4 right-[8%] w-[42vw] h-[42vw] min-w-[340px] min-h-[340px] rounded-full bg-violet-600/[0.18] blur-[150px] pointer-events-none z-[2]"
        />

        {/* Content fades out on scroll */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-10"
          >
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/[0.09] backdrop-blur-2xl border border-white/[0.15] text-blue-200 font-medium text-sm tracking-wide shadow-[0_0_30px_rgba(99,102,241,0.22)]">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-300" />
              AI-Powered Early Behavioral Insights
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white tracking-[-0.04em] leading-[1.06] mb-8 font-display"
          >
            Earlier Understanding.
            <br />
            <span className="text-gradient-hero">Brighter Futures.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-300/90 font-medium leading-relaxed mb-14"
          >
            Gentle AI observation that helps parents understand early behavioral
            patterns — before the waiting rooms begin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Button
              size="xl"
              onClick={() => scrollTo('consent-section')}
              className="w-full sm:w-auto rounded-full bg-white text-primaryText hover:bg-indigo-50 shadow-[0_8px_30px_rgba(255,255,255,0.2)] text-lg px-10 font-bold transition-all duration-300"
            >
              Start Free Session
              <ArrowRight className="ml-2.5 w-5 h-5" />
            </Button>
            <Button
              size="xl" variant="ghost"
              onClick={handleDemo}
              className="w-full sm:w-auto rounded-full bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-2xl border border-white/[0.18] text-white text-lg px-10 transition-all duration-300 shadow-none"
            >
              <PlayCircle className="mr-2.5 w-5 h-5 text-indigo-300" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-14 text-sm text-slate-400/80 font-medium flex items-center justify-center gap-5 flex-wrap"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 opacity-60" />100% private
            </span>
            <span className="text-white/20">&middot;</span>
            <span>On-device analysis</span>
            <span className="text-white/20">&middot;</span>
            <span>No video stored</span>
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-white/25" />
        </motion.div>
      </section>

      {/* ═══════════════════ PROBLEM — soft blue wash ══════════════════ */}
      <section className="py-28 lg:py-40 bg-mist relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.07),transparent_60%),radial-gradient(circle_at_80%_50%,rgba(124,92,228,0.05),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-indigo-500 font-semibold text-xs uppercase tracking-[0.2em] mb-5">The Reality</p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primaryText mb-6 tracking-[-0.03em] leading-[1.1] font-display">
              Why the early years
              <br />
              <span className="text-gradient-blue">can't afford to wait.</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              The window for early intervention is narrow. Most parents don't
              realize how much time has passed until diagnosis day.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              { icon: Activity, stat: '1 in 36',    desc: 'Children are diagnosed with Autism Spectrum Disorder in the US today.', from: 'from-indigo-50', to: 'to-blue-50/60',   icon_c: 'text-indigo-500', border: 'border-indigo-100/60' },
              { icon: Clock,    stat: '4.5 yrs',    desc: 'Average age at formal ASD diagnosis — years of vital development lost.', from: 'from-violet-50', to: 'to-purple-50/60', icon_c: 'text-violet-500', border: 'border-violet-100/60' },
              { icon: Heart,    stat: '2× Better',  desc: 'Outcomes when evidence-based support begins before age 3.',              from: 'from-blue-50',   to: 'to-sky-50/60',    icon_c: 'text-blue-500',   border: 'border-blue-100/60' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -7, boxShadow: '0 24px 50px -12px rgba(99,102,241,0.14)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className={`bg-gradient-to-br ${card.from} ${card.to} p-8 lg:p-10 rounded-[2.5rem] flex flex-col items-center text-center h-full border ${card.border} shadow-[0_4px_24px_rgba(0,0,0,0.04)]`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 ${card.icon_c}`}>
                    <card.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-primaryText mb-4 tracking-[-0.04em] font-display">{card.stat}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Timeline */}
          <FadeIn delay={0.4} className="max-w-2xl mx-auto mt-20">
            <div className="relative py-6">
              <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-blue-200 -translate-y-1/2 hidden sm:block" />
              <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
                {[
                  { dot: 'bg-indigo-500', ring: 'ring-indigo-500/15', label: 'Age 18–24m', sub: 'Early signs appear' },
                  { dot: 'bg-violet-500', ring: 'ring-violet-500/15', label: 'The Gap',     sub: '2–3 years lost' },
                  { dot: 'bg-blue-500',   ring: 'ring-blue-500/15',   label: 'Age 4–5',     sub: 'Formal diagnosis' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-5 h-5 ${item.dot} rounded-full mb-4 ring-8 ${item.ring} shadow-md`} />
                    <span className="font-bold text-primaryText font-display">{item.label}</span>
                    <span className="text-sm text-slate-500 mt-1 font-medium">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ EMPATHY QUOTE — emotional pivot ══════════════ */}
      <section className="py-24 lg:py-36 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <Quote className="w-10 h-10 text-indigo-200 mx-auto mb-10" />
            <blockquote className="text-2xl md:text-3xl lg:text-[2.1rem] font-semibold text-primaryText leading-[1.45] tracking-[-0.025em] mb-10 text-balance font-display">
              &ldquo;You sense something is different. But there&apos;s an 8-month
              waitlist, and every day feels like a missed window you&apos;ll never
              get back.&rdquo;
            </blockquote>
            <p className="text-slate-400 font-medium text-xs uppercase tracking-[0.2em]">
              What parents tell us, every day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ SOLUTION — lavender wash ══════════════ */}
      <section
        id="how-it-works"
        className="py-28 lg:py-40 bg-petal relative scroll-mt-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,108,228,0.1),transparent_55%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-violet-500 font-semibold text-xs uppercase tracking-[0.2em] mb-5">How It Works</p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primaryText mb-6 tracking-[-0.03em] font-display">
              Three gentle steps.
              <br />
              Real insight.
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Designed to feel like play. Built on clinical-grade observation.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[4.5rem] left-[22%] right-[22%] h-px bg-gradient-to-r from-indigo-200/60 via-violet-200/80 to-blue-200/60 z-0" />
            {[
              { icon: Smile,     title: 'A Playful Game',         desc: 'Your child plays a 2-minute, fullscreen emotion recognition game — joyful, zero pressure.',                      color: 'text-indigo-500', step_bg: 'bg-indigo-500', step: '01' },
              { icon: Brain,     title: 'Silent AI Observation',  desc: 'Clinical-grade AI runs 100% on your device, gently analyzing gaze and social attention.',                       color: 'text-violet-500', step_bg: 'bg-violet-500', step: '02' },
              { icon: LineChart, title: 'Your Clarity Report',    desc: 'Receive a warm, structured report with behavioral indicators to share with your pediatrician.',               color: 'text-blue-500',   step_bg: 'bg-blue-500',   step: '03' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="group relative z-10 flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 bg-white rounded-[2rem] flex items-center justify-center mb-10 shadow-[0_8px_24px_rgba(99,102,241,0.1)] group-hover:shadow-[0_24px_48px_rgba(99,102,241,0.18)] border border-slate-100/80 group-hover:-translate-y-4 transition-all duration-500">
                    <card.icon className={`w-12 h-12 ${card.color} group-hover:scale-110 transition-transform duration-500`} />
                    <div className={`absolute -top-4 -right-4 w-10 h-10 rounded-2xl ${card.step_bg} text-white text-sm font-black flex items-center justify-center shadow-lg`}>
                      {card.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primaryText mb-3 tracking-tight font-display">{card.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════ METRICS STRIP ══════════════════════ */}
      <section className="py-16 bg-white border-y border-slate-100/80">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {[
                { value: '2 min',    label: 'Session length',   icon: Clock },
                { value: '100%',     label: 'On-device AI',     icon: Shield },
                { value: '0 bytes',  label: 'Data ever stored', icon: CameraOff },
                { value: 'Clinical', label: 'Grade accuracy',   icon: Zap },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                    <m.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="text-3xl font-black text-primaryText tracking-tight mb-1 font-display">{m.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═════════════════ TESTIMONIALS ═══════════════════════ */}
      <section
        id="testimonials"
        className="py-28 lg:py-40 bg-mist relative overflow-hidden scroll-mt-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-violet-100/50 to-transparent blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-indigo-500 font-semibold text-xs uppercase tracking-[0.2em] mb-5">For Parents</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primaryText tracking-[-0.03em] font-display">
              Parents who took
              <br />
              the first step.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              { quote: "I'd been worried about Liam's eye contact for months. MindLoom gave me the confidence to have a real conversation with our pediatrician. It felt like someone finally heard me.",
                name: 'Sarah M.', role: 'Parent of Liam, 3 · Austin, TX', initial: 'S', gradient: 'from-indigo-400 to-blue-500' },
              { quote: "As someone who works in healthcare, I was skeptical. But the on-device privacy model and quality of the behavioral report genuinely impressed me. Thoughtful technology.",
                name: 'Dr. Michael R.', role: 'Pediatrician & Father · Boston, MA', initial: 'M', gradient: 'from-violet-400 to-indigo-500' },
              { quote: "My daughter loved the game — she had no idea she was being observed. The report helped us get a referral 6 months earlier than we would have otherwise.",
                name: 'Jennifer K.', role: 'Mother of Emma, 4 · San Francisco, CA', initial: 'J', gradient: 'from-blue-400 to-violet-500' },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -7, boxShadow: '0 24px 50px -12px rgba(99,102,241,0.13)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className="glass-card rounded-[2rem] p-8 h-full flex flex-col"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed font-medium text-[0.95rem] flex-grow mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-bold text-primaryText text-sm font-display">{t.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 text-sm text-slate-500 font-medium">
              <Users className="w-4 h-4 text-indigo-400" />
              Joined by hundreds of families across the US
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═════════════════ PRODUCT PREVIEW ════════════════════ */}
      <section id="preview" className="py-28 lg:py-40 bg-white overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-24">
            <p className="text-violet-500 font-semibold text-xs uppercase tracking-[0.2em] mb-5">Product Preview</p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primaryText tracking-[-0.03em] font-display">
              Built for your child.
              <br />
              <span className="text-gradient-blue">Designed for your clarity.</span>
            </h2>
          </FadeIn>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-14">
            {/* Child screen */}
            <FadeIn delay={0.15} className="w-full lg:w-5/12">
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-gradient-to-br from-indigo-50/90 to-violet-50/80 rounded-[3rem] p-10 relative overflow-hidden h-full min-h-[360px] flex flex-col items-center justify-center border border-indigo-100/60 shadow-[0_8px_40px_rgba(99,102,241,0.09)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_55%)] pointer-events-none" />
                <div className="absolute top-6 left-8 right-8 h-2 bg-indigo-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '66%' }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.5 }} className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full" />
                </div>
                <h4 className="relative z-10 text-2xl lg:text-3xl font-black text-primaryText mb-12 mt-8 tracking-tight font-display">Identify the Emotion</h4>
                <div className="relative z-10 flex gap-5 lg:gap-6">
                  {[false, true, false].map((active, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className={`${
                        active
                          ? 'w-24 h-24 border-4 border-indigo-200 shadow-[0_16px_40px_rgba(99,102,241,0.22)] bg-white text-indigo-500'
                          : 'w-20 h-20 bg-white/70 text-slate-300 border border-white/80'
                      } rounded-[2rem] flex items-center justify-center cursor-pointer transition-all duration-300`}
                    >
                      <Smile className={active ? 'w-12 h-12' : 'w-10 h-10'} />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 bg-indigo-950/[0.06] backdrop-blur-md rounded-full px-3 py-1.5 flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Observing</span>
                </div>
              </motion.div>
              <p className="text-center mt-5 text-slate-400 font-medium text-sm">Child Interface — Joyful, distraction-free</p>
            </FadeIn>

            {/* Dashboard */}
            <FadeIn delay={0.3} className="w-full lg:w-7/12">
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 lg:p-10 h-full min-h-[360px] flex flex-col border border-slate-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.06)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-[1rem] bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Brain className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-primaryText font-display">Insights Overview</span>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-100">Nominal</div>
                </div>
                <div className="relative z-10 grid grid-cols-2 gap-5 flex-grow">
                  <div className="bg-slate-50/80 rounded-3xl p-6 flex flex-col justify-center gap-4 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Engagement</span>
                      <Activity className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3 }} className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full" />
                    </div>
                    <div className="text-indigo-600 font-black text-sm">HIGH — 85%</div>
                  </div>
                  <div className="bg-indigo-50/80 rounded-3xl p-6 flex flex-col relative overflow-hidden border border-indigo-100/50">
                    <h5 className="text-xs font-bold text-indigo-700 mb-3 uppercase tracking-widest">AI Synthesis</h5>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium flex-grow">
                      &ldquo;Strong mutual engagement observed. Accurate emotion recognition across basic schemas with nominal response latency averaging 1.2s.&rdquo;
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-indigo-50/80 to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
              <p className="text-center mt-6 text-slate-500 font-medium text-sm">Parent Dashboard — Empathetic insights, premium delivery</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════ TRUST + PRIVACY + CONSENT — midnight ════════ */}
      <section
        id="privacy"
        className="py-28 lg:py-40 bg-[#0D1424] text-white relative overflow-hidden scroll-mt-20"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/[0.09] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/[0.07] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <FadeIn>
            <p className="text-indigo-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">Security &amp; Trust</p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 tracking-[-0.04em] text-white leading-[1.1] font-display">
              Privacy isn&apos;t a feature.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                It&apos;s the foundation.
              </span>
            </h2>
            <p className="text-slate-400 text-xl font-medium mb-14 leading-relaxed">
              Your child&apos;s data is sacred. Every line of MindLoom is written so
              sensitive biometric information never leaves your device.
            </p>
            <div className="space-y-7">
              {[
                { icon: CameraOff,  title: 'Zero Video Storage', desc: 'Camera feeds process in-memory and are discarded instantly. Nothing is ever recorded.',      bg: 'bg-indigo-500/[0.08]', border: 'border-indigo-500/15', icon_c: 'text-indigo-400' },
                { icon: ShieldCheck,title: 'Fully On-Device',    desc: 'AI models run entirely within your browser via WebGL and WASM — no cloud uploads.',           bg: 'bg-violet-500/[0.08]', border: 'border-violet-500/15', icon_c: 'text-violet-400' },
                { icon: AlertCircle,title: 'Not a Diagnosis',    desc: 'MindLoom surfaces behavioral indicators to support conversations with your care team.',       bg: 'bg-blue-500/[0.08]',   border: 'border-blue-500/15',   icon_c: 'text-blue-400' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6 }}
                  className="flex items-start group cursor-default transition-transform duration-300"
                >
                  <div className={`w-[52px] h-[52px] shrink-0 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mr-6 group-hover:brightness-125 transition-all`}>
                    <item.icon className={`w-5 h-5 ${item.icon_c}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1.5 font-display">{item.title}</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-600/[0.12] to-violet-600/[0.12] blur-[80px] rounded-[4rem]" />
            <div className="glass-dark p-10 lg:p-12 rounded-[3.5rem] relative">
              <div className="flex items-center justify-center mb-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/25 blur-2xl rounded-full" />
                  <Shield className="relative w-20 h-20 text-indigo-400" strokeWidth={1.5} />
                </div>
              </div>

              <div id="consent-section" className="scroll-mt-32">
                <h3 className="text-3xl font-extrabold mb-2 text-center text-white tracking-[-0.03em] font-display">
                  Begin Your Session
                </h3>
                <p className="text-slate-400 font-medium text-center mb-10">
                  All processing is strictly on-device.
                </p>

                <label className="flex items-start space-x-4 mb-10 cursor-pointer group bg-slate-800/50 p-6 rounded-3xl border border-slate-700/40 hover:bg-slate-800/70 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input type="checkbox" className="peer sr-only" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} />
                    <div className="w-6 h-6 border-2 border-slate-500 group-hover:border-indigo-400 rounded-lg peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all flex items-center justify-center">
                      <motion.svg
                        initial={false}
                        animate={{ opacity: consentGiven ? 1 : 0, scale: consentGiven ? 1 : 0.5 }}
                        className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>
                  </div>
                  <span className="text-base font-medium text-slate-300 leading-relaxed">
                    I understand MindLoom is an early support tool, not a clinical diagnosis.
                    I consent to on-device behavioral metric analysis.
                  </span>
                </label>

                <AnimatePresence>
                  {consentGiven && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        size="lg"
                        onClick={handleStart}
                        className="w-full text-lg font-bold rounded-2xl py-5 bg-indigo-500 hover:bg-indigo-600 shadow-[0_0_40px_rgba(99,102,241,0.35)] text-white hover:scale-[1.02] transition-all duration-300 border-none"
                      >
                        <UserCheck className="w-5 h-5 mr-3" />
                        Enter Secure Session
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!consentGiven && (
                  <div className="w-full py-5 rounded-2xl bg-slate-800/60 border border-slate-700/40 text-slate-500 text-base font-semibold flex items-center justify-center gap-3">
                    <Lock className="w-4 h-4 opacity-60" />
                    Confirm consent above to continue
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ FINAL CTA ════════════════════════ */}
      <section className="py-36 lg:py-52 text-center relative overflow-hidden bg-gradient-to-b from-white via-mist to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.07),transparent_68%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

        <FadeIn className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-indigo-500 font-semibold text-xs uppercase tracking-[0.2em] mb-7">Take the First Step</p>
          <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-primaryText mb-8 tracking-[-0.04em] leading-[1.1] text-balance font-display">
            Two minutes.
            <br />A lifetime of difference.
          </h2>
          <p className="text-xl text-slate-500 mb-14 leading-relaxed font-medium max-w-xl mx-auto">
            Take the first step toward understanding your child better — private,
            pressure-free, and always free.
          </p>
          <Button
            size="xl"
            onClick={() => scrollTo('consent-section')}
            className="rounded-full bg-primary hover:bg-primary-deep text-white shadow-xl shadow-indigo-900/20 px-14 text-xl font-bold border-none transition-all duration-300 hover:scale-[1.02]"
          >
            Start Secure Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>

          <div className="mt-12 flex items-center justify-center gap-7 text-sm text-slate-400 flex-wrap">
            {['Free, always', 'No sign-up needed', 'Zero data stored'].map((label) => (
              <span key={label} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════ FOOTER ════════════════════════ */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2.5">
              <img src="/assets/logo.png" alt="MindLoom" className="h-7 w-7 object-contain rounded-lg opacity-50" />
              <span className="text-sm font-semibold text-slate-400 font-display">MindLoom</span>
            </div>
            <p className="text-sm text-slate-400 text-center">Built with care for parents. Designed for children.</p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>© {new Date().getFullYear()} MindLoom</span>
              <span className="text-slate-200">&middot;</span>
              <button onClick={() => scrollTo('privacy')} className="hover:text-slate-600 transition-colors">Privacy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
