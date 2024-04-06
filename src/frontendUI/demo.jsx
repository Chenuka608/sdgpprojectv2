import React, { useEffect, useRef, useState } from 'react';

const InterviewDemo = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [emotion, setEmotion] = useState('');
  const recognition = useRef(null);

  useEffect(() => {
    recognition.current = new window.webkitSpeechRecognition(); // Speech recognition instance

    recognition.current.continuous = true;

    recognition.current.onstart = () => {
      setRecording(true);
    };

    recognition.current.onend = () => {
      setRecording(false);
    };

    recognition.current.onresult = event => {
      const currentTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(currentTranscript);
      predictEmotion(currentTranscript); // Function to predict emotion from transcript
    };

    recognition.current.start();

    return () => {
      recognition.current.stop();
    };
  }, []);

  // Function to mock emotion prediction
  const predictEmotion = transcript => {
    // This is just a mock function, replace it with your actual emotion prediction logic
    // Here you would typically send the transcript to your backend for processing
    // and receive back the emotion prediction result
    // For now, let's assume it randomly assigns an emotion
    const emotions = ['Happy', 'Sad', 'Angry', 'Neutral']; // List of emotions
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]; // Randomly select an emotion
    setEmotion(randomEmotion);
  };

  const handleStartRecording = () => {
    recognition.current.start();
  };

  const handleStopRecording = () => {
    recognition.current.stop();
  };

  return (
    <div className="container mx-auto py-80 relative bg-contain">
      <h1 className="text-5xl font-bold mb-4 text-[#0C024B]"> Emotion Prediction</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Audio Input Section */}
        <div>
          <form id="uploadForm" encType="multipart/form-data">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Predict
            </button>
          </form>
          <div id="predictionResult">Predicted Emotion: {emotion}</div>
          <div id="transcript">Transcript: {transcript}</div>
          <div>
            {recording ? (
              <button onClick={handleStopRecording} className="bg-red-500 text-white px-4 py-2 mr-4 rounded-lg hover:bg-red-600">
                Stop Recording
              </button>
            ) : (
              <button onClick={handleStartRecording} className="bg-green-500 text-white px-4 py-2 mr-4 rounded-lg hover:bg-green-600">
                Start Recording
              </button>
            )}
          </div>
        </div>
        {/* Video Input Section */}
        <div className="flex justify-center items-center">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full" muted />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDemo;
