import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    HostBinding,
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
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DynamicFormArrayGroupModel,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormComponentService,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormRelationService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DynamicFormDataService,
} from "@ng-dynamic-forms/core";
import { DynamicBasicCheckboxComponent } from "./checkbox/dynamic-basic-checkbox.component";
import { DynamicBasicInputComponent } from "./input/dynamic-basic-input.component";
import { DynamicBasicRadioGroupComponent } from "./radio-group/dynamic-basic-radio-group.component";
import { DynamicBasicSelectComponent } from "./select/dynamic-basic-select.component";
import { DynamicBasicTextAreaComponent } from "./textarea/dynamic-basic-textarea.component";
import { DynamicBasicFormArrayComponent } from "./form-array/dynamic-basic-form-array.component";
import { DynamicBasicFormGroupComponent } from "./form-group/dynamic-basic-form-group.component";

@Component({
    selector: "dynamic-basic-form-control",
    templateUrl: "./dynamic-basic-form-control-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicBasicFormControlContainerComponent extends DynamicFormControlContainerComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;

    @HostBinding("class") klass;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hostClass: string[];
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef, static: true}) componentViewContainerRef: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                protected componentService: DynamicFormComponentService,
                protected relationService: DynamicFormRelationService,
                protected dataService: DynamicFormDataService) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService, componentService, relationService, dataService);
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) ?? basicUIFormControlMapFn(this.model);
    }
}

export function basicUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicBasicFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicBasicCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicBasicFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicBasicFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicBasicInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicBasicRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicBasicSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicBasicTextAreaComponent;

        default:
            return null;
    }
}
