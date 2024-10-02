import { NgModule } from '@angular/core';
import { HtmlPracticeComponent } from './html-practice.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HtmlPracticeComponent],
    declarations: [HtmlPracticeComponent],
    providers: [],
})
export class HtmlPracticeModule { }
