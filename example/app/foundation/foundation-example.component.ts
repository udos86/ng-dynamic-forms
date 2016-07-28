import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormFoundationSitesComponent} from "@ng2-dynamic-forms/ui-foundation";
import {FOUNDATION_EXAMPLE_MODEL} from "./foundation-example.model";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormFoundationSitesComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-foundation-example",
    styleUrls: ["../../node_modules/foundation-sites/dist/foundation.min.css"],
    templateUrl: "./foundation-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class FoundationExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: FormGroup;
    
    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = FOUNDATION_EXAMPLE_MODEL;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormModel.findById("exampleCheckbox");
        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    set modelEdit(value: string) {
        try {
            this.dynamicFormModel.group = JSON.parse(value);

        } catch (e) {
            // Just do nothing
        }
    }

    get modelEdit() {
        return JSON.stringify(this.dynamicFormModel.group, null, 2);
    }

    test() {
        //this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        //this.dynamicFormModel.items[1].value = "42";
    }
}