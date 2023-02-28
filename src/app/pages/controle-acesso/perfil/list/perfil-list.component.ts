import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PerfilUsuario } from 'app/interfaces/perfilUsuario';
import { PerfilUsuarioService } from 'app/services/perfilUsuario.service';

@Component({
    selector     : 'perfil-list',
    templateUrl  : './perfil-list.component.html',
    styleUrls  : ['./perfil-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PerfilListComponent
{
    pesquisaPerfil: string = '';

    alertaSucesso = false;
    alertaErro = false;
    isLoading = false;    

    pagination: any;

    perfis: Array<PerfilUsuario> = [];
    perfisCopia: Array<PerfilUsuario> = [];
    constructor(private perfilUsuarioService: PerfilUsuarioService,
                private _router: Router,
                private _fuseConfirmationService: FuseConfirmationService){}

    async ngOnInit() {
        this.listarPerfisComPaginacao();
    }

    novoPerfil() {
        this._router.navigate(['controle-acesso/perfis/novo']);
    }

    editarPerfil(id) {
        this._router.navigate(['controle-acesso/perfis/atualizar', id]);
    }

    async excluirPerfil(id) {
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Excluir perfil',
            message: 'Tem certeza que deseja remover esse perfil? Essa ação não pode ser desfeita!',
            actions: {
                confirm: {
                    label: 'Remover'
                }
            }
        });

        confirmation.afterClosed().subscribe(async (result) => {
            if ( result === 'confirmed' ) {
                try {
                    await this.perfilUsuarioService.excluir(id);
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

        let perfisPaginados: any = await this.perfilUsuarioService.listarPaginado(event.pageIndex, event.pageSize);
        this.perfis = perfisPaginados.perfis;
        this.perfisCopia = perfisPaginados.perfis;
        this.pagination.length = perfisPaginados.totalRegistros;
        this.pagination.lastPage = Math.ceil(perfisPaginados.totalRegistros / event.pageSize);
        this.pagination.startIndex = event.pageIndex * event.pageSize + 1;
        this.pagination.endIndex = (event.pageIndex + 1) * event.pageSize;

    }

    async listarPerfisComPaginacao() {

        this.pagination = {
            page      : 0, //Página Atual
            size      : 5, //Quantidade de Itens por Página
            length    : 0, //Total de Registros
            lastPage  : 0, //O Número da última página
            startIndex: 0, //Índice do primeiro item da página atual
            endIndex  : 0  //Índice do último item da página atual
        };

        let perfisPaginados: any = await this.perfilUsuarioService.listarPaginado(this.pagination.page, this.pagination.size);
        this.perfis = perfisPaginados.perfis;
        this.perfisCopia = perfisPaginados.perfis;
        this.pagination.length = perfisPaginados.totalRegistros;
        this.pagination.lastPage = Math.ceil(perfisPaginados.totalRegistros / this.pagination.size);
        this.pagination.startIndex = this.pagination.page * this.pagination.size + 1;
        this.pagination.endIndex = (this.pagination.page + 1) * this.pagination.size;

    }

    pesquisarPerfis(pesquisa) {
        this.perfis = this.perfisCopia;
        this.perfis = this.perfis.filter(perfil => {
            if(perfil.descricao.toLowerCase().includes(pesquisa.toLowerCase())) {
                return perfil;
            };
        });
    }
}
