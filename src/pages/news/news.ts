import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RemoteProvider } from '../../providers/remote/remote';

/**
 * The NewsPage page reads and displays articles from the following 3 sources:
 * - Reuters
 * - National Geographic
 * - BBC Sport
 * depending on the choice the User made in the SettingsPage. The data are stored in storage.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  articles: string[];
  // Variables that store style
  titleFontSize: object;
  descriptionFontSize: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private rp: RemoteProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter NewsPage');

    this.loadNewspaper(); // Set 'articles' variable
    this.loadTitleSize(); // Set 'titleFontSize' variable
    this.loadDescriptionSize(); // Set 'descriptionFontSize' variable
  }

  // Sets 'articles' variable based on data stored in storage. It sets Reuters as a default.
  loadNewspaper() {
    this.storage.get("newspaper")
    .then((data) => {
      console.log("Nespaper in storage is = " + data);
      switch(data) {
        case "reuters":
          this.rp.getReuters().subscribe(data => {
            this.articles = data.articles;
          })    
          break;
        case "nationalGeographic":
          this.rp.getNationalGeographic().subscribe(data => {
            this.articles = data.articles;
          })
          break;
        case "bbcSport":
          this.rp.getBBCSport().subscribe(data => {
            this.articles = data.articles;
          })
          break;
        default:
          console.log("Default setting have been used: Reuters");
          this.rp.getReuters().subscribe(data => {
            this.articles = data.articles;
          })    
      }
    })
    .catch((error) => {
      console.log("Error = " + error);
    })
  }

  // Sets 'titleFontSize' variable based on data stored in storage.
  loadTitleSize() {
    this.storage.get("titleFontSize")
    .then((data) => {
      console.log("'titleFontSize' in storage is = " + data);
      let fontSize: string;
      switch(data) {
        case "one":
          fontSize = "1.6rem";
          break;
        case "two":
          fontSize = "1.8rem";
          break;
        case "three":
          fontSize = "2rem";
          break;
        case "four":
          fontSize = "2.2rem";
          break;
        case "five":
          fontSize = "2.4rem";
          break;
        default:
        console.log("Default settings have been used: font size = 2rem");
        fontSize = "2rem";
      }
      this.titleFontSize = {'font-size': fontSize};
    })
    .catch((error) => {
      console.log("Problem accessing local storage. Error = " + error);
    })
  }

  // Sets 'descriptionFontSize' variable based on data stored in storage.
  loadDescriptionSize() {
    this.storage.get("descriptionFontSize")
    .then((data) => {
      console.log("'descriptionFontSize' in storage is = " + data);      
      let fontSize: string;
      switch(data) {
        case "one":
          fontSize = "1.6rem";
          break;
        case "two":
          fontSize = "1.8rem";
          break;
        case "three":
          fontSize = "2rem";
          break;
        case "four":
          fontSize = "2.2rem";
          break;
        case "five":
          fontSize = "2.4rem";
          break;
        default:
        console.log("Default settings have been used: font size = 1.6rem");
        fontSize = "1.6rem";
      }
      this.descriptionFontSize = {'font-size': fontSize, 'color': '#222'}; // Set also color
    })
    .catch((error) => {
      console.log("Problem accessing local storage. Error = " + error);
    })
  }

}
