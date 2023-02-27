import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilUsuarioService } from 'app/services/perfilUsuario.service';
import { PerfilUsuarioMenuService } from 'app/services/perfilUsuarioMenu.service';
import { MenuService } from 'app/services/menu.service';
import { PerfilUsuario } from 'app/interfaces/perfilUsuario';
import { PerfilUsuarioMenu } from 'app/interfaces/perfilUsuarioMenu';

@Component({
    selector     : 'perfil-form',
    templateUrl  : './perfil-form.component.html',
    styleUrls      : ['./perfil-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PerfilFormComponent
{

    idPerfilUrl: number;
    alertaSucesso = false;
    alertaErro = false;
    alertaErroFormulario = false;
    labelBotao = 'Salvar';
    perfilForm: UntypedFormGroup;
    menusPerfilAcesso = [];
    menusAtivos: any = [];

    constructor(private perfilUsuarioService: PerfilUsuarioService,
                private menuService: MenuService,
                private perfilUsuarioMenuService: PerfilUsuarioMenuService,
                private _router: Router,
                private _formBuilder: UntypedFormBuilder,
                private _route: ActivatedRoute)
    {
    }

    async ngOnInit() {
        this.perfilForm = this._formBuilder.group({
            id                 : [{value: null, disabled: true}],
            id_sistema         : [null, Validators.required],
            descricao          : [null, Validators.required],
            ativo              : [true],
            createdAt          : [{value: null, disabled: true}],
            updatedAt          : [{value: null, disabled: true}]
        });

        this._route.params.subscribe(async params => {
            this.idPerfilUrl = params['id'];
            if(this.idPerfilUrl > 0) {
                this.labelBotao = 'Atualizar'
                this.consultarPerfilById(this.idPerfilUrl);
            }
        });
        this.menusPerfilAcesso = await this.carregarMenus();
    }

    async cadastrarAtualizarPerfil() {
        if (this.perfilForm.invalid) {
            this.alertaErroFormulario = true;
                setTimeout(() => {
                    this.alertaErroFormulario = false;
            }, 5000);
        } else {
            if(this.labelBotao == 'Salvar') {
                try {
                    await this.perfilUsuarioService.adicionar(this.perfilForm.value);
                    await this.salvarMenusPerfilAcesso(this.menusPerfilAcesso, this.idPerfilUrl);
                    this.alertaSucesso = true;
                    this.perfilForm.disable();
                    setTimeout(() => {
                        this._router.navigate(['controle-acesso/perfis']);
                    }, 5000);
                } catch (error) {
                    console.log(error);
                    this.alertaErro = true;
                    setTimeout(() => {
                        this.alertaErro = false;
                    }, 5000);
                }
            } else if(this.labelBotao == 'Atualizar') {
                let perfil = await this.perfilUsuarioService.atualizarById(this.perfilForm.value, this.idPerfilUrl);
                await this.salvarMenusPerfilAcesso(this.menusPerfilAcesso, this.idPerfilUrl);
                this.alertaSucesso = true;
                this.perfilForm.disable();
                setTimeout(() => {
                    this._router.navigate(['controle-acesso/perfis']);
                }, 5000);
            }
        }

    }

    async consultarPerfilById(idPerfil) {
        let perfil: PerfilUsuario = await this.perfilUsuarioService.buscarPorId(idPerfil);
        this.setValuesForm(perfil);
    }

    setValuesForm(perfil) {
        this.perfilForm.controls['id'].setValue(perfil.id);
        this.perfilForm.controls['id_sistema'].setValue(perfil.id_sistema);
        this.perfilForm.controls['descricao'].setValue(perfil.descricao);
        this.perfilForm.controls['ativo'].setValue(perfil.ativo);
        this.perfilForm.controls['createdAt'].setValue(perfil.createdAt);
        this.perfilForm.controls['updatedAt'].setValue(perfil.updatedAt);
    }

    async carregarMenus() {

        this.menusAtivos = await this.perfilUsuarioMenuService.listarMenusByIdPerfil(this.idPerfilUrl);

        let menusLista: any = await this.menuService.listar();
        let menus = menusLista.map(menu => {
            return {
                has_sub_menu: menu.has_sub_menu,
                id: menu.id,
                id_menu: menu.id_menu,
                id_sistema: menu.id_sistema,
                parent_id: menu.parent_id,
                title: menu.title,
                ativo: this.verificarSeMenuEstaAtivo(menu, this.menusAtivos)
            }
        });
        let menusPais = menus.filter(menu => (menu.parent_id == null && menu.has_sub_menu));
        let menusFilhos = menus.filter(menu => menu.parent_id != null);
        let menusSemSubMenus = menus.filter(menu => !(menu.has_sub_menu) && menu.parent_id == null);

        let menusFinal = [];

        menusSemSubMenus.forEach(menusSemSubMenus => {
            menusFinal.push(menusSemSubMenus);
        });

        menusPais.forEach(menuPai => {
            menuPai.children = [];
            menusFilhos.forEach(menuFilho => {
              if(menuFilho.parent_id == menuPai.id_menu) {
                menuPai.children.push(menuFilho)
              }
            });
            menusFinal.push(menuPai);
        });

        return menusFinal;
    }

    verificarSeMenuEstaAtivo(menuAVerificar, menusAtivos) {
        let ativo = false;
        menusAtivos.forEach(menuAtivo => {
            if(menuAVerificar.id_menu == menuAtivo.id_menu) {
                ativo = true;
            }
        });
        return ativo;
    }

    async salvarMenusPerfilAcesso(menusPerfilAcesso, idPerfilUsuario) {
        await this.limparPerfilAcesso(idPerfilUsuario);
        menusPerfilAcesso.forEach(async menu => {
            if(menu.ativo) {
                let perfilUsuarioMenu: any = {id_menu: null, id_perfil_usuario: null};
                perfilUsuarioMenu.id_menu = menu.id_menu;
                perfilUsuarioMenu.id_perfil_usuario = idPerfilUsuario;

                await this.perfilUsuarioMenuService.adicionar(perfilUsuarioMenu);

            }
            if(menu.has_sub_menu) {
                menu.children.forEach(async menuFilho => {
                    if(menuFilho.ativo) {
                        let perfilUsuarioMenu: any = {id_menu: null, id_perfil_usuario: null};
                        perfilUsuarioMenu.id_menu = menuFilho.id_menu;
                        perfilUsuarioMenu.id_perfil_usuario = idPerfilUsuario;

                        await this.perfilUsuarioMenuService.adicionar(perfilUsuarioMenu);
                    }
                })
            }
        });
    }

    async limparPerfilAcesso(idPerfilUsuario) {
        let limparMenusPerfil = await this.perfilUsuarioMenuService.excluirPerfilUsuarioMenuByIdPerfil(idPerfilUsuario);
        console.log(limparMenusPerfil);
        return limparMenusPerfil;
    }
}
