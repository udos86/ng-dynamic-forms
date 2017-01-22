import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { KENDO_EXAMPLE_MODEL } from "./kendo-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-kendo-example",
    styleUrls: ["../../../node_modules/@progress/kendo-theme-default/dist/all.css"],
    templateUrl: "./kendo-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class KendoExampleComponent implements OnInit {

    formModel: Array<DynamicFormControlModel> = KENDO_EXAMPLE_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

    onChange($event) {
        console.log(`CHANGE event on: `, $event);
    }
}