import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserTypeDetailComponent } from './user-type-detail.component';

describe('UserType Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: UserTypeDetailComponent,
              resolve: { userType: () => of({ id: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(UserTypeDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load userType on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', UserTypeDetailComponent);

      // THEN
      expect(instance.userType).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
