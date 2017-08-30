import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicTemplateDirective
} from "@ng2-dynamic-forms/core";
import { DynamicPrimeNGFormControlComponent } from "./dynamic-primeng-form-control.component";

@Component({
    selector: "dynamic-primeng-form",
    templateUrl: "./dynamic-primeng-form.component.html"
})
export class DynamicPrimeNGFormComponent extends DynamicFormComponent {

    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel[];

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicPrimeNGFormControlComponent) components: QueryList<DynamicPrimeNGFormControlComponent>;
}