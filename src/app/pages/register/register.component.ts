import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  isValidPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private msg: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    this.validateForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((args) => {
        if (args.password !== args.confirmPassword) {
          this.isValidPassword = false;
        }
        else {
          this.isValidPassword = true;
        }
      });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid && this.isValidPassword) {
      this.http.post(environment.API_BACKEND + "/api/auth/signup", {
        username: this.validateForm.get('userName')?.value,
        name: this.validateForm.get('name')?.value,
        email: this.validateForm.get('email')?.value,
        password: this.validateForm.get('password')?.value
      })
        .subscribe({
          next: (res) => {
            this.msg.success("Registration Success");
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
  }


  register() {

  }

}
