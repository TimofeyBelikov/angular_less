import { NgModule } from '@angular/core';
import { StoresComponent } from './stores.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatButtonModule
    ],
    exports: [
        StoresComponent
    ],
    declarations: [
        StoresComponent
    ],
    providers: [],
})
export class StoresModule {
}


