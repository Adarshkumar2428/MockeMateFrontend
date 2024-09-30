from flask import Flask, request, jsonify
from json import dumps
from time import time
from flask_cors import CORS, cross_origin
from src.core.feedback import FeedbackSystem

app = Flask(__name__)
cors = CORS(app)
fs = FeedbackSystem()

@app.route("/")
def index():
  return {
    "status": "Working"
  }
  
@app.route("/upload", methods=['POST'])
def handleUploadVideo():
  
  # handle question
  
  reqQuestion = request.form.get('question')
  reqKeyPt1 = request.form.get('keyPt1')
  reqKeyPt2 = request.form.get('keyPt2')
  reqKeyPt3 = request.form.get('keyPt3')
  quesKey = request.form.get('questionKey')
  
  # handle uploaded video 
  reqBinary = request.files.get('video')
  
  file_name = f"upload_{int(time())}.webm"
  reqBinary.save(file_name)

  # TODO: fetch qa_context from db
  
  qa_context = {
    "question": reqQuestion, 
    "keypoints": [reqKeyPt1, reqKeyPt2, reqKeyPt3]
  }

  # process video
  feedback_op = fs.get_feedback(file_name, qa_context)
  return jsonify({
    "video_uploaded": True,
    "feedback": feedback_op,
    "questionKey": quesKey    
  })


if __name__ == "__main__": 
  # app.run(port=8080, host="0.0.0.0", debug=True)
  qa_context = {
    "question": "what is linear regression", 
    "keypoints": ["Linearity", "Dependent vs Independented Variables","Homoscedasticity"]
  }
  feedback = fs.get_feedback("./upload_1719927703.webm", qa_context)
  print(feedback)