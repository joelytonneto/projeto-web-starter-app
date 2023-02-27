import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Usuario } from 'app/interfaces/usuario';
import { UsuarioService } from 'app/services/usuario.service';
import { PerfilUsuarioService } from 'app/services/perfilUsuario.service';

@Component({
    selector     : 'usuario-list',
    templateUrl  : './usuario-list.component.html',
    styleUrls  : ['./usuario-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioListComponent
{
    perfisAcessoMap = new Map();
    alertaSucesso = false;
    alertaErro = false;
    isLoading = false;
    searchInputControl: UntypedFormControl = new UntypedFormControl();

    pagination: any;

    usuarios: Array<Usuario> = [];
    constructor(private usuarioService: UsuarioService,
                private perfilUsuarioService: PerfilUsuarioService,
                private _router: Router,
                private _fuseConfirmationService: FuseConfirmationService){}

    async ngOnInit() {
        this.listarPerfis();
        this.listarUsuariosComPaginacao();
    }

    novoUsuario() {
        this._router.navigate(['controle-acesso/usuarios/novo']);
    }   

    editarUsuario(id) {
        this._router.navigate(['controle-acesso/usuarios/atualizar', id]);
    }

    async excluirUsuario(id) {
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Excluir usuário',
            message: 'Tem certeza que deseja remover esse usuário? Essa ação não pode ser desfeita!',
            actions: {
                confirm: {
                    label: 'Remover'
                }
            }
        });

        confirmation.afterClosed().subscribe(async (result) => {            
            if ( result === 'confirmed' ) {                
                try {
                    await this.usuarioService.excluir(id);
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
        
        let usuariosPaginados: any = await this.usuarioService.listarPaginado(event.pageIndex, event.pageSize);
        this.usuarios = usuariosPaginados.usuarios;        
        this.pagination.length = usuariosPaginados.totalRegistros;
        this.pagination.lastPage = Math.ceil(usuariosPaginados.totalRegistros / event.pageSize);
        this.pagination.startIndex = event.pageIndex * event.pageSize + 1;
        this.pagination.endIndex = (event.pageIndex + 1) * event.pageSize;

    }

    async listarPerfis() {
        let perfis: any = await this.perfilUsuarioService.listar();
        perfis.forEach(perfil => {
            this.perfisAcessoMap.set(perfil.id, perfil);
        });        
    }

    async listarUsuariosComPaginacao() {

        this.pagination = {
            page      : 0, //Página Atual
            size      : 5, //Quantidade de Itens por Página
            length    : 0, //Total de Registros
            lastPage  : 0, //O Número da última página
            startIndex: 0, //Índice do primeiro item da página atual
            endIndex  : 0  //Índice do último item da página atual
        };

        let usuariosPaginados: any = await this.usuarioService.listarPaginado(this.pagination.page, this.pagination.size);
        this.usuarios = usuariosPaginados.usuarios;        
        this.pagination.length = usuariosPaginados.totalRegistros;
        this.pagination.lastPage = Math.ceil(usuariosPaginados.totalRegistros / this.pagination.size);
        this.pagination.startIndex = this.pagination.page * this.pagination.size + 1;
        this.pagination.endIndex = (this.pagination.page + 1) * this.pagination.size;

    }
}
