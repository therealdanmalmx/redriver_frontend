import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, User } from '../../interfces/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://redrivertestdmo-ckancheedshtbehk.northeurope-01.azurewebsites.net';
  http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/book`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/book/${id}`);
  }

  createBook(newBook: Omit<Book['data'], 'id'>): Observable<any> {
    return this.http.post<Book>(`${this.apiUrl}/book`, newBook);
  }

  updateBook(id: string, updatedBook: Book): Observable<any> {
    return this.http.put<Book>(`${this.apiUrl}/book/${id}`, updatedBook.data);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/book/${id}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<User>(
      `${this.apiUrl}/auth/login`,
      {
        username,
        password,
      },
      { responseType: 'text' as 'json' }
    );
  }

  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, {
      username,
      password,
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
