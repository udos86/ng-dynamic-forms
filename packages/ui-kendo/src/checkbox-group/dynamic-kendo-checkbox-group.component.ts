import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicCheckboxGroupModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-kendo-checkbox-group",
    templateUrl: "./dynamic-kendo-checkbox-group.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicKendoCheckboxGroupComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicCheckboxGroupModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}