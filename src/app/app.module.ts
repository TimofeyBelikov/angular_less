import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { StoresModule } from './stores/stores.module';
import { StoresComponent } from './stores/stores.component';
import { HtmlPracticeModule } from './html-practice/html-practice.module';
import { HtmlPracticeComponent } from './html-practice/html-practice.component';
import { WorkflowModule } from './workflow/workflow.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { SteamItemsComponent } from './steam-items/steam-items.component';
registerLocaleData(localeRu);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		RouterModule.forRoot([
			{
				path : 'items',
				loadChildren : ()=>import('./steam-items/steam-items.module').then(m=>m.SteamItemsModule)
			},
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
			},
			{
				path : 'workflow',
				loadChildren : ()=>import('./workflow/workflow.module').then(m=>m.WorkflowModule)
			}
		]),
		CommonModule,
		HttpClientModule,
		BrowserModule,
		ProductModule,
		StoresModule,
		HtmlPracticeModule,
		WorkflowModule,
		
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'ru' }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
