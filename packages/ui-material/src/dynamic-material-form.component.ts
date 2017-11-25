import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicTemplateDirective,
} from "@ng-dynamic-forms/core";
import { DynamicMaterialFormControlComponent } from "./dynamic-material-form-control.component";

@Component({
    selector: "dynamic-material-form",
    templateUrl: "./dynamic-material-form.component.html"
})
export class DynamicMaterialFormComponent extends DynamicFormComponent {

    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel[];
    @Input() layout: DynamicFormLayout;

    @Output("dfBlur") blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dfChange") change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dfFocus") focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("matEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicMaterialFormControlComponent) components: QueryList<DynamicMaterialFormControlComponent>;

    constructor(protected layoutService: DynamicFormLayoutService) {
        super(layoutService);
    }
}