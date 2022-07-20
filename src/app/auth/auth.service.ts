import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000/users';
  tokenKey = 'cms-nestjs';
  private token: any;

  constructor(private http: HttpClient, private router: Router) { }

  // Créer un nouvel utilisateur
  register(credentials: any) {
    const fullURL = `${this.baseURL}/register`;
    this.http
      .post<any>(fullURL, credentials)
      .subscribe(createdUser => {
        console.log('createdUser', createdUser);
      });
  }

  // Se connecter
  login(credentials: any) {
    const fullURL = 'http://localhost:3000/auth/login';
    this.http
      .post(fullURL, credentials)
      .subscribe(serverObject => {
        console.log('serverObject', serverObject);

        if ((serverObject as any).access_token) {
          this.token = (serverObject as any).access_token;
          localStorage.setItem(this.tokenKey, (serverObject as any).access_token);
          this.router.navigate(['/']);
        }
      });
  }

  // Décoder le token JWT
  decodePayloadToken(token: any) {
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    console.log('payload', payload);
    return payload;
  }

  // Connaître le rôle de l'utilisateur
  get isAdmin() {
    if (!this.token) {
      return false;
    }
    const payload = this.decodePayloadToken(this.token);
    if (payload.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  // Se déconnecter

  get isConnected() {
    return this.token ? true : false;
  }

  disconnect() {
    this.token = "";
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }
}

