import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  standalone: true,
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  isSubmitting = false;
  http = inject(ApiService);
  router = inject(Router);
  toastr = inject(ToastrService);

  newBookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    genre: new FormControl(''),
    publisher: new FormControl(''),
    publishDate: new FormControl(''),
    description: new FormControl(''),
    isbn: new FormControl(''),
    language: new FormControl(''),
    pages: new FormControl(0),
  });
  books: any[] = [];

  createNewBook() {
    this.isSubmitting = true;
    const newBook = {
      title: this.newBookForm.value.title ?? '',
      author: this.newBookForm.value.author ?? '',
      genre: this.newBookForm.value.genre ?? '',
      publisher: this.newBookForm.value.publisher ?? '',
      publishDate: this.newBookForm.value.publishDate ?? '',
      description: this.newBookForm.value.description ?? '',
      isbn: this.newBookForm.value.isbn ?? '',
      language: this.newBookForm.value.language ?? '',
      pages: this.newBookForm.value.pages ?? 0,
    };

    this.http.createBook(newBook).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success(`${response.message}`);
          this.books = [...this.books, response];
          this.router.navigateByUrl('books');
          this.isSubmitting = false;
        } else {
          this.toastr.error('Error creating book.', response.error);
          this.isSubmitting = false;
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message);
        this.isSubmitting = false;
      },
    });
  }
}
