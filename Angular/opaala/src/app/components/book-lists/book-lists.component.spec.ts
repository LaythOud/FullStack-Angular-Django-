import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListsComponent } from './book-lists.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AddListComponent } from '../add-list/add-list.component';
import { BookService } from '../../services/book/book.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookListComponent', () => {
  let component: BookListsComponent;
  let fixture: ComponentFixture<BookListsComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookService', ['getBookLists']);

    await TestBed.configureTestingModule({
      imports: [BookListsComponent, AddListComponent],
      providers: [{ provide: BookService, useValue: spy }, provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    bookServiceSpy.getBookLists.and.returnValue(of([]));
    

    fixture = TestBed.createComponent(BookListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should display AddListComponent when clicking Create List button in BookListComponent', () => {
    const button = fixture.debugElement.query(By.css('.create-list-button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCreatingList).toBeTrue();
  });
});
