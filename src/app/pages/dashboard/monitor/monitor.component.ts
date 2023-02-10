import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface LeaveData {
  username: string,
  name: string,
  leaveDateFrom: Date,
  leaveDateTo: Date,
  createdAt: Date,
}

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  leaveData: LeaveData[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.http.get(environment.API_BACKEND + "/api/leaveData")
      .subscribe((res: any) => {
        this.leaveData = res;
        this.isLoading = false;
      })
  }

}
