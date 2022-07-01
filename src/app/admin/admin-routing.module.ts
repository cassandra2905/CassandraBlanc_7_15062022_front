import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ArticleNewComponent } from './article-new/article-new.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },

  // Route pour créer un nouvel article
  { path: 'article-new', component: ArticleNewComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
