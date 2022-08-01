import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/article/article.service';
import { Article } from 'src/app/models/article';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  articles$: Observable<Article[]>;
  env: any = environment;

  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getAllArticles();
  }

  ngOnInit() { }
}