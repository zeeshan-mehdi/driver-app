import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { RegisterComponent } from "./register/register.component";
import { VerifycodeComponent } from "./verifycode/verifycode.component";

import { VerifyphoneComponent } from "./verifyphone/verifyphone.component";
import { VerifyresetcodeComponent } from "./verifyresetcode/verifyresetcode.component";
import { ResetpassComponent } from "./resetpass/resetpass.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule,
    ],
    declarations: [
        HomeComponent,
        RegisterComponent,
        VerifycodeComponent ,
      
        VerifyphoneComponent,
        VerifyresetcodeComponent,
        ResetpassComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
