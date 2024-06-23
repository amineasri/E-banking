import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }

  handleLogin() {
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

    console.log('Attempting to login with:', { username, password });

    this.authService.login(username, password).subscribe({
      next: data => {
        console.log("Login successful", data);
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}
