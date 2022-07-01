import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  // Observable article
  articles$!: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    // Requête get pour récupérer tous les articles
    this.articles$ = this.httpClient.get<any[]>('http://localhost:3000/articles');
  }

}
