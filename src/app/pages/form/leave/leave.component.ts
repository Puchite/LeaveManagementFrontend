import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

interface UserData {
  username: string,
  name: string,
  leaveQuota: number,
}
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  validateForm!: FormGroup;
  date: Date[] = [];
  isLoading: boolean = false;
  disabledSubmit: boolean = false;

  userData: UserData = {
    username: '',
    name: '',
    leaveQuota: 0
  };

  leaveQuotaNumber: number = 0;

  disabledDate = (current: Date): boolean => current < new Date();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private msg: NzMessageService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))));

    this.leaveQuotaNumber = this.userData.leaveQuota;

    if (this.leaveQuotaNumber <= 0) {
      this.disabledSubmit = true;
    }

    this.validateForm = this.fb.group({
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
    });
  }

  submitForm() {

    this.http.post(environment.API_BACKEND + "/api/leave", {
      username: this.userData.username,
      name: this.userData.name,
      leaveDateFrom: moment(this.date[0]).format("YYYY-MM-DD"),
      leaveDateTo: moment(this.date[1]).format("YYYY-MM-DD"),
    })
      .subscribe({
        next: (res) => {
          this.http.post(environment.API_BACKEND + '/api/leaveQuota', {
            username: this.userData.username
          })
            .subscribe({
              next: (response: any) => {
                this.leaveQuotaNumber = response.leaveQuota;
                this.msg.success("Successfully updated quota");
                if (this.leaveQuotaNumber <= 0) {
                  this.disabledSubmit = true;
                }
              }
            })
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onChangeDate(date: Date[]) {
    console.log(date);
  }

}
