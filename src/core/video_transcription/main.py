import whisper
import re
import speech_recognition as sr


class VideoTranscripter:
    def __init__(self,  model_name="tiny") -> None:
        self.model = whisper.load_model(model_name)
        self.fillers = "um, ah, huh, and so, so um, uh, and um, yeah, uh so, so uh, yeah so, you know, uh and, and uh"
        self.filler_re = r'\b(um|ah|huh|and so|so um|uh|and um|yeah|uh so|so uh|yeah so|you know|uh and|and uh)\b'
        self.filler_arr = self.fillers.split(", ")
        self.recognizer = sr.Recognizer()

    def transcribe_audio(self,audio_path):
        audio = whisper.load_audio(audio_path)
        audio = whisper.pad_or_trim(audio)
        mel = whisper.log_mel_spectrogram(audio).to(self.model.device)

        _, probs = self.model.detect_language(mel)
        options = whisper.DecodingOptions(
            prompt=f"Do not remove filler words like {self.fillers}",
        )
        
        result_filler = whisper.decode(self.model, mel, options)
        with sr.AudioFile(audio_path) as data:
            result_sr_text = self.recognizer.recognize_google(
                self.recognizer.record(data)
            )
             
        # count fillers
        matches = re.findall(self.filler_re, result_filler.text)
        return {"text": result_sr_text, "english_probablity": probs['en'], "filler_count": len(matches)}
    
    def word_timestamps(self, segment):

        if not segment:
            raise Exception("Segment not found")
        
        words = segment['text'].strip().split()
        num_words = len(words)

        segment_duration = segment['end'] - segment['start']
        avg_word_duration = segment_duration / num_words

        word_timestamps = []
        current_time = segment['start']

        for word in words:
            word_timestamps.append({
                'word': word,
                'start': current_time,
                'end': current_time + avg_word_duration
            })
            current_time += avg_word_duration

        return word_timestamps

    def print_word_timestamps(self,result):
        if isinstance(result, dict) and 'segments' in result:
            word_level_timestamps = []
            for segment in result['segments']:
                word_timestamps_segment = self.word_timestamps(segment)
                word_level_timestamps.extend(word_timestamps_segment)

            for word_info in word_level_timestamps:
                print(f"{word_info['word']} [{word_info['start']:.2f}s - {word_info['end']:.2f}s]")

def test(audio_path):
    model = VideoTranscripter()
    audio_text = model.transcribe_audio(audio_path)
    model.print_word_timestamps(audio_text)