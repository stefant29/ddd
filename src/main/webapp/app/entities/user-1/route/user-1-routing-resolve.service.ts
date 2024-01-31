import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUser1 } from '../user-1.model';
import { User1Service } from '../service/user-1.service';

export const user1Resolve = (route: ActivatedRouteSnapshot): Observable<null | IUser1> => {
  const id = route.params['id'];
  if (id) {
    return inject(User1Service)
      .find(id)
      .pipe(
        mergeMap((user1: HttpResponse<IUser1>) => {
          if (user1.body) {
            return of(user1.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default user1Resolve;
