import {Component, OnInit} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent} from "@ng2-dynamic-forms/ui-material";
import {MATERIAL_EXAMPLE_MODEL} from "./material-example.model";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormMaterialComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-material-example",
    templateUrl: "./material-example.component.html",
})

export class MaterialExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = MATERIAL_EXAMPLE_MODEL;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormModel.findById("exampleCheckbox");

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    test() {
        this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        this.dynamicFormModel.model[1].value = "42";
    }
}