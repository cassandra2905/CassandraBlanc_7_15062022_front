import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { environment } from 'src/environments/environment.prod';
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
  env: any = environment;

  error = null;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('', [Validators.required]),
    imageSource: new FormControl('', [Validators.required]),
    creationDate: new FormControl(''),
    content: new FormControl('', [Validators.required, Validators.minLength(4)])
  });


  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
    this.params$ = this.route.params;
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.params$.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.articleService.getOneArticle(this.id).subscribe(article => {
          this.article = article;
          this.form.controls['title'].setValue(article.title);
          this.form.controls['content'].setValue(article.content);
          this.form.controls['creationDate'].setValue(article.creationDate);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
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

  async submit() {
    this.articleService.updateArticle(this.id, this.form.value)
      .subscribe(res => {
        const formData: FormData = new FormData();
        formData.append('image', this.form.get('imageSource')?.value);

        this.articleService.uploadImageArticle(this.article._id!, formData)
          .subscribe(res => {
            console.log("res image upload", res);
            this.router.navigate(['/article/' + this.id]);
          });
      });
  }
}
