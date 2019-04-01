import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SettingsPage } from '../settings/settings';
import { NewsPage } from '../news/news';

import { RemoteProvider } from '../../providers/remote/remote';
/**
 * The HomePage page:
 * - has a 'Setting' button opening SettingsPage
 * - has a 'News' button opening NewsPage
 * - reads and displays the User name if it is stored in storage
 * - reads and displays the 'Daily Quote'
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;
  // Variables that store Daily Quote
  quote: string;
  author: string;

  constructor(public navCtrl: NavController, public storage: Storage, private rp: RemoteProvider) {

  }

  ionViewDidLoad() {
    console.log("In ionViewDidLoad function (setting up 'quote' and 'author')");
    this.setQuote(); // Set 'quote' and 'author' variable
  }

  ionViewWillEnter() {
    this.setName();
  }

  // Sets the 'name' variable. Gets the value from the storage.
  setName() {
    this.storage.get("name")
      .then((data) => {
        if (data == null) {
          console.log("Name not in the storage");
        } else {
          console.log("Name in the storage = " + data);
          this.name = data;
        }
      })
      .catch((err) => {
        console.log("Problem accessing local storage. Error = " + err);
      })
  }

  // Sets the 'quote' and 'author' variables (Daily Quote).
  setQuote() {
    this.rp.getQuote().subscribe(data => {
      this.quote = data.contents.quotes[0].quote;
      this.author = data.contents.quotes[0].author;
    })

    // .then???
    // .catch???
  }

  openSettingsPage() {
    console.log("In openSettingsPage function");
    this.navCtrl.push(SettingsPage);
  }

  openNewsPage() {
    console.log("In openNewsPage function");
    this.navCtrl.push(NewsPage);
  }

}
