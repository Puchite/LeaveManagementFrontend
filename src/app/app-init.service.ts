import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Injectable()
export class AppInitService {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  Init() {

    return new Promise<void>(async (resolve, reject) => {
      console.log('init');
      if(this.authService.checkLogin() === false)
      {
        resolve();
      }
      else {
        resolve();
        this.router.navigate(['/login']);
      }


    });
  }
}
