import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ArticleComponent } from './article/article.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleEditComponent } from './article-edit/article-edit.component';


@NgModule({
  declarations: [
    ArticleComponent,
    AccueilComponent,
    ArticleNewComponent,
    ArticleEditComponent,
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ArticleEditComponent]
})
export class AdminModule { }
