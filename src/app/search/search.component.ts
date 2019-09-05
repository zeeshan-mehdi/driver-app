import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as taost from "nativescript-toast";
import { DataService } from "~/shared/Data.service";
import { RouterExtensions } from "nativescript-angular/router";
import {Job, driverItem} from "../models/user.model"
import { LoginService } from "~/shared/login.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";
import * as http from "tns-core-modules/http";
import { ListViewEventData } from "nativescript-ui-listview";
@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls:["./search.css"]
})
export class SearchComponent implements OnInit {
    private _source: ObservableArray<TokenModel>;
    private _destination: ObservableArray<TokenModel>;
    @ViewChild("source") source: RadAutoCompleteTextViewComponent;
    @ViewChild("dest") dest: RadAutoCompleteTextViewComponent;
 
job :Job;
showSpinner:Boolean;
private driverList:Array<driverItem>;
countries: { name: string, imageSrc: string }[] = [
    { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
    { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
    { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },  { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
    { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
    { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" }
  
];
    constructor(private DataService:DataService,
        private LoginService:LoginService
        ,private routerExtensions:RouterExtensions) { 
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.driverList=[];

        console.log(this.countries.length);
this.job=new Job;
console.log(this.DataService.activeUser.id);
this.showSpinner=false;


this.LoginService.getFirmDriverList().subscribe(result=>
    {
        this.showSpinner=true;
        console.log("\n\n");
        var res=result.json();
        console.log(JSON.stringify(res));
      if(res.data)
      {
this.driverList=[];
      }
      else 
      {
          this.driverList=res;

      }
console.log("[[[["+ JSON.stringify(this.driverList)+"]]]]")
        
    },err=>
    {

    });

    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    driverSelected(args: ListViewEventData) {


      //  var item = this.driverList.find(args.index);
        console.log("--__________________________________--");
        console.log(JSON.stringify(args.object));
        console.log(args.index)
        console.log("--__________________________________--");
       // this.data=item;
      //  console.log("????????????? :  "+"patients/"+ item.id+"/casehistories" )
      //  this.router.navigate(["patients/"+ item.id+"/casehistories"])
        
    }
   

      

    
}
