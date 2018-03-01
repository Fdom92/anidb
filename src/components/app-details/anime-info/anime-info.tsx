import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'anime-info',
  styleUrl: 'anime-info.scss'
})
export class AnimeInfo {

  @State() startDate: any;

  @Prop() anime: any;

  componentDidLoad() {
    if (this.anime.format === "OVA") {
      this.startDate = `${this.anime.startDate.year}`;
    } else {
      this.startDate = `${this.anime.startDate.day}/${this.anime.startDate.month}/${this.anime.startDate.year}`;
    }
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
            <p class="right-section">{this.anime.format}</p>
        </div>
        <div class="anime-info-row">
            <p class="left-section">Status</p>
            <p class="right-section">{this.anime.status}</p>
        </div>

      </div>
    );
  }
}
