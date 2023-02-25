import { Route } from '@angular/router';
import { UsuarioComponent } from 'app/modules/admin/pages/administrador/controle-acesso/usuario/usuario.component';
import { UsuarioListComponent } from 'app/modules/admin/pages/administrador/controle-acesso/usuario/list/usuario.component';
import { UsuariosResolver, InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from 'app/modules/admin/pages/administrador/controle-acesso/usuario/usuario.resolvers';
import { UsuarioFormComponent } from './usuario/form/usuario-form.component';

export const controleAcessoRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'cadastro-usuario'
    },
    {
        path     : 'cadastro-usuario',
        component: UsuarioComponent,
        children : [
            {
                path     : '',
                component: UsuarioListComponent,
                resolve  : {
                    brands    : InventoryBrandsResolver,
                    categories: InventoryCategoriesResolver,
                    products  : InventoryProductsResolver,
                    tags      : InventoryTagsResolver,
                    vendors   : InventoryVendorsResolver,
                    usuarios  : UsuariosResolver
                }
            },
            {
                path     : 'novo',
                component: UsuarioFormComponent,
                resolve  : {
                    brands    : InventoryBrandsResolver,
                    categories: InventoryCategoriesResolver,
                    products  : InventoryProductsResolver,
                    tags      : InventoryTagsResolver,
                    vendors   : InventoryVendorsResolver,
                    usuarios  : UsuariosResolver
                }
            },
            {
                path     : 'novo/:id',
                component: UsuarioFormComponent,
                resolve  : {
                    brands    : InventoryBrandsResolver,
                    categories: InventoryCategoriesResolver,
                    products  : InventoryProductsResolver,
                    tags      : InventoryTagsResolver,
                    vendors   : InventoryVendorsResolver,
                    usuarios  : UsuariosResolver
                }
            }
        ]
        /*children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]*/
    }
];
