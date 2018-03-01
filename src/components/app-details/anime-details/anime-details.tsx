import { Component, Prop, Element, State } from '@stencil/core';


@Component({
  tag: 'anime-details',
  styleUrl: 'anime-details.scss'
})
export class AnimeDetails {

  @Element() el: Element;

  @State() isDevice: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  @Prop() anime: any;

  cleanHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  render() {
    return (
      <div>
        {
          this.anime.bannerImage !== null &&
            <lazy-banner src={this.anime.bannerImage} alt="Anime banner image"/>
        }
        <div class="anime-details-content">
          <div class="anime-details-content-top">
            {
              this.isDevice === true ? (
                <div class="cover-section">
                  <lazy-img src={this.anime.coverImage.medium} alt="Cover image"/>
                </div>
              ) : (
                <div class="cover-section">
                  <lazy-img src={this.anime.coverImage.large} alt="Cover image"/>
                </div>)
            }
            <div class="anime-details-content-top-information">
              <anime-info anime={this.anime}></anime-info>
              <anime-trailer trailer={this.anime.trailer}></anime-trailer>
            </div>
          </div>
          <anime-genres genres={this.anime.genres}></anime-genres>
          <div class="anime-description">
            <h2>Description</h2>
            <p> { this.cleanHtml(this.anime.description) } </p>
          </div>
          <anime-characters anime={this.anime}></anime-characters>
        </div>
      </div>
    );
  }
}
