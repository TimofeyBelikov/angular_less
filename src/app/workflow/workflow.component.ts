import { Component, OnInit } from '@angular/core';
import { GithubCommit, GithubContributor, WorkflowService } from './workflow.service';

@Component({
    selector: 'workflow',
    templateUrl: 'workflow.component.html',
    styleUrls : ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {
    
    commits : GithubCommit[] = []
    contributors : GithubContributor[] = []

    constructor(
        private _workflowService : WorkflowService
    ){}

    ngOnInit() { 
        this._workflowService.getCommits().subscribe(response=>{
            this.commits = response
        })

        this._workflowService.getContributors().subscribe(response=>{
            this.contributors = response
        })
    }
}

