import { Component } from '@angular/core';
import { Router } from 'vue-router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed: boolean = false;
  isLogin: boolean = false;
  constructor(
    public authService: AuthService,
  ) {

  }

  ngOnInit(): void {

  }
}
