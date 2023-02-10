import { environment } from './../../environments/environment';
import { Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = "";
  private isLogin: boolean = false;
  private userName: string = "";
  private userRole: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,) {

  }

  isUserLogin(): boolean {
    return this.isLogin;
  }

  setLogin(value: boolean) {
    this.isLogin = value
  }

  setUsername(value: string) {
    this.userName = value;
  }

  setRole(value: string){
    this.userRole = value;
  }

  getUsername(): string {
    return this.userName;
  }

  getUserRole(): string {
    return this.userRole;
  }

  checkLogin(): any {

    if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === '') {

      console.log("NO TOKEN");
      this.isLogin = false;
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    else {
      this.token = localStorage.getItem("accessToken");

      this.http.get(environment.API_BACKEND + '/api/auth/checktoken', {
        headers: {
          'x-access-token': this.token!,
        }
      })
        .subscribe({
          next: (res) => {
            console.log(res);
            return true;
          },
          error: (err) => {
            console.log(err);
            this.router.navigate(['login']);
            return false;
          }
        })
    }
  }
}
