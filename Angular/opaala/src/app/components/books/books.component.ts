import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BookItemComponent } from "../book-item/book-item.component";
import { Book } from '../../classes/book/book';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { Serialize } from '../../classes/serialize';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-book-list',
  imports: [BookItemComponent, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{
  books: WritableSignal<Book[]>  = signal([])
  
  constructor(private bookService: BookService, private toastService: ToastService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books.set(Serialize.serialize<Book>(data))
      },
      error: () => {
        this.toastService.showToast(`Error fetching books`, 'error');
      }
  });
  }
}
