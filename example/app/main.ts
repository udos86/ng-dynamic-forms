import {bootstrap} from "@angular/platform-browser-dynamic";
import {Title} from "@angular/platform-browser";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";

import {AppComponent} from "./app.component";

bootstrap(AppComponent, [
    Title,
    disableDeprecatedForms(),
    provideForms(),
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS

]).then(

    success => console.log("App bootstrapping erfolgreich!"),
    error => console.log(error)
);

