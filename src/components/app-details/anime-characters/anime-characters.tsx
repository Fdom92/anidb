import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-characters',
  styleUrl: 'anime-characters.scss'
})
export class AnimeCharacters {

  @State() characters: any;

  @Prop() anime: any;

  componentDidLoad() {
    this.characters = this.anime.characters.edges.map(edge => {
      return <ion-item>
                <ion-avatar slot="start">
                  <lazy-avatar src={edge.node.image.medium} alt="anime avatar"/>
                </ion-avatar>
                <p>{edge.node.name.first} {edge.node.name.last}</p>
              </ion-item>
    });
  }

  render() {
    return (
      this.anime.characters.edges > 1 &&
      <div>
        <h2>Characters</h2>
        <ion-list>
          {this.characters}
        </ion-list>
      </div>
    );
  }
}
