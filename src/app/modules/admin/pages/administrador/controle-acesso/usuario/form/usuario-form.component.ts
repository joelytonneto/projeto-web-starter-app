import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario.types';

@Component({
    selector     : 'usuario-form',
    templateUrl  : './usuario-form.component.html',
    styleUrls      : ['./usuario-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioFormComponent
{
    usuarioForm: UntypedFormGroup;

    constructor(private _usuarioService: UsuarioService,
                private _formBuilder: UntypedFormBuilder,
                private _route: ActivatedRoute)
    {
    }

    ngOnInit(): void {
        this.usuarioForm = this._formBuilder.group({
            name         : [''],
            user        : [''],
            email        : [''],
            password        : [''],
            avatar       : [''],
            status       : [''],
            id_perfil_acesso : [1]
        });

        this._route.params.subscribe(params => {
            const idUsuario = params['id'];
        });
    }

    cadastrarNovoUsuario() {
        if (this.usuarioForm.invalid) {
            return console.log('Formulário Inválido');
        }

        // Disable the form
        // this.usuarioForm.disable();

        this._usuarioService.cadastrarUsuario(this.usuarioForm.value).subscribe({
            next: value => console.log(value),
            error: error => console.log(error),
            complete: () => console.log('complete')
        });        
    }
}
