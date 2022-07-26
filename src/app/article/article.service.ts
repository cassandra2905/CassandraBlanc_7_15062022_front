import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseURL = 'http://localhost:3000/articles';

  // On envoie du contenu de type json vers le serveur 
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }
  // Implémentation du CRUD côté client

  getOneArticle(articleId: string) {
    const fullURL = `${this.baseURL}/${articleId}`;
    return this.httpClient.get<Article>(fullURL, this.httpHeaders);
  }

  getAllArticles() {
    return this.httpClient.get<Article[]>(this.baseURL, this.httpHeaders);
  }

  createArticle(article: Article) {
    return this.httpClient.post<Article>(this.baseURL, article, this.httpHeaders);
  }

  deleteArticle(articleId: string) {
    const fullURL = `${this.baseURL}/${articleId}`;
    return this.httpClient.delete<Article>(fullURL, this.httpHeaders);
  }

  updateArticle(articleId: string, article: Article) {
    const fullURL = `${this.baseURL}/${articleId}`;
    return this.httpClient.put<Article>(fullURL, article, this.httpHeaders);
  }

  likeAnArticle(articleId: string, userId: string) {
    const fullURL = `${this.baseURL}/${articleId}/like`;
    return this.httpClient.post<Article>(fullURL, { userId }, this.httpHeaders);
  }
}
