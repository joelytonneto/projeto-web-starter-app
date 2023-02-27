import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudInterface } from '../interfaces/crud'
import { Usuario } from '../interfaces/usuario';
import { HttpService } from '../utils/http.service';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService implements CrudInterface {
    /**
     * Criar uma nova instancia de UsuarioService.
     * @param {HttpService} http
     * @memberof UsuarioService
     */
    constructor(private http: HttpService) {}

    /**
     * Endpoint responsável por buscar usuario por ID
     *
     * @return {*} {Promise<Usuario>}
     * @memberof UsuarioService
     */
    public async buscarPorId(idUsuario): Promise<Usuario> {
        return await this.http.get(`usuario/users/${idUsuario}`);
    }

    /**
     * Endpoint responsável por listar todos os usuários
     *
     * @return {*} {Promise<Array<Usuario>>}
     * @memberof UsuarioService
     */
    public async listarPaginado(pagina: number, totalItensPagina: number): Promise<Array<Usuario>> {
        const params = new HttpParams()
            .set('page', pagina.toString())
            .set('size', totalItensPagina.toString());
        return await this.http.get(`usuario/users-paginado`, { params });
    }
    
    /**
     * Endpoint responsável por listar todos os usuarios
     *
     * @return {*} {Promise<Array<Usuario>>}
     * @memberof UsuarioService
     */
    public async listar(): Promise<Array<Usuario>> {
        return await this.http.get(`usuario/users`);
    }

    /**
     * Endpoint responsável por atualizar um usuario
     *
     * @param {*} usuario
     * @return {*}
     * @memberof UsuarioService
     */
    public async atualizar(usuario) {
        return await this.http.put(`usuario/users/${usuario.id}`, usuario);
    }

    /**
     * Endpoint responsável por atualizar um usuário
     *
     * @param {*} usuario
     * @return {*}
     * @memberof UsuarioService
     */
    public async atualizarById(usuario, idUsuario) {
        return await this.http.put(`usuario/users/${idUsuario}`, usuario);
    }

    /**
     * Endpoint responsável por adicionar um novo usuario
     *
     * @param {*} usuario
     * @return {*}
     * @memberof UsuarioService
     */
    public async adicionar(usuario) {
        return await this.http.post(`usuario/users`, usuario);
    }

    /**
     * Endpoint responsável por excluir um usuario pelo id
     *
     * @param {number} id
     * @return {*}
     * @memberof UsuarioService
     */
    public async excluir(id: number) {
        return await this.http.delete(`usuario/users/${id}`);
    }
}
