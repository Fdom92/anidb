import { Component, h } from "@stencil/core";
import {
  modalController,
  SelectChangeEventDetail,
  DatetimeChangeEventDetail
} from "@ionic/core";

@Component({
  tag: "filter-modal",
  styleUrl: "filter-modal.css"
})
export class FilterModal {
  dismiss() {
    modalController.dismiss({}, "CLOSE");
  }

  onSelectFormat(ev: CustomEvent<SelectChangeEventDetail>) {
    console.log(ev);
  }

  onSelectSeason(ev: CustomEvent<SelectChangeEventDetail>) {
    console.log(ev);
  }

  onSelectStatus(ev: CustomEvent<SelectChangeEventDetail>) {
    console.log(ev);
  }

  onSelectSeasonYear(ev: CustomEvent<DatetimeChangeEventDetail>) {
    console.log(ev);
  }

  render() {
    return [
      <ion-header md-height="56px">
        <ion-toolbar color="primary">
          <ion-title>Filter</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.dismiss()} class="dismiss">
              <ion-icon name="ios-close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Format</ion-label>
            <ion-select
              onIonChange={this.onSelectFormat.bind(this)}
              okText="Okay"
              cancelText="Cancel"
            >
              <ion-select-option value="TV">TV</ion-select-option>
              <ion-select-option value="TV_SHORT">TV_SHORT</ion-select-option>
              <ion-select-option value="MOVIE">MOVIE</ion-select-option>
              <ion-select-option value="SPECIAL">SPECIAL</ion-select-option>
              <ion-select-option value="OVA">OVA</ion-select-option>
              <ion-select-option value="ONA">ONA</ion-select-option>
              <ion-select-option value="MUSIC">MUSIC</ion-select-option>
              <ion-select-option value="MANGA">MANGA</ion-select-option>
              <ion-select-option value="red">Red</ion-select-option>
              <ion-select-option value="red">Red</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Season</ion-label>
            <ion-select
              onIonChange={this.onSelectSeason.bind(this)}
              okText="Okay"
              cancelText="Cancel"
            >
              <ion-select-option value="WINTER">WINTER</ion-select-option>
              <ion-select-option value="SPRING">SPRING</ion-select-option>
              <ion-select-option value="SUMMER">SUMMER</ion-select-option>
              <ion-select-option value="FALL">FALL</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Season Year</ion-label>
            <ion-datetime
              onIonChange={this.onSelectSeasonYear.bind(this)}
              displayFormat="YYYY"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Status</ion-label>
            <ion-select
              onIonChange={this.onSelectStatus.bind(this)}
              okText="Okay"
              cancelText="Cancel"
            >
              <ion-select-option value="FINISHED">FINISHED</ion-select-option>
              <ion-select-option value="RELEASING">RELEASING</ion-select-option>
              <ion-select-option value="NOT_YET_RELEASED">NOT_YET_RELEASED</ion-select-option>
              <ion-select-option value="CANCELLED">CANCELLED</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </ion-content>
    ];
  }
}
