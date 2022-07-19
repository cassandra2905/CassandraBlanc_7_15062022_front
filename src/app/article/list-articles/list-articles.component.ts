import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ArticleService } from 'src/app/article/article.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/models/article';

// Logique de gestion de notre liste d'articles 

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  isWaitingForServerResponse = false;
  error = null;

  @Output() deleteSuccess = new EventEmitter<boolean>();
  @Input() article!: Article;
  isInEditMode = false;

  constructor(private articleService: ArticleService, public authService: AuthService) { }

  ngOnInit() {
  }

  // Méthode suppression article
  delete(article: Article) {
    this.isWaitingForServerResponse = true;
    this.articleService
      .deleteArticle(article)
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

  // Actualise la page lors de la mise à jour de l'article
  handleSuccess(data: any) {
    this.deleteSuccess.emit(true);
  }

  // Retour à la liste des posts
  toggleReadMode() {
    this.isInEditMode = !this.isInEditMode;
  }

}