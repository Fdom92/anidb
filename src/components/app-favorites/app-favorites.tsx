import { Component, h, State } from '@stencil/core';

@Component({
    tag: 'app-favorites',
    styleUrl: 'app-favorites.css'
})
export class AppFavorites {

    @State() favItems: any;

    componentWillLoad() {
        const favorites = localStorage.getItem('AniDB_Favorites');
        if (favorites) {
            const items = JSON.parse(favorites).list;
            items.map((item: any) => {
                this.favItems.push(
                    <ion-item href={`/details/${item.id}`}>
                        <ion-avatar slot="start">
                            <lazy-avatar src={item.avatar} alt="anime avatar" />
                        </ion-avatar>
                        <p class="home-item-text">{item.title}</p>
                    </ion-item>
                );
            });
        } else {
            const items = [];
            this.favItems = items;
        }
    }
    render() {
        return [
            <ion-header md-height='56px'>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-title>Favorites</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content>
                <ion-list>
                    <ion-list>
                        {this.favItems}
                    </ion-list>
                </ion-list>
            </ion-content>
        ];
    }
}
