import {RouterModule, Routes} from "@angular/router";
import {BasicExampleComponent} from "./basic/basic-example.component";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";
import {PrimeNGExampleComponent} from "./primeng/primeng-example.component";

export const appRoutes: Routes = [
    {path: "", redirectTo: "/example-basic", pathMatch: "full"},
    {path: "example-basic", component: BasicExampleComponent},
    {path: "example-bootstrap", component: BootstrapExampleComponent},
    {path: "example-foundation", component: FoundationExampleComponent},
    {path: "example-material", component: MaterialExampleComponent},
    {path: "example-primeng", component: PrimeNGExampleComponent}
];

export const appRoutingProviders: any[] = [];

export const appRouting: any = RouterModule.forRoot(appRoutes);