import { Injectable } from '@angular/core';


/*
  Generated class for the Time provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Time {
  constructor() {
  }

  createDateFromTimestamp(timestamp:string){
    var year = timestamp.substr(0,4);
    var month = timestamp.substr(4,2);
    var day = timestamp.substr(6,2);
    var hour = timestamp.substr(8,2);
    var minutes = timestamp.substr(10,2);
    var seconds = timestamp.substr(12,2);
    var setting = timestamp.substr(14,2);
    var mdy = month + "/" + day + "/" + year;
    if(setting == "PM"){
      var hourMath = (Number(hour) - 12);
      if(hourMath < 10){
        hour = "0" + hourMath.toString();
      }else{
        hour = hourMath.toString();
      }
    }

    var ts = hour + ":" + minutes + ":" + seconds + " " + setting;
    var time = mdy + " " + ts;
    return time;
  }


  createTimestamp():string{
    var time = new Date().toLocaleString();

    //mdy = month date year
    // yt = year time
    // ts = time setting(am/pm)
    //hms = hour minute second
    var mdy = time.split("/");
    var month = mdy[0];
    var day = mdy[1];
    var yt = mdy[2].split(",")
    var year = yt[0];
    var ts = yt[1].split(" ");
    var hms = ts[1].split(":");
    var setting = ts[2];
    var hour = hms[0];
    var minutes = hms[1];
    var seconds = hms[2];

    if(setting == "PM"){
      hour = (Number(hour) + 12).toString();
    }
    if(Number(hour) < 10){
      hour = "0" + hour;
    }
    if(Number(day) < 10){
      day = "0" + day;
    }
    if(Number(month) < 10){
      month = "0" + month;
    }
    var timestamp = year + month + day + hour + minutes + seconds + setting;
    return timestamp;
  }

}
