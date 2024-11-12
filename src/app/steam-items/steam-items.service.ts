import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SteamItemsService {

    private URL : string = 'steam/inventory/'
    private URL_TAIL : string = '/730/2?count=1000'
    private URL_TAIL_DOTA : string = '/570/2?count=150'

    constructor(private _http: HttpClient) { }

    getItems(id : string) : Observable<SteamResponse>{
        return this._http.get<SteamResponse>(
            `${this.URL}${id}${this.URL_TAIL}`
        )
    }

    getDota(id : string) : Observable<SteamResponse>{
        return this._http.get<SteamResponse>(
            `${this.URL}${id}${this.URL_TAIL_DOTA}`
        )
    }
}

export interface SteamItem extends Additional{
    icon_url : string,
    name : string,
    inspect_url ?: string,
    market_actions ?: {
        link : string,
        name : string
    }[],
    name_color ?: string,
    rarity ?: string,
    tag_name?: string,
    tags ?: Tag[]
}
export interface Tag{
    category ?: string,
    internal_name ?: string,
    localized_category_name?: string,
    localized_tag_name?: string
    color ?: string
}
export interface Additional{
    gradient ?: string[],
    gradient_style ?: string,
    image_style ?: string
}

// "category": "Rarity",
// "internal_name": "Rarity_Ancient",
// "localized_category_name": "Quality",
// "localized_tag_name": "Extraordinary",
// "color": "eb4b4b"

export interface SteamResponse{
    assets : any[],
    descriptions : SteamItem[],
    total_inventory_count : number
}