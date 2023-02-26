import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Menu } from 'app/interfaces/menu';
import { MenuService } from 'app/services/menu.service';

@Component({
    selector     : 'menu-list',
    templateUrl  : './menu-list.component.html',
    styleUrls  : ['./menu-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuListComponent
{
    alertaSucesso = false;
    alertaErro = false;
    isLoading = false;
    searchInputControl: UntypedFormControl = new UntypedFormControl();

    pagination: any;

    menus: Array<Menu> = [];
    constructor(private menuService: MenuService,                
                private _router: Router,
                private _fuseConfirmationService: FuseConfirmationService){}

    async ngOnInit() {
        this.pagination = [];

        this.menus = await this.menuService.listar();        
    }

    novoMenu() {
        this._router.navigate(['controle-acesso/menus/novo']);
    }   

    editarMenu(id) {
        this._router.navigate(['controle-acesso/menus/atualizar', id]);
    }

    async excluirMenu(id) {
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Excluir menu',
            message: 'Tem certeza que deseja remover esse menu? Essa ação não pode ser desfeita!',
            actions: {
                confirm: {
                    label: 'Remover'
                }
            }
        });

        confirmation.afterClosed().subscribe(async (result) => {            
            if ( result === 'confirmed' ) {                
                try {
                    await this.menuService.excluir(id);
                    this.ngOnInit();
                    this.alertaSucesso = true;
                    setTimeout(() => {
                        this.alertaSucesso = false;
                    }, 10000); 
                } catch (error) {
                    this.alertaErro = true;
                    setTimeout(() => {
                        this.alertaErro = false;
                    }, 10000);
                    console.log(error);
                }
            }
        });
    }
}
