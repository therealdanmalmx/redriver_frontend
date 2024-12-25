import { HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [RouterLink, NgIf],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  standalone: true,
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  http = inject(ApiService);
  toastr = inject(ToastrService);
  hasLoaded = false;

  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  ngOnInit() {
    this.http.getBooks().subscribe({
      next: (res: any) => {
        if (res) {
          this.books = res.data;
          this.hasLoaded = true;
        }
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      },
    });
  }

  deleteBook(id: number) {
    this.http.deleteBook(id).subscribe({
      next: () => {
        const bookTitle = this.books.find((book) => book.id === id).title;
        if (bookTitle || bookTitle !== undefined) {
          this.toastr.success(`${bookTitle} deleted successfully.`);
          this.books = this.books.filter((book) => book.id !== id);
        } else {
          this.toastr.error('Error deleting book.');
          return;
        }
      },
      error: (error) => {
        this.toastr.error(error.statusText);
      },
    });
  }
}
