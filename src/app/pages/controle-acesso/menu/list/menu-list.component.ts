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
        this.listarMenusComPaginacao();
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

    async onPageChange(event) {
        
        let menusPaginados: any = await this.menuService.listarPaginado(event.pageIndex, event.pageSize);
        this.menus = menusPaginados.menus;        
        this.pagination.length = menusPaginados.totalRegistros;
        this.pagination.lastPage = Math.ceil(menusPaginados.totalRegistros / event.pageSize);
        this.pagination.startIndex = event.pageIndex * event.pageSize + 1;
        this.pagination.endIndex = (event.pageIndex + 1) * event.pageSize;

    }

    async listarMenusComPaginacao() {

        this.pagination = {
            page      : 0, //Página Atual
            size      : 5, //Quantidade de Itens por Página
            length    : 0, //Total de Registros
            lastPage  : 0, //O Número da última página
            startIndex: 0, //Índice do primeiro item da página atual
            endIndex  : 0  //Índice do último item da página atual
        };

        let menusPaginados: any = await this.menuService.listarPaginado(this.pagination.page, this.pagination.size);
        this.menus = menusPaginados.menus;        
        this.pagination.length = menusPaginados.totalRegistros;
        this.pagination.lastPage = Math.ceil(menusPaginados.totalRegistros / this.pagination.size);
        this.pagination.startIndex = this.pagination.page * this.pagination.size + 1;
        this.pagination.endIndex = (this.pagination.page + 1) * this.pagination.size;

    }
}
