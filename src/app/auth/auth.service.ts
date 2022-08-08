import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article/article.service';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000/users';
  tokenKey = 'cms-nestjs';
  private token!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private articleService: ArticleService
  ) {
    const _token = localStorage.getItem(this.tokenKey);
    if (_token) {
      this.token = _token;
    }
  }

  // Créer un nouvel utilisateur
  register(credentials: any) {
    const fullURL = `${this.baseURL}/register`;
    this.http
      .post<any>(fullURL, credentials)
      .subscribe(createdUser => {
        window.alert('Bienvenue sur Groupomania !');
        this.login(credentials);
      });
  }

  // Se connecter
  login(credentials: any) {
    const fullURL = 'http://localhost:3000/auth/login';
    this.http
      .post(fullURL, credentials)
      .subscribe(serverObject => {
        if ((serverObject as any).access_token) {
          this.token = (serverObject as any).access_token;
          localStorage.setItem(this.tokenKey, (serverObject as any).access_token);
          this.router.navigate(['/']);
        }
      });
  }

  // Décoder le token
  decodePayloadToken(token: any) {
    const payload = JSON.parse(atob(this.token.split('.')[1]));
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

  get isConnected() {
    return this.token ? true : false;
  }

  get id() {
    return this.decodePayloadToken(this.token)?.sub;
  }

  get email() {
    return this.decodePayloadToken(this.token)?.email;
  }

  // Retourne l'email de l'utilisateur si celui-ci est connecté sur sa session
  // Propriétaire du compte
  ownArticle(article: Article): boolean {
    if (!this.isConnected) { return false; }
    return article.author == this.email ? true : false;
  }

  disconnect() {
    this.token = "";
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }
}

