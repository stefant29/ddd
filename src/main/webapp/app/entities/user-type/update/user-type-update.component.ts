import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser1 } from 'app/entities/user-1/user-1.model';
import { User1Service } from 'app/entities/user-1/service/user-1.service';
import { IUserType } from '../user-type.model';
import { UserTypeService } from '../service/user-type.service';
import { UserTypeFormService, UserTypeFormGroup } from './user-type-form.service';

@Component({
  standalone: true,
  selector: 'jhi-user-type-update',
  templateUrl: './user-type-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class UserTypeUpdateComponent implements OnInit {
  isSaving = false;
  userType: IUserType | null = null;

  user1sSharedCollection: IUser1[] = [];

  editForm: UserTypeFormGroup = this.userTypeFormService.createUserTypeFormGroup();

  constructor(
    protected userTypeService: UserTypeService,
    protected userTypeFormService: UserTypeFormService,
    protected user1Service: User1Service,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareUser1 = (o1: IUser1 | null, o2: IUser1 | null): boolean => this.user1Service.compareUser1(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userType }) => {
      this.userType = userType;
      if (userType) {
        this.updateForm(userType);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userType = this.userTypeFormService.getUserType(this.editForm);
    if (userType.id !== null) {
      this.subscribeToSaveResponse(this.userTypeService.update(userType));
    } else {
      this.subscribeToSaveResponse(this.userTypeService.create(userType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserType>>): void {
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

  protected updateForm(userType: IUserType): void {
    this.userType = userType;
    this.userTypeFormService.resetForm(this.editForm, userType);

    this.user1sSharedCollection = this.user1Service.addUser1ToCollectionIfMissing<IUser1>(this.user1sSharedCollection, userType.user1);
  }

  protected loadRelationshipsOptions(): void {
    this.user1Service
      .query()
      .pipe(map((res: HttpResponse<IUser1[]>) => res.body ?? []))
      .pipe(map((user1s: IUser1[]) => this.user1Service.addUser1ToCollectionIfMissing<IUser1>(user1s, this.userType?.user1)))
      .subscribe((user1s: IUser1[]) => (this.user1sSharedCollection = user1s));
  }
}
