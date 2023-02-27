import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { Usuario } from 'app/interfaces/usuario';
import { PerfilUsuarioService } from 'app/services/perfilUsuario.service';

@Component({
    selector     : 'usuario-form',
    templateUrl  : './usuario-form.component.html',
    styleUrls      : ['./usuario-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioFormComponent
{
    idUsuarioUrl: number;
    perfis: any = [];
    alertaSucesso = false;
    alertaErro = false;
    alertaErroFormulario = false;
    labelBotao = 'Salvar';
    usuarioForm: UntypedFormGroup;

    constructor(private usuarioService: UsuarioService,
                private perfilUsuarioService: PerfilUsuarioService,
                private _router: Router,
                private _formBuilder: UntypedFormBuilder,
                private _route: ActivatedRoute)
    {
    }

    async ngOnInit() {        
        this.usuarioForm = this._formBuilder.group({            
            id                 : [{value: null, disabled: true}],
            name               : [null],
            user               : [null, Validators.required],
            avatar             : [null],
            status             : [null],
            email              : [null, Validators.required],
            password           : [null, Validators.required],
            id_perfil_acesso   : [null, Validators.required],
            createdAt          : [{value: null, disabled: true}],
            updatedAt          : [{value: null, disabled: true}]
        });
        
        this._route.params.subscribe(params => {
            this.idUsuarioUrl = params['id'];
            if(this.idUsuarioUrl > 0) {
                this.labelBotao = 'Atualizar'
                this.consultarUsuarioById(this.idUsuarioUrl);
            }
        });
        
        this.perfis = await this.carregarPerfis();
    }

    async cadastrarAtualizarUsuario() {
        
        if (this.usuarioForm.invalid) {            
            this.alertaErroFormulario = true;
                setTimeout(() => {
                    this.alertaErroFormulario = false;
            }, 5000);
        } else {
            if(this.labelBotao == 'Salvar') {
                try {
                    await this.usuarioService.adicionar(this.usuarioForm.value);
                    this.alertaSucesso = true;            
                    this.usuarioForm.disable();
                    setTimeout(() => {                        
                        this._router.navigate(['controle-acesso/usuarios']);                
                    }, 3000);
                } catch (error) {
                    console.log(error);
                    this.alertaErro = true;
                    setTimeout(() => {
                        this.alertaErro = false;
                    }, 5000);                                
                }
            } else if(this.labelBotao == 'Atualizar') {
                let usuario = await this.usuarioService.atualizarById(this.usuarioForm.value, this.idUsuarioUrl);
                this.alertaSucesso = true;                
                this.usuarioForm.disable();
                setTimeout(() => {                    
                    this._router.navigate(['controle-acesso/usuarios']);                
                }, 3000);
            }
        }        

    }

    async consultarUsuarioById(idUsuario) {
        let usuario: Usuario = await this.usuarioService.buscarPorId(idUsuario);
        this.setValuesForm(usuario);
    }

    setValuesForm(usuario) {
        this.usuarioForm.controls['id'].setValue(usuario.id);
        this.usuarioForm.controls['name'].setValue(usuario.name);
        this.usuarioForm.controls['user'].setValue(usuario.user);
        this.usuarioForm.controls['avatar'].setValue(usuario.avatar);
        this.usuarioForm.controls['status'].setValue(usuario.status);
        this.usuarioForm.controls['email'].setValue(usuario.email);        
        this.usuarioForm.controls['id_perfil_acesso'].setValue(usuario.id_perfil_acesso);        
        this.usuarioForm.controls['createdAt'].setValue(usuario.createdAt);
        this.usuarioForm.controls['updatedAt'].setValue(usuario.updatedAt);        
    }

    async carregarPerfis() {
        let perfis: any = await this.perfilUsuarioService.listar();
        let perfisSelect = perfis.map(perfil => {
            return {
                id: perfil.id,
                descricao: perfil.descricao
            };
        })
        return perfisSelect; 
    }
}
