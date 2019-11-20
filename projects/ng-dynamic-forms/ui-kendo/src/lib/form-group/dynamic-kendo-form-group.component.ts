import { Component, EventEmitter, forwardRef, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormGroupComponent,
    DynamicFormGroupModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicKendoFormControlContainerComponent } from "../dynamic-kendo-form-control-container.component";

@Component({
    selector: "dynamic-kendo-form-group",
    templateUrl: "./dynamic-kendo-form-group.component.html"
})
export class DynamicKendoFormGroupComponent extends DynamicFormGroupComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicFormGroupModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(forwardRef(() => DynamicKendoFormControlContainerComponent))
    components: QueryList<DynamicKendoFormControlContainerComponent>;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
