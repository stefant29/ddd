import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { User1DetailComponent } from './user-1-detail.component';

describe('User1 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User1DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: User1DetailComponent,
              resolve: { user1: () => of({ id: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(User1DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load user1 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', User1DetailComponent);

      // THEN
      expect(instance.user1).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
