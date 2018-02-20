import { Component, Element, Prop, State } from '@stencil/core';


@Component({
  tag: 'lazy-img',
  styleUrl: 'lazy-img.scss',
  shadow: true
})
export class LazyImg {

  @Element() el: HTMLElement;

  @Prop() src: string;
  @Prop() alt: string;
  @Prop() avatar: boolean;
  @State() oldSrc: string;

  io: IntersectionObserver;

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  componentWillUpdate() {
    if (this.src !== this.oldSrc) {
      this.addIntersectionObserver();
    }
    this.oldSrc = this.src;
  }

  handleImage() {
    const image: HTMLImageElement = this.el.shadowRoot.querySelector('img');
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
      image.removeAttribute('data-src');
    };
  }

  addIntersectionObserver() {
    if (!this.src) {
      return;
    }
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: any) => {
        if (data[0].isIntersecting) {
          this.handleImage();
          this.removeIntersectionObserver();
        }
      })

      this.io.observe(this.el.shadowRoot.querySelector('img'));
    } else {
      this.handleImage();
    }
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  render() {
    return (
      <img data-src={this.src} alt={this.alt}
           class={this.avatar ? 'avatar-img' : ''}></img>
    );
  }
}
