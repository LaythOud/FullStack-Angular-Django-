import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { Book } from '../../classes/book/book';
import { FormsModule } from '@angular/forms';
import { BookList } from '../../classes/book-list/book-list';
import { BookService } from '../../services/book/book.service';
import { Serialize } from '../../classes/serialize';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-book-item',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent implements OnInit{
  @Input() book!: Book;
  @Input() isAddToListEnable = false;
  @Input() isDeleteFromListEnable = false;
  @Input() listSlug!: string;
  @Output() remove = new EventEmitter<void>();
  
  availableLists: WritableSignal<BookList[]> = signal([]); 
  selectedList: WritableSignal<string> = signal("");

  constructor(private bookService: BookService, private toastService: ToastService) {}
  

  ngOnInit() {
    this.loadBookLists();
  }

  loadBookLists() {
    this.bookService.getBookLists().subscribe({
      next: (data) => {
        this.availableLists.set(Serialize.serialize<BookList>(data))
      },
      error: () => {
        this.toastService.showToast(`Error fetching books`, 'error');
      }
    });
  }

  addToList(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedList.set(target.value);

    this.bookService.addBookToList(this.selectedList(), this.book.slug).subscribe({
      error: (error) => {
        if(error.error?.message){
          this.toastService.showToast(error.error.message, 'error');
        }else{
          this.toastService.showToast(`Error adding book to the list`, 'error');
        }
      },
      complete: () => {
        this.toastService.showToast(`Book '${this.book.title}' added successfully to the list '${this.selectedList()}'!`, 'success');
      }
    })
  }

  removeFromList() {
    this.bookService.removeBookFromList(this.listSlug, this.book.slug).subscribe({
      error: (error) => {
        if(error.error?.message){
          this.toastService.showToast(error.error.message, 'error');
        }else{
          this.toastService.showToast(`Error removing book from the list`, 'error');
        }
      },
      complete: () => {
        this.remove.emit()
        this.toastService.showToast(`Book '${this.book.title}' deleted successfully from the list '${this.selectedList()}'!`, 'success');
      }
    })
  }
}
