import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Http, Headers, Response } from "@angular/http";
var Sqlite= require("nativescript-sqlite")
import {  RequestOptionsArgs,ResponseOptions } from '@angular/http';
import { User } from "./models/user.model";
@Injectable()
export class AppService {
   
    constructor() {
       
      
    }

    

    
createTables()
{

//-----------------------  create Tables in Database-------------------------------
new Sqlite("cdb.db").then(db => 
  {
    db.execSQL("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY,owner,license,email,phone,address,image,password,drivercount,jobcount,earning)").then(id => {
      console.log("_____________________________________________________________________");
      console.log("User Table Success");
  }, error => {
    console.log("CREATE ward TABLE ERROR", error);
  });
});
//____________
}

}
