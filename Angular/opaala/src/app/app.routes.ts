import { Routes } from '@angular/router';
import { BookListsComponent } from './components/book-lists/book-lists.component';
import { BooksComponent } from './components/books/books.component';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
    { path: '', component: BooksComponent },
    { path: 'lists', component: BookListsComponent },
    { path: 'lists/:slug', component: BookListComponent }
  ];