import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading/loading.service';
import { Book } from '../../classes/book/book';
import { BookList } from '../../classes/book-list/book-list';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = environment.BACKEND_URL + "/api"; 
  private readonly GET_BOOKS_URL = this.API_URL + "/books";
  private readonly ACTION_BOOKLISTS_URL = this.API_URL + "/lists";
  private readonly ACTION_BOOKLIST_URL = this.API_URL + "/lists";

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  // Fetch all books
  getBooks(): Observable<Book[]> {
    this.loadingService.show();
    return this.http.get<Book[]>(this.GET_BOOKS_URL).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }

  // Fetch all Lists
  getBookLists(): Observable<BookList[]> {
    this.loadingService.show();
    return this.http.get<BookList[]>(this.ACTION_BOOKLISTS_URL).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }

  // Fetch a single book list by slug
  getBookList(listSlug: string): Observable<{"book_list": BookList, "books": Book[]}> {
    this.loadingService.show();
    return this.http.get<{"book_list": BookList, "books": Book[]}>(`${this.ACTION_BOOKLIST_URL}/${listSlug}`).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }

  // Delete a single book list by slug
  deleteBookList(listSlug: string): Observable<{"message" : string}> {
    this.loadingService.show();
    return this.http.delete<{"message" : string}>(`${this.ACTION_BOOKLIST_URL}/${listSlug}`).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }

  // Add a new book list
  addBookList(name: string): Observable<{"message" : string, "slug": string}> {
    this.loadingService.show();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{"message" : string, "slug": string}>(this.ACTION_BOOKLISTS_URL, { "name":name }, { headers }).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }

  // Add a book to a list
  addBookToList(listSlug: string, bookSlug: string): Observable<{"message" : string}> {
    this.loadingService.show();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{"message" : string}>(`${this.ACTION_BOOKLIST_URL}/${listSlug}/books`, { "bookSlug":bookSlug }, { headers }).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }

  // Remove a book from a list
  removeBookFromList(listSlug: string, bookSlug: string): Observable<{"message" : string}> {
    this.loadingService.show();
    return this.http.delete<{"message" : string}>(`${this.ACTION_BOOKLIST_URL}/${listSlug}/books/${bookSlug}`).pipe(
      finalize(() => this.loadingService.hide())  
    );
  }
}
