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

  getCourses(): Observable<string[]> {
    // Extract unique course names from the questions array
    const courses = [...new Set(questions.map(question => question.course))];
    return of(courses); // Return an observable of the unique courses array
  }

  getPositionsByCourse(courseName: string): Observable<string[]> {
    // Filter questions by course name and extract unique positions
    const positions = [...new Set(
      questions
        .filter(question => question.course === courseName)
        .map(question => question.position)
    )];
    return of(positions); // Return an observable of unique positions for the selected course
  }
}
