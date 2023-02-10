
import { AuthService } from './../../service/auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private msg: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      let body = JSON.stringify({
        username: this.validateForm.get('userName')?.value,
        password: this.validateForm.get('password')?.value
      }); 1

      this.http.post(environment.API_BACKEND + "/api/auth/signin", {
        username: this.validateForm.get('userName')?.value,
        password: this.validateForm.get('password')?.value
      })
        .subscribe({
          next: (res) => {
            let response = JSON.parse(JSON.stringify(res));
            localStorage.setItem('userData', JSON.stringify(response));
            localStorage.setItem('accessToken', response.accessToken);
            this.auth.setLogin(true);
            this.auth.setUsername(response.username);
            this.router.navigate(['home']);
          },
          error: (err) => {
            if(err.status === 401)
            {
              this.msg.error("Username or password is incorrect");
            }
            else if(err.status === 404)
            {
              this.msg.error("Username not found");
            }
            else
            {
              this.msg.error("Server error");
            }
          }
        })
    }

  }
}
