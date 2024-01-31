import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser1 } from 'app/entities/user-1/user-1.model';
import { User1Service } from 'app/entities/user-1/service/user-1.service';
import { ICompany } from '../company.model';
import { CompanyService } from '../service/company.service';
import { CompanyFormService, CompanyFormGroup } from './company-form.service';

@Component({
  standalone: true,
  selector: 'jhi-company-update',
  templateUrl: './company-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CompanyUpdateComponent implements OnInit {
  isSaving = false;
  company: ICompany | null = null;

  user1sSharedCollection: IUser1[] = [];

  editForm: CompanyFormGroup = this.companyFormService.createCompanyFormGroup();

  constructor(
    protected companyService: CompanyService,
    protected companyFormService: CompanyFormService,
    protected user1Service: User1Service,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareUser1 = (o1: IUser1 | null, o2: IUser1 | null): boolean => this.user1Service.compareUser1(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.company = company;
      if (company) {
        this.updateForm(company);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const company = this.companyFormService.getCompany(this.editForm);
    if (company.id !== null) {
      this.subscribeToSaveResponse(this.companyService.update(company));
    } else {
      this.subscribeToSaveResponse(this.companyService.create(company));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>): void {
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

  protected updateForm(company: ICompany): void {
    this.company = company;
    this.companyFormService.resetForm(this.editForm, company);

    this.user1sSharedCollection = this.user1Service.addUser1ToCollectionIfMissing<IUser1>(this.user1sSharedCollection, company.user1);
  }

  protected loadRelationshipsOptions(): void {
    this.user1Service
      .query()
      .pipe(map((res: HttpResponse<IUser1[]>) => res.body ?? []))
      .pipe(map((user1s: IUser1[]) => this.user1Service.addUser1ToCollectionIfMissing<IUser1>(user1s, this.company?.user1)))
      .subscribe((user1s: IUser1[]) => (this.user1sSharedCollection = user1s));
  }
}
