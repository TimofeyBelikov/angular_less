import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { StoresModule } from './stores/stores.module';
import { StoresComponent } from './stores/stores.component';
import { HtmlPracticeModule } from './html-practice/html-practice.module';
import { HtmlPracticeComponent } from './html-practice/html-practice.component';

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
			},
			{
				path : 'html-practice',
				component : HtmlPracticeComponent
			}
		]),
		BrowserModule,
		ProductModule,
		StoresModule,
		HtmlPracticeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
