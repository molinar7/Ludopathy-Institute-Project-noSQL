import { Component, OnInit, Output } from '@angular/core';
import template from "./navbar.html";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'nav-bar',
  template
})
export class Navbar implements OnInit {
  isLoggedIn: boolean;

  constructor(private router: Router) {
    this.isLoggedIn = this.isLoggedIn = Meteor.userId() != null;
  }

  ngOnInit() {
    this.isLoggedIn = Meteor.userId() != null;
  }

  logout(){
    Meteor.logout((error) => {
      if(error) {
        alert(error);
      }
      else {
        this.router.navigate(['']);
      }

      this.isLoggedIn = Meteor.userId() != null;
    });
  }

  homePage(){
    this.router.navigate(['pacientes']);
  }

  changePassword(){
    this.router.navigate(['cambiar-contrasena']);
  }

}