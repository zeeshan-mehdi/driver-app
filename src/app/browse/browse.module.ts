import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {RadListViewComponent,NativeScriptUIListViewModule} from "nativescript-ui-listview/angular/listview-directives";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { BidsComponent } from "./bids/bids.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RouterModule, ActivatedRouteSnapshot } from "@angular/router";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BrowseRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptRouterModule,
        RouterModule
    ],
    declarations: [
        BrowseComponent,
        BidsComponent,
        
    ],
    providers:
    [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule { }
