import {Component} from "@angular/core";
import {DynamicFormService, DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {ASYNC_EXAMPLE_MODEL} from "./async-example.model";
import {FormGroup} from "@angular/forms";

@Component({

    moduleId: module.id,
    selector: "async-example-component",
    templateUrl: "./async-example.component.html"
})

export class AsyncExampleComponent {

    formModel: Array<DynamicFormControlModel> = ASYNC_EXAMPLE_MODEL;
    formGroup: FormGroup;

    constructor(private dynamicFormService: DynamicFormService) {

        this.formGroup = this.dynamicFormService.createFormGroup(this.formModel);
    }
}