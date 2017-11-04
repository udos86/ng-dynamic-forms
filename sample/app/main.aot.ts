import { enableProdMode } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";
// noinspection TypeScriptCheckImport
import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
