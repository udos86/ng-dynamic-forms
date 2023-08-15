import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonRange, IonicModule } from "@ionic/angular";
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicSliderModel
} from "@ng-dynamic-forms/core";
import { NgIf, NgClass } from "@angular/common";

@Component({
    selector: "dynamic-ionic-range",
    templateUrl: "./dynamic-ionic-range.component.html",
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, NgIf, NgClass]
})
export class DynamicIonicRangeComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSliderModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("ionRange", {static: true}) ionRange!: IonRange;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
