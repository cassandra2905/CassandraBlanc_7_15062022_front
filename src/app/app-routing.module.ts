import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Route pour le component articles
const routes: Routes = [
  { path: '', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
