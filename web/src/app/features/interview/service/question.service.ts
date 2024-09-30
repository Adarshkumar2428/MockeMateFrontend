import { Injectable } from '@angular/core';
import questions from "./questions.json";
import { Observable, from, of } from 'rxjs';
import { IInterviewQuestion } from '../models/http/IInterviewQuestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestionsByCourse(courseName: string, position: string): Observable<IInterviewQuestion[]> {
    const interviewQues: Array<IInterviewQuestion> = [];
    // Question: 1 tell me about yourself
    interviewQues.push(questions[questions.length - 5]);

    const courseQuestion = questions.filter(question => (
      question.course == courseName && 
      question.position == position)
    );
    interviewQues.push(...courseQuestion)
    return of(interviewQues)
  }
}
