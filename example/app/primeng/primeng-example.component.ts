import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from "@angular/forms";
import {DynamicFormService, DynamicCheckboxModel, DynamicFormControlModel} from "@ng2-dynamic-forms/core";
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

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = PRIMENG_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormService.findById("exampleCheckbox", this.dynamicFormModel);

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }
}