import React, { useEffect, useRef, useState } from 'react';

const InterviewDemo = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Explain a project you've worked on that you're proud of.",
    "What is the difference between var, let, and const in JavaScript?",
    "Explain the concept of RESTful APIs."
  ]);

  useEffect(() => {
    // Function to start the camera stream
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    // Call the function to start the camera stream when the component mounts
    startCamera();

    // Cleanup function to stop the camera stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartRecording = () => {
    setRecording(true);
    // Logic to start recording
  };

  const handleStopRecording = () => {
    setRecording(false);
    // Logic to stop recording
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
<<<<<<< HEAD
    fetch('https://deploy-5vnj4kb6oq-lz.a.run.app/predict', {
=======
    const response = await fetch('/predict', {
>>>>>>> dbe841f02599138be34efb63add582d4a7081cb4
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    document.getElementById('predictionResult').innerText = 'Predicted Emotion: ' + data.predicted_emotion;
  };

  return (
    <div className="container mx-auto py-16 relative">
      <h1 className="text-5xl font-bold mb-4 text-[#0C024B]" style={{ marginTop: '6rem', }}> Emotion Prediction</h1>
      {/* Question Section */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold">{questions[currentQuestionIndex]}</h2>
        <div className="flex justify-center mt-4">
          <button onClick={handlePreviousQuestion} className="mr-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Previous</button>
          <button onClick={handleNextQuestion} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Next</button>
        </div>
      </div>
      {/* Video Input Section */}
      <div className="flex justify-center items-center" style={{ marginTop: '6rem', marginBottom: '4rem' }}>
        <div className="relative border border-gray-300 rounded-lg overflow-hidden">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-2">
            {recording ? (
              <button onClick={handleStopRecording} className="bg-red-500 text-white px-4 py-2 mr-4 rounded-lg hover:bg-red-600">
                Stop Recording
              </button>
            ) : (
              <button onClick={handleStartRecording} className="bg-green-500 text-white px-4 py-2 mr-4 rounded-lg hover:bg-green-600">
                Start Recording
              </button>
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Predict
            </button>
          </div>
        </div>
      </div>
      {/* Prediction Result Section */}
      <div id="predictionResult" className="text-center mt-8"></div>
    </div>
  );
};

export default InterviewDemo;
