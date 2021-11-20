import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroceryService } from '../../services/grocery.service';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: Boolean = false;
  visibleIndex: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private groceyService: GroceryService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let request = { email: email, password: password } as LoginModel;
    this.groceyService.login(request)
      .subscribe((response) => {
        if (response.ok) {
          localStorage.setItem('currentUser', response.body.data.userData);
          localStorage.setItem('token', response.body.data.token);
          this.router.navigate(['/profile']);
        }
        else {
          this.visibleIndex = true;
        }
      });
  }


}
