import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


import { NativeScriptHttpModule } from "nativescript-angular/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginService } from "~/shared/login.service";
import { AppService } from "./app.service";
import { HttpModule } from "@angular/http";
import { DataService } from "~/shared/Data.service";
import { MinLengthDirective, IsPhoneDirective, IsEmailDirective } from "~/shared/input.directive";
import { NativeScriptCommonModule } from "nativescript-angular/common";
// import { PaypalComponent } from "./featured/paypal/paypal.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptCommonModule,
        AppRoutingModule ,
        NativeScriptFormsModule,
         NativeScriptModule,
        NativeScriptUISideDrawerModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        MinLengthDirective,
        IsPhoneDirective,
        IsEmailDirective
    ],
    providers :[
        LoginService,
        AppService,
        DataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
