import {
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    MdAutocomplete,
    MdCheckbox,
    MdDatepicker,
    MdFormField,
    MdInput,
    MdRadioGroup,
    MdSelect,
    MdSlider,
    MdSlideToggle
} from "@angular/material";
import {
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
    DynamicInputModel,
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
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng-dynamic-forms/core";
import { MdFormControlType, MD_VIEW_CHILD_SELECTOR } from "./dynamic-material-form.const";

export type MdFormControlComponent = MdAutocomplete | MdCheckbox | MdDatepicker<Date> | MdFormField | MdRadioGroup |
    MdSelect | MdSlider | MdSlideToggle;

@Component({
    selector: "dynamic-material-form-control,dynamic-form-material-control",
    templateUrl: "./dynamic-material-form-control.component.html"
})
export class DynamicMaterialFormControlComponent extends DynamicFormControlComponent implements OnChanges {

    private _showCharacterCount: boolean = false;

    @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplates: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as DynamicInputModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild(MD_VIEW_CHILD_SELECTOR) mdViewChild: MdFormControlComponent | undefined;
    @ViewChild(MdInput) mdInput: MdInput | undefined;

    type: MdFormControlType | null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = DynamicMaterialFormControlComponent.getFormControlType(this.model);
        }
    }

    get characterCount(): number | null {
        return this.mdInput ? this.mdInput.value.length : null;
    }

    static getFormControlType(model: DynamicFormControlModel): MdFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return MdFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return MdFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return MdFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                return MdFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return MdFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return MdFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return MdFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return MdFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return MdFormControlType.SlideToggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return MdFormControlType.TextArea;

            default:
                return null;
        }
    }
}