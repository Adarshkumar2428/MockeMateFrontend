import json
import google.generativeai as genai
from src.utils.config import GEMINI_API_KEY
from src.utils.utils import singleton

genai.configure(api_key=GEMINI_API_KEY)


@singleton
class QAScorer:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-1.5-flash-latest",)

    def _apply_prompt(self, question, answer, keypoints):

        return f"""
        You are an experienced Interviewer and you are conducting an interview for a junior data scientist position.
        The candidate is asked the following question: {question}.
        The candidate replied: {answer}

        Following are the Important Keypoints that the candidates answer MUST have, Score the answer based on these keypoints. Give extra points if the candidate answers with an example.

        - {keypoints[0]}
        - {keypoints[1]}
        - {keypoints[2]}
        
        Assess the answer and do the following
        - List the reasons why the candidate's answer is correct or incorrect.
        - Give tips on how the candidate could improve their answer.
        - Rate the candidate's answer on a scale of 1 to 100 in percentage.
        - Use the transcript and do necessary grammar checks and point out every mistake in the answer. Check for sentence formation, spell checks etc

        Structure your output in a following JSON schema

        {{
        "question": string,
        "candidateAnswer": string,
        "score": number,
        "mistakes": Array<{{isGrammar: boolean, mistake: string}}>,
        "tips": string,
        
        "keypoints": [
                {{
                    "keypoint": string,
                    "keypointMentioned": boolean,
                    "keypointTip": string,
                    "keypointMistake": string
                }}
            ] 
        }}

        Please ONLY reply with the JSON data and nothing else. Use all the knowledge you have regarding the topic to its best and do not reply with false information. 
        """

    def _format_response(self, model_response):
        return json.loads(model_response.text.replace("```json", "").replace("```", ""))

    def get_result(self, qa_context):
        return {
                "result": self._format_response(
                    self.model.generate_content(
                        self._apply_prompt(qa_context["question"], qa_context["answer"], qa_context['keypoints'])
                    )
                ),
            }

if __name__ == "__main__":
    payload = {
        "question": "waht is a supervised learning", 
        "answer": "Supervised learning is when you have labels."
    },
    
    qa_scorer = QAScorer()
    for score in qa_scorer.get_result(payload):
        print(score)
