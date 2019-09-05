// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";
// import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

//
// enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
const firebase=require("nativescript-plugin-firebase");

