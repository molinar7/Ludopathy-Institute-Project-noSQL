import { Component } from '@angular/core';
import template from "./change-password.component.html";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

@Component({
  selector: 'change-password',
  template,
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.changePasswordForm = this.fb.group({
      oldpassword: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    })
  }

  submit(changePasswordForm: FormGroup) {
    console.log(changePasswordForm);
    console.log(changePasswordForm.value)

    var passwordOld = changePasswordForm.get('oldpassword').value;
    var password1val = changePasswordForm.get('password1').value;
    var password2val = changePasswordForm.get('password2').value;

    if (changePasswordForm.invalid || password1val != password2val) {
      console.log("Invalid Form");
      alert("Contraseñas inválidas. Revisar que los campos estén llenos o que coincidan.")
      return;
    }

    console.log("Valid Form");

    Accounts.changePassword(passwordOld, password1val, (error) => {
      if(error){
        alert(error);
      }
      else {
        alert("Contraseña cambiada.")
        this.router.navigate(['pacientes']);
      }
    });
  }
}