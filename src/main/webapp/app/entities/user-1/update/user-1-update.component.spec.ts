import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IUserType } from 'app/entities/user-type/user-type.model';
import { UserTypeService } from 'app/entities/user-type/service/user-type.service';
import { ICompany } from 'app/entities/company/company.model';
import { CompanyService } from 'app/entities/company/service/company.service';
import { IUser1 } from '../user-1.model';
import { User1Service } from '../service/user-1.service';
import { User1FormService } from './user-1-form.service';

import { User1UpdateComponent } from './user-1-update.component';

describe('User1 Management Update Component', () => {
  let comp: User1UpdateComponent;
  let fixture: ComponentFixture<User1UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let user1FormService: User1FormService;
  let user1Service: User1Service;
  let userTypeService: UserTypeService;
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
    userTypeService = TestBed.inject(UserTypeService);
    companyService = TestBed.inject(CompanyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UserType query and add missing value', () => {
      const user1: IUser1 = { id: 'CBA' };
      const userType: IUserType = { id: '7cac9dbf-1ee1-4786-bfd7-485c7885ee01' };
      user1.userType = userType;

      const userTypeCollection: IUserType[] = [{ id: '93110e9d-d7dc-4d72-b6cc-92e84317dc19' }];
      jest.spyOn(userTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: userTypeCollection })));
      const additionalUserTypes = [userType];
      const expectedCollection: IUserType[] = [...additionalUserTypes, ...userTypeCollection];
      jest.spyOn(userTypeService, 'addUserTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ user1 });
      comp.ngOnInit();

      expect(userTypeService.query).toHaveBeenCalled();
      expect(userTypeService.addUserTypeToCollectionIfMissing).toHaveBeenCalledWith(
        userTypeCollection,
        ...additionalUserTypes.map(expect.objectContaining),
      );
      expect(comp.userTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Company query and add missing value', () => {
      const user1: IUser1 = { id: 'CBA' };
      const company: ICompany = { id: '0319a5df-9d7e-4315-9ce1-53e3ab657a53' };
      user1.company = company;

      const companyCollection: ICompany[] = [{ id: '09cd88db-a98f-42ae-a6c9-fa92e51931d0' }];
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
      const userType: IUserType = { id: 'f4feb769-9ad7-4faf-8ddb-42c1b9cd05f3' };
      user1.userType = userType;
      const company: ICompany = { id: 'e26a73c3-607a-4c43-8277-da6c9b548c06' };
      user1.company = company;

      activatedRoute.data = of({ user1 });
      comp.ngOnInit();

      expect(comp.userTypesSharedCollection).toContain(userType);
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
    describe('compareUserType', () => {
      it('Should forward to userTypeService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(userTypeService, 'compareUserType');
        comp.compareUserType(entity, entity2);
        expect(userTypeService.compareUserType).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
