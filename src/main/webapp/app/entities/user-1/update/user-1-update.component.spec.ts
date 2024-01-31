import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICompany } from 'app/entities/company/company.model';
import { CompanyService } from 'app/entities/company/service/company.service';
import { User1Service } from '../service/user-1.service';
import { IUser1 } from '../user-1.model';
import { User1FormService } from './user-1-form.service';

import { User1UpdateComponent } from './user-1-update.component';

describe('User1 Management Update Component', () => {
  let comp: User1UpdateComponent;
  let fixture: ComponentFixture<User1UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let user1FormService: User1FormService;
  let user1Service: User1Service;
  let companyService: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), User1UpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(User1UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(User1UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    user1FormService = TestBed.inject(User1FormService);
    user1Service = TestBed.inject(User1Service);
    companyService = TestBed.inject(CompanyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Company query and add missing value', () => {
      const user1: IUser1 = { id: 'CBA' };
      const company: ICompany = { id: '93cc98fe-f2e0-46ec-8b97-8fca6547a32a' };
      user1.company = company;

      const companyCollection: ICompany[] = [{ id: '5fda04e0-dc7b-4dc7-81cf-e72a07128931' }];
      jest.spyOn(companyService, 'query').mockReturnValue(of(new HttpResponse({ body: companyCollection })));
      const additionalCompanies = [company];
      const expectedCollection: ICompany[] = [...additionalCompanies, ...companyCollection];
      jest.spyOn(companyService, 'addCompanyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ user1 });
      comp.ngOnInit();

      expect(companyService.query).toHaveBeenCalled();
      expect(companyService.addCompanyToCollectionIfMissing).toHaveBeenCalledWith(
        companyCollection,
        ...additionalCompanies.map(expect.objectContaining),
      );
      expect(comp.companiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const user1: IUser1 = { id: 'CBA' };
      const company: ICompany = { id: '02d13854-0d83-47c8-b2e5-4751db00e8ba' };
      user1.company = company;

      activatedRoute.data = of({ user1 });
      comp.ngOnInit();

      expect(comp.companiesSharedCollection).toContain(company);
      expect(comp.user1).toEqual(user1);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUser1>>();
      const user1 = { id: 'ABC' };
      jest.spyOn(user1FormService, 'getUser1').mockReturnValue(user1);
      jest.spyOn(user1Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ user1 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: user1 }));
      saveSubject.complete();

      // THEN
      expect(user1FormService.getUser1).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(user1Service.update).toHaveBeenCalledWith(expect.objectContaining(user1));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUser1>>();
      const user1 = { id: 'ABC' };
      jest.spyOn(user1FormService, 'getUser1').mockReturnValue({ id: null });
      jest.spyOn(user1Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ user1: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: user1 }));
      saveSubject.complete();

      // THEN
      expect(user1FormService.getUser1).toHaveBeenCalled();
      expect(user1Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUser1>>();
      const user1 = { id: 'ABC' };
      jest.spyOn(user1Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ user1 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(user1Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCompany', () => {
      it('Should forward to companyService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(companyService, 'compareCompany');
        comp.compareCompany(entity, entity2);
        expect(companyService.compareCompany).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
