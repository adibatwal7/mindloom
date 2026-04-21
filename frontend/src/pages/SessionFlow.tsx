import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFaceMesh } from '../hooks/useFaceMesh';
import { cn } from '../components/ui/Button';

const QUESTIONS = [
  { id: 1, prompt: 'Which face is HAPPY?', options: [{ id: 'sad', emoji: '😢', correct: false }, { id: 'happy', emoji: '😊', correct: true }, { id: 'neutral', emoji: '😐', correct: false }], timeLimit: 10 },
  { id: 2, prompt: 'Which face is SAD?', options: [{ id: 'neutral', emoji: '😐', correct: false }, { id: 'sad', emoji: '😢', correct: true }, { id: 'happy', emoji: '😊', correct: false }], timeLimit: 10 },
  { id: 3, prompt: 'Tap the shining STAR!', options: [{ id: 'moon', emoji: '🌙', correct: false }, { id: 'star', emoji: '⭐', correct: true }, { id: 'cloud', emoji: '☁️', correct: false }], timeLimit: 8 }
];

const Sunburst = () => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-300 overflow-hidden"
  >
    {/* Rays */}
    <motion.div 
      animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 bg-white/20 rounded-full origin-bottom"
          style={{ rotate: `${i * 22.5}deg`, height: '50vh', bottom: '50%' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1] }}
          transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.02 }}
        />
      ))}
    </motion.div>
    
    <motion.div 
      initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} 
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="relative text-[10rem] md:text-[14rem] drop-shadow-2xl z-10"
    >
      ☀️
    </motion.div>
    
    <motion.h2 
      initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      className="relative text-white text-5xl md:text-7xl font-black drop-shadow-xl tracking-tight z-10 mt-4"
    >
      Amazing!
    </motion.h2>
  </motion.div>
);

const SessionFlow = () => {
  const navigate = useNavigate();
  const { videoRef, engagementScore } = useFaceMesh();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTIONS[0].timeLimit);
  const [showReward, setShowReward] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [metrics, setMetrics] = useState({ correctAnswers: 0, totalResponseTime: 0 });
  const [startTime, setStartTime] = useState<number>(Date.now());

  const currentQuestion = QUESTIONS[currentStep];

  useEffect(() => {
    setStartTime(Date.now());
    setTimeLeft(QUESTIONS[currentStep].timeLimit);
  }, [currentStep]);

  useEffect(() => {
    if (showReward) return;
    if (timeLeft <= 0) { handleNext(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showReward]);

  const handleNext = async () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch('/_/backend/api/sessions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metrics, engagementScore, totalTime: Date.now() - startTime })
        });
        
        if (!response.ok) {
           throw new Error(`Backend error: ${response.status}`);
        }
        
        const data = await response.json();
        navigate('/dashboard', { state: { sessionData: data.data } });
      } catch (e) { 
        console.error("Backend connection failed. Using fallback data.", e); 
        
        // Fallback if backend is down so the test isn't lost
        const fallbackData = {
          scoreCategory: metrics.correctAnswers < 2 || engagementScore < 30 ? 'Elevated' : (metrics.correctAnswers < 3 || engagementScore < 60 ? 'Moderate' : 'Low'),
          metrics: {
            accuracy: `${Math.round((metrics.correctAnswers / 3) * 100)}%`,
            averageResponseTime: `${(metrics.totalResponseTime / 3).toFixed(1)}s`,
            engagementLevel: engagementScore > 70 ? 'High' : (engagementScore > 30 ? 'Moderate' : 'Low')
          },
          report: "The session indicates expected response times and engagement level. (Note: Fallback analysis generated locally due to backend connection issue.)"
        };
        navigate('/dashboard', { state: { sessionData: fallbackData } });
      }
    }
  };

  const handleSelect = (option: { id: string; emoji: string; correct: boolean }) => {
    if (showReward || isSubmitting) return;
    if (option.correct) {
      const respTime = (Date.now() - startTime) / 1000;
      setMetrics(prev => ({ correctAnswers: prev.correctAnswers + 1, totalResponseTime: prev.totalResponseTime + respTime }));
      setShowReward(true);
      setTimeout(() => { setShowReward(false); handleNext(); }, 2200);
    } else {
      setShakeId(option.id);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const progressPercentage = ((currentStep) / QUESTIONS.length) * 100;
  const timePercentage = (timeLeft / currentQuestion.timeLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-white to-[#FEF9C3] flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* Ambient Blobs */}
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 18, repeat: Infinity }} className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none z-0" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 22, repeat: Infinity }} className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-amber-200/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Loom-style PIP Camera Widget */}
      <motion.div 
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.1}
        dragMomentum={false}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50 group cursor-grab active:cursor-grabbing"
      >
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-4 border-white bg-slate-100 flex items-center justify-center">
          <video 
            ref={videoRef} 
            className="absolute inset-0 w-full h-full object-cover scale-[1.2] -scale-x-100" // Mirror effect
            muted 
            playsInline 
            autoPlay
          />
          {/* Tracking Status indicator over video */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
            <span className="text-[9px] font-bold text-white uppercase tracking-wider">Tracking</span>
          </div>
        </div>
      </motion.div>

      {/* Exit Button */}
      <button onClick={() => navigate('/dashboard')} className="absolute top-5 left-5 p-2.5 rounded-xl bg-white/60 backdrop-blur-xl text-gray-400 hover:text-gray-800 hover:bg-white shadow-sm transition-all z-40 border border-white/50">
        <X className="w-5 h-5" />
      </button>

      {/* Global Progress Bar */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 w-48 z-40">
        <div className="h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-blue-400 rounded-full"
          />
        </div>
        <p className="text-center text-[10px] text-gray-400 font-bold mt-1.5 uppercase tracking-wider">
          {currentStep + 1} of {QUESTIONS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {showReward ? (
          <Sunburst key="reward" />
        ) : (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96, filter: "blur(8px)" }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            className="w-full max-w-3xl flex flex-col items-center z-10"
          >
            {/* Time Bar */}
            <div className="w-48 h-1 bg-gray-200/50 rounded-full overflow-hidden mb-14">
              <motion.div 
                className={`h-full rounded-full ${timePercentage > 30 ? 'bg-gray-300' : 'bg-red-400'}`}
                initial={{ width: '100%' }}
                animate={{ width: `${timePercentage}%` }}
                transition={{ duration: 1, ease: 'linear' }}
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 mb-16 text-center tracking-tight leading-tight px-4">
              {currentQuestion.prompt}
            </h1>

            <div className="flex flex-wrap justify-center gap-5 md:gap-8 w-full">
              {currentQuestion.options.map((option, i) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={shakeId === option.id 
                    ? { opacity: 1, y: 0, x: [-12, 12, -12, 12, 0] } 
                    : { opacity: 1, y: 0, x: 0 }
                  }
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 250, damping: 20 }}
                  whileHover={{ scale: 1.06, y: -8, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.12)" }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-32 h-32 md:w-48 md:h-48 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border-[3px] border-white flex items-center justify-center text-6xl md:text-8xl cursor-pointer touch-manipulation transition-colors",
                    shakeId === option.id && "border-red-200 bg-red-50/50"
                  )}
                >
                  {option.emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SessionFlow;
