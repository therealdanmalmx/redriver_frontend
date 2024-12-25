import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../../../interfces/types';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-update-book',
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
  standalone: true,
})
export class UpdateBookComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);
  http = inject(ApiService);
  books: Book[] = [];
  bookId = this.route.snapshot.params['id'];
  isSubmitting = false;

  updateBookForm = {
    data: new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      author: new FormControl(''),
      genre: new FormControl(''),
      publisher: new FormControl(''),
      publishDate: new FormControl(''),
      description: new FormControl(''),
      isbn: new FormControl(''),
      language: new FormControl(''),
      pages: new FormControl(0),
    }),
    status: new FormControl(0),
    message: new FormControl(''),
  };

  ngOnInit() {
    this.getBook(this.bookId);
  }

  getBook(id: string) {
    this.http.getBook(id).subscribe({
      next: (book) => {
        this.updateBookForm.data.setValue({
          id: book.data.id,
          title: book.data.title,
          author: book.data.author,
          genre: book.data.genre,
          publisher: book.data.publisher,
          publishDate: book.data.publishDate,
          description: book.data.description,
          isbn: book.data.isbn,
          language: book.data.language,
          pages: book.data.pages,
        });
        this.updateBookForm.status.setValue(book.status);
        this.updateBookForm.message.setValue(book.message);
      },
      error: (error) => {
        console.error('Error fetching book:', error);
      },
    });
  }

  updateBook(id: string) {
    this.isSubmitting = true;
    const updatedBook: Book = {
      data: {
        id: this.updateBookForm.data.value.id ?? '',
        title: this.updateBookForm.data.value.title ?? '',
        author: this.updateBookForm.data.value.author ?? '',
        genre: this.updateBookForm.data.value.genre ?? '',
        publisher: this.updateBookForm.data.value.publisher ?? '',
        publishDate: this.updateBookForm.data.value.publishDate ?? '',
        description: this.updateBookForm.data.value.description ?? '',
        isbn: this.updateBookForm.data.value.isbn ?? '',
        language: this.updateBookForm.data.value.language ?? '',
        pages: this.updateBookForm.data.value.pages ?? 0,
      },
      message: this.updateBookForm.message.value ?? '',
      status: this.updateBookForm.status.value ?? 0,
    };
    this.http.updateBook(id, updatedBook).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(`${response.message}`);
          this.router.navigateByUrl(`books`);
          this.isSubmitting = false;
        }
      },
      error: () => {
        this.toastr.error(`Could not update ${updatedBook.data.title}`);
        this.isSubmitting = false;
      },
    });
  }
}
