import { platformBrowser }    from "@angular/platform-browser";
import { AppModuleNgFactory } from "../aot/example/app/app.module.ngfactory";

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);