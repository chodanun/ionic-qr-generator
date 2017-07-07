import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Info} from '../../share/info'
import {QInfo} from '../../share/qinfo'

@Injectable()
export class Data {
  items: FirebaseListObservable<any[]>;
  objInfo: Info;
  objQInfo: QInfo;
  constructor(public db: AngularFireDatabase) {
    
  }

  writeToFirebase(): Promise<string> {
    return new Promise ( (res,rej) => {
       const item = this.db.list(`Register`)
       const mKey = item.push({
            branchName:"",
            key:"",
        }).key;
        console.log("SAVE COMPLETED , mKey = "+mKey);
        res(mKey)
    })
  }

  listQInfo(mKey): Promise<QInfo>{
    return new Promise( (res,rej)=>{
        this.listenFirebase(mKey).then( obj => {
          this.getQInfo(obj).then( objQ => res(objQ))
        })
    })
  }

  listenFirebase(mKey): Promise<Info> {
    return new Promise ( (res,rej) => {
        this.db.object(`Register/${mKey}`, { preserveSnapshot: true })
          .subscribe(snapshot => {
             if(snapshot.val().key != ""){
              this.objInfo = snapshot.val()
              console.log(this.objInfo)
              res(this.objInfo)
              }
          })
      })
  }

  getQInfo(obj): Promise<QInfo> {
    return new Promise( (res,rej)=>{
      this.db.object(`${obj.branchName}/${obj.key}`, { preserveSnapshot: true })
          .subscribe(snapshot => { 
            this.objQInfo = snapshot.val()
            console.log(this.objQInfo)
            res(this.objQInfo)
          })
    })
  }

}