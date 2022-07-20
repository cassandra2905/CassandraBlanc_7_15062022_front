import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './article.component';


@NgModule({
  declarations: [
    ListArticlesComponent,
    NewArticleComponent,
    UpdateArticleComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule { }
