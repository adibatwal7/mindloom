import { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export const useFaceMesh = () => {
  const [isReady, setIsReady] = useState(false);
  const [engagementScore, setEngagementScore] = useState(50);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let faceLandmarker: FaceLandmarker;
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    let isUnmounted = false;

    const setupCamera = async () => {
      try {
        const _stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        stream = _stream;
        
        if (isUnmounted) {
          _stream.getTracks().forEach(track => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = _stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
      }
    };

    const loadModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
      });
      setIsReady(true);
    };

    let trackedFrames = 0;
    let totalFrames = 0;

    const detectFaces = async () => {
      if (videoRef.current && videoRef.current.readyState >= 2 && faceLandmarker) {
        const results = faceLandmarker.detectForVideo(videoRef.current, performance.now());
        totalFrames++;
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          trackedFrames++;
        }
        
        // Update state periodically to reflect average session engagement
        if (totalFrames > 0 && totalFrames % 15 === 0) {
          setEngagementScore(Math.round((trackedFrames / totalFrames) * 100));
        }
      }
      animationFrameId = requestAnimationFrame(detectFaces);
    };

    const init = async () => {
      await loadModel();
      await setupCamera();
      detectFaces();
    };

    init();

    return () => {
      isUnmounted = true;
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const srcObj = videoRef.current.srcObject as MediaStream;
        srcObj.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return { videoRef, isReady, engagementScore };
};
