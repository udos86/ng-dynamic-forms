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
    MatAutocomplete,
    MatCheckbox,
    MatChipInputEvent,
    MatDatepicker,
    MatFormField,
    MatInput,
    MatRadioGroup,
    MatSelect,
    MatSlider,
    MatSlideToggle
} from "@angular/material";
import {
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormValueControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DynamicInputControlModel,
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
import { MatFormControlType, MAT_VIEW_CHILD_SELECTOR } from "./dynamic-material-form.const";

export type MatFormControlComponent = MatAutocomplete | MatCheckbox | MatDatepicker<Date> | MatFormField |
    MatRadioGroup | MatSelect | MatSlider | MatSlideToggle;

@Component({
    selector: "dynamic-material-form-control,dynamic-form-material-control",
    templateUrl: "./dynamic-material-form-control.component.html"
})
export class DynamicMaterialFormControlComponent extends DynamicFormControlComponent implements OnChanges {

    private _showCharacterCount: boolean = false;

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as DynamicInputModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output("dfBlur") blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dfChange") change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dfFocus") focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("matEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild(MAT_VIEW_CHILD_SELECTOR) matViewChild: MatFormControlComponent | undefined;
    @ViewChild(MatInput) matInput: MatInput | undefined;

    type: MatFormControlType | null;

    private chipList: string[] | null = null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, layoutService, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.updateFormControlType();
        }
    }

    get characterCount(): number | null {
        return this.matInput ? this.matInput.value.length : null;
    }

    get characterHint(): string {
        return `${this.characterCount} / ${(this.model as DynamicInputControlModel<string>).maxLength}`;
    }

    get hasMatFormField(): boolean {
        return this.type === 3 || this.type === 5 || this.type === 7 || this.type === 10;
    }

    onChipInputTokenEnd($event: MatChipInputEvent): void {

        let input = $event.input,
            value = $event.value.trim();

        if (Array.isArray(this.chipList) && value.length > 0) {

            this.chipList.push(value);
            this.control.patchValue(this.chipList);
        }

        if (input instanceof HTMLInputElement) {
            input.value = "";
        }
    }

    onChipRemoved(_chip: string, index: number): void {

        if (Array.isArray(this.chipList)) {

            this.chipList.splice(index, 1);
            this.control.patchValue(this.chipList);
        }
    }

    updateFormControlType(): void {

        this.type = DynamicMaterialFormControlComponent.getFormControlType(this.model);

        if (this.type === MatFormControlType.Chips) {
            this.chipList = (this.model as DynamicFormValueControlModel<string[]>).value || [];
        }
    }

    static getFormControlType(model: DynamicFormControlModel): MatFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return MatFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return MatFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return MatFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                return MatFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                let inputModel = model as DynamicInputModel;

                return inputModel.multiple ? MatFormControlType.Chips : MatFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return MatFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return MatFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return MatFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return MatFormControlType.SlideToggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return MatFormControlType.TextArea;

            default:
                return null;
        }
    }
}