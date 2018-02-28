import { Component, Prop, Element, State } from '@stencil/core';


@Component({
  tag: 'anime-details',
  styleUrl: 'anime-details.scss'
})
export class AnimeDetails {

  @Element() el: Element;

  @State() isDevice: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  @State() characters: any;

  @Prop() anime: any;

  componentDidLoad() {
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent)) {
      (this.el.querySelector('#youtube-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#launch-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#background') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#mobile-video') as HTMLElement).style.display = 'flex';
    }

    this.characters = this.anime.characters.nodes.map(character => {
      return <ion-item>
              <ion-avatar slot="start">
                <lazy-avatar src={character.image.medium} alt="anime avatar"/>
              </ion-avatar>
              <p>{character.name.first} {character.name.last}</p>
        </ion-item>
    });
  }

  cleanHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  openYoutube() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.add('youtube-show');
    background.classList.add('background-show');
  }

  closeBackground() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.remove('youtube-show');
    background.classList.remove('background-show');
  }

  render() {
    return (
      <div class="anime-details">
        {
          this.anime.bannerImage !== null &&
          (<div class="anime-details-header">
            <lazy-banner src={this.anime.bannerImage} alt="Banner image"/>
          </div>)
        }
        <div class="anime-details-content">
          <div class="anime-details-content-top">
            {
              this.isDevice === true ? (
                <lazy-img src={this.anime.coverImage.medium} alt="Cover image"/>
              ) : (
                <lazy-img src={this.anime.coverImage.large} alt="Cover image"/>
              )
            }
            <div class="anime-details-content-top-information">
              <h1>
                {this.anime.title.romaji}
              </h1>
              {this.anime.endDate.day !== null ?
              (<p>
                <label class="anime-start-date">
                  {this.anime.startDate.day}/
                  {this.anime.startDate.month}/
                  {this.anime.startDate.year}
                </label>
                -
                <label class="anime-end-date">
                  {this.anime.endDate.day}/
                  {this.anime.endDate.month}/
                  {this.anime.endDate.year}
                </label>
              </p>) :
              (<p>
                <label class="anime-start-date">
                  {this.anime.startDate.day}/
                  {this.anime.startDate.month}/
                  {this.anime.startDate.year}
                </label>
                -
                <label class="anime-end-date">
                  Not finished yet
                </label>
              </p>)}
              {this.anime.trailer !== null &&
              (<div class="anime-trailer">
                <div onClick={() => { this.closeBackground() }} id="background">
                </div>
                <div id="youtube-video" onClick={() => { this.closeBackground() }}>
                  <lazy-iframe src={"https://www.youtube.com/embed/" + this.anime.trailer.id} title="Ionic team at Polymer Summit video" />
                </div>
                <div onClick={() => { this.openYoutube() }} id="launch-video">
                  <span>Go see the trailer</span>
                </div>
                <a href={"https://youtu.be/" + this.anime.trailer.id} rel="noopener" id="mobile-video">
                  <span>Go see the trailer</span>
                </a>
              </div>)}
              <div class="anime-genres">
              {this.anime.genres.map(genre =>
                (<ion-chip>
                  <ion-label>{genre}</ion-label>
                </ion-chip>)
              )}
              </div>
            </div>
          </div>
          <div class="anime-description">
            <h2>Description</h2>
            <p> { this.cleanHtml(this.anime.description) } </p>
          </div>
          <div class="anime-characters">
            <h2>Characters</h2>
            <ion-list>
              {this.characters}
            </ion-list>
          </div>
        </div>
      </div>
    );
  }
}
