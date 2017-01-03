import { RouterModule, Route } from "@angular/router";
import { BasicExampleComponent } from "./basic/basic-example.component";
import { BootstrapExampleComponent } from "./bootstrap/bootstrap-example.component";
import { FoundationExampleComponent } from "./foundation/foundation-example.component";
//import { KendoExampleComponent } from "./kendo/kendo-example.component";
import { MaterialExampleComponent } from "./material/material-example.component";
import { PrimeNGExampleComponent } from "./primeng/primeng-example.component";
import { NgModule } from "@angular/core";

const APP_ROUTES: Array<Route> = [
    {
        path: "",
        redirectTo: "/example-bootstrap",
        pathMatch: "full"
    },
    {
        path: "example-basic",
        component: BasicExampleComponent,
        data: {
            title: "Basic UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "example-bootstrap",
        component: BootstrapExampleComponent,
        data: {
            title: "Bootstrap UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/bootstrap/bootstrap-example.model.ts",
            bgColor: "#6f5499"
        }
    },
    {
        path: "example-foundation",
        component: FoundationExampleComponent,
        data: {
            title: "Foundation UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/foundation/foundation-example.model.ts",
            bgColor: "#2199e8"
        }
    },
    {
        path: "example-material",
        component: MaterialExampleComponent,
        data: {
            title: "Material UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/material/material-example.model.ts",
            bgColor: "#009688"
        }
    },
    /*
    {
        path: "example-kendo",
        component: KendoExampleComponent,
        data: {
            title: "Kendo UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/kendo/kendo-example.model.ts",
            bgColor: "#ff5747"
        }
    },
    */
    {
        path: "example-primeng",
        component: PrimeNGExampleComponent,
        data: {
            title: "Prime NG UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/primeng/primeng-example.model.ts",
            bgColor: "#DB2226"
        }
    },
    {
        path: "example-async",
        loadChildren: "app/async/async-example.module#AsyncExampleModule"
    }
];

@NgModule({

    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}