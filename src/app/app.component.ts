import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalConstants} from '../constants/GlobalConstants';
import {HttpClient} from '@angular/common/http';
import {Otp} from './models/otp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showModal: boolean;
  title: string;
  userRegisterForm: any;
  otpGenTxnId: string;
  loadComponent = false;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private globalConstants: GlobalConstants) {
    this.userRegisterForm = this.fb.group({
      email: this.fb.control(''),
      otp: this.fb.control('')
    });
  }
  ngOnInit() {
    this.show();
  }
  show() {
    this.showModal = true;
    this.title = 'Register';
  }

  hide() {
    this.showModal = false;
  }
  generateOtp() {
    return this.httpClient.get<Otp>('http://localhost:8080/api/otp/challenges/generate?email=' + this.userRegisterForm.value.email)
      .subscribe(response => {
        this.otpGenTxnId = response.txId;
        console.log(this.otpGenTxnId);
      });
  }
  validateOtp() {
    this.loadComponent = true;
    this.globalConstants.userName = this.userRegisterForm.value.email;
    this.router.navigate(['/home']);
    this.hide();
  }

}
