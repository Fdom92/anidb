import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-genres',
  styleUrl: 'anime-genres.css'
})
export class AnimeGenres {

  @State() data: any;

  @Prop() genres: any;

  componentDidLoad() {
    this.data = this.genres.map(genre =>
      <ion-chip margin-end color='primary'>
        <ion-label>{genre}</ion-label>
      </ion-chip>)
  }

  render() {
    return [
      <h2>Genres</h2>,
      this.data
    ];
  }
}
