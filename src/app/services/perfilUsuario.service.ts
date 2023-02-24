import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../utils/http.service';
import { CrudInterface } from '../interfaces/crud';
import { PerfilUsuario } from '../interfaces/perfilUsuario';

@Injectable({
    providedIn: 'root',
})
export class PerfilUsuarioService implements CrudInterface {
    constructor(private http: HttpService) {}

    /**
     * Endpoint responsavel por buscar todos os perfis de usuário
     *
     * @return {*}  {Promise<PerfilUsuario>}
     * @memberof PerfilUsuarioService
     */
    public async listar(): Promise<PerfilUsuario> {
      return await this.http.get(`${environment.apiUrl}/perfil-usuario/perfis`);
    }

    /**
     * Endpoint responsável por atualizar o perfil de usuário
     *
     * @param {PerfilUsuario} perfilUsuario
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async atualizar(perfilUsuario: PerfilUsuario): Promise<any> {
        return await this.http.put(`${environment.apiUrl}/perfil-usuario/perfil/${perfilUsuario.id}`, perfilUsuario);
    }

    /**
     * Endpoint responsável por salvar um novo perfil de usuário
     *
     * @param {PerfilUsuario} perfilUsuario
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async adicionar(perfilUsuario: PerfilUsuario): Promise<any> {
      return await this.http.post(`${environment.apiUrl}/perfil-usuario/perfil`, perfilUsuario);
    }

    /**
     * Endpoint responsável por remover um perfil de usuário por id
     *
     * @param {number} id
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async excluir(id: number) {
        return await this.http.delete(`${environment.apiUrl}/perfil-usuario/perfil/${id}`);
    }
}
