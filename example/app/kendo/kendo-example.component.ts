import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicFormArrayModel,
    DynamicInputModel
} from "@ng2-dynamic-forms/core";
import {KENDO_EXAMPLE_MODEL} from "./kendo-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-kendo-example",
    styleUrls: ["../../../node_modules/@telerik/kendo-theme-default/dist/all.css"],
    templateUrl: "./kendo-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class KendoExampleComponent implements OnInit {

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = KENDO_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);
    }
}