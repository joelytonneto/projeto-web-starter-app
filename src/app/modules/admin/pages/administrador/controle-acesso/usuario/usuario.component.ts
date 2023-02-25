import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'inventory',
    templateUrl    : './usuario.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
