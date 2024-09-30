import pickle
import tensorflow as tf
import librosa
import numpy as np

import pickle
import numpy as np
from tensorflow.keras.models import model_from_json

class VoiceConfidenceModel:
    def __init__(
        self, 
        model_weights, 
        model_encoder, 
        model_scaler, 
        model_json    
    ):
        self.model_weights = model_weights
        self.model_encoder = model_encoder
        self.model_scaler = model_scaler
        self.model_json = model_json

        self.emotion_mapping = {
            'neutral': 'Calm',
            'calm': 'Calm', 
            'happy': 'Confident',
            'sad': 'Under confident',
            'angry': 'Confident',
            'fear': 'Under confident',
            'disgust': 'Under confident',
            'surprise': 'Confident'
        }
        # Load model architecture from JSON
        json_file = open(self.model_json, 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.model = model_from_json(loaded_model_json)
        
        # Load the model weights
        self.model.load_weights(self.model_weights)

    def load_pickle_file(self, pickle_path):
        with open(pickle_path, 'rb') as f:
            return pickle.load(f)

    def zcr(self, data, frame_length, hop_length):
        zcr = librosa.feature.zero_crossing_rate(y=data, frame_length=frame_length, hop_length=hop_length)
        return np.squeeze(zcr)

    def rmse(self, data, frame_length=2048, hop_length=512):
        rmse = librosa.feature.rms(y=data, frame_length=frame_length, hop_length=hop_length)
        return np.squeeze(rmse)

    def mfcc(self, data, sr, frame_length=2048, hop_length=512, flatten=True):
        mfcc = librosa.feature.mfcc(y=data, sr=sr, n_mfcc=13, hop_length=hop_length)
        return np.squeeze(mfcc.T) if not flatten else np.ravel(mfcc.T)

    def extract_features(self, data, sr=22050, frame_length=2048, hop_length=512):
        zcr_result = self.zcr(data, frame_length, hop_length)
        rmse_result = self.rmse(data, frame_length, hop_length)
        mfcc_result = self.mfcc(data, sr, frame_length, hop_length, flatten=True)
        
        combined_features = np.hstack((zcr_result, rmse_result, mfcc_result))
        total_features = len(combined_features)
        
        if total_features < 1620:
            combined_features = np.pad(combined_features, (0, 1620 - total_features), mode='constant')
        elif total_features > 1620:
            combined_features = combined_features[:1620]
        
        combined_features = np.reshape(combined_features, newshape=(1, 1620))
        return combined_features

    def get_predict_feat(self, data):
        features = self.extract_features(data)
        scaler = self.load_pickle_file(self.model_scaler)
        scaled_features = scaler.transform(features)
        return scaled_features

    def prediction(self, data):
        res = self.get_predict_feat(data)
        res = res.reshape(res.shape[0], res.shape[1], 1)
        predictions = self.model.predict(res)
        encoder2 = self.load_pickle_file(self.model_encoder)
        y_pred = encoder2.inverse_transform(predictions)

        # Debugging prints
#         print("y_pred shape:", y_pred.shape)
#         print("y_pred values:", y_pred)

        predicted_label = y_pred[0][0]
        return predicted_label 
        # if predicted_label in self.emotion_mapping:
        #     original_emotion = self.emotion_mapping[predicted_label]
        #     return original_emotion
        # else:
        #     return "Unknown Emotion"

    def process_audio_file(self, audio_file, clip_duration=2.5):
        data, sr = librosa.load(audio_file,sr=None)  # Load audio with original sampling rate
        clip_length = int(clip_duration * sr)
        predictions = []

        # Segment the audio into clips
        for i in range(0, len(data), clip_length):
            segment = data[i:i+clip_length]
            if len(segment) < clip_length:
                # Pad the segment if it's shorter than the desired clip length
                segment = np.pad(segment, (0, clip_length - len(segment)), mode='constant')

            # Perform prediction on the segment
            prediction = self.prediction(segment)
            predictions.append(prediction)

        return predictions

if __name__ == '__main__':
    voice = VoiceConfidenceModel()
    audio_file = 'WhatsApp Audio 2024-07-11 at 12.37.05 PM.mp4'  
    predictions = voice.process_audio_file(audio_file)
    print(predictions)
