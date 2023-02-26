import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MenuFormComponent } from './menu/form/menu-form.component';
import { MenuListComponent } from './menu/list/menu-list.component';

const controleAcessoRoutes: Route[] = [
  {
      path     : '',
      component: MenuListComponent
  },
  {
    path     : 'menus',
    children : [
      {
          path     : '',
          component: MenuListComponent
      },
      {
          path     : 'novo',
          component: MenuFormComponent,
      },
      {
          path     : 'atualizar/:id',
          component: MenuFormComponent,
      }
    ]    
  },
];

@NgModule({
    imports: [RouterModule.forChild(controleAcessoRoutes)],
    exports: [RouterModule],
})
export class ControleAcessoRoutingModule {}
