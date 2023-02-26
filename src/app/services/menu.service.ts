import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CrudInterface } from '../interfaces/crud'
import { Menu } from '../interfaces/menu';
import { HttpService } from '../utils/http.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService implements CrudInterface {
    /**
     * Criar uma nova instancia de MenuService.
     * @param {HttpService} http
     * @memberof MenuService
     */
    constructor(private http: HttpService) {}

    /**
     * Endpoint responsável por buscar menu por ID
     *
     * @return {*} {Promise<Menu>}
     * @memberof MenuService
     */
    public async buscarPorId(idMenu): Promise<Menu> {
        return await this.http.get(`menu/menus/${idMenu}`);
    }
    
    /**
     * Endpoint responsável por listar todos os menus
     *
     * @return {*} {Promise<Array<Menu>>}
     * @memberof MenuService
     */
    public async listar(): Promise<Array<Menu>> {
        return await this.http.get(`menu/menus`);
    }

    /**
     * Endpoint responsável por atualizar um menu
     *
     * @param {*} menu
     * @return {*}
     * @memberof MenuService
     */
    public async atualizar(menu) {
        return await this.http.put(`menu/menus/${menu.id_menu}`, menu);
    }

    /**
     * Endpoint responsável por adicionar um novo menu
     *
     * @param {*} menu
     * @return {*}
     * @memberof MenuService
     */
    public async adicionar(menu) {
        return await this.http.post(`menu/menus`, menu);
    }

    /**
     * Endpoint responsável por excluir um menu pelo id
     *
     * @param {number} id
     * @return {*}
     * @memberof MenuService
     */
    public async excluir(id: number) {
        return await this.http.delete(`menu/menus/${id}`);
    }
}
