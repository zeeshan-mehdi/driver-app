import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { JobsComponent } from "./jobs.component";
import {  NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { BidonjobComponent } from "./bidonjob/bidonjob.component";



const routes: Routes = [

    { path: ""
    

    , children: [
        {
            path: '',
            component: JobsComponent          
        },
        {
            path: ':id',
            component: BidonjobComponent,
            }
    ]}
   
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class JobsRoutingModule { }
