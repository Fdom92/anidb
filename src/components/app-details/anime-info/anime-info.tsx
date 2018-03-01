import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-info',
  styleUrl: 'anime-info.scss'
})
export class AnimeInfo {

  @State() startDate = '';
  @State() format: string;
  @State() status: string;
  @State() type: string;

  @Prop() anime: any;

  componentDidLoad() {
    this.format = this.anime.format;
    this.status = this.anime.status;
    this.type = this.anime.type;

    if (this.anime.startDate.day) {
      this.startDate = this.anime.startDate.day + '/';
      if (this.anime.startDate.month) {
        this.startDate += this.anime.startDate.month + '/';
        if (this.anime.startDate.year) {
          this.startDate += this.anime.startDate.year;
        }
      }
    }
  }

  capitalizeFirstLetter(string: string) {
    string = string.toLowerCase();
    string = this.removeSpecialCharacters(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  removeSpecialCharacters(string: string) {
    return string.replace('_', ' ');
  }

  render() {
    return (
      <div class="anime-info-section">
        <h1>
          {this.anime.title.romaji}
        </h1>
        <div class="anime-info-row">
            <p class="left-section">Date</p>
            <p class="right-section">{this.startDate}</p>
        </div>
        <div class="anime-info-row">
            <p class="left-section">Format</p>
            <p class="right-section">{this.capitalizeFirstLetter(this.anime.format)}</p>
        </div>
        {
          this.format === 'MOVIE' &&
          <div class="anime-info-row">
            <p class="left-section">Duration</p>
            <p class="right-section">{this.anime.duration} min</p>
          </div>
        }
        {
          (this.type === 'ANIME' && this.format !== 'MOVIE' && this.status === 'FINISHED') &&
          <div class="anime-info-row">
            <p class="left-section">Total episodes</p>
            <p class="right-section">{this.anime.episodes}</p>
          </div>
        }
        {
          (this.type === 'MANGA' && this.status === 'FINISHED') &&
          <div class="anime-info-row">
            <p class="left-section">Total chapters</p>
            <p class="right-section">{this.anime.chapters}</p>
          </div>
        }
        {
          (this.type === 'MANGA' &&  this.format !== 'ONE_SHOT' && this.status === 'FINISHED') &&
          <div class="anime-info-row">
            <p class="left-section">Total volumes</p>
            <p class="right-section">{this.anime.volumes}</p>
          </div>
        }
        {
          this.format !== 'MOVIE' &&
          <div class="anime-info-row">
            <p class="left-section">Status</p>
            <p class="right-section">{this.capitalizeFirstLetter(this.anime.status)}</p>
          </div>
        }
      </div>
    );
  }
}
