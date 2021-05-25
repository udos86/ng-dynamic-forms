import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ColorPicker } from "primeng/colorpicker";
import {
    DynamicColorPickerModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-colorpicker",
    templateUrl: "./dynamic-primeng-colorpicker.component.html"
})
export class DynamicPrimeNGColorPickerComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: FormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicColorPickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pColorPicker", {static: true}) pColorPicker!: ColorPicker;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
