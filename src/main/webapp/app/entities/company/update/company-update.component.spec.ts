import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IUser1 } from 'app/entities/user-1/user-1.model';
import { User1Service } from 'app/entities/user-1/service/user-1.service';
import { CompanyService } from '../service/company.service';
import { ICompany } from '../company.model';
import { CompanyFormService } from './company-form.service';

import { CompanyUpdateComponent } from './company-update.component';

describe('Company Management Update Component', () => {
  let comp: CompanyUpdateComponent;
  let fixture: ComponentFixture<CompanyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let companyFormService: CompanyFormService;
  let companyService: CompanyService;
  let user1Service: User1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CompanyUpdateComponent],
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
      .overrideTemplate(CompanyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompanyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    companyFormService = TestBed.inject(CompanyFormService);
    companyService = TestBed.inject(CompanyService);
    user1Service = TestBed.inject(User1Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User1 query and add missing value', () => {
      const company: ICompany = { id: 'CBA' };
      const user1: IUser1 = { id: '6e926242-adb7-4ea0-9a42-355443c3540b' };
      company.user1 = user1;

      const user1Collection: IUser1[] = [{ id: '7de41d69-a45e-48ab-9a76-9fd38eb2c066' }];
      jest.spyOn(user1Service, 'query').mockReturnValue(of(new HttpResponse({ body: user1Collection })));
      const additionalUser1s = [user1];
      const expectedCollection: IUser1[] = [...additionalUser1s, ...user1Collection];
      jest.spyOn(user1Service, 'addUser1ToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ company });
      comp.ngOnInit();

      expect(user1Service.query).toHaveBeenCalled();
      expect(user1Service.addUser1ToCollectionIfMissing).toHaveBeenCalledWith(
        user1Collection,
        ...additionalUser1s.map(expect.objectContaining),
      );
      expect(comp.user1sSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const company: ICompany = { id: 'CBA' };
      const user1: IUser1 = { id: '3a16f4fe-a1ca-42a0-b77f-31581c576c1c' };
      company.user1 = user1;

      activatedRoute.data = of({ company });
      comp.ngOnInit();

      expect(comp.user1sSharedCollection).toContain(user1);
      expect(comp.company).toEqual(company);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompany>>();
      const company = { id: 'ABC' };
      jest.spyOn(companyFormService, 'getCompany').mockReturnValue(company);
      jest.spyOn(companyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ company });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: company }));
      saveSubject.complete();

      // THEN
      expect(companyFormService.getCompany).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(companyService.update).toHaveBeenCalledWith(expect.objectContaining(company));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompany>>();
      const company = { id: 'ABC' };
      jest.spyOn(companyFormService, 'getCompany').mockReturnValue({ id: null });
      jest.spyOn(companyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ company: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: company }));
      saveSubject.complete();

      // THEN
      expect(companyFormService.getCompany).toHaveBeenCalled();
      expect(companyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompany>>();
      const company = { id: 'ABC' };
      jest.spyOn(companyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ company });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(companyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser1', () => {
      it('Should forward to user1Service', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(user1Service, 'compareUser1');
        comp.compareUser1(entity, entity2);
        expect(user1Service.compareUser1).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
