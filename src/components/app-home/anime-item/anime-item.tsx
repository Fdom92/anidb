import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'anime-item',
  styleUrl: 'anime-item.scss'
})
export class AnimeItem {

  @Prop() anime: any;

  render() {
    return (
      <ion-item>
          <ion-avatar slot="start">
            <img src={this.anime.coverImage.medium}/>
          </ion-avatar>
        <stencil-route-link url={'/details/' + this.anime.id}>
          {this.anime.title.romaji}
        </stencil-route-link>
      </ion-item>
    );
  }
}
