import { RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { AsyncSampleFormComponent } from "./async-sample-form.component";

const ASYNC_ROUTES: Route[] = [
    {
        path: "",
        component: AsyncSampleFormComponent
    }
];

@NgModule({

    imports: [RouterModule.forChild(ASYNC_ROUTES)],
    exports: [RouterModule]
})

export class AsyncSampleFormRoutingModule {
}