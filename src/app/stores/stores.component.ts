import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'stores',
    templateUrl: './stores.component.html',
    styleUrls : ['./stores.component.scss']
})

export class StoresComponent implements OnInit, OnDestroy {
    
    constructor(
        private _router : Router
    ){}

    ngOnInit(){
    }

    ngOnDestroy(): void {
    }

    navigateToProduct(){
        this._router.navigate(['/products'])
    }
}