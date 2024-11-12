import { NgModule } from '@angular/core';
import { SteamItemsComponent } from './steam-items.component';
import { CommonModule } from '@angular/common';
import { SteamItemComponent } from './steam-item/steam-item.component';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

export const routes: Routes = [
    {
        path : '',
        component : SteamItemsComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
    ],
    exports: [],
    declarations: [
        SteamItemsComponent,
        SteamItemComponent
    ],
    providers: [],
})
export class SteamItemsModule { }
