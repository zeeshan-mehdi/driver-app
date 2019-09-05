import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SearchRoutingModule } from '../search/search-routing.module';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular/autocomplete-directives';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { DriverssRoutingModule } from './drivers.routes';
import { FirmDriverComponent } from './firm-driver/firm-driver.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';


@NgModule({
  declarations: [
    FirmDriverComponent,
    DriverProfileComponent
  ],
  imports: [
    NativeScriptCommonModule,
    DriverssRoutingModule,
     
        NativeScriptFormsModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIListViewModule,
      
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptRouterModule,
        
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DriversModule { }
