import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    creationDate: new FormControl(new Date().toISOString())
  });

  constructor(private http: HttpClient, private articleService: ArticleService) { }

  // Raccourci des contrôles du formulaire
  get f() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      console.log('contenu image', event.target.files[0]);

      this.form.patchValue({
        imageSource: event.target.files[0]
      });

      console.log('image source apres update', this.form.get('imageSource')?.value);
    }
  }

  submit() {
    this.articleService.createArticle(this.form.value)
      .subscribe(article => {
        console.log('article créé', article);

        const formData: FormData = new FormData();
        formData.append('image', this.form.get('imageSource')?.value);

        this.articleService.uploadImageArticle(article._id!, formData)
          .subscribe(res => {
            console.log("res image upload", res);
          });
      });
  }
}