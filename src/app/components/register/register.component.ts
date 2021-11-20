import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroceryService } from 'src/app/services/grocery.service';
import { RegisterModel } from 'src/app/models/register.model';
import { EmailModel } from 'src/app/models/email.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;
  submitted: boolean = false;
  visibleIndex: boolean = false;
  isExistEmail: boolean = false;
  passMissMatch: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private groceyService: GroceryService
  ) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cnfpassword: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  changeStatus() {
    this.passMissMatch = false;
  }

  checkIfMatchingPasswords() {
    let passwordInput = this.regForm.controls['password'],
      passwordConfirmationInput = this.regForm.controls['cnfpassword'];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      this.passMissMatch = true;
      return passwordConfirmationInput.setErrors({ notEquivalent: true })
    }
    else {
      return passwordConfirmationInput.setErrors(null);
    }
  }

  checkEmailExist() {
    this.submitted = true;
    this.checkIfMatchingPasswords();
    let emailInput = this.regForm.controls['email'];
    let request = { email: emailInput.value } as EmailModel;
    this.groceyService.checkMailExist(request)
      .subscribe((response) => {
        if (response.ok) {
          this.onSubmit();
        }
        else {
          this.isExistEmail = true;
          return emailInput.setErrors({ notEquivalent: true });
        }
      });
  }

  onSubmit() {
    let email = this.regForm.controls['email'].value;
    let password = this.regForm.controls['password'].value;
    let username = this.regForm.controls['username'].value;
    let phone = this.regForm.controls['phone'].value;

    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }

    let request = { email: email, password: password, username: username, phone: phone } as RegisterModel;
    this.groceyService.register(request)
      .subscribe((response) => {
        if (response.ok) {
          this.router.navigate(['/login']);
        }
        else {
          this.visibleIndex = true;
        }
      });
  }

}
