import { NgModule } from '@angular/core';
import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";
import { AsyncExampleRoutingModule } from "./async-example.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AsyncExampleComponent } from "./async-example.component";

@NgModule({

    imports: [
        AsyncExampleRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsBootstrapUIModule
    ],
    declarations: [AsyncExampleComponent]
})

export class AsyncExampleModule {
}