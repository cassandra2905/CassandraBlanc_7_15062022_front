import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  params$: Observable<Params>;
  id!: string;
  article!: Article;

  error = null;

  // Champs que va comporter notre formulaire de posts
  articleForm: FormGroup = this.fb.group({

    // On veut que le champ title soit obligatoire
    title: ['', Validators.required],

    // On veut que le contenu de notre post soit obligatoire et comporte une longueur minimale de 4 caractères
    content: ['', [Validators.required, Validators.minLength(4)]],
    creationDate: new Date().toISOString()
  });

  constructor(private fb: FormBuilder, private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
    this.params$ = this.route.params;
  }

  ngOnInit() {
    this.params$.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.articleService.getOneArticle(this.id).subscribe(article => {
          this.article = article;
          this.articleForm.controls['title'].setValue(article.title);
          this.articleForm.controls['content'].setValue(article.content);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  async submit() {
    this.articleService.updateArticle(this.id, this.articleForm.value)
      .subscribe(res => {
        this.router.navigate(['/article/' + this.id]);
      });
  }

  //  Getter permettant d'acceder aux erreurs de validation depuis le template
  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content')
  }
}
