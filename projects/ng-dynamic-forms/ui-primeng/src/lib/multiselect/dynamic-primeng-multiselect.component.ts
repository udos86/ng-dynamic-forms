import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { MultiSelect, MultiSelectModule } from "primeng/multiselect";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicSelectModel,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";
import { NgClass, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-primeng-multiselect",
    templateUrl: "./dynamic-primeng-multiselect.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, MultiSelectModule, AsyncPipe]
})
export class DynamicPrimeNGMultiSelectComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pMultiSelect", {static: true}) pMultiSelect!: MultiSelect;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
