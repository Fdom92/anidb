import { Component, Prop, Element } from '@stencil/core';


@Component({
  tag: 'home-item',
  styleUrl: 'home-item.scss'
})
export class HomeItem {

  @Element() el: Element;

  @Prop() anime: any;

  navigateToDetails(id) {
    // Nav to details passing the anime id as prop
    this.el.closest('ion-nav').push('app-details', { id });
  }

  render() {
    return (
      <ion-item onClick={() => this.navigateToDetails(this.anime.id)}>
          <ion-avatar slot="start">
            <lazy-avatar src={this.anime.coverImage.medium} alt="anime avatar"/>
          </ion-avatar>
          <p class="home-item-text">{this.anime.title.romaji}</p>
      </ion-item>
    );
  }
}
