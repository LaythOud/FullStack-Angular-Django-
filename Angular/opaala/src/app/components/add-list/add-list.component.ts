import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-add-list',
  imports: [FormsModule],
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
  newListName = '';

  @Output() listCreated = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();

  constructor(private toastService: ToastService) {}
  

  createList() {
    if (this.newListName.trim()) {
      this.listCreated.emit(this.newListName);
      this.newListName = '';
    }else{
      this.toastService.showToast("The 'name' field is required.", 'info');
    }
  }

  cancelCreation() {
    this.cancelForm.emit();
  }
}
