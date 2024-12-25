import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BooksComponent } from './books/bookList/books.component';
import { BookComponent } from './books/bookIndividual/book.component';
import { UpdateBookComponent } from './books/update-book/update-book.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { QuotesComponent } from './quotes/quotes.component';
import { HomeComponent } from './home/home.component';
import { apiGuard } from './auth/guard/api.guard';
import { loggedInGuard } from './auth/guard/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [apiGuard],
    children: [{ path: '', redirectTo: 'books', pathMatch: 'full' }],
  },
  { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [apiGuard],
    children: [
      { path: 'books', component: BooksComponent },
      { path: 'books/:id', component: BookComponent },
      { path: 'add-book', component: AddBookComponent },
      { path: 'books/:id/edit', component: UpdateBookComponent },
      { path: 'quotes', component: QuotesComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
