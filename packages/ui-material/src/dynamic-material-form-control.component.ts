import {
    ChangeDetectorRef,
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
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlInterface,
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

@Component({
    selector: "dynamic-material-form-control",
    templateUrl: "./dynamic-material-form-control.component.html"
})
export class DynamicMaterialFormControlComponent extends DynamicFormControlComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("matEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef}) componentViewContainerRef: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormValueControlInterface> | null {
        return mapDynamicMaterialComponentByModel(this.model);
    }

    get hasMatFormField(): boolean {

        let matFormFieldTypes = [DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER, DYNAMIC_FORM_CONTROL_TYPE_INPUT,
            DYNAMIC_FORM_CONTROL_TYPE_SELECT, DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA];

        return matFormFieldTypes.some(type => this.model.type === type);
    }
}

export function mapDynamicMaterialComponentByModel(model: DynamicFormControlModel): Type<DynamicFormValueControlInterface> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicMaterialCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicMaterialDatePickerComponent;

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