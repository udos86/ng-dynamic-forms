import { Component, ContentChildren, Input, EventEmitter, OnInit, Output, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
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
} from "@ng2-dynamic-forms/core";

export const enum BootstrapFormControlType {

    Array = "ARRAY",
    Checkbox = "CHECKBOX",
    Group = "GROUP",
    Input = "INPUT",
    RadioGroup = "RADIO_GROUP",
    Select = "SELECT",
    TextArea = "TEXTAREA"
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-bootstrap-control",
    templateUrl: "./dynamic-form-bootstrap.component.html"
})
export class DynamicFormBootstrapComponent extends DynamicFormControlComponent implements OnInit {

    @Input() asBootstrapFormGroup: boolean = true;
    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    type: BootstrapFormControlType | null;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.type = DynamicFormBootstrapComponent.mapFormControlType(this.model);
    }

    static mapFormControlType(model: DynamicFormControlModel): BootstrapFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return BootstrapFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return BootstrapFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return BootstrapFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return BootstrapFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return BootstrapFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return BootstrapFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return BootstrapFormControlType.TextArea;

            default:
                return null;
        }
    }
}