import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";
import { NgClass, NgIf, NgFor } from "@angular/common";

@Component({
    selector: "dynamic-kendo-checkbox-group",
    templateUrl: "./dynamic-kendo-checkbox-group.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgFor]
})
export class DynamicKendoCheckboxGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicCheckboxGroupModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    getCheckboxId(model: DynamicCheckboxModel) {
        return this.layoutService.getElementId(model);
    }

    onCheckboxChange($event: Event, model: DynamicCheckboxModel) {
        this.onChange($event);
        model.value = ($event.target as HTMLInputElement).checked;
    }
}
