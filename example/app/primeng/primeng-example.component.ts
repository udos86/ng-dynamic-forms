import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DynamicFormService, DynamicCheckboxModel, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { PRIMENG_EXAMPLE_MODEL } from "./primeng-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-primeng-example",
    styleUrls: ["../../../node_modules/primeng/resources/themes/omega/theme.css", "../../../node_modules/primeng/resources/primeng.min.css"],
    templateUrl: "./primeng-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class PrimeNGExampleComponent implements OnInit {

    formModel: DynamicFormControlModel[] = PRIMENG_EXAMPLE_MODEL;
    formGroup: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.checkboxControl = this.formGroup.controls["exampleCheckbox"] as FormControl; // Type assertion for having updateValue method available
        this.checkboxModel = this.formService.findById("exampleCheckbox", this.formModel) as DynamicCheckboxModel;
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }
}