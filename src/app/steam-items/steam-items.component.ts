import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SteamItem, SteamItemsService, Tag } from './steam-items.service';
import { GradientService } from './colors.service';
import { SteamUser, SteamUsers } from './data/users.data';
import { StringOrder, TagSortOrder } from './data/sort-order.data';

@Component({
    selector: 'steam-items',
    templateUrl: 'steam-items.component.html',
    styleUrls : ['./steam-items.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class SteamItemsComponent implements OnInit {

    tagOrder : StringOrder[] = TagSortOrder
    users : SteamUser[] = SteamUsers

    items : SteamItem[] = []
    items_dota : SteamItem[] = []
    currentUser : string = this.users[0].name 
    total_count : number = 0

    constructor(
        private _itemsService : SteamItemsService,
        private _colorsService : GradientService
    ) { }

    ngOnInit() {
        this._loadItems(this.users[0].id)
        // this._loadDotaItems(this.users[0].id)
    }

    private _loadItems(id : string){
        this._itemsService.getItems(id).subscribe((response)=>{
            this.total_count = response.total_inventory_count
            this.items = response.descriptions.map((item : SteamItem)=>
                this._processItem(item)
            ).sort((a,b)=>
                this._sortFn(a,b)
            )
            console.warn('Данные с сервера', this.items)
        })
    }

    private _processItem(item : SteamItem) : SteamItem{
        const inspect_url : string = item?.market_actions?.[0]?.link
        const name_color : string = item?.name_color ? '#'+item?.name_color : '#FFFFFF'
        const _rarity_object : Tag = item?.tags?.find(tag=>tag.category==='Rarity')
        const rarity : string = _rarity_object?.color ? '#'+_rarity_object?.color : ''
        const tag_name : string = _rarity_object?.localized_tag_name ?? null
        
        const gradient : string[] = this._colorsService.generateGradientColors(rarity, 3)
        const gradient_style : string = this._colorsService.genGradientStyle(gradient).concat(' 1')
        const image_style : string = this._colorsService.genImageFilter(rarity)

        return {
            icon_url : 'image/' + item.icon_url,
            name : item.name,
            inspect_url : inspect_url,
            name_color : name_color,
            rarity : rarity,
            tag_name : tag_name,
            gradient : gradient,
            gradient_style : gradient_style,
            image_style : image_style
        } 
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



