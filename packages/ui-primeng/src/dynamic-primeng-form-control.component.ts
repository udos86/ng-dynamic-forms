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
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_RATING,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER, DynamicFormValueControlInterface
} from "@ng-dynamic-forms/core";
import {
    PrimeNGFormControlType,
    PRIME_NG_VIEW_CHILD_SELECTOR,
    PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES,
    PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES
} from "./dynamic-primeng-form.const";

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
        return null;
    }

    protected setTemplateDirective(directive: DynamicTemplateDirective): void {

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
    }

    protected setTemplates(): void {

        super.setTemplates();

        this.templateList
            .filter(template => typeof template.as === "string")
            .forEach(template => this.setTemplateDirective(template));
    }
}

export function mapDynamicPrimeNGComponentByModel(model: DynamicFormControlModel): PrimeNGFormControlType | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return PrimeNGFormControlType.Array;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return PrimeNGFormControlType.Checkbox;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return PrimeNGFormControlType.Group;

        case DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER:
            return PrimeNGFormControlType.ColorPicker;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return PrimeNGFormControlType.Calendar;

        case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
            return PrimeNGFormControlType.Editor;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            let inputModel = model as DynamicInputModel;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return PrimeNGFormControlType.Spinner;

            } else if (inputModel.mask) {
                return PrimeNGFormControlType.InputMask;

            } else if (Array.isArray(inputModel.list)) {
                return PrimeNGFormControlType.AutoComplete;

            } else if (inputModel.multiple) {
                return PrimeNGFormControlType.Chips;

            } else {
                return PrimeNGFormControlType.Input;
            }

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return PrimeNGFormControlType.RadioGroup;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return PrimeNGFormControlType.Rating;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            let selectModel = model as DynamicSelectModel<any>;

            return selectModel.multiple ? PrimeNGFormControlType.MultiSelect : PrimeNGFormControlType.Dropdown;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return PrimeNGFormControlType.Slider;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return PrimeNGFormControlType.InputSwitch;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return PrimeNGFormControlType.TextArea;

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