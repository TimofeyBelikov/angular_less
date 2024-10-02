import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GITHUB_TOKEN } from 'src/environments/credentials';

@Injectable({providedIn: 'root'})
export class WorkflowService {

    private GIT_URL : string = 'https://api.github.com/repos/TimofeyBelikov/angular_less/commits'
    private GIT_CONTRIBUTORS : string = 'https://api.github.com/repos/TimofeyBelikov/angular_less/contributors'
    private authHeaders : HttpHeaders = new HttpHeaders({
        'Authorization': `token ${GITHUB_TOKEN}`,  // Передача токена в заголовке
        'Accept': 'application/vnd.github.v3+json'  // Рекомендуется использовать этот заголовок
    })


    constructor(
        private _http: HttpClient,
    ){}

    getCommits() : Observable<GithubCommit[]>{
        return this._http.get<GithubCommit[]>(this.GIT_URL,{headers: this.authHeaders})
    }
    getContributors() : Observable<GithubContributor[]>{
        return this._http.get<GithubContributor[]>(this.GIT_CONTRIBUTORS,{headers : this.authHeaders})
    }
    
}

export interface GithubContributor{
    avatar_url : string,
    contributions : number,
    login : string
}

export interface GithubCommit{
    author : {
        login : string,
        id : number,
        avatar_url : string,
    },
    comments_url : string,
    commit : {
        author : {
            date : string,
            name : string
        },
        message : string
    }
}