import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
   {
    path: 'main',
    loadComponent: () =>
      import('./main/main.page').then(m => m.MainPage),

    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      },

      {
        path: 'create',
        loadComponent: () =>
          import('./create/create.page').then(m => m.CreatePage)
      },

      {
        path: 'edit',
        loadComponent: () =>
          import('./edit/edit.page').then(m => m.EditPage)
      },

      {
        path: 'view',
        loadComponent: () =>
          import('./view/view.page').then(m => m.ViewPage)
      }
    ]
  },
];
