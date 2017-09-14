import { NgModule } from '@angular/core';
import { DynamicFormsBootstrapUIModule } from "@ng-dynamic-forms/ui-bootstrap";
import { AsyncSampleFormRoutingModule } from "./async-sample-form.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AsyncSampleFormComponent } from "./async-sample-form.component";

@NgModule({

    imports: [
        AsyncSampleFormRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsBootstrapUIModule
    ],
    declarations: [AsyncSampleFormComponent]
})

export class AsyncExampleModule {
}