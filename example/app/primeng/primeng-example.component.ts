import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormPrimeNGComponent} from "@ng2-dynamic-forms/ui-primeng";
import {PRIMENG_EXAMPLE_MODEL} from "./primeng-example.model";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormPrimeNGComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-primeng-example",
    styleUrls: ["../../node_modules/primeui/themes/omega/theme.css", "../../node_modules/primeui/primeui-ng-all.min.css"],
    templateUrl: "./primeng-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class PrimeNGExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = PRIMENG_EXAMPLE_MODEL;
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
            this.dynamicFormModel.items = JSON.parse(value);

        } catch (e) {
            // Just do nothing
        }
    }

    get modelEdit() {
        return JSON.stringify(this.dynamicFormModel.items, null, 2);
    }

    test() {
        //this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        //this.dynamicFormModel.items[1].value = "42";
    }
}