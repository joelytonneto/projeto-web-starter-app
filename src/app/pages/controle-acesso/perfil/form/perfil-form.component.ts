import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilUsuarioService } from 'app/services/perfilUsuario.service';
import { PerfilUsuario } from 'app/interfaces/perfilUsuario';

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

    constructor(private perfilUsuarioService: PerfilUsuarioService,
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

        this._route.params.subscribe(params => {
            this.idPerfilUrl = params['id'];
            if(this.idPerfilUrl > 0) {
                this.labelBotao = 'Atualizar'
                this.consultarPerfilById(this.idPerfilUrl);
            }
        });
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
                    this.alertaSucesso = true;
                    this.perfilForm.disable();
                    setTimeout(() => {
                        this._router.navigate(['controle-acesso/perfis']);
                    }, 3000);
                } catch (error) {
                    console.log(error);
                    this.alertaErro = true;
                    setTimeout(() => {
                        this.alertaErro = false;
                    }, 5000);
                }
            } else if(this.labelBotao == 'Atualizar') {
                let perfil = await this.perfilUsuarioService.atualizarById(this.perfilForm.value, this.idPerfilUrl);
                this.alertaSucesso = true;
                this.perfilForm.disable();
                setTimeout(() => {
                    this._router.navigate(['controle-acesso/perfis']);
                }, 3000);
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
}
