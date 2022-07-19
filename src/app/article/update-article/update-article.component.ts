import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  @Input() article: Article | any;
  articleForm!: FormGroup;
  response$: any;
  error: any;

  constructor(private fb: FormBuilder, private articleService: ArticleService) { }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [this.article.title, Validators.required],
      content: [this.article.content, [Validators.required, Validators.minLength(4)]]
    });
  }

  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }

  submit() {
    this.error = null;
    this.response$ = this.articleService.updateArticle(this.article._id, this.articleForm.value)
      .pipe(
        catchError(error => {
          this.error = error;
          return EMPTY;
        })
      );
  }
}
