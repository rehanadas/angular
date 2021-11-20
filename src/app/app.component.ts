import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';
  user = localStorage.getItem('currentUser');
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
