import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import {  NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { FirmDriverComponent } from "./firm-driver/firm-driver.component";
import { DriverProfileComponent } from "./driver-profile/driver-profile.component";



const routes: Routes = [
    { path: "", component: FirmDriverComponent },
    {
        path: ':id',
        component: DriverProfileComponent,
        }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DriverssRoutingModule { }
