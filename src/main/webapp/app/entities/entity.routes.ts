import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-1',
    data: { pageTitle: 'dddApp.user1.home.title' },
    loadChildren: () => import('./user-1/user-1.routes'),
  },
  {
    path: 'user-type',
    data: { pageTitle: 'dddApp.userType.home.title' },
    loadChildren: () => import('./user-type/user-type.routes'),
  },
  {
    path: 'company',
    data: { pageTitle: 'dddApp.company.home.title' },
    loadChildren: () => import('./company/company.routes'),
  },
  {
    path: 'client',
    data: { pageTitle: 'dddApp.client.home.title' },
    loadChildren: () => import('./client/client.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
