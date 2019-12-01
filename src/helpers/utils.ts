export function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export async function presentAlert(alertCtrl, title, message) {
  const alert = await alertCtrl.create({
    title,
    message,
    buttons: ['OK']
  });
  return await alert.present();
}

export function setDarkMode() {
  // Set Dark mode
  document.documentElement.style.setProperty('--ion-color-primary', '#222428');
  document.documentElement.style.setProperty('--ion-color-primary-rgb', '34,36,40');
  document.documentElement.style.setProperty('--ion-color-primary-contrast', '#ffffff');
  document.documentElement.style.setProperty('--ion-color-primary-contrast-rgb', '255,255,255');
  document.documentElement.style.setProperty('--ion-color-primary-shade', '#1e2023');
  document.documentElement.style.setProperty('--ion-color-primary-tint', '#383a3e');

  document.documentElement.style.setProperty('--ion-item-text', '#ffffff');
  document.documentElement.style.setProperty('--ion-item-toggle', '#ffffff');
  document.documentElement.style.setProperty('--ion-item-background', '#3b3e45');
  document.documentElement.style.setProperty('--ion-item-border', '#525760');
  document.documentElement.style.setProperty('--ion-chip-text', 'white');
  document.documentElement.style.setProperty('--ion-chip-background', '#222428');
}

export function setDefaultMode() {
  // Set Default mode
  document.documentElement.style.setProperty('--ion-color-primary', '#eaa000');
  document.documentElement.style.setProperty('--ion-color-primary-rgb', '234,160,0');
  document.documentElement.style.setProperty('--ion-color-primary-contrast', '#000000');
  document.documentElement.style.setProperty('--ion-color-primary-contrast-rgb', '0,0,0');
  document.documentElement.style.setProperty('--ion-color-primary-shade', '#ce8d00');
  document.documentElement.style.setProperty('--ion-color-primary-tint', '#ecaa1a');

  document.documentElement.style.setProperty('--ion-item-text', '#000000');
  document.documentElement.style.setProperty('--ion-item-toggle', '#eaa000');
  document.documentElement.style.setProperty('--ion-item-background', '#ffffff');
  document.documentElement.style.setProperty('--ion-item-border', '#525760');
  document.documentElement.style.setProperty('--ion-item-border', 'lightgray');
  document.documentElement.style.setProperty('--ion-chip-text', '#ce8d00');
  document.documentElement.style.setProperty('--ion-chip-background', '#fff7e6');
}
