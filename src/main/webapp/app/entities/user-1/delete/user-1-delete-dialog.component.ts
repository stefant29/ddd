import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IUser1 } from '../user-1.model';
import { User1Service } from '../service/user-1.service';

@Component({
  standalone: true,
  templateUrl: './user-1-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class User1DeleteDialogComponent {
  user1?: IUser1;

  constructor(
    protected user1Service: User1Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.user1Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
