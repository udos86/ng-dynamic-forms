import { RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { LazyLoadedFormComponent } from "./lazy-loaded-form.component";

const ROUTES: Route[] = [
    {
        path: "",
        component: LazyLoadedFormComponent
    }
];

@NgModule({

    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class LazyLoadedFormRoutingModule {
}
