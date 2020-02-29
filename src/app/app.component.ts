import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showModal: boolean;
  title: string;
  userRegisterForm: any;

  constructor(private fb: FormBuilder) {
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
}
