import { Component, OnInit } from '@angular/core';
import template from "./login.component.html";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

@Component({
  selector: 'login',
  template,
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit(loginForm: FormGroup) {
    console.log(loginForm);
    console.log(loginForm.value)

    if (loginForm.invalid) {
      console.log("Invalid Form");
      return;
    }

    console.log("Valid Form");

    Meteor.loginWithPassword(
      loginForm.get('email').value, 
      loginForm.get('password').value, 
      (error) => {
        if(error) {
          alert(error);
        }
        else {
          this.router.navigate(['pacientes']);
        }
    });

    /*Meteor.call('checkLogin', {
      username: loginForm.get('email').value,
      password: loginForm.get('password').value
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        console.log(res);
        if (res) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['patients-list']);
        }
        else {
          alert("Usuario y/o contraseña incorrectos.");
        }
      }
    });*/
  }
}