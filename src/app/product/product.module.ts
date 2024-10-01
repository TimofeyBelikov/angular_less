import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductItemComponent } from './product-item/product-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        MatButtonModule,
        CommonModule
    ],
    declarations: [
        // кнопка
        ProductComponent,
        // джинсы
        ProductItemComponent
    ],
    exports: [
        ProductComponent
    ],
    providers: [],
})
export class ProductModule {

}


