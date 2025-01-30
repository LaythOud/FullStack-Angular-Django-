import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BookService } from '../../services/book/book.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('BooksComponent', () => {
  let fixture: ComponentFixture<BooksComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookService', ['getBooks', 'getBookLists']);

    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [{ provide: BookService, useValue: spy }, provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    bookServiceSpy.getBooks.and.returnValue(of([
      { title: 'Dune', author: 'Frank Herbert', slug:"dune", year:"1965" },
      { title: '1984', author: 'George Orwell', slug:"1984", year:"1945"}
    ]));

    bookServiceSpy.getBookLists.and.returnValue(of([]));

    fixture = TestBed.createComponent(BooksComponent);
    fixture.detectChanges();
  });

  it('should load book items on init', () => {
    const bookItems = fixture.debugElement.queryAll(By.css('.book-item'));
    expect(bookItems.length).toBe(2);
  });
});
