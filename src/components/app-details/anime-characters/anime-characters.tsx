import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-characters',
  styleUrl: 'anime-characters.scss'
})
export class AnimeCharacters {

  @State() characters: any;

  @Prop() anime: any;

  componentDidLoad() {
    this.characters = this.anime.characters.nodes.map(character => {
      return <ion-item>
                <ion-avatar slot="start">
                  <lazy-avatar src={character.image.medium} alt="anime avatar"/>
                </ion-avatar>
                <p>{character.name.first} {character.name.last}</p>
              </ion-item>
    });
  }

  render() {
    return (
      <div>
        <h2>Characters</h2>
        <ion-list>
          {this.characters}
        </ion-list>
      </div>
    );
  }
}
