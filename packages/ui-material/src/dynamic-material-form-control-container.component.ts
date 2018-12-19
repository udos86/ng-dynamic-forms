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
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DynamicFormArrayGroupModel,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateDirective,
} from "@ng-dynamic-forms/core";
import { DynamicMaterialDatePickerComponent } from "./datepicker/dynamic-material-datepicker.component";
import { DynamicMaterialInputComponent } from "./input/dynamic-material-input.component";
import { DynamicMaterialTextAreaComponent } from "./textarea/dynamic-material-textarea.component";
import { DynamicMaterialSlideToggleComponent } from "./slide-toggle/dynamic-material-slide-toggle.component";
import { DynamicMaterialCheckboxComponent } from "./checkbox/dynamic-material-checkbox.component";
import { DynamicMaterialSliderComponent } from "./slider/dynamic-material-slider.component";
import { DynamicMaterialRadioGroupComponent } from "./radio-group/dynamic-material-radio-group.component";
import { DynamicMaterialChipsComponent } from "./chips/dynamic-material-chips.component";
import { DynamicMaterialSelectComponent } from "./select/dynamic-material-select.component";
import { DynamicMaterialFormArrayComponent } from "./form-array/dynamic-material-form-array.component";
import { DynamicMaterialFormGroupComponent } from "./form-group/dynamic-material-form-group.component";

@Component({
    selector: "dynamic-material-form-control",
    templateUrl: "./dynamic-material-form-control-container.component.html"
})
export class DynamicMaterialFormControlContainerComponent extends DynamicFormControlContainerComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("matEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef}) componentViewContainerRef: ViewContainerRef;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,) {

        super(componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.layoutService.getCustomComponentType(this.model) || materialUIFormControlMapFn(this.model);
    }

    get hasMatFormField(): boolean {

        let matFormFieldTypes = [DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER, DYNAMIC_FORM_CONTROL_TYPE_INPUT,
            DYNAMIC_FORM_CONTROL_TYPE_SELECT, DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA];

        return matFormFieldTypes.some(type => this.model.type === type);
    }
}

export function materialUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicMaterialFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicMaterialCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicMaterialFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicMaterialDatePickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicMaterialFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            let inputModel = model as DynamicInputModel;

            return inputModel.multiple ? DynamicMaterialChipsComponent : DynamicMaterialInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicMaterialRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicMaterialSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return DynamicMaterialSliderComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicMaterialSlideToggleComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicMaterialTextAreaComponent;

        default:
            return null;
    }
}