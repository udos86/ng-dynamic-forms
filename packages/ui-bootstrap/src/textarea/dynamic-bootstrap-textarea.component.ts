import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-bootstrap-textarea",
    templateUrl: "./dynamic-bootstrap-textarea.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicBootstrapTextAreaComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicTextAreaModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}