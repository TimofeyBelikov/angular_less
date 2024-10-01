import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
	selector: 'product-item',
	templateUrl: 'product-item.component.html',
	styleUrls: ['./product-item.component.scss']
})

export class ProductItemComponent implements OnInit {

	productList: ProductItem[] = [
		// 0
		{
			name: 'Шорты',
			category: 'Одежда',
			count: 5,
			enabled: true
		},
		// 1
		{
			name: 'Джинсы?',
			category: 'Одежда',
			count: 0,
			enabled: true
		},
		// 2
		{
			name: 'Ноутбук',
			category: 'Электроника',
			count: 0,
			enabled: true
		}
	]
	// Джинсы
	product: ProductItem = this.productList[1]

	constructor() { }

	ngOnInit() {
	}

	revertEnabled(_name: string) {
		let index = this.productList.findIndex(product => product.name == _name)
		this.productList[index].enabled = !(this.productList[index].enabled)
	}
}

interface ProductItem {
	name: string,
	category: string,
	count: number,
	enabled: boolean
}

