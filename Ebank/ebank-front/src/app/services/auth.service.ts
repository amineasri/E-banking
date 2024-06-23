import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  roles: string[] = [];
  username: string = '';
  accessToken!: string;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    };
    const params = new HttpParams().set("username", username).set("password", password);

    return this.http.post<any>("http://localhost:8080/auth/login", params, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    const decodedJwt = jwtDecode<ExtendedJwtPayload>(this.accessToken);
    console.log('Decoded JWT:', decodedJwt); // Log the decoded JWT to see its structure
    this.username = decodedJwt.sub;

    // Ensure correct handling of roles or scope based on JWT structure
    if (decodedJwt.scope) {
      this.roles = decodedJwt.scope.split(' ');
    } else if (decodedJwt.roles) {
      this.roles = decodedJwt.roles.split(' ');
    } else {
      this.roles = [];
    }
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error to the console (or handle it in another way)
    console.error('An error occurred during login:', error);

    // Check if it's a client-side error or a server-side error
    if (error.error instanceof ErrorEvent) {
      // Client-side error (e.g., network issue, CORS issue)
      console.error('Client-side error occurred:', error.error.message);
    } else {
      // Server-side error (e.g., 401 Unauthorized)
      console.error(`Server returned code ${error.status}, body was: `, error.error);
    }

    // Return an observable with a user-facing error message
    return throwError('Invalid credentials. Please check your username and password.');
  }
}

// Define the ExtendedJwtPayload interface outside of the service class
interface ExtendedJwtPayload {
  sub: string;
  scope?: string;
  roles?: string;
}
