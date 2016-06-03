import {bootstrap} from "@angular/platform-browser-dynamic";
import {Title} from "@angular/platform-browser";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";

import {AppComponent} from "./app.component";

bootstrap(AppComponent, [
    Title,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS

]).then(

    success => console.log("App bootstrapping erfolgreich!"),
    error => console.log(error)
);

