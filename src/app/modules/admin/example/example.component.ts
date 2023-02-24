import { Component, ViewEncapsulation } from '@angular/core';
import { Menu } from 'app/interfaces/menu';
import { MenuService } from 'app/services/menu.service';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent
{
    constructor(private menuService: MenuService){}

    async ngOnInit() {
        let menu: Array<Menu> = await this.menuService.listar();
        console.log(menu);
    }
}
