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
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent,
    DynamicTemplateDirective,
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng-dynamic-forms/core";
import { DynamicMaterialCheckboxComponent } from "./checkbox/dynamic-material-checkbox.component";
import { DynamicMaterialDatePickerComponent } from "./datepicker/dynamic-material-datepicker.component";
import { DynamicMaterialChipsComponent } from "./chips/dynamic-material-chips.component";
import { DynamicMaterialInputComponent } from "./input/dynamic-material-input.component";
import { DynamicMaterialRadioGroupComponent } from "./radio-group/dynamic-material-radio-group.component";
import { DynamicMaterialSelectComponent } from "./select/dynamic-material-select.component";
import { DynamicMaterialSliderComponent } from "./slider/dynamic-material-slider.component";
import { DynamicMaterialSlideToggleComponent } from "./slide-toggle/dynamic-material-slide-toggle.component";
import { DynamicMaterialTextAreaComponent } from "./textarea/dynamic-material-textarea.component";

@Component({
    selector: "dynamic-material-form-control",
    templateUrl: "./dynamic-material-form-control.component.html"
})
export class DynamicMaterialFormControlComponent extends DynamicFormControlComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output("dyfBlur") blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dyfChange") change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dyFocus") focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("matEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("formControlViewContainer", {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
) {
        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService);
    }

    // TODO
    get hasMatFormField(): boolean {
        return false;
    }

    get formControlComponentType(): Type<DynamicFormValueControlComponent> | null {

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return DynamicMaterialCheckboxComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                return DynamicMaterialDatePickerComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:

                let inputModel = this.model as DynamicInputModel;

                return inputModel.multiple ? DynamicMaterialChipsComponent : DynamicMaterialInputComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return DynamicMaterialRadioGroupComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return DynamicMaterialSelectComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return DynamicMaterialSliderComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return DynamicMaterialSlideToggleComponent;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return DynamicMaterialTextAreaComponent;

            default:
                return null;
        }
    }
}