import {provideRouter, RouterConfig} from "@angular/router";
import {BasicExampleComponent} from "./basic/basic-example.component";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";

export const routes: RouterConfig = [
    {path: "", redirectTo: "/example-basic", terminal: true},
    {path: "example-basic", component: BasicExampleComponent},
    {path: "example-bootstrap", component: BootstrapExampleComponent},
    {path: "example-foundation", component: FoundationExampleComponent},
    {path: "example-material", component: MaterialExampleComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];