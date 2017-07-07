import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QInfo } from '../../share/qinfo'
@Component({
  selector: 'queue-info',
  templateUrl: 'queueInfo.html'
})
export class QueueInfo {
	
	key: string = "123key";
	name: string ;
	qObj: QInfo;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.init();
		this.qObj = this.navParams.get('data')
		console.log(this.qObj)
	}

	init(){
		
	}

}

