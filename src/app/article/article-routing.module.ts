import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

const routes: Routes = [
  { path: '', component: ListArticlesComponent },
  { path: 'article/create', component: NewArticleComponent },
  // { path: 'article/:id', component:  },
  { path: 'article/:id/edit', component: UpdateArticleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
