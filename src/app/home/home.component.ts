import { Component, OnInit, AfterViewInit } from "@angular/core";

import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page/page";
import { User } from "../models/user.model";
import { LoginService } from "~/shared/login.service";
import { DataService } from "~/shared/Data.service";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls :["./home.css"]
})
export class HomeComponent implements OnInit,AfterViewInit {
    public drawer: RadSideDrawer;
   public user:User;
   public phone;
   public rem:Boolean
   public pass;
   showSpinner:Boolean;
    constructor(private _page: Page,private _loginService:LoginService,private DataService:DataService
        ,private routerExtensions:RouterExtensions) {
        this.user=new User();
        this.rem=false;
        // Use the component constructor to inject providers.
    }
    onRem()
    {

        this.rem=!this.rem;
        console.log(this.rem);
    }

    ngOnInit(): void {
        // Init your component properties here.
        this._page.actionBarHidden = true;
        this.showSpinner=true;
      
    }
    ngAfterViewInit() {
        // use setTimeout otherwise there is no getRootView valid reference
        setTimeout(() => {
            
            const sideDrawer = <RadSideDrawer>app.getRootView();
            sideDrawer.gesturesEnabled=false;
        

        }, 100);
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }


    submit()
    {
       //alert("here");
    
        console.log("fdfd"+this.user.phoneNumber + this.user.password);

       // alert(this.user.phoneNumber);
        if (!this.user.phoneNumber || !this.user.password) 
        {
            
            alert("Please provide both A Phone Number and password.");
        }
    
        else
        {
          this.login()
        }
    }


    login()
    {
this.showSpinner=false;
  
      var credentials={

        phoneNo:this.user.phoneNumber,
password :this.user.password
    }
    

    this._loginService.login(credentials).subscribe(result=>
        {
this.showSpinner=true;
            console.log(JSON.stringify(result));
           

            try
            {
           var x=result.json()
       
         console.log("  eqweq"+JSON.stringify(x));


          if(x.val=="-6")
          {
             alert("Please Activate your account");
             this.DataService.verifyphone=this.user.phoneNumber;
             this.routerExtensions.navigate(['home/verify']);

          }
      
		else if (x.val == "-1")
					{
						alert(x.data);
					}

else if(x.id)
           {

            this._loginService.setDeviceToken(x.id,this.DataService.token).subscribe(res=>
                {
                  console.log(res.json());
                },err=>
                {
    
                  console.log("i am error");
                });

       //     alert(JSON.stringify(x));
            this.user.id=x.id;
            this.user.owner=x.owner;
            this.user.address=x.address;
            this.user.owner=x.owner;
            this.user.drivercount=x.drivercount;
            this.user.license=x.license;
            this.user.jobcount=x.jobcount;
           // this.user.drivercount=x.drivercount
            this.user.earning=x.earning;
            this.user.license=x.license;
            this.user.image=x.image;
         //  alert(JSON.stringify(this.user));
       
         if(this.rem)
         {
         this._loginService.insertData(this.user).then(result=>
          {

            this.DataService.activeUser=this.user;
            this.routerExtensions.navigate(['search'],{clearHistory :true});

          });
        }else
        {
            this.DataService.activeUser=this.user;
            this.routerExtensions.navigate(['search'],{clearHistory :true});

        }

var status=result.status;
console.log("status : " +status );
this.showSpinner=true;


         }
         else
         {
             this.showSpinner=true;
          alert("Unable to Login\n check Credentials");

         }

        }
        catch(ex)
        {
            alert("Unable to Login\n check Connection");
        }

        },err=>
        {
            this.showSpinner=true;
alert("Unable to Connect to Server");

        });




    }

    onButtonTap()
    {
        this.routerExtensions.navigate(['home/reset']);

    }


    register()
    {
        this.routerExtensions.navigate(['home/register']);

    }
}
