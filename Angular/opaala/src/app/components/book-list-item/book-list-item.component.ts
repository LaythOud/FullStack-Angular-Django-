import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookList } from '../../classes/book-list/book-list';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-book-list-item',
  imports: [RouterModule],
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent {
  @Input() list!: BookList;
  @Output() remove = new EventEmitter<string>
  constructor(private bookService: BookService, private toastService: ToastService) {}
  

  deleteList(listSlug: string){
    this.bookService.deleteBookList(listSlug).subscribe({
      next:(data) => {
        this.remove.emit(data.message)
      },
      error:(error) => {
        if(error.error?.message){
          this.toastService.showToast(error.error.message, 'error');
        }else{
          this.toastService.showToast(`Error deleting book list`, 'error');
        }
      }
    })
  }
}
