import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BookList } from '../../classes/book-list/book-list';
import { BookListItemComponent } from "../book-list-item/book-list-item.component";
import { AddListComponent } from "../add-list/add-list.component";
import { BookService } from '../../services/book/book.service';
import { Serialize } from '../../classes/serialize';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-book-lists',
  templateUrl: './book-lists.component.html',
  styleUrls: ['./book-lists.component.scss'],
  imports: [BookListItemComponent, AddListComponent]
})
export class BookListsComponent implements OnInit{
  bookLists: WritableSignal<BookList[]> = signal([]);
  isCreatingList = false;

  constructor(private bookService: BookService, private toastService: ToastService) {}
  ngOnInit() {
    this.loadBookLists();
  }

  loadBookLists() {
    this.bookService.getBookLists().subscribe({
      next:(data) => {
        this.bookLists.set(Serialize.serialize<BookList>(data))
      },
      error:() => {
        this.toastService.showToast(`Error fetching book lists`, 'error');
      }
    });
  }

  createList(name: string) {
    this.bookService.addBookList(name).subscribe({
      next: (data) => {
        this.isCreatingList = false;
        this.bookLists.update(bookLists => [...bookLists, new BookList(name, data.slug)]);
        this.toastService.showToast(data.message, 'success');
      },
      error: (error) => {
        if(error.error?.message){
          this.toastService.showToast(error.error.message, 'error');
        }else{
          this.toastService.showToast(`Error creating book list`, 'error');
        }
      }
    });
  }

  remove(event: string, list: BookList){
    this.toastService.showToast(event, 'success');
    this.bookLists.update(bookLists => bookLists.filter(bl => bl.slug !== list.slug));
  }

  navigateToCreateList() {
    this.isCreatingList = true;
  }

  cancelCreation() {
    this.isCreatingList = false;
  }
}
