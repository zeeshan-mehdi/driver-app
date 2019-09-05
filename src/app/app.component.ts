import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { AppService } from "./app.service";
import { LoginService } from "~/shared/login.service";
import { DataService } from "~/shared/Data.service";
import * as fs from "tns-core-modules/file-system/file-system";

const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    username;
    img = "~/images/user.png";
    email;

    constructor(private router: Router, private routerExtensions: RouterExtensions,
                private AppService: AppService, private LoginService: LoginService,
                private DataService: DataService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {

        this.AppService.createTables();


        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        firebase.registerForPushNotifications({
            onPushTokenReceivedCallback: (token: string): void => {
                console.log("Firebase plugin received a push token: " + token);

                // see their respective docs.}
            }
        }).then(
            () => {

                console.log("firebase.init");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );


        var _this = this;

        firebase.addOnPushTokenReceivedCallback(
            function (token) {
                // ..
                console.log("Firebase push token: " + token);
                _this.DataService.token = token;

            }
        );
        this.LoginService.verifyUser().then(data => {
            if (data) {


                this.DataService.activeUser = data;
                console.log("\n\n\n" + JSON.stringify(data));
                // this.DataService.credentials={username: data.phoneno,
                //  password : data.password}
                this.username = this.DataService.activeUser.owner;
                if (fs.File.exists("/data/user/0/org.te.FirmApp/files/IMAGE"))
                    this.img = "/data/user/0/org.te.FirmApp/files/IMAGE";
                else
                    this.img = "~/images/user.png";

                //  this.img="~/images/user.png"
                this.email = this.DataService.activeUser.phoneNumber;

                console.log("LLLLLL" + JSON.stringify(data));
                this.routerExtensions.navigate(['search'], {clearHistory: true});
                // this._activatedUrl = "/browse";

                _this.LoginService.setDeviceToken(_this.DataService.activeUser.id, this.DataService.token).subscribe(res => {
                    console.log(res.json());

                }, err => {

                    console.log("i am error");
                });

            }
        });


    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {

        console.log(navItemRoute);
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
