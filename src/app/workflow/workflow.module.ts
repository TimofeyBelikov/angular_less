import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
    {
        path : '',
        component : WorkflowComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatDividerModule
    ],
    exports: [WorkflowComponent],
    declarations: [WorkflowComponent],
    providers: [],
})

export class WorkflowModule { }
