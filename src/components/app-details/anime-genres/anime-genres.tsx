import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-genres',
  styleUrl: 'anime-genres.scss'
})
export class AnimeGenres {

  @State() data: any;

  @Prop() genres: any;

  componentDidLoad() {
    this.data = this.genres.map(genre =>
      <ion-chip>
        <ion-label>{genre}</ion-label>
      </ion-chip>)
  }

  render() {
    return (
      <div>
      <h2>Genres</h2>
      {this.data}
      </div>
    );
  }
}
