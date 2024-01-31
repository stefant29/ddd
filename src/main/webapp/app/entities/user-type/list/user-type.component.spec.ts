import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserTypeService } from '../service/user-type.service';

import { UserTypeComponent } from './user-type.component';

describe('UserType Management Component', () => {
  let comp: UserTypeComponent;
  let fixture: ComponentFixture<UserTypeComponent>;
  let service: UserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'user-type', component: UserTypeComponent }]),
        HttpClientTestingModule,
        UserTypeComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(UserTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UserTypeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.userTypes?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to userTypeService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getUserTypeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUserTypeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
