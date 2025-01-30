import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Book } from '../../classes/book/book';
import { BookItemComponent } from '../book-item/book-item.component';
import { BookList } from '../../classes/book-list/book-list';
import { BookService } from '../../services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { Serialize } from '../../classes/serialize';

@Component({
  selector: 'app-book-list',
  imports: [BookItemComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})

export class BookListComponent implements OnInit{
  books : WritableSignal<Book[]> = signal([])
  bookList: WritableSignal<BookList> = signal(new BookList("", ""));
  listSlug!: string ;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listSlug = params.get('slug') as string || ""; 
    });

    this.bookService.getBookList(this.listSlug as string).subscribe({
        next: (data) => {
          this.bookList.set(Serialize.serialize<BookList>([data.book_list])[0])
          this.books.set(Serialize.serialize<Book>(data.books))
        },
        error: (error) => {
          console.error('Error fetching books', error);
        }
    });
  }

  remove(book: Book){
    this.books.update(books => books.filter(b => b.slug !== book.slug));
  }

}
