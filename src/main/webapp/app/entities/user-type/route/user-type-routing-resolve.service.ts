import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserType } from '../user-type.model';
import { UserTypeService } from '../service/user-type.service';

export const userTypeResolve = (route: ActivatedRouteSnapshot): Observable<null | IUserType> => {
  const id = route.params['id'];
  if (id) {
    return inject(UserTypeService)
      .find(id)
      .pipe(
        mergeMap((userType: HttpResponse<IUserType>) => {
          if (userType.body) {
            return of(userType.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default userTypeResolve;
