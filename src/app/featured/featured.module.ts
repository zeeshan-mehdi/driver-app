import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FeaturedRoutingModule } from "./featured-routing.module";
import { FeaturedComponent } from "./featured.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {PaypalComponent} from "./paypal/paypal.component"
@NgModule({
    imports: [
        NativeScriptCommonModule,
        FeaturedRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        FeaturedComponent,
        PaypalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeaturedModule { }
