import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QueueInfo } from '../queueInfo/queueInfo';
import {Data} from '../../providers/data/data';
import {Info} from '../../share/info'
import {QInfo} from '../../share/qinfo'

import {QRCodeComponent} from 'angular2-qrcode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
	providers: [Data],
})
export class HomePage {
	
	QRObj: any = {};
	mKey: string ;
	name: string ;
	obj: Info;
	data: QInfo;

	constructor(public navCtrl: NavController, public db: Data, ) {

	}


	onBarcodeSuccess(){
		this.navCtrl.push(QueueInfo,{data: this.data});
	}

	saveToFirebase(): void{
		this.db.writeToFirebase().then( mKey => {
			this.mKey = mKey
			this.db.listQInfo(mKey).then( resultQ => this.data = resultQ).then( ()=> this.onBarcodeSuccess())
		});
	}
}

