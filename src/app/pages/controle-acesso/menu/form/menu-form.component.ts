import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/interfaces/menu';

@Component({
    selector     : 'menu-form',
    templateUrl  : './menu-form.component.html',
    styleUrls      : ['./menu-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuFormComponent
{
    alertaSucesso = false;
    alertaErro = false;
    labelBotao = 'Salvar';
    menuForm: UntypedFormGroup;

    constructor(private menuService: MenuService,
                private _router: Router,
                private _formBuilder: UntypedFormBuilder,
                private _route: ActivatedRoute)
    {
    }

    ngOnInit(): void {        

        this.menuForm = this._formBuilder.group({
            id_menu      : [null],
            id           : [null],
            title        : [null],
            subtitle     : [null],
            type         : [null],
            icon         : [null],
            link         : [null],
            id_sistema   : [null],
            has_sub_menu : [null],
            parent_id    : [null],
            ordem        : [null],
            createdAt    : [null],
            updatedAt    : [null]
        });

        this._route.params.subscribe(params => {
            const idMenu = params['id'];
            if(idMenu > 0) {
                this.labelBotao = 'Atualizar'
                this.consultarMenuById(idMenu);
            }
        });
    }

    async cadastrarAtualizarMenu() {
        
        if (this.menuForm.invalid) {
            return console.log('Formulário Inválido');
        }

        if(this.labelBotao == 'Salvar') {
            try {
                await this.menuService.adicionar(this.menuForm.value);
                this.alertaSucesso = true;            
                setTimeout(() => {
                    this._router.navigate(['controle-acesso/menus']);                
                }, 3000);
            } catch (error) {
                console.log(error);
                this.alertaErro = true;
                setTimeout(() => {
                    this.alertaErro = false;
                }, 5000);                                
            }
        } else if(this.labelBotao == 'Atualizar') {
            let menu = await this.menuService.atualizar(this.menuForm.value);
            this.alertaSucesso = true;
            console.log('Menu Atualizado');
            console.log(menu);
            setTimeout(() => {
                this._router.navigate(['controle-acesso/menus']);                
            }, 3000);
        }

        // Disable the form
        // this.usuarioForm.disable();

    }

    async consultarMenuById(idMenu) {
        let menu: Menu = await this.menuService.buscarPorId(idMenu);
        this.setValuesForm(menu);
    }

    setValuesForm(menu) {
        this.menuForm.controls['id_menu'].setValue(menu.id_menu);
        this.menuForm.controls['id'].setValue(menu.id);
        this.menuForm.controls['title'].setValue(menu.title);
        this.menuForm.controls['subtitle'].setValue(menu.subtitle);
        this.menuForm.controls['type'].setValue(menu.type);
        this.menuForm.controls['icon'].setValue(menu.icon);
        this.menuForm.controls['link'].setValue(menu.link);
        this.menuForm.controls['id_sistema'].setValue(menu.id_sistema);
        this.menuForm.controls['has_sub_menu'].setValue(menu.has_sub_menu);
        this.menuForm.controls['parent_id'].setValue(menu.parent_id);
        this.menuForm.controls['ordem'].setValue(menu.ordem);
        this.menuForm.controls['createdAt'].setValue(menu.createdAt);
        this.menuForm.controls['updatedAt'].setValue(menu.updatedAt);        
    }
}
