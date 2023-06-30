import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, ReactiveFormsModule, UntypedFormArray } from "@angular/forms";
import {
    DynamicFormArrayModel,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormService, DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { FOUNDATION_SAMPLE_FORM_MODEL } from "./foundation-sample-form.model";
import { FOUNDATION_SAMPLE_FORM_LAYOUT } from "./foundation-sample-form.layout";
import { DynamicFoundationFormComponent } from "@ng-dynamic-forms/ui-foundation";
import { JsonPipe } from "@angular/common";

@Component({
    selector: "dynamic-foundation-sample-form",
    styleUrls: ["../../../node_modules/foundation-sites/dist/css/foundation.css"],
    templateUrl: "./foundation-sample-form.component.html",
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [JsonPipe, ReactiveFormsModule, DynamicFoundationFormComponent, DynamicTemplateDirective]
})
export class FoundationSampleFormComponent {
    formModel: DynamicFormControlModel[] = FOUNDATION_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = FOUNDATION_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    arrayModel = this.formService.findModelById<DynamicFormArrayModel>("foundationFormArray", this.formModel) as DynamicFormArrayModel;
    arrayControl = this.formService.findControlByModel <UntypedFormArray>(this.arrayModel, this.formGroup) as UntypedFormArray;

    constructor(private formService: DynamicFormService) {
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formService.insertFormArrayGroup(index, this.arrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, context);
    }

    move(context: DynamicFormArrayModel, index: number, step: number) {
        this.formService.moveFormArrayGroup(index, step, this.arrayControl, context);
    }

    onBlur($event: DynamicFormControlEvent) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}
