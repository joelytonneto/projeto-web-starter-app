import { Injectable } from '@angular/core';
import { HttpService } from '../utils/http.service';
import { CrudInterface } from '../interfaces/crud';
import { PerfilUsuario } from '../interfaces/perfilUsuario';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PerfilUsuarioService implements CrudInterface {
    constructor(private http: HttpService) {}

    /**
     * Endpoint responsável por buscar perfil por ID
     *
     * @return {*} {Promise<PerfilUsuario>}
     * @memberof PerfilUsuarioService
     */
    public async buscarPorId(idPerfil): Promise<PerfilUsuario> {
        return await this.http.get(`perfil-usuario/perfil/${idPerfil}`);
    }

    /**
     * Endpoint responsável por listar todos os perfis
     *
     * @return {*} {Promise<Array<PerfilUsuario>>}
     * @memberof PerfilUsuarioService
     */
    public async listarPaginado(pagina: number, totalItensPagina: number): Promise<Array<PerfilUsuarioService>> {
        const params = new HttpParams()
            .set('page', pagina.toString())
            .set('size', totalItensPagina.toString());
        return await this.http.get(`perfil-usuario/perfis-paginado`, { params });
    }

    /**
     * Endpoint responsavel por buscar todos os perfis de usuário
     *
     * @return {*}  {Promise<PerfilUsuario>}
     * @memberof PerfilUsuarioService
     */
    public async listar(): Promise<PerfilUsuario> {
      return await this.http.get(`perfil-usuario/perfis`);
    }

    /**
     * Endpoint responsável por atualizar o perfil de usuário
     *
     * @param {PerfilUsuario} perfilUsuario
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async atualizar(perfilUsuario: PerfilUsuario): Promise<any> {
        return await this.http.put(`perfil-usuario/perfil/${perfilUsuario.id}`, perfilUsuario);
    }

    /**
     * Endpoint responsável por atualizar um perfil de usuário
     *
     * @param {*} perfilUsuario
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async atualizarById(perfilUsuario, idPerfil) {
        return await this.http.put(`perfil-usuario/perfil/${idPerfil}`, perfilUsuario);
    }

    /**
     * Endpoint responsável por salvar um novo perfil de usuário
     *
     * @param {PerfilUsuario} perfilUsuario
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async adicionar(perfilUsuario: PerfilUsuario): Promise<any> {
      return await this.http.post(`perfil-usuario/perfil`, perfilUsuario);
    }

    /**
     * Endpoint responsável por remover um perfil de usuário por id
     *
     * @param {number} id
     * @return {*}
     * @memberof PerfilUsuarioService
     */
    public async excluir(id: number) {
        return await this.http.delete(`perfil-usuario/perfil/${id}`);
    }
}
