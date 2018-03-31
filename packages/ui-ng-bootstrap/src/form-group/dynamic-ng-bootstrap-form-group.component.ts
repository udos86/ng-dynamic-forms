import { Component, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlCustomEvent,
    DynamicFormGroupComponent,
    DynamicFormGroupModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ng-bootstrap-form-group",
    templateUrl: "./dynamic-ng-bootstrap-form-group.component.html"
})
export class DynamicNGBootstrapFormGroupComponent extends DynamicFormGroupComponent {

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormGroupModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}