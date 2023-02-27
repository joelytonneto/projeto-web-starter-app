import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControleAcessoRoutingModule } from './controle-acesso.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenuListComponent } from './menu/list/menu-list.component';
import { MenuFormComponent } from './menu/form/menu-form.component';
import { UsuarioListComponent } from './usuario/list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/form/usuario-form.component';
import { FuseAlertModule } from '@fuse/components/alert';

@NgModule({
    declarations: [
        MenuListComponent,
        MenuFormComponent,
        UsuarioListComponent,
        UsuarioFormComponent
    ],
    imports     : [
        CommonModule,
        ControleAcessoRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        FuseAlertModule
    ]
})
export class ControleAcessoModule { }
