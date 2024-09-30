import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewRoutingModule } from './interview-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {  MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InterviewRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [
    provideHttpClient(withFetch())

  ]
})
export class InterviewModule { }
