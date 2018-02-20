import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-item',
  styleUrl: 'anime-item.scss'
})
export class AnimeItem {

  @Prop() anime: any;

  @State() avatar = true;
  render() {
    return (
      <ion-item>
          <ion-avatar slot="start">
            <lazy-img avatar={this.avatar} src={this.anime.coverImage.medium} alt="anime avatar"/>
          </ion-avatar>
        <stencil-route-link url={'/details/' + this.anime.id}>
          {this.anime.title.romaji}
        </stencil-route-link>
      </ion-item>
    );
  }
}
