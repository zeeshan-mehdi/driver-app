import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { JobsComponent } from './jobs.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SearchRoutingModule } from '../search/search-routing.module';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular/autocomplete-directives';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { JobsRoutingModule } from './jobs-routing.module';
import { BidonjobComponent } from './bidonjob/bidonjob.component';

@NgModule({
  declarations: [JobsComponent,BidonjobComponent],

  imports: [
    NativeScriptCommonModule,
    JobsRoutingModule,
     
        NativeScriptFormsModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIListViewModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class JobsModule { }
