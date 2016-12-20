import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DynamicFormService, DynamicCheckboxModel, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { PRIMENG_EXAMPLE_MODEL } from "./primeng-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-primeng-example",
    styleUrls: ["../../../node_modules/primeui/themes/omega/theme.css", "../../../node_modules/primeui/primeui-ng-all.min.css"],
    templateUrl: "./primeng-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class PrimeNGExampleComponent implements OnInit {

    formModel: Array<DynamicFormControlModel> = PRIMENG_EXAMPLE_MODEL;
    formGroup: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.checkboxControl = <FormControl> this.formGroup.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.checkboxModel = <DynamicCheckboxModel> this.formService.findById("exampleCheckbox", this.formModel);

        //this.checkboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }
}