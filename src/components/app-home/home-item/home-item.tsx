import { Component, Prop, Element } from '@stencil/core';


@Component({
  tag: 'home-item',
  styleUrl: 'home-item.scss'
})
export class HomeItem {

  @Element() el: Element;

  @Prop() anime: any;

  render() {
    return (
      <ion-item href={`/details/${this.anime.id}`}>
          <ion-avatar slot="start">
            <lazy-avatar src={this.anime.coverImage.medium} alt="anime avatar"/>
          </ion-avatar>
          <p class="home-item-text">{this.anime.title.romaji}</p>
      </ion-item>
    );
  }
}
