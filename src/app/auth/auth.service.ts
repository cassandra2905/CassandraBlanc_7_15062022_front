import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000/users';
  tokenKey = 'cms-nestjs';
  private token: any;

  constructor(private http: HttpClient) { }

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
        this.token = (serverObject as any).access_token;
        localStorage.setItem(this.tokenKey, (serverObject as any).access_token);
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
}
