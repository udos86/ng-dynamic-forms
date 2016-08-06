import {bootstrap} from "@angular/platform-browser-dynamic";
import {Title} from "@angular/platform-browser";
import {disableDeprecatedForms, provideForms} from "@angular/forms";

import {AppComponent} from "./app.component";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    Title,
    disableDeprecatedForms(),
    provideForms()

]).then(

    success => console.log("App bootstrapping erfolgreich!"),
    error => console.log(error)
);

