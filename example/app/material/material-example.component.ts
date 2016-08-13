import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {MATERIAL_EXAMPLE_MODEL} from "./material-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-example",
    templateUrl: "./material-example.component.html",
})

export class MaterialExampleComponent implements OnInit {

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = MATERIAL_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormService.findById("exampleCheckbox", this.dynamicFormModel);

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    test() {
        //this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        //this.dynamicFormModel.items[1].value = "42";
    }
}