import { Component, OnInit } from '@angular/core';
import { SteamItem, SteamItemsService } from './steam-items.service';
import { GradientService } from './colors.service';

@Component({
    selector: 'steam-items',
    templateUrl: 'steam-items.component.html',
    styleUrls : ['./steam-items.component.scss']
})

export class SteamItemsComponent implements OnInit {

    items : SteamItem[] = []
    items_dota : SteamItem[] = []
    tagOrder : StringOrder[] = [
        {
            value : 'Stock',
            weight : 0
        },
        {
            value : 'Base Grade',
            weight : .8
        },
        {
            value : 'Industrial Grade',
            weight : 1
        },
        {
            value : 'Consumer Grade',
            weight : .9
        },
        {
            value : 'High Grade',
            weight : 2.2
        },
        {
            value : 'Mil-Spec Grade',
            weight : 3
        },
        {
            value : 'Industrial Grade',
            weight : 4
        },
        {
            value : 'Remarkable',
            weight : 4.1
        },
        {
            value : 'Exceptional',
            weight : 4.2
        },
        {
            value : 'Restricted',
            weight : 5
        },
        {
            value : 'Classified',
            weight : 6
        },
        {
            value : 'Master',
            weight : 6.6
        },
        {
            value  : 'Covert',
            weight : 8.1
        },
        {
            value : 'Extraordinary',
            weight : 8
        },
    ]
    
    users : SteamUser[] = [
        {
            name : 'Max',
            id : '76561198310808224'
        },
        {
            name : 'Tima',
            id : '76561198268357556'
        },
        {
            name : 'Misha',
            id : '76561198112108117'
        }
    ]

    currentUser : string = "Tima" 

    total_count : number =0

    constructor(
        private _itemsService : SteamItemsService,
        private _colorsService : GradientService
    ) { }

    ngOnInit() {
        this._loadItems(this.users[0].id)
        this._loadDotaItems(this.users[0].id)
    }

    private _loadItems(id : string){
        this._itemsService.getItems(id).subscribe((response)=>{
            this.total_count = response.total_inventory_count
            this.items = response.descriptions.map((item : SteamItem)=>
                ({
                    icon_url : 'image/' + item.icon_url,
                    name : item.name,
                    inspect_url : item?.market_actions?.[0]?.link,
                    name_color : item?.name_color ? '#'+item?.name_color : '#FFFFFF',
                    rarity : item?.tags?.find(item=>item.category==='Rarity')?.color ?
                        '#'+ item?.tags?.find(item=>item.category==='Rarity')?.color : '',
                    tag_name : item?.tags?.find(item=>item?.category==='Rarity')?.localized_tag_name ?? null
                })
            ).map((item : SteamItem)=>({
                ...item,
                gradient : this._colorsService.generateGradientColors(
                    item.rarity, 3
                ),
            })).map((item :SteamItem )=>({
                ...item,
                gradient_style : this._genGradientStyle(item.gradient).concat(' 1')
            })).map((item : SteamItem)=>({
                ...item,
                image_style :  this._genImageFilter(item.rarity)
            })).sort((a,b)=>this._sortFn(a,b))
        
            console.warn('Данные с сервера', this.items)
        })
        
    }

    private _sortFn(a : SteamItem, b : SteamItem) : number{
        const a_weight : number = this.tagOrder.find(o=>o.value==a?.tag_name)?.weight ?? 0
        const b_weight : number = this.tagOrder.find(o=>o.value==b?.tag_name)?.weight ?? 0
        if(a_weight > b_weight){
            return -1
        }
        if(a_weight < b_weight){
            return 1
        }
        if(a_weight == b_weight){
            return 0
        }
        return 0
    }

    private _genGradientStyle(colors ?: string[]) : string{
        return `linear-gradient(to bottom, ${colors.join(', ')})`
    }

    private _genImageFilter(color : string) : string{
        return `drop-shadow(0 0 0.75rem ${color})`
    }

    private _loadDotaItems(id : string){
        this._itemsService.getDota(id).subscribe((response)=>{
            console.warn(response)
            this.items_dota = response.descriptions.map((item : SteamItem)=>
                ({
                    icon_url : 'image/' + item.icon_url,
                    name : item.name,
                    inspect_url : item?.market_actions?.[0]?.link,
                    name_color : item?.name_color ? '#'+item?.name_color : '#FFFFFF',
                    rarity : item?.tags?.find(item=>item.category==='Rarity')?.color ?? null
                })
            )
        })
    }

    loadUser(id : string){
        this.currentUser = this.users.find(user=>user.id ==id).name
        this.items = []
        this.items_dota = []
        this._loadItems(id)
        this._loadDotaItems(id)
    }

    inspectItem(link : string){
        console.warn('try inspect', link)
        if(link){
            window.open(link, '_blank')
        }
    }

    isUserActive(name : string) : boolean{
        return this.currentUser == name
    }
}

interface SteamUser{
    name : string,
    id : string
}

interface StringOrder{
    weight : number,
    value : string
}