import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from "@angular/forms";
import {DynamicFormService, DynamicCheckboxModel, DynamicFormModel} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent} from "@ng2-dynamic-forms/ui-bootstrap";
import {BOOTSTRAP_EXAMPLE_MODEL} from "./bootstrap-example.model";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormBootstrapComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-bootstrap-example",
    styleUrls: ["../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
    templateUrl: "./bootstrap-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class BootstrapExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: FormGroup;
    
    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = BOOTSTRAP_EXAMPLE_MODEL;
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
        this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        this.dynamicFormModel.items[1].value = "42";
    }
}