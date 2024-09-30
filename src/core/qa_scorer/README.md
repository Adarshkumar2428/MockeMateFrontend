# QAScorer

QAScorer is a Python module designed to evaluate and score candidate answers to interview questions for a junior data scientist position. It utilizes the Google Generative AI (Gemini) model to assess the quality of the answers based on predefined keypoints and provide feedback on areas for improvement.

## Problem Statement

During the interview process for data science roles, it is crucial to evaluate candidates' understanding of key concepts and their ability to articulate their knowledge effectively. This module aims to streamline the evaluation process by providing an automated scoring system that analyzes candidate answers against predefined keypoints and generates a comprehensive report.

## Summary of Approaches for Question and Answer Scoring

### Initial Models from Hugging Face (Gemma 2B and 7B)

- We started by using models like Gemma 2B and 7B from Hugging Face.
- These models, while capable, did not fully meet our requirements.
- Specifically, they struggled with:
  - Accurately evaluating answers where students provided customized examples.
  - Offering tips or recommendations based on the answers.

### Switch to Gemini API

- We then tried using the Gemini API.
- This solution provided the desired output, successfully evaluating customized examples and offering helpful tips.
- Despite being a paid service, Gemini API has a free tier that allowed us to conduct a pilot test and confirm its effectiveness for our needs.

## Dataset and Model Architecture

The QAScorer module leverages the Gemini-1.5-flash-latest model from Google's Generative AI. This model is a large language model trained on a vast corpus of data, enabling it to understand and generate human-like text. The module does not require any specific dataset, as it relies on the model's knowledge and the provided prompts.

## Architecture

The QAScorer module follows a simple architecture:

1. The `QAScorer` class is a singleton, ensuring only one instance is created.
2. The `__init__` method initializes the Gemini model from Google's Generative AI.
3. The `_apply_prompt` method constructs the prompt for the Gemini model, incorporating the question, candidate's answer, and keypoints.
4. The `_format_response` method parses the model's response and converts it to a JSON format.
5. The `get_result` method orchestrates the process by calling the `_apply_prompt` and `_format_response` methods, and returns the final result.

## Function Documentation

### `__init__(self)`

**Definition:** Initializes the `QAScorer` instance.

**Inputs:** None.

**Outputs:** None.

**Dependencies:** `google.generativeai` module.

**Usage:** This method is automatically called when creating a new instance of the `QAScorer` class.

### `_apply_prompt(self, question, answer, keypoints)`

**Definition:** Constructs the prompt for the Gemini model based on the provided question, candidate's answer, and keypoints.

**Inputs:**

- `question` (str): The interview question.
- `answer` (str): The candidate's answer.
- `keypoints` (list): A list of keypoints that the candidate's answer should cover.

**Outputs:** A formatted string representing the prompt for the Gemini model.

**Dependencies:** None.

**Usage:** This method is called internally by the `get_result` method to generate the prompt for the Gemini model.

### `_format_response(self, model_response)`

**Definition:** Parses the response from the Gemini model and converts it to a JSON format.

**Inputs:**

- `model_response` (str): The response from the Gemini model.

**Outputs:** A Python dictionary representing the parsed JSON response.

**Dependencies:** `json` module.

**Usage:** This method is called internally by the `get_result` method to format the response from the Gemini model.

### `get_result(self, qa_context)`

**Definition:** Orchestrates the process of generating the prompt, sending it to the Gemini model, and formatting the response.

**Inputs:**

- `qa_context` (dict): A dictionary containing the question, candidate's answer, and keypoints.

**Outputs:** A dictionary containing the formatted result from the Gemini model.

**Dependencies:** `_apply_prompt` and `_format_response` methods.

**Usage:** This method should be called with the appropriate `qa_context` dictionary to obtain the scored result for the candidate's answer.

## Function Dependencies

- `google.generativeai`: This module is used to interact with Google's Generative AI models, specifically the Gemini-1.5-flash-latest model.
- `json`: This built-in Python module is used to parse and format JSON data.
- `src.utils.config`: This module is assumed to contain the `GEMINI_API_KEY` required for authenticating with Google's Generative AI service.
- `src.utils.utils`: This module is assumed to contain the `singleton` decorator used to ensure only one instance of the `QAScorer` class is created.

## Function Usage

1. Import the `QAScorer` class from the `main` module.
2. Create an instance of the `QAScorer` class.
3. Prepare the `qa_context` dictionary with the question, candidate's answer, and keypoints.
4. Call the `get_result` method on the `QAScorer` instance, passing the `qa_context` dictionary as an argument.
5. The method will return a dictionary containing the scored result, including the score, mistakes, tips, and keypoint-specific feedback.

Example:

```python
from main import QAScorer

qa_scorer = QAScorer()
qa_context = {
    "question": "What is supervised learning?",
    "answer": "Supervised learning is when you have labels.",
    "keypoints": ["Define supervised learning", "Explain the role of labels", "Provide examples"]
}

result = qa_scorer.get_result(qa_context)
print(result)
```
