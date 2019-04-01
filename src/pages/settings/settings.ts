import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * The SettingsPage page allows the User of the app to change the app settings:
 * - the name of the user
 * - the news source
 * - the font size of the news title
 * - the font size of the news description
 * Setting are stored in storage after pressing Save button. 
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  // Variables that store settings
  name: string;
  newspaper: string;
  titleFontSize: string;
  descriptionFontSize: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter SettingsPage');
    this.setName(); // Set 'name' variable
    this.setNespaper(); // Set 'newspaper' variable
    this.setTitleFontSize(); // Set 'titleFontSize' variable
    this.setDescriptionFontSize(); // Set 'descriptionFontSize' variable
  }

  // Saves values of settings variables (name, newspaper, titleFontSize, descriptionFontSize) in the storage
  saveSettings(){
    console.log("In saveSettings function");
    console.log("Name is = " + this.name);
    this.storage.set("name", this.name);

    this.storage.set("newspaper", this.newspaper);
    console.log("Newspaper value = " + this.newspaper + " has been saved in storage");

    this.storage.set("titleFontSize", this.titleFontSize);
    console.log("Title font size = " + this.titleFontSize + " has been saved in storage");

    this.storage.set("descriptionFontSize", this.descriptionFontSize);
    console.log("Description font size = " + this.descriptionFontSize + " has been saved in storage");
  }

  // Sets the 'name' variable. Gets the value from the storage.
  setName() {
    this.storage.get("name")
    .then((data) => {
      if (data == null) {
        console.log("Name not in the storage");
      } else {
        console.log("Name in storage = " + data);
        this.name = data;
      }
    })
    .catch((err) => {
      console.log("Problem accessing local storage. Error = " + err);
    })
  }

  // Sets the 'newspaper' variable. Gets the value from the storage.
  setNespaper() {
    this.storage.get("newspaper")
    .then((data) => {
      if (data == null) {
        console.log("Newspaper not in the storage. Sets default newspaper = reuters");
        this.newspaper = "reuters";
      } else {
        console.log("Newspaper in storage = " + data);
        this.newspaper = data;
      }
    })
    .catch((err) => {
      console.log("Problem accessing local storage. Error = " + err);
    })
  }

  // Sets the 'titleFontSize' variable. Gets the value from the storage.
  setTitleFontSize() {
    this.storage.get("titleFontSize")
    .then((data) => {
      if (data == null) {
        console.log("titleFontSize not in the storage. Default settings have been used: titleFontSize = three.");
        this.titleFontSize = "three";
      } else {
        console.log("titleFontSize in storage = " + data);
        this.titleFontSize = data;
      }
    })
    .catch((err) => {
      console.log("Problem accessing local storage. Error = " + err);
    })
  }

  // Sets the 'descriptionFontSize' variable. Gets the value from the storage.
  setDescriptionFontSize() {
    this.storage.get("descriptionFontSize")
    .then((data) => {
      if (data == null) {
        console.log("descriptionFontSize not in the storage. Default settings have been used: descriptionFontSize = one.");
        this.descriptionFontSize = "one";
      } else {
        console.log("descriptionFontSize in storage = " + data);
        this.descriptionFontSize = data;
      }
    })
    .catch((err) => {
      console.log("Problem accessing local storage. Error = " + err);
    })
  }

}
