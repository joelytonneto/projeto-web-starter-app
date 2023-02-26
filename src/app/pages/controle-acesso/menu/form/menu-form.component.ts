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
    idMenuUrl: number;
    menusPais: any = [];
    alertaSucesso = false;
    alertaErro = false;
    alertaErroFormulario = false;
    labelBotao = 'Salvar';
    menuForm: UntypedFormGroup;

    constructor(private menuService: MenuService,
                private _router: Router,
                private _formBuilder: UntypedFormBuilder,
                private _route: ActivatedRoute)
    {
    }

    async ngOnInit() {        
        this.menuForm = this._formBuilder.group({
            id_menu      : [{value: null, disabled: true}],
            id           : [null, Validators.required],
            title        : [null, Validators.required],
            subtitle     : [null],
            type         : [null, Validators.required],
            icon         : [null],
            link         : [null, Validators.required],
            id_sistema   : [null],
            has_sub_menu : [false],
            parent_id    : [null],
            ordem        : [null],
            createdAt    : [{value: null, disabled: true}],
            updatedAt    : [{value: null, disabled: true}]
        });
        
        this._route.params.subscribe(params => {
            this.idMenuUrl = params['id'];
            if(this.idMenuUrl > 0) {
                this.labelBotao = 'Atualizar'
                this.consultarMenuById(this.idMenuUrl);
            }
        });
        
        this.menusPais = await this.carregarMenusPais();
    }

    async cadastrarAtualizarMenu() {
        
        if (this.menuForm.invalid) {            
            this.alertaErroFormulario = true;
                setTimeout(() => {
                    this.alertaErroFormulario = false;
            }, 5000);
        } else {
            if(this.labelBotao == 'Salvar') {
                try {
                    await this.menuService.adicionar(this.menuForm.value);
                    this.alertaSucesso = true;            
                    this.menuForm.disable();
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
                let menu = await this.menuService.atualizarById(this.menuForm.value, this.idMenuUrl);
                this.alertaSucesso = true;                
                this.menuForm.disable();
                setTimeout(() => {                    
                    this._router.navigate(['controle-acesso/menus']);                
                }, 3000);
            }
        }        

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

    async carregarMenusPais() {
        let menus = await this.menuService.listar();
        let menusPais = menus.filter(menu => {
            return (menu.parent_id == null && menu.has_sub_menu)
        });
        let menusPaisSelect = menusPais.map(menu => {
            return {
                id_menu: menu.id_menu,
                title: menu.title
            };
        })
        return menusPaisSelect; 
    }
}
