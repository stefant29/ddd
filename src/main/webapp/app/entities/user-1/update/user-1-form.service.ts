import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUser1, NewUser1 } from '../user-1.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUser1 for edit and NewUser1FormGroupInput for create.
 */
type User1FormGroupInput = IUser1 | PartialWithRequiredKeyOf<NewUser1>;

type User1FormDefaults = Pick<NewUser1, 'id'>;

type User1FormGroupContent = {
  id: FormControl<IUser1['id'] | NewUser1['id']>;
  nume: FormControl<IUser1['nume']>;
  prenume: FormControl<IUser1['prenume']>;
  cnp: FormControl<IUser1['cnp']>;
  company: FormControl<IUser1['company']>;
};

export type User1FormGroup = FormGroup<User1FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class User1FormService {
  createUser1FormGroup(user1: User1FormGroupInput = { id: null }): User1FormGroup {
    const user1RawValue = {
      ...this.getFormDefaults(),
      ...user1,
    };
    return new FormGroup<User1FormGroupContent>({
      id: new FormControl(
        { value: user1RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nume: new FormControl(user1RawValue.nume),
      prenume: new FormControl(user1RawValue.prenume),
      cnp: new FormControl(user1RawValue.cnp),
      company: new FormControl(user1RawValue.company),
    });
  }

  getUser1(form: User1FormGroup): IUser1 | NewUser1 {
    return form.getRawValue() as IUser1 | NewUser1;
  }

  resetForm(form: User1FormGroup, user1: User1FormGroupInput): void {
    const user1RawValue = { ...this.getFormDefaults(), ...user1 };
    form.reset(
      {
        ...user1RawValue,
        id: { value: user1RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): User1FormDefaults {
    return {
      id: null,
    };
  }
}
