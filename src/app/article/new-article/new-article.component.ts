import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
// Créer un nouveau post

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  error = null;

  constructor(private fb: FormBuilder, private articleService: ArticleService) { }

  // Champs que va comporter notre formulaire de posts
  articleForm: FormGroup = this.fb.group({

    // On veut que le champ title soit obligatoire
    title: ['', Validators.required],

    // On veut que le contenu de notre post soit obligatoire et comporte une longueur minimale de 4 caractères
    content: ['', [Validators.required, Validators.minLength(4)]],

    creationDate: new Date().toISOString()
  });

  ngOnInit(): void {
  }

  // On poste un nouvel article vers le serveur NestJS

  async submit() {
    console.log('article / submit', this.articleForm.value);
    this.articleService.createArticle(this.articleForm.value)
      .pipe(
        catchError(error => {
          this.error = error;

          // Retourne un observable qui n'émet rien qui est vide
          return EMPTY;
        })
      )
  }

  //  Getter permettant d'acceder aux erreurs de validation depuis le template
  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content')
  }


}

