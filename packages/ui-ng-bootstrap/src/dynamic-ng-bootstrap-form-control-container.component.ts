import {
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormArrayGroupModel,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_RATING,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicDatePickerModel
} from "@ng-dynamic-forms/core";
import { DynamicNGBootstrapCheckboxComponent } from "./checkbox/dynamic-ng-bootstrap-checkbox.component";
import { DynamicNGBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ng-bootstrap-checkbox-group.component";
import { DynamicNGBootstrapCalendarComponent } from "./calendar/dynamic-ng-bootstrap-calendar.component";
import { DynamicNGBootstrapDatePickerComponent } from "./datepicker/dynamic-ng-bootstrap-datepicker.component";
import { DynamicNGBootstrapFormArrayComponent } from "./form-array/dynamic-ng-bootstrap-form-array.component";
import { DynamicNGBootstrapFormGroupComponent } from "./form-group/dynamic-ng-bootstrap-form-group.component";
import { DynamicNGBootstrapInputComponent } from "./input/dynamic-ng-bootstrap-input.component";
import { DynamicNGBootstrapRadioGroupComponent } from "./radio-group/dynamic-ng-bootstrap-radio-group.component";
import { DynamicNGBootstrapRatingComponent } from "./rating/dynamic-ng-bootstrap-rating.component";
import { DynamicNGBootstrapSelectComponent } from "./select/dynamic-ng-bootstrap-select.component";
import { DynamicNGBootstrapTextAreaComponent } from "./textarea/dynamic-ng-bootstrap-textarea.component";
import { DynamicNGBootstrapTimePickerComponent } from "./timepicker/dynamic-ng-bootstrap-timepicker.component";

@Component({
    selector: "dynamic-ng-bootstrap-form-control",
    templateUrl: "./dynamic-ng-bootstrap-form-control-container.component.html"
})
export class DynamicNGBootstrapFormControlContainerComponent extends DynamicFormControlContainerComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() asBootstrapFormGroup: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("ngbEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef}) componentViewContainerRef: ViewContainerRef;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.layoutService.getCustomComponentType(this.model) || ngBootstrapUIFormControlMapFn(this.model);
    }
}

export function ngBootstrapUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicNGBootstrapFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicNGBootstrapCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicNGBootstrapCheckboxGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            let datePickerModel = model as DynamicDatePickerModel;

            return datePickerModel.inline ? DynamicNGBootstrapCalendarComponent : DynamicNGBootstrapDatePickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicNGBootstrapFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicNGBootstrapInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicNGBootstrapRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return DynamicNGBootstrapRatingComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicNGBootstrapSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicNGBootstrapTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicNGBootstrapTimePickerComponent;

        default:
            return null;
    }
}