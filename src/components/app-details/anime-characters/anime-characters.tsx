import { Component, Prop, State, h } from "@stencil/core";
import { modalController } from "@ionic/core";

@Component({
  tag: "anime-characters",
  styleUrl: "anime-characters.css"
})
export class AnimeCharacters {
  @State() characters: any;

  @Prop() anime: any;

  componentWillLoad() {
    this.characters = this.anime.characters.edges.map(edge => {
      return (
        <ion-item onClick={() => this.showModal(edge)}>
          <ion-avatar slot="start">
            <lazy-avatar src={edge.node.image.medium} alt="anime avatar" />
          </ion-avatar>
          <p>
            {edge.node.name.first} {edge.node.name.last}
          </p>
        </ion-item>
      );
    });
  }

  async showModal(edge) {
    let title;
    if (edge.node.name.first && edge.node.name.last) {
      title = edge.node.name.first + " " + edge.node.name.last;
    } else if (edge.node.name.first && !edge.node.name.last) {
      title = edge.node.name.first;
    } else {
      title = edge.node.name.last;
    }

    let voiceActors;
    if (edge.voiceActors.length > 0) {
      voiceActors = edge.voiceActors
        .map(ele => {
          return `<ion-item>
                  <p>${ele.name.first} ${ele.name.last}</p>
                </ion-item>`;
        })
        .join("");
      voiceActors = `
        <ion-list>
          ${voiceActors}
        </ion-list>`;
    } else {
      voiceActors = "<p>Voice Actors not found</p>";
    }

    let description;
    if (edge.node.description !== "") {
      description = edge.node.description.replace(/__/g, "");
    } else {
      description = "Description not found";
    }

    const element = document.createElement("div");
    element.innerHTML = `
      <ion-header md-height='56px'>
        <ion-toolbar color='primary'>
          <ion-title>Character</ion-title>
          <ion-buttons slot='end'>
            <ion-button class="dismiss">
              <ion-icon name="ios-close">
              </ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="content-top">
          <lazy-img src=${edge.node.image.medium} alt="Cover image"></lazy-img>
          <div class="content-info">
            <h1>Name</h1>
            <p>${title}</p>
            <h1>Role</h1>
            <p>${edge.role}</p>
          </div>
        </div>
        <h1>Description</h1>
        <p>${description}</p>
        <h1>Voice actors</h1>
        ${voiceActors}
      </ion-content>
    `;

    const modalElement = await modalController.create({
      component: element,
      cssClass: "character-modal"
    });
    const button = element.querySelector("ion-button");
    button.addEventListener("click", () => {
      modalElement.dismiss();
    });
    modalElement.present();
  }

  render() {
    return (
      this.anime.characters.edges.length > 1 && [
        <h2>Characters</h2>,
        <ion-list>{this.characters}</ion-list>
      ]
    );
  }
}
