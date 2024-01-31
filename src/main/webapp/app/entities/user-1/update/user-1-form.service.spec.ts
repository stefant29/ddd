import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-1.test-samples';

import { User1FormService } from './user-1-form.service';

describe('User1 Form Service', () => {
  let service: User1FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User1FormService);
  });

  describe('Service methods', () => {
    describe('createUser1FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUser1FormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nume: expect.any(Object),
            prenume: expect.any(Object),
            cnp: expect.any(Object),
            userType: expect.any(Object),
            company: expect.any(Object),
          }),
        );
      });

      it('passing IUser1 should create a new form with FormGroup', () => {
        const formGroup = service.createUser1FormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nume: expect.any(Object),
            prenume: expect.any(Object),
            cnp: expect.any(Object),
            userType: expect.any(Object),
            company: expect.any(Object),
          }),
        );
      });
    });

    describe('getUser1', () => {
      it('should return NewUser1 for default User1 initial value', () => {
        const formGroup = service.createUser1FormGroup(sampleWithNewData);

        const user1 = service.getUser1(formGroup) as any;

        expect(user1).toMatchObject(sampleWithNewData);
      });

      it('should return NewUser1 for empty User1 initial value', () => {
        const formGroup = service.createUser1FormGroup();

        const user1 = service.getUser1(formGroup) as any;

        expect(user1).toMatchObject({});
      });

      it('should return IUser1', () => {
        const formGroup = service.createUser1FormGroup(sampleWithRequiredData);

        const user1 = service.getUser1(formGroup) as any;

        expect(user1).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUser1 should not enable id FormControl', () => {
        const formGroup = service.createUser1FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUser1 should disable id FormControl', () => {
        const formGroup = service.createUser1FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
