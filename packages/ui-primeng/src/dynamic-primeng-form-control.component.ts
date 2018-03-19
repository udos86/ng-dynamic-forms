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
    AutoComplete,
    Calendar,
    Checkbox,
    Chips,
    ColorPicker,
    Dropdown,
    Editor,
    InputMask,
    InputSwitch,
    MultiSelect,
    Rating,
    Slider,
    Spinner
} from "primeng/primeng";
import {
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_RATING,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicFormValueControlInterface
} from "@ng-dynamic-forms/core";
import {
    PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES,
    PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES
} from "./dynamic-primeng-form.const";
import { DynamicPrimeNGCheckboxComponent } from "./checkbox/dynamic-primeng-checkbox.component";
import { DynamicPrimeNGColorPickerComponent } from "./colorpicker/dynamic-primeng-colorpicker.component";
import { DynamicPrimeNGCalendarComponent } from "./calendar/dynamic-primeng-calendar.component";
import { DynamicPrimeNGEditorComponent } from "./editor/dynamic-primeng-editor.component";
import { DynamicPrimeNGSpinnerComponent } from "./spinner/dynamic-primeng-spinner.component";
import { DynamicPrimeNGInputMaskComponent } from "./input-mask/dynamic-primeng-input-mask.component";
import { DynamicPrimeNGAutoCompleteComponent } from "./autocomplete/dynamic-primeng-autocomplete.component";
import { DynamicPrimeNGChipsComponent } from "./chips/dynamic-primeng-chips.component";
import { DynamicPrimeNGInputComponent } from "./input/dynamic-primeng-input.component";
import { DynamicPrimeNGRadioGroupComponent } from "./radio-group/dynamic-primeng-radio-group.component";
import { DynamicPrimeNGRatingComponent } from "./rating/dynamic-primeng-rating.component";
import { DynamicPrimeNGMultiSelectComponent } from "./multiselect/dynamic-primeng-multiselect.component";
import { DynamicPrimeNGDropdownComponent } from "./dropdown/dynamic-primeng-dropdown.component";
import { DynamicPrimeNGSliderComponent } from "./slider/dynamic-primeng-slider.component";
import { DynamicPrimeNGInputSwitchComponent } from "./input-switch/dynamic-primeng-input-switch.component";
import { DynamicPrimeNGTextAreaComponent } from "./textarea/dynamic-primeng-textarea.component";

export type PrimeNGFormControlComponent = AutoComplete | Calendar | Checkbox | Chips | ColorPicker | Dropdown | Editor |
    InputMask | InputSwitch | MultiSelect | Rating | Slider | Spinner;

@Component({
    selector: "dynamic-primeng-form-control",
    templateUrl: "./dynamic-primeng-form-control.component.html"
})
export class DynamicPrimeNGFormControlComponent extends DynamicFormControlComponent {

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
    @Output("pEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef}) componentViewContainerRef: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormValueControlInterface> | null {
        return mapDynamicPrimeNGComponentByModel(this.model);
    }

    protected setTemplateDirective(_directive: DynamicTemplateDirective): void {
        /*
        let controlViewChild = this.componentRef && this.componentRef.instance.controlViewChild;

        if (controlViewChild && (directive.modelId === this.model.id || directive.modelType === this.model.type)) {

            let pViewChild = controlViewChild as PrimeNGFormControlComponent,
                templateDirectives: any = mapPrimeNGTemplateDirectivesByComponent(pViewChild);

            Object.keys(templateDirectives || {}).forEach((key: string) => {

                if (templateDirectives[key] === directive.as) {
                    (pViewChild)[key] = directive.templateRef;
                }
            });
        }
        */
    }

    protected setTemplates(): void {

        super.setTemplates();

        this.templateList
            .filter(template => typeof template.as === "string")
            .forEach(template => this.setTemplateDirective(template));
    }
}

export function mapDynamicPrimeNGComponentByModel(model: DynamicFormControlModel): Type<DynamicFormValueControlInterface>  | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicPrimeNGCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER:
            return DynamicPrimeNGColorPickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicPrimeNGCalendarComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
            return DynamicPrimeNGEditorComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            let inputModel = model as DynamicInputModel;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return DynamicPrimeNGSpinnerComponent;

            } else if (inputModel.mask) {
                return DynamicPrimeNGInputMaskComponent;

            } else if (Array.isArray(inputModel.list)) {
                return DynamicPrimeNGAutoCompleteComponent;

            } else if (inputModel.multiple) {
                return DynamicPrimeNGChipsComponent;

            } else {
                return DynamicPrimeNGInputComponent;
            }

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicPrimeNGRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return DynamicPrimeNGRatingComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            let selectModel = model as DynamicSelectModel<string>;

            return selectModel.multiple ? DynamicPrimeNGMultiSelectComponent : DynamicPrimeNGDropdownComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return DynamicPrimeNGSliderComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicPrimeNGInputSwitchComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicPrimeNGTextAreaComponent;

        default:
            return null;
    }
}

export function mapPrimeNGTemplateDirectivesByComponent(component: PrimeNGFormControlComponent): any | null {

    switch (component.constructor) {

        case AutoComplete:
            return PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;

        case Chips:
            return PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES;

        case Dropdown:
            return PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;

        default:
            return null;
    }
}