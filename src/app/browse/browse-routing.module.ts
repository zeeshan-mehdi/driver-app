import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse.component";
import { BidsComponent } from "./bids/bids.component";

const routes: Routes = [
    { path: ""
    

    , children: [
        {
            path: '',
            component: BrowseComponent
          
        },
        {
            path: ':id',
            component: BidsComponent,
            }//,
           // canDeactivate : [PatientGuardService]
            // component: PatientDetailComponent
            //,resolve : {patientlist : PatientlistResolver}
    ]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BrowseRoutingModule { }
