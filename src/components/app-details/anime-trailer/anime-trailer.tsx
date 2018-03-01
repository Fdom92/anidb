import { Component, Prop, Element } from '@stencil/core';


@Component({
  tag: 'anime-trailer',
  styleUrl: 'anime-trailer.scss'
})
export class AnimeTrailer {

  @Element() el: Element;

  @Prop() trailer: any;

  componentDidLoad() {
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent)) {
      (this.el.querySelector('#youtube-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#launch-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#background') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#mobile-video') as HTMLElement).style.display = 'flex';
    }
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
      <div>
        {this.trailer !== null &&
        (<div class="anime-trailer">
          <div onClick={() => { this.closeBackground() }} id="background">
          </div>
          <div id="youtube-video" onClick={() => { this.closeBackground() }}>
            <lazy-iframe src={"https://www.youtube.com/embed/" + this.trailer.id} title="Ionic team at Polymer Summit video" />
          </div>
          <div onClick={() => { this.openYoutube() }} id="launch-video">
            <span>See the trailer</span>
          </div>
          <a href={"https://youtu.be/" + this.trailer.id} rel="noopener" id="mobile-video">
            <span>See the trailer</span>
          </a>
        </div>)}
      </div>
    );
  }
}
