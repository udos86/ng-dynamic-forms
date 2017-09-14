import { RouterModule, Route } from "@angular/router";
import { BasicSampleFormComponent } from "./basic-sample-form/basic-sample-form.component";
import { BootstrapSampleFormComponent } from "./bootstrap-sample-form/bootstrap-sample-form.component";
import { FoundationSampleFormComponent } from "./foundation-sample-form/foundation-sample-form.component";
import { KendoSampleFormComponent } from "./kendo-sample-form/kendo-sample-form.component";
import { MaterialSampleFormComponent } from "./material-sample-form/material-sample-form.component";
import { NGBootstrapSampleFormComponent } from "./ng-bootstrap-sample-form/ng-bootstrap-sample-form.component";
import { PrimeNGSampleFormComponent } from "./primeng-sample-form/primeng-sample-form.component";
import { NgModule } from "@angular/core";

const APP_ROUTES: Route[] = [
    {
        path: "",
        redirectTo: "/ng-bootstrap-sample-form",
        pathMatch: "full"
    },
    {
        path: "basic-sample-form",
        component: BasicSampleFormComponent,
        data: {
            title: "Basic UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/basic-sample-form/basic-sample-form.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "bootstrap-sample-form",
        component: BootstrapSampleFormComponent,
        data: {
            title: "Bootstrap UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/bootstrap-sample-form/bootstrap-sample-form.model.ts",
            bgColor: "#6f5499"
        }
    },
    {
        path: "foundation-sample-form",
        component: FoundationSampleFormComponent,
        data: {
            title: "Foundation UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/foundation-sample-form/foundation-sample-form.model.ts",
            bgColor: "#2199e8"
        }
    },
    {
        path: "kendo-sample-form",
        component: KendoSampleFormComponent,
        data: {
            title: "Kendo UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/kendo-sample-form/kendo-sample-form.model.ts",
            bgColor: "#ff5747"
        }
    },
    {
        path: "material-sample-form",
        component: MaterialSampleFormComponent,
        data: {
            title: "Material UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/material-sample-form/material-sample-form.model.ts",
            bgColor: "#009688"
        }
    },
    {
        path: "ng-bootstrap-sample-form",
        component: NGBootstrapSampleFormComponent,
        data: {
            title: "NG Bootstrap UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/ng-bootstrap-sample-form/ng-bootstrap-sample-form.model.ts",
            bgColor: "#1b95e0"
        }
    },
    {
        path: "primeng-sample-form",
        component: PrimeNGSampleFormComponent,
        data: {
            title: "Prime NG UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/primeng-sample-form/primeng-sample-form.model.ts",
            bgColor: "#DB2226"
        }
    },
    {
        path: "async-sample-form",
        loadChildren: "app/async-sample-form/async-sample-form.module#AsyncSampleFormModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}