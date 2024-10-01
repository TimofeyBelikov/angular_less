import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls : ['./product.component.scss']
})

export class ProductComponent implements OnInit, OnDestroy {
    
    constructor(
        private _router : Router
    ){}

    ngOnInit(){

    }

    ngOnDestroy(): void {
        
    }
    navigateToProduct(){
        this._router.navigate(['/stores'])
    }
}