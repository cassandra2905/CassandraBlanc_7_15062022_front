import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    image: new FormControl(''),
    imageSource: new FormControl(''),
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
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.form.patchValue({
        imageSource: event.target.files[0]
      });
    }
  }

  async submit() {
    this.articleService.updateArticle(this.id, this.form.value)
      .subscribe(res => {
        const newImage = this.form.get('imageSource')?.value;
        if (newImage) {
          const formData: FormData = new FormData();
          formData.append('image', newImage);

          this.articleService.uploadImageArticle(this.article._id!, formData)
            .subscribe(res => {
              this.router.navigate(['/article/' + this.id]);
            });
        } else {
          this.router.navigate(['/article/' + this.id]);
        }
      });
  }
}
