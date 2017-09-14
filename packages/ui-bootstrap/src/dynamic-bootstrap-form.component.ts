import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicBootstrapFormControlComponent } from "./dynamic-bootstrap-form-control.component";

@Component({
    selector: "dynamic-bootstrap-form",
    templateUrl: "./dynamic-bootstrap-form.component.html"
})
export class DynamicBootstrapFormComponent extends DynamicFormComponent {

    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel[];

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicBootstrapFormControlComponent) components: QueryList<DynamicBootstrapFormControlComponent>;
}