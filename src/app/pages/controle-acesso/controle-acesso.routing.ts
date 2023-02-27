import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MenuFormComponent } from './menu/form/menu-form.component';
import { MenuListComponent } from './menu/list/menu-list.component';
import { UsuarioFormComponent } from './usuario/form/usuario-form.component';
import { UsuarioListComponent } from './usuario/list/usuario-list.component';
import { PerfilFormComponent } from './perfil/form/perfil-form.component';
import { PerfilListComponent } from './perfil/list/perfil-list.component';

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
  {
    path     : 'usuarios',
    children : [
      {
          path     : '',
          component: UsuarioListComponent
      },
      {
          path     : 'novo',
          component: UsuarioFormComponent,
      },
      {
          path     : 'atualizar/:id',
          component: UsuarioFormComponent,
      }
    ]
  },
  {
    path     : 'perfis',
    children : [
      {
          path     : '',
          component: PerfilListComponent
      },
      {
          path     : 'novo',
          component: PerfilFormComponent,
      },
      {
          path     : 'atualizar/:id',
          component: PerfilFormComponent,
      }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(controleAcessoRoutes)],
    exports: [RouterModule],
})
export class ControleAcessoRoutingModule {}
