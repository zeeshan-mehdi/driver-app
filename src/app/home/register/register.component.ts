import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '~/app/models/user.model';
import { Page } from 'tns-core-modules/ui/page/page';
import { LoginService } from '~/shared/login.service';
import { RouterExtensions } from 'nativescript-angular/router';
import * as toast from "nativescript-toast"
import * as imagepicker from "nativescript-imagepicker";
var imageSourceModule = require("image-source");
import { DataService } from '~/shared/Data.service';
import * as fs from "tns-core-modules/file-system/file-system";
@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  moduleId: module.id,
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  /*
user:User;
public confirmPassword:any;
@ViewChild("dob") dob: ElementRef;
isValid= false;
imageAssets = [];
imageSrc: any;
isSingleMode: boolean = true;
thumbSize: number = 50;
previewSize: number = 100
showSpinner:Boolean
pass = true;
  constructor(private _page: Page,private _loginService:LoginService,
    private routerExtensions:RouterExtensions,
    private DataService:DataService) {
    }

  ngOnInit() 
  {
   // this._page.actionBarHidden = true;
   this.showSpinner=true;
    this.user=new User();
  }

  register()
  {

   
    this.user.dob=this.dob.nativeElement.date.toDateString();

    if(this.user.name==""||this.user.name==null)
    {
      toast.makeText("Invalid Name Value").show();
    }
    else if(this.user.email==""||this.user.email==null)
    {
      toast.makeText("Invalid Email Value").show();
    }
    else if(this.user.address==""||this.user.address==null)
    {
      toast.makeText("Invalid Address Value").show();
    }
    else if(this.user.phoneNumber==""||this.user.phoneNumber==null)
    {
      toast.makeText("Invalid Phone Number").show();
    }
    else if(this.user.image==""||this.user.image==null)
    {
      toast.makeText("Profile Picture Required").show();
    }

    else
    {
      this.showSpinner=false;

      this._loginService.signup(this.user).subscribe(res=>
        {

          this.showSpinner=true;
var result=res.json();

if(result.data==this.user.phoneNumber)
{
  alert("Account Created\nLogin to Cintinue");
  this.routerExtensions.backToPreviousPage();
}
else if(result.data=="-1")
{
  alert("Phone/Email Already Exist");

}
else{

  alert("Incomplete Information Provided");
}

          
        },err=>
        {
          this.showSpinner=true;
          alert("Unable to Connect to Server");
        })
     
    }
  }


  login()
  {
    this.routerExtensions.backToPreviousPage();
  }

  onChange()
  {
    if (this.user.password != this.user.confirmPassword) {
      console.log("Your passwords do not match.");
this.pass=false
this.isValid=false;
  }
  else
  {
    this.pass=true;
    console.log("Your passwords match.");
this.isValid=true;
  }
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
}*/
}
