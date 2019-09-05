import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DataService } from "~/shared/Data.service";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "~/shared/login.service";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    constructor(private ls:LoginService,private ds:DataService,private re:RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    logout()
    {
this.ls.logout(this.ds.activeUser.id).then(res=>
    {

        this.re.navigate([""],{replaceUrl:true});
    }
)

    }
}
