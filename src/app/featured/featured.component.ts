import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../models/user.model";
import { DataService } from "~/shared/Data.service";
import * as toast from "nativescript-toast"
import * as imagepicker from "nativescript-imagepicker";
var imageSourceModule = require("image-source");
import * as fs from "tns-core-modules/file-system/file-system";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector: "Featured",
    moduleId: module.id,
    templateUrl: "./featured.component.html",
    styleUrls :["./profile.css"]
})
export class FeaturedComponent implements OnInit {
    user:User;
    isValid= false;
imageAssets = [];
imageSrc: any;
isSingleMode: boolean = true;
thumbSize: number = 50;
previewSize: number = 100
showSpinner:Boolean
pass = true;

    constructor(private DataService:DataService,private r:RouterExtensions) {
        // Use the component constructor to inject providers.
        this.user=this.DataService.activeUser;
    }

    ngOnInit(): void {
        // Init your component properties here.

        if(fs.File.exists("/data/user/0/org.te.FirmApp/files/IMAGE"))
          this.imageSrc=  "/data/user/0/org.te.FirmApp/files/IMAGE";
          else
          this.imageSrc="~/images/user.png";


          console.log(this.imageSrc);
        this.user=this.DataService.activeUser;
     //   alert(JSON.stringify(this.user));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    selectPhoto()
{

  
  let context = imagepicker.create({
      mode: "single"
  });
  this.startSelection(context);
}

private startSelection(context) {
  let that = this;

  context
  .authorize()
  .then(() => {
      that.imageAssets = [];
      that.imageSrc = null;
      return context.present();
  })
  .then((selection) => {
      console.log("Selection done: " + JSON.stringify(selection));
      that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

      let folder = fs.knownFolders.documents().path;
      let fileName = "IMAGE"+"";
      let path = fs.path.join(folder, fileName);
      console.log(path);
      imageSourceModule.fromAsset(that.imageSrc)
                .then(imageSource => {
                     imageSource.saveToFile(path, "png");
                     that.user.image=path;
                     console.log("saved");
                 });
      // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
      selection.forEach(function (element) {
          element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
          element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
      });

      that.imageAssets = selection;
  }).catch(function (e) {
      console.log(e);
  });
}

gotopaypal()
{

    alert("Sorry Not Available")

    //this.r.navigate(['featured/paypal']);
}
}