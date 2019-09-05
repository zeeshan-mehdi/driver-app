import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FeaturedComponent } from "./featured.component";
import { PaypalComponent } from "./paypal/paypal.component";

const routes: Routes = [
    
    { path: ""
    

    , children: [
        {
            path: '',
            component: FeaturedComponent
          
        },
        {
            path: 'paypal',
            component: PaypalComponent
        }
    ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FeaturedRoutingModule { }
