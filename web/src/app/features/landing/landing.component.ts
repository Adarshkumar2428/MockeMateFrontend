import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.sass'
  
})export class LandingComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) {}
 
  submitpage() {
    // Redirect to the interview page using Angular Router
    this.router.navigate(['/interview']);
    if (this.username && this.password) {
      console.log('Logging in with', this.username, this.password);
      
    } else {
      console.error('Username and Password are required');
    }
  }
}