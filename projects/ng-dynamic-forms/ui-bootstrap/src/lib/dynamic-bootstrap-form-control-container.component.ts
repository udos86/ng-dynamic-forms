import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter, HostBinding,
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
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_RATING,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
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
import { DynamicBootstrapCheckboxComponent } from "./checkbox/dynamic-bootstrap-checkbox.component";
import { DynamicBootstrapDatePickerComponent } from "./datepicker/dynamic-bootstrap-datepicker.component";
import { DynamicBootstrapFormArrayComponent } from "./form-array/dynamic-bootstrap-form-array.component";
import { DynamicBootstrapFormGroupComponent } from "./form-group/dynamic-bootstrap-form-group.component";
import { DynamicBootstrapInputComponent } from "./input/dynamic-bootstrap-input.component";
import { DynamicBootstrapRadioGroupComponent } from "./radio-group/dynamic-bootstrap-radio-group.component";
import { DynamicBootstrapRatingComponent } from "./rating/dynamic-bootstrap-rating.component";
import { DynamicBootstrapSelectComponent } from "./select/dynamic-bootstrap-select.component";
import { DynamicBootstrapTextAreaComponent } from "./textarea/dynamic-bootstrap-textarea.component";
import { DynamicBootstrapTimePickerComponent } from "./timepicker/dynamic-bootstrap-timepicker.component";

@Component({
    selector: "dynamic-bootstrap-form-control",
    templateUrl: "./dynamic-bootstrap-form-control-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicBootstrapFormControlContainerComponent extends DynamicFormControlContainerComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective> | undefined;

    @HostBinding("class") klass = "";

    @Input() asBootstrapFormGroup = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hostClass: string[];
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective> | undefined;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("bsEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef, static: true}) componentViewContainerRef: ViewContainerRef;

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) || bootstrapUIFormControlMapFn(this.model);
    }

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                protected componentService: DynamicFormComponentService,
                protected relationService: DynamicFormRelationService,
                protected dataService: DynamicFormDataService) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService, componentService, relationService, dataService);
    }
}

export function bootstrapUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicBootstrapFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicBootstrapCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicBootstrapFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicBootstrapDatePickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicBootstrapFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicBootstrapInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicBootstrapRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return DynamicBootstrapRatingComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicBootstrapSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicBootstrapTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicBootstrapTimePickerComponent;

        default:
            return null;
    }
}
