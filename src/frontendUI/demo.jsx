import React, { useState, useEffect, useRef,useContext } from 'react';
import backgroundImage from '../images/mic1.jpg';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
 
const InterviewDemo = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  const { user} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in, if not, redirect to login page
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const [isPredicting, setIsPredicting] = useState(false);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPredicting(true); // Start showing loading indicator
 
    const formData = new FormData(event.target);
    fetch('/predict', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('predictionResult').innerText = 'Predicted Emotion: ' + data.predicted_emotion;
        setIsPredicting(false); // Stop showing loading indicator
      })
      .catch(error => {
        console.error('Error:', error);
        setIsPredicting(false); // Stop showing loading indicator in case of error
      });
  };
 
  return (
    <div className="container mx-auto py-80 relative bg-contain" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-5xl font-bold mb-4 text-[#0C024B]"> Emotion Prediction</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Audio Input Section */}
        <div>
          <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="file" name="audio" accept=".wav" />
            <button type="submit">Predict</button>
          </form>
          <div id="predictionResult"></div>
          {isPredicting && (
            <p>Loading prediction...</p> // Display loading text when predicting
          )}
        </div>
      </div>
      {/* Feedback Section */}
      <div style={{ marginLeft: 'auto', marginLeft: '60rem' }}> {/* Adjust marginRight as needed */}
        <h2 className="text-xl font-bold mb-2">Feedback</h2>
        {/* Placeholder for feedback message */}
        <p className="text-gray-600">Awaiting input....</p>
      </div>
    </div>
  );
};
 
export default InterviewDemo;
 