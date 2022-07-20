import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  params$: Observable<Params>;
  article$!: Observable<Article>;
  id!: string;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
    this.params$ = this.route.params;
  }

  ngOnInit() {
    this.params$.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.article$ = this.articleService.getOneArticle(this.id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  delete() {
    this.articleService.deleteArticle(this.id);
  }
}
