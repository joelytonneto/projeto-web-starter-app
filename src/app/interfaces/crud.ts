export abstract class CrudInterface {
    /**
     * RETORNAR A LISTA DE TODOS OS OBJETOS
     *
     * @abstract
     * @return {*}  {Promise<T>}
     * @memberof CrudInterface
     */
    public abstract listar();

    /**
     * ATUALIZAR UM OBJETO
     *
     * @abstract
     * @param {T} obj
     * @return {*}  {Promise<T>}
     * @memberof CrudInterface
     */
    public abstract atualizar(obj);

    /**
     * CRIAR UM NOVO OBJETO
     *
     * @abstract
     * @param {T} obj
     * @return {*}  {Promise<T>}
     * @memberof CrudInterface
     */
    public abstract adicionar(obj);

    /**
     * EXLCLUIR UM OBJETO
     *
     * @abstract
     * @param {number} codigo
     * @return {*}  {boolean}
     * @memberof CrudInterface
     */
    public abstract excluir(codigo: number);
}
