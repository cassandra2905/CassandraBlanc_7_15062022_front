import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ArticleService } from 'src/app/article/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  isWaitingForServerResponse = false;

  articles$: Observable<Article[]>;
  error: any;

  @Output() deleteSuccess = new EventEmitter<boolean>();

  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getAllArticles();
  }

  ngOnInit() { }

  delete(article: Article) {
    this.isWaitingForServerResponse = true;
    this.articleService.deleteArticle(article)
      .pipe(
        catchError(this.handleError)
      ).subscribe(
        data => {
          this.isWaitingForServerResponse = false;
          this.handleSuccess(data);
        },
        err => {
          this.isWaitingForServerResponse = false;
          this.handleError(err);
        }
      );
  }

  handleError(err: any) {
    this.error = err;
    return throwError(this.error);

  }

  handleSuccess(data: Article) {
    console.log('success!!', data);
    this.deleteSuccess.emit(true);
  }
}