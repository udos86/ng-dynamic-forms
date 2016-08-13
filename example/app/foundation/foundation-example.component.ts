import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import {FOUNDATION_EXAMPLE_MODEL} from "./foundation-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-foundation-example",
    styleUrls: ["../../node_modules/foundation-sites/dist/foundation.min.css"],
    templateUrl: "./foundation-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class FoundationExampleComponent implements OnInit {

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;
    
    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = FOUNDATION_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormService.findById("exampleCheckbox", this.dynamicFormModel);
        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }
}