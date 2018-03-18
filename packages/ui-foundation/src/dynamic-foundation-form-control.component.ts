import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList, Type, ViewChild, ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
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
    DynamicTemplateDirective,
} from "@ng-dynamic-forms/core";
import { DynamicFoundationTextAreaComponent } from "./textarea/dynamic-foundation-textarea.component";
import { DynamicFoundationSwitchComponent } from "./switch/dynamic-foundation-switch.component";
import { DynamicFoundationSelectComponent } from "./select/dynamic-foundation-select.component";
import { DynamicFoundationRadioGroupComponent } from "./radio-group/dynamic-foundation-radio-group.component";
import { DynamicFoundationInputComponent } from "./input/dynamic-foundation-input.component";
import { DynamicFoundationCheckboxComponent } from "./checkbox/dynamic-foundation-checkbox.component";

@Component({
    selector: "dynamic-foundation-form-control",
    templateUrl: "./dynamic-foundation-form-control.component.html"
})
export class DynamicFoundationFormControlComponent extends DynamicFormControlComponent {

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

    @ViewChild("componentViewContainer", {read: ViewContainerRef}) componentViewContainerRef: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormValueControlInterface> | null {
        return mapDynamicFoundationComponentByModel(this.model);
    }
}

export function mapDynamicFoundationComponentByModel(model: DynamicFormControlModel): Type<DynamicFormValueControlInterface> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicFoundationCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicFoundationInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicFoundationRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicFoundationSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicFoundationSwitchComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicFoundationTextAreaComponent;

        default:
            return null;
    }
}