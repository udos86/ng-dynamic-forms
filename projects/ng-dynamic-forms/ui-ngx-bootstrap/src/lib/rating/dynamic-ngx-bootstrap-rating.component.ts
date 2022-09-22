import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicRatingModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ngx-bootstrap-rating",
    templateUrl: "./dynamic-ngx-bootstrap-rating.component.html"
})
export class DynamicNGxBootstrapRatingComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRatingModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
