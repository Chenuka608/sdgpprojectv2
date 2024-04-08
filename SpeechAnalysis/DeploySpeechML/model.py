from flask import Flask, render_template, request, jsonify
import librosa
import numpy as np
from joblib import load
import logging
 
# Configure logging for production (remove for development if desired)
logging.basicConfig(filename='emotion_prediction.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s')
 
app = Flask(__name__)
 
# Load the model and encoder (assuming they are in the same directory)
try:
    model = load('./emotion_detection_model.joblib')
    enc = load('./label_encoder.joblib')
except FileNotFoundError:
    logging.error('Model or encoder files not found. Please ensure they are in the same directory.')
    exit(1)
 
# Function to extract MFCC features
def extract_mfcc(audio_file_path):
    try:
        data, sampling_rate = librosa.load(audio_file_path)
        mfcc_features = librosa.feature.mfcc(y=data, sr=sampling_rate, n_mfcc=40)
        return np.mean(mfcc_features.T, axis=0)
    except Exception as e:
        logging.error(f'Error extracting MFCC features: {e}')
        return None
 
@app.route('/predict', methods=['POST'])
def predict():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
 
    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
 
    if audio_file and audio_file.filename.endswith('.wav'):
        try:
            audio_file.save('uploaded_audio.wav')
            input_features = extract_mfcc('uploaded_audio.wav')
            if input_features is None:
                return jsonify({'error': 'Error processing audio file'}), 500
            input_features = input_features.reshape(1, -1)
            predictions = model.predict(input_features)
            predicted_emotion = enc.inverse_transform(predictions)
            return jsonify({'predicted_emotion': predicted_emotion[0]})
        except Exception as e:
            logging.error(f'Error during prediction: {e}')
            return jsonify({'error': 'Internal server error'}), 500
    else:
        return jsonify({'error': 'Invalid file format. Please provide a .wav file'}), 400
 
if __name__ == '__main__':
    # Disable debug mode for production (remove for development if desired)
    app.run(debug=False)
 
