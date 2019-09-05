import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { RegisterComponent } from "./register/register.component";
import { VerifycodeComponent } from "./verifycode/verifycode.component";
import { VerifyphoneComponent } from "./verifyphone/verifyphone.component";
import { VerifyresetcodeComponent } from "./verifyresetcode/verifyresetcode.component";
import { ResetpassComponent } from "./resetpass/resetpass.component";

const routes: Routes = [
    { path: ""
    

    , children: [
        {
            path: '',
            component: HomeComponent
          
        },
        {
            path: 'register',
            component: RegisterComponent,
            },
            {
                path: 'verify',
                component: VerifycodeComponent,
                }
                ,
                {
                    path: 'reset',
                    component: VerifyphoneComponent,
                    } ,{
                        path: 'resetcode',
                        component: VerifyresetcodeComponent,
                        },
                        {
                            path: 'resetpass',
                            component: ResetpassComponent,
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
export class HomeRoutingModule { }
