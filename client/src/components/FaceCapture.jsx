import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [modelLoadingStatus, setModelLoadingStatus] = useState("Loading face models...");

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      try {
        // Make sure this path is correct relative to your public directory
        const MODEL_URL = "/models";
        
        setModelLoadingStatus("Loading face detector...");
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        
        setModelLoadingStatus("Loading landmarks model...");
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        
        setModelLoadingStatus("Loading recognition model...");
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        
        console.log("All face-api models loaded successfully");
        setModelsLoaded(true);
        startVideo();
      } catch (err) {
        console.error("Error loading models:", err);
        setError("Failed to load face recognition models: " + err.message);
      }
    };

    loadModels();

    return () => {
      // Cleanup: stop the video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true);
          console.log("Video stream started successfully");
        };
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied or not available: " + err.message);
    }
  };

  const captureFace = async () => {
    console.log("Capture face clicked");
    setError(null);
    
    if (!videoRef.current || !videoRef.current.readyState || videoRef.current.readyState < 2) {
      setError("Video not ready yet. Please wait.");
      return;
    }
    
    try {
      // Get the display size of the video
      const displaySize = { 
        width: videoRef.current.videoWidth || 300, 
        height: videoRef.current.videoHeight || 225 
      };
      console.log("Video display size:", displaySize);
      
      // Set canvas dimensions to match video
      canvasRef.current.width = displaySize.width;
      canvasRef.current.height = displaySize.height;
      faceapi.matchDimensions(canvasRef.current, displaySize);
      
      console.log("Starting face detection...");
      // Detect faces
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))
        .withFaceLandmarks()
        .withFaceDescriptor();
      
      console.log("Detection result:", detections);
      
      if (detections) {
        // Draw detections for visual feedback
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        
        // Convert descriptor array to regular array for storage
        const descriptorArray = Array.from(detections.descriptor);
        console.log("Face descriptors captured:", descriptorArray.length);
        onCapture(descriptorArray);
      } else {
        setError("No face detected. Please position your face clearly in the frame and ensure good lighting.");
      }
    } catch (err) {
      console.error("Face capture error:", err);
      setError("Face capture failed: " + err.message);
    }
  };

  return (
    <div className="face-capture-container flex flex-col items-center">
      <div className="video-container relative mb-2">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="300"
          height="225"
          className="rounded-lg border-2 border-teal-500"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 rounded-lg"
        />
      </div>
      
      {!modelsLoaded && <p className="text-teal-300 text-sm mb-2">{modelLoadingStatus}</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {isStreaming && !error && (
        <p className="text-teal-300 text-sm mb-2">
          Position your face clearly in the frame and ensure good lighting
        </p>
      )}
      
      <button
        onClick={captureFace}
        disabled={!modelsLoaded || !isStreaming}
        className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-50"
      >
        {!modelsLoaded ? "Loading models..." : "Capture Face"}
      </button>
    </div>
  );
}