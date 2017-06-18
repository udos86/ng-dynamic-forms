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
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng2-dynamic-forms/core";

export const enum FoundationSitesFormControlType {

    Array = "ARRAY",
    Checkbox = "CHECKBOX",
    Group = "GROUP",
    Input = "INPUT",
    RadioGroup = "RADIO_GROUP",
    Select = "SELECT",
    Switch = "SWITCH",
    TextArea = "TEXTAREA"
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-foundation-sites-control",
    templateUrl: "./dynamic-form-foundation-sites.component.html"
})
export class DynamicFormFoundationSitesComponent extends DynamicFormControlComponent implements OnInit {

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

    type: FoundationSitesFormControlType | null;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.type = DynamicFormFoundationSitesComponent.mapFormControlType(this.model);
    }

    static mapFormControlType(model: DynamicFormControlModel): FoundationSitesFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return FoundationSitesFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return FoundationSitesFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return FoundationSitesFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return FoundationSitesFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return FoundationSitesFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return FoundationSitesFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return FoundationSitesFormControlType.Switch;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return FoundationSitesFormControlType.TextArea;

            default:
                return null;
        }
    }
}