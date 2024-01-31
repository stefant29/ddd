import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser1 } from '../user-1.model';
import { User1Service } from '../service/user-1.service';
import { User1FormService, User1FormGroup } from './user-1-form.service';

@Component({
  standalone: true,
  selector: 'jhi-user-1-update',
  templateUrl: './user-1-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class User1UpdateComponent implements OnInit {
  isSaving = false;
  user1: IUser1 | null = null;

  editForm: User1FormGroup = this.user1FormService.createUser1FormGroup();

  constructor(
    protected user1Service: User1Service,
    protected user1FormService: User1FormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user1 }) => {
      this.user1 = user1;
      if (user1) {
        this.updateForm(user1);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const user1 = this.user1FormService.getUser1(this.editForm);
    if (user1.id !== null) {
      this.subscribeToSaveResponse(this.user1Service.update(user1));
    } else {
      this.subscribeToSaveResponse(this.user1Service.create(user1));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser1>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(user1: IUser1): void {
    this.user1 = user1;
    this.user1FormService.resetForm(this.editForm, user1);
  }
}
