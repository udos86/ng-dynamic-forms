import {
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    Type, ViewChild, ViewContainerRef,
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
    DynamicInputModel,
    DynamicSelectModel,
    DynamicDatePickerModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
    DynamicFormValueControlModel,
    isString
} from "@ng-dynamic-forms/core";
import { DynamicKendoAutoCompleteComponent } from "./autocomplete/dynamic-kendo-autocomplete.component";
import { DynamicKendoCheckboxComponent } from "./checkbox/dynamic-kendo-checkbox.component";
import { DynamicKendoCheckboxGroupComponent } from "./checkbox-group/dynamic-kendo-checkbox-group.component";
import { DynamicKendoCalendarComponent } from "./calendar/dynamic-kendo-calendar.component";
import { DynamicKendoDatePickerComponent } from "./datepicker/dynamic-kendo-datepicker.component";
import { DynamicKendoUploadComponent } from "./upload/dynamic-kendo-upload.component";
import { DynamicKendoDateInputComponent } from "./dateinput/dynamic-kendo-dateinput.component";
import { DynamicKendoFormArrayComponent } from "./form-array/dynamic-kendo-form-array.component";
import { DynamicKendoFormGroupComponent } from "./form-group/dynamic-kendo-form-group.component";
import { DynamicKendoMaskedTextBoxComponent } from "./masked-textbox/dynamic-kendo-maskedtextbox.component";
import { DynamicKendoNumericTextBoxComponent } from "./numeric-textbox/dynamic-kendo-numerictextbox.component";
import { DynamicKendoInputComponent } from "./input/dynamic-kendo-input.component";
import { DynamicKendoRadioGroupComponent } from "./radio-group/dynamic-kendo-radio-group.component";
import { DynamicKendoMultiSelectComponent } from "./multiselect/dynamic-kendo-multiselect.component";
import { DynamicKendoDropdownListComponent } from "./dropdownlist/dynamic-kendo-dropdownlist.component";
import { DynamicKendoSliderComponent } from "./slider/dynamic-kendo-slider.component";
import { DynamicKendoSwitchComponent } from "./switch/dynamic-kendo-switch.component";
import { DynamicKendoTextAreaComponent } from "./textarea/dynamic-kendo-textarea.component";
import { DynamicKendoTimePickerComponent } from "./timepicker/dynamic-kendo-timepicker.component";

@Component({
    selector: "dynamic-kendo-form-control",
    templateUrl: "./dynamic-kendo-form-control-container.component.html"
})
export class DynamicKendoFormControlContainerComponent extends DynamicFormControlContainerComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("kendoEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef}) componentViewContainerRef: ViewContainerRef;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.layoutService.getCustomComponentType(this.model) || kendoUIFormControlMapFn(this.model);
    }

    get hasHint(): boolean {
        return this.isTextBox && isString((this.model as DynamicFormValueControlModel<any>).hint);
    }

    get hasLabel(): boolean {
        return this.model.type !== DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX && this.componentType !== DynamicKendoInputComponent && isString(this.model.label);
    }

    get isTextBox(): boolean {
        return this.componentType === DynamicKendoMaskedTextBoxComponent || this.componentType === DynamicKendoNumericTextBoxComponent;
    }
}

export function kendoUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicKendoFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicKendoCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicKendoCheckboxGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            let datepickerModel = model as DynamicDatePickerModel;

            return datepickerModel.inline ? DynamicKendoCalendarComponent : DynamicKendoDatePickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
            return DynamicKendoUploadComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicKendoFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            let inputModel = model as DynamicInputModel;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE) {
                return DynamicKendoDateInputComponent;

            } else if (!inputModel.mask && inputModel.list && inputModel.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return DynamicKendoAutoCompleteComponent;

            } else if (inputModel.mask && inputModel.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return DynamicKendoMaskedTextBoxComponent;

            } else if (!inputModel.mask && inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return DynamicKendoNumericTextBoxComponent;

            } else {
                return DynamicKendoInputComponent;
            }

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicKendoRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            let selectModel = model as DynamicSelectModel<any>;

            return selectModel.multiple ? DynamicKendoMultiSelectComponent : DynamicKendoDropdownListComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return DynamicKendoSliderComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicKendoSwitchComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicKendoTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicKendoTimePickerComponent;

        default:
            return null;
    }
}