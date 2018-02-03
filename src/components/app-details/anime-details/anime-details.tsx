import { Component, Prop, Element, State } from '@stencil/core';


@Component({
  tag: 'anime-details',
  styleUrl: 'anime-details.scss'
})
export class AnimeDetails {

  @Element() el: Element;

  @State() isDevice: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  @Prop() anime: any;

  componentDidLoad() {
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent)) {
      (this.el.querySelector('#youtube-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#launch-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#background') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#mobile-video') as HTMLElement).style.display = 'flex';
    }
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
            <img src={this.anime.bannerImage} alt="Banner image"/>
          </div>)
        }
        <div class="anime-details-content">
          <div class="anime-details-content-top">
            {
              this.isDevice === true ? (
                <img src={this.anime.coverImage.medium} alt="Cover image"/>
              ) : (
                <img src={this.anime.coverImage.large} alt="Cover image"/>
              )
            }
            <div class="anime-details-content-top-information">
              <h1>
                {this.anime.title.romaji}
              </h1>
              <p>
                Score: {this.anime.averageScore/10}
              </p>
              <p>
                Start date:
                {this.anime.startDate.day}/
                {this.anime.startDate.month}/
                {this.anime.startDate.year}
              </p>
              {this.anime.endDate.day !== null ?
              (<p>
                End date:
                {this.anime.endDate.day}/
                {this.anime.endDate.month}/
                {this.anime.endDate.year}
              </p>)
            : (<p>
                End date: Not finished yet
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
            </div>
          </div>
          <div class="anime-description">
            <p> { this.cleanHtml(this.anime.description) } </p>
          </div>
        </div>
      </div>
    );
  }
}
