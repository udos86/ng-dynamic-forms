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
    form: FormGroup;
    
    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = FOUNDATION_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel.group);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormModel.findById("exampleCheckbox");
        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }
}