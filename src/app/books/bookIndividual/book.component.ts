import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-book',
  imports: [CommonModule],
  providers: [ApiService],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  standalone: true,
})
export class BookComponent {
  http = inject(ApiService);
  route = inject(ActivatedRoute);
  book: any;
  bookImage: string | undefined;
  hasLoaded = false;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.http.getBook(id).subscribe((res) => {
        this.book = res.data;
        this.bookImage = `https://covers.openlibrary.org/b/isbn/${this.book.isbn}-L.jpg`;
        this.hasLoaded = true;
      });
    }
  }
}
