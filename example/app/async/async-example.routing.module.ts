import { RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { AsyncExampleComponent } from "./async-example.component";

const ASYNC_ROUTES: Route[] = [
    {
        path: "",
        component: AsyncExampleComponent
    }
];

@NgModule({

    imports: [RouterModule.forChild(ASYNC_ROUTES)],
    exports: [RouterModule]
})

export class AsyncExampleRoutingModule {
}