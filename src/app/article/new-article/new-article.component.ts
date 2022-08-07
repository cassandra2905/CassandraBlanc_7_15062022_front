import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('', [Validators.required]),
    imageSource: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required, Validators.minLength(4)]),
    creationDate: new FormControl(new Date().toISOString()),
    author: new FormControl(this.authService.email)
  });

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  // Raccourci des contrôles du formulaire
  get f() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {

      this.form.patchValue({
        imageSource: event.target.files[0]
      });
    }
  }

  submit() {
    this.articleService.createArticle(this.form.value)
      .subscribe(article => {

        const formData: FormData = new FormData();
        formData.append('image', this.form.get('imageSource')?.value);

        this.articleService.uploadImageArticle(article._id!, formData)
          .subscribe(res => {
            window.alert('Votre article a bien été créé !');
            this.router.navigate(['/article/' + article._id]);
          });
      });
  }
}