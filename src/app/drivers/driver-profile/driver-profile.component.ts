import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as taost from "nativescript-toast";
import { DataService } from "~/shared/Data.service";
import { RouterExtensions } from "nativescript-angular/router";
import {Job, driverItem} from "../../models/user.model"
import { LoginService } from "~/shared/login.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";
import * as http from "tns-core-modules/http";
import { ListViewEventData } from "nativescript-ui-listview";
import { confirm } from "tns-core-modules/ui/dialogs";
@Component({
  selector: 'ns-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
  moduleId: module.id,
})
export class DriverProfileComponent implements OnInit {
user:any;
showSpinner:Boolean
 
constructor(private DataService:DataService,
  private LoginService:LoginService
  ,private routerExtensions:RouterExtensions) { 
    this.user=this.DataService.activeDriver;
    this.showSpinner=true;
  // Use the component constructor to inject providers.
}


  ngOnInit() {

    console.log(JSON.stringify(this.DataService.activeDriver));
   
  }

  goBackPage()
  {
    this.routerExtensions.backToPreviousPage();
  }
del()
{

  let options = {
    title: "Delete Driver",
    message: "Do you want to remove this Driver from Firm?",
    okButtonText: "Yes",
    cancelButtonText: "No",
    neutralButtonText: "Cancel"
};

confirm(options).then((result: boolean) => {
    console.log(result);

    if(result)
    {
  this.showSpinner=false;
  this.LoginService.deleteDriverfromFirm(this.user.driverID,this.DataService.activeUser.id).subscribe(res=>
    {


      console.log(res.json());

      var r=res.json();

      if(r.val=="1")
      {
alert(r.data);


      }
      else if(r.val=="-1")
      {
        alert(r.data);
        this.DataService.activeDriver=null;
      }
      else
      {
        alert("Something went Wrong");
        this.DataService.activeDriver=null;
      }

      this.routerExtensions.navigate(["drivers"]);
    },err=>
    {
      alert("Unable to connect to Server");

    })
}

});
}
}
