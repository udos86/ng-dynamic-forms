import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    DynamicFormControlComponent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";
import { NgClass, NgFor, AsyncPipe } from "@angular/common";
import { ButtonsModule } from "ngx-bootstrap/buttons";

@Component({
    selector: "dynamic-ngx-bootstrap-radio-group",
    templateUrl: "./dynamic-ngx-bootstrap-radio-group.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, ButtonsModule, NgClass, NgFor, AsyncPipe]
})
export class DynamicNGxBootstrapRadioGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
