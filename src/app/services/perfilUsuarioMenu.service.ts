import { Injectable } from '@angular/core';
import { HttpService } from '../utils/http.service';
import { CrudInterface } from '../interfaces/crud';
import { PerfilUsuarioMenu } from '../interfaces/perfilUsuarioMenu';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PerfilUsuarioMenuService implements CrudInterface {
    constructor(private http: HttpService) {}

    /**
     * Endpoint responsável por buscar perfil usuário menu por ID
     *
     * @return {*} {Promise<PerfilUsuarioMenu>}
     * @memberof PerfilUsuarioMenuService
     */
    public async buscarPorId(idPerfilUsuarioMenu): Promise<PerfilUsuarioMenu> {
        return await this.http.get(`perfil-usuario-menu/perfil/${idPerfilUsuarioMenu}`);
    }

    /**
     * Endpoint responsavel por buscar todos os perfis usuário menu pelo id_perfil_acesso
     *
     * @return {*}  {Promise<PerfilUsuarioMenu>}
     * @memberof PerfilUsuarioMenuService
     */
    public async listarMenusByIdPerfil(idPerfil): Promise<PerfilUsuarioMenuService> {
      return await this.http.get(`perfil-usuario-menu/perfis/${idPerfil}`);
    }

    /**
     * Endpoint responsavel por buscar todos os perfis usuário menu
     *
     * @return {*}  {Promise<PerfilUsuarioMenu>}
     * @memberof PerfilUsuarioMenuService
     */
    public async listar(): Promise<PerfilUsuarioMenuService> {
        return await this.http.get(`perfil-usuario-menu/perfis`);
      }

    /**
     * Endpoint responsável por atualizar o perfil usuário menu
     *
     * @param {PerfilUsuarioMenu} perfilUsuarioMenu
     * @return {*}
     * @memberof PerfilUsuarioMenuService
     */
    public async atualizar(perfilUsuarioMenu: PerfilUsuarioMenu): Promise<any> {
        return await this.http.put(`perfil-usuario-menu/perfil/${perfilUsuarioMenu.id}`, perfilUsuarioMenu);
    }

    /**
     * Endpoint responsável por atualizar um perfil usuário menu
     *
     * @param {*} perfilUsuarioMenu
     * @return {*}
     * @memberof PerfilUsuarioMenuService
     */
    public async atualizarById(perfilUsuarioMenu, idPerfilUsuarioMenu) {
        return await this.http.put(`perfil-usuario-menu/perfil/${idPerfilUsuarioMenu}`, perfilUsuarioMenu);
    }

    /**
     * Endpoint responsável por salvar um novo perfil usuário menu
     *
     * @param {PerfilUsuarioMenu} perfilUsuarioMenu
     * @return {*}
     * @memberof PerfilUsuarioMenuService
     */
    public async adicionar(perfilUsuarioMenu: PerfilUsuarioMenu): Promise<any> {
      return await this.http.post(`perfil-usuario-menu/perfil`, perfilUsuarioMenu);
    }

    /**
     * Endpoint responsável por limpar todos os menus de um perfil de usuario por id do perfil
     *
     * @param {number} id
     * @return {*}
     * @memberof PerfilUsuarioMenuService
     */
    public async excluirPerfilUsuarioMenuByIdPerfil(idPerfil: number) {
        return await this.http.delete(`perfil-usuario-menu/perfil/perfil-usuario-id/${idPerfil}`);
    }

    /**
     * Endpoint responsável por remover um perfil usuário menu por id
     *
     * @param {number} id
     * @return {*}
     * @memberof PerfilUsuarioMenuService
     */
    public async excluir(id: number) {
        return await this.http.delete(`perfil-usuario-menu/perfil/${id}`);
    }
}
