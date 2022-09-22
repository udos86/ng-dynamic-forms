import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { SliderComponent } from "@progress/kendo-angular-inputs";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicSliderModel,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-kendo-slider",
    templateUrl: "./dynamic-kendo-slider.component.html"
})
export class DynamicKendoSliderComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSliderModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoSlider", {static: true}) kendoSlider!: SliderComponent;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
