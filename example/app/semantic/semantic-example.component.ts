import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormControlModel
} from "@ng2-dynamic-forms/core";
import { SEMANTIC_EXAMPLE_MODEL } from "./semantic-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-semantic-example",
    styleUrls: ["../../../node_modules/semantic-ui-css/semantic.min.css"],
    templateUrl: "./semantic-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class SemanticExampleComponent implements OnInit {

    formModel: Array<DynamicFormControlModel> = SEMANTIC_EXAMPLE_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

    onBlur($event) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}