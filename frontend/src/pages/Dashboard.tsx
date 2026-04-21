import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Download, AlertCircle, Clock, Eye, HeartPulse, Sparkles, ChevronLeft, Brain } from 'lucide-react';
import Button from '../components/ui/Button';

// SVG Radial Progress Component
const RadialProgress = ({ percentage, color }: { percentage: number, color: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="110" height="110" className="transform -rotate-90">
        <circle cx="55" cy="55" r={radius} stroke="#F1F5F9" strokeWidth="7" fill="transparent" />
        <motion.circle 
          cx="55" cy="55" r={radius} stroke={color} strokeWidth="7" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-gray-900">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

interface SessionData {
  scoreCategory: 'Low' | 'Moderate' | 'Elevated';
  metrics: {
    accuracy: string;
    averageResponseTime: string;
    engagementLevel: 'Low' | 'Moderate' | 'High';
  };
  report: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Determine if we arrived via Demo button or actual session
    const searchParams = new URLSearchParams(location.search);
    const demoMode = searchParams.get('demo') === 'true';
    
    if (demoMode) {
      setIsDemo(true);
      setTimeout(() => {
        setSessionData({
          scoreCategory: 'Moderate',
          metrics: {
            accuracy: '66%',
            averageResponseTime: '3.2s',
            engagementLevel: 'Moderate'
          },
          report: "During the interactive flow, your child successfully engaged with multiple visual prompts with sustained attention. However, there were slight delays in response times during complex emotion recognition tasks. Gaze tracking indicated periodic looks away from the screen, which may suggest a wandering focus."
        });
      }, 800);
    } else if (location.state?.sessionData) {
      // Load real session data passed from SessionFlow
      setTimeout(() => setSessionData(location.state.sessionData), 800);
    } else {
      // Unauthenticated / direct visit without run
      navigate('/');
    }
  }, [location, navigate]);

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
          <Sparkles className="w-8 h-8 text-blue-500" />
        </motion.div>
        <p className="mt-4 text-gray-400 font-medium">Synthesizing insights...</p>
      </div>
    );
  }

  // Calculate parsed integers for the charts
  const rawAccuracyScore = parseInt(sessionData.metrics.accuracy.replace('%', '')) || 0;
  
  // High engagement is good (100%), Low is bad (0%)
  const rawEngagementScore = 
    sessionData.metrics.engagementLevel === 'High' ? 90 
    : sessionData.metrics.engagementLevel === 'Moderate' ? 60 
    : 30;

  // Faster is better (e.g. 1.0s = 90%, 5.0s = 20%)
  const rawRespTime = parseFloat(sessionData.metrics.averageResponseTime.replace('s', '')) || 3.0;
  const rawResponseScore = Math.max(0, Math.min(100, 100 - ((rawRespTime - 1) * 20)));

  const downloadFHIR = () => {
    const fhirJSON = {
      resourceType: "Observation",
      id: `mindloom-obs-${Date.now()}`,
      status: "final",
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "survey", display: "Survey" }] }],
      code: { text: "MindLoom Early Indicator Screening Score" },
      subject: { reference: "Patient/1", display: "Anonymous Child" },
      valueString: `${sessionData.scoreCategory} Risk Indicator`,
      component: [
        { code: { text: "Average Response Time" }, valueQuantity: { value: rawRespTime, unit: "seconds" } },
        { code: { text: "Accuracy" }, valueQuantity: { value: rawAccuracyScore, unit: "%" } }
      ]
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fhirJSON, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `mindloom_fhir_${Date.now()}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const isLow = sessionData.scoreCategory === 'Low';
  const isMod = sessionData.scoreCategory === 'Moderate';
  const colorClass = isLow ? 'text-emerald-600' : isMod ? 'text-amber-600' : 'text-rose-600';
  const bgClass = isLow ? 'bg-gradient-to-br from-emerald-50 to-green-50' : isMod ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : 'bg-gradient-to-br from-rose-50 to-red-50';
  const borderClass = isLow ? 'border-emerald-100' : isMod ? 'border-amber-100' : 'border-rose-100';
  const dotColor = isLow ? '#10B981' : isMod ? '#F59E0B' : '#EF4444';

  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants: Variants = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

  return (
    <div className="min-h-screen bg-[#FAFBFC] font-sans pb-24">
      
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" /> Back
          </button>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-gray-300" />
            <span className="font-bold text-gray-800 text-sm">MindLoom Insights</span>
            {isDemo && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Demo Mode</span>}
          </div>
          <div className="w-[60px]" />
        </div>
      </nav>

      <motion.div 
        variants={containerVariants} initial="hidden" animate="visible"
        className="max-w-6xl mx-auto px-6 pt-28 lg:pt-32"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Session Results</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">Here's what we learned.</h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            We've synthesized the raw interactions into a clear behavioral profile to guide your next steps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Col */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Risk Badge */}
            <motion.div variants={itemVariants} className={`p-7 lg:p-8 rounded-[2rem] border ${borderClass} ${bgClass} flex items-center justify-between`}>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Overall Indicator</p>
                <h2 className={`text-3xl lg:text-4xl font-black ${colorClass}`}>{sessionData.scoreCategory} Risk</h2>
              </div>
              <div className="relative">
                <div className="absolute inset-0 blur-xl rounded-full" style={{ backgroundColor: dotColor, opacity: 0.2 }} />
                <HeartPulse className={`relative w-14 h-14 ${colorClass} opacity-70`} strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* AI Report */}
            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-7 lg:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 z-0" />
               <div className="relative z-10">
                 <div className="flex items-center mb-5">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                     <Sparkles className="w-4 h-4 text-blue-500" />
                   </div>
                   <h3 className="text-base font-bold text-gray-900">AI Synthesis Report</h3>
                 </div>
                 <p className="text-gray-600 text-[0.95rem] lg:text-base leading-[1.8]">
                   {sessionData.report}
                 </p>
               </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div variants={itemVariants} className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 mr-3" />
              <p className="text-sm text-amber-800/80 font-medium leading-relaxed">
                <strong>Disclaimer:</strong> This is a support tool, not a medical device. Please consult a qualified healthcare professional.
              </p>
            </motion.div>
          </div>

          {/* Right Col: Visual Data */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Accuracy Radial */}
            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-between">
              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Emotion Accuracy</h4>
                 <p className="text-3xl font-black text-gray-900">{sessionData.metrics.accuracy}</p>
                 <p className="text-sm text-gray-400 mt-1">Identified correctly</p>
              </div>
              <RadialProgress percentage={rawAccuracyScore} color="#3B82F6" />
            </motion.div>

            {/* Engagement */}
            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="flex justify-between items-end mb-5">
                 <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Visual Engagement</h4>
                    <p className="text-3xl font-black text-gray-900">{sessionData.metrics.engagementLevel}</p>
                 </div>
                 <Eye className="w-7 h-7 text-indigo-300 mb-1" />
              </div>
              <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }} animate={{ width: `${rawEngagementScore}%` }}
                   transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full"
                 />
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                 <span>Wandering</span>
                 <span className="text-indigo-600">{rawEngagementScore}%</span>
                 <span>Focused</span>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="flex justify-between items-end mb-5">
                 <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Response Latency</h4>
                    <p className="text-3xl font-black text-gray-900">{sessionData.metrics.averageResponseTime}</p>
                 </div>
                 <Clock className="w-7 h-7 text-amber-300 mb-1" />
              </div>
              
              <div className="relative h-3 w-full bg-gradient-to-r from-emerald-100 via-amber-100 to-rose-100 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ left: '0%', opacity: 0 }}
                  animate={{ left: `${100 - rawResponseScore}%`, opacity: 1 }} // invert so slow is on right
                  transition={{ duration: 1.2, type: "spring", stiffness: 100, delay: 0.6 }}
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-[3px] border-amber-500 rounded-full shadow-md -translate-x-1/2"
                />
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                 <span>Fast</span>
                 <span>Average</span>
                 <span>Slow</span>
              </div>
            </motion.div>

            {/* FHIR Export */}
            <motion.div variants={itemVariants}>
              <Button onClick={downloadFHIR} className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 shadow-xl shadow-gray-900/10 text-base flex items-center justify-center text-white font-bold border-none">
                <Download className="w-5 h-5 mr-3" />
                Export FHIR Medical Record
              </Button>
              <p className="text-center text-xs text-gray-400 font-medium mt-3">
                Standardized JSON for pediatric EHR interoperability.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
