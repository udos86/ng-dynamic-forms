import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicBasicFormControlComponent } from "./dynamic-basic-form-control.component";

@Component({
    selector: "dynamic-basic-form",
    templateUrl: "./dynamic-basic-form.component.html"
})
export class DynamicBasicFormComponent extends DynamicFormComponent {

    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel[];

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicBasicFormControlComponent) components: QueryList<DynamicBasicFormControlComponent>;
}