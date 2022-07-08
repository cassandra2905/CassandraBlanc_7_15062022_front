import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseURL = 'http://localhost:3000/articles';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }
  // Implémentation du CRUD côté client

  createArticle(article: Article) {
    return this.httpClient.post<Article>(this.baseURL, article);
  }

  deleteArticle(article: Article) {
    const fullURL = `${this.baseURL}/${article._id}`;
    return this.httpClient.delete<Article>(fullURL, this.httpHeaders);
  }

  updateArticle(articleId: string, article: Article) {
    const fullURL = `${this.baseURL}/${articleId}`;
    return this.httpClient.put<Article>(fullURL, article, this.httpHeaders);
  }
}
