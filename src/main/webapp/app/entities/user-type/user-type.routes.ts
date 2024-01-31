import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { UserTypeComponent } from './list/user-type.component';
import { UserTypeDetailComponent } from './detail/user-type-detail.component';
import { UserTypeUpdateComponent } from './update/user-type-update.component';
import UserTypeResolve from './route/user-type-routing-resolve.service';

const userTypeRoute: Routes = [
  {
    path: '',
    component: UserTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserTypeDetailComponent,
    resolve: {
      userType: UserTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserTypeUpdateComponent,
    resolve: {
      userType: UserTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserTypeUpdateComponent,
    resolve: {
      userType: UserTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default userTypeRoute;
