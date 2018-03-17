import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormValueControlComponent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
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
import { MatFormControlType } from "./dynamic-material-form.const";
import { DynamicMaterialCheckboxComponent } from "./checkbox/dynamic-material-checkbox.component";
import { DynamicMaterialDatePickerComponent } from "./datepicker/dynamic-material-datepicker.component";
import { DynamicMaterialChipsComponent } from "./chips/dynamic-material-chips.component";
import { DynamicMaterialInputComponent } from "./input/dynamic-material-input.component";
import { DynamicMaterialRadioGroupComponent } from "./radio-group/dynamic-material-radio-group.component";
import { DynamicMaterialSelectComponent } from "./select/dynamic-material-select.component";
import { DynamicMaterialSliderComponent } from "./slider/dynamic-material-slider.component";
import { DynamicMaterialSlideToggleComponent } from "./slide-toggle/dynamic-material-slide-toggle.component";
import { DynamicMaterialTextAreaComponent } from "./textarea/dynamic-material-textarea.component";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "dynamic-material-form-control",
    templateUrl: "./dynamic-material-form-control.component.html"
})
export class DynamicMaterialFormControlComponent extends DynamicFormControlComponent implements OnChanges {

    private componentRef: ComponentRef<any>;
    private componentSubscriptions: Subscription[] = [];

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output("dyfFBlur") blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dyfFChange") change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dyfFocus") focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("matEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("formControlViewContainer", {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

    type: MatFormControlType | null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                protected componentFactoryResolver: ComponentFactoryResolver) {

        super(changeDetectorRef, layoutService, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.updateFormControlType();
        }
    }

    get hasMatFormField(): boolean {
        return this.type === 3 || this.type === 4 || this.type === 6 || this.type === 8 || this.type === 11;
    }

    updateFormControlType(): void {

        if (this.model.type === "ARRAY") {
            this.type = 1;

        } else if (this.model.type === "GROUP") {
            this.type = 2;

        } else {

            this.type = 3;
            this.createFormControlComponent();
        }
    }

    onCustomEvent($event: DynamicFormControlEvent | DynamicFormControlCustomEvent): void {

        if (DynamicFormControlComponent.isDynamicFormControlEvent($event)) { // child event bypass

            this.customEvent.emit($event as DynamicFormControlEvent);

        } else { // native UI library custom event

            let $customEvent = $event as DynamicFormControlCustomEvent;

            this.customEvent.emit(this.createDynamicFormControlEvent($customEvent.customEvent, $customEvent.customEvenType));
        }

    }

    createFormControlComponent(): void {

        let componentType = this.formControlComponentType;

        if (componentType !== null) {

            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

            this.viewContainerRef.clear();
            this.componentRef = this.viewContainerRef.createComponent(componentFactory);

            let instance = this.componentRef.instance;

            instance.bindId = this.bindId;
            instance.group = this.group;
            instance.layout = this.layout;
            instance.model = this.model as any;

            this.componentSubscriptions.push(instance.blur.subscribe(($event: any) => this.onBlur($event)));
            this.componentSubscriptions.push(instance.change.subscribe(($event: any) => this.onValueChange($event)));
            this.componentSubscriptions.push(instance.customEvent.subscribe(($event: any) => this.onCustomEvent($event)));
            this.componentSubscriptions.push(instance.focus.subscribe(($event: any) => this.onFocus($event)));
        }
    }

    destroyFormControlComponent(): void {

        if (this.componentRef) {

            this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
            this.componentSubscriptions = [];

            this.componentRef.destroy();
        }
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