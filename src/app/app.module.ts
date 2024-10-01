import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { StoresModule } from './stores/stores.module';
import { StoresComponent } from './stores/stores.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		RouterModule.forRoot([
			{
				path : 'products',
				component : ProductComponent,
			},
			{
				path : 'stores',
				component : StoresComponent
			}
		]),
		BrowserModule,
		ProductModule,
		StoresModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
