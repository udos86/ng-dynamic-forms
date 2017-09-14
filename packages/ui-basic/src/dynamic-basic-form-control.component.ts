import {
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormValidationService,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng-dynamic-forms/core";

export const enum BasicFormControlType {

    Array = 1, //"ARRAY",
    Checkbox = 2, //"CHECKBOX",
    Group = 3, //"GROUP",
    Input = 4, //"INPUT",
    RadioGroup = 5, //"RADIO_GROUP",
    Select = 6, //"SELECT",
    TextArea = 7, //"TEXTAREA"
}

@Component({
    selector: "dynamic-basic-form-control,dynamic-form-basic-control",
    templateUrl: "./dynamic-basic-form-control.component.html"
})
export class DynamicBasicFormControlComponent extends DynamicFormControlComponent implements OnChanges {

    @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplates: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    type: BasicFormControlType | null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = DynamicBasicFormControlComponent.getFormControlType(this.model);
        }
    }

    static getFormControlType(model: DynamicFormControlModel): BasicFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return BasicFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return BasicFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return BasicFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return BasicFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return BasicFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return BasicFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return BasicFormControlType.TextArea;

            default:
                return null;
        }
    }
}