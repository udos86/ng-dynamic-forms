import {
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    OnChanges,
    OnDestroy,
    QueryList,
    SimpleChange,
    SimpleChanges,
    Type,
    ViewContainerRef
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlEvent,
    DynamicFormControlEventType,
    isDynamicFormControlEvent
} from "./dynamic-form-control.event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import {
    DynamicFormArrayGroupModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY
} from "../model/form-array/dynamic-form-array.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX } from "../model/checkbox/dynamic-checkbox.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import { DynamicFormControlLayout } from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControlRelationGroup } from "../model/misc/dynamic-form-control-relation.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { RelationUtils } from "../utils/relation.utils";
import { DynamicFormControl } from "./dynamic-form-control.interface";

export abstract class DynamicFormControlContainerComponent implements OnChanges, OnDestroy {

    bindId: boolean;
    context: DynamicFormArrayGroupModel | null = null;
    control: FormControl;
    group: FormGroup;
    hasFocus: boolean;
    layout: DynamicFormLayout;
    model: DynamicFormControlModel;

    contentTemplateList: QueryList<DynamicTemplateDirective> | undefined;
    inputTemplateList: QueryList<DynamicTemplateDirective> | undefined;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;

    componentViewContainerRef: ViewContainerRef;

    protected componentRef: ComponentRef<DynamicFormControl>;
    protected componentSubscriptions: Subscription[] = [];
    protected subscriptions: Subscription[] = [];

    protected constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                          protected layoutService: DynamicFormLayoutService,
                          protected validationService: DynamicFormValidationService) { }

    ngOnChanges(changes: SimpleChanges) {

        let groupChange = changes["group"] as SimpleChange,
            modelChange = changes["model"] as SimpleChange;

        if (modelChange) {

            this.destroyFormControlComponent();
            this.createFormControlComponent();
        }

        if (groupChange || modelChange) {

            if (this.model) {

                this.unsubscribe();

                if (this.group) {

                    this.control = this.group.get(this.model.id) as FormControl;
                    this.subscriptions.push(this.control.valueChanges.subscribe(value => this.onControlValueChanges(value)));
                }

                this.subscriptions.push(this.model.disabledUpdates.subscribe(value => this.onModelDisabledUpdates(value)));

                if (this.model instanceof DynamicFormValueControlModel) {

                    let model = this.model as DynamicFormValueControlModel<any>;

                    this.subscriptions.push(model.valueUpdates.subscribe(value => this.onModelValueUpdates(value)));
                }

                if (this.model.relation.length > 0) {
                    this.setControlRelations();
                }
            }
        }
    }

    ngOnDestroy() {

        this.destroyFormControlComponent();
        this.unsubscribe();
    }

    abstract get componentType(): Type<DynamicFormControl> | null;

    get errorMessages(): string[] {
        return this.validationService.createErrorMessages(this.control, this.model);
    }

    get hasHint(): boolean {
        return typeof (this.model as DynamicFormValueControlModel<any>).hint === "string";
    }

    get hasLabel(): boolean {
        return typeof this.model.label === "string";
    }

    get isCheckbox(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }

    get isInvalid(): boolean {
        return this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get showErrorMessages(): boolean {
        return this.model.hasErrorMessages && this.control.touched && !this.hasFocus && this.isInvalid;
    }

    get templates(): QueryList<DynamicTemplateDirective> | undefined {
        return this.inputTemplateList !== undefined ? this.inputTemplateList : this.contentTemplateList;
    }

    getClass(context: string, place: string, model: DynamicFormControlModel = this.model): string {

        let controlLayout = (this.layout && this.layout[model.id]) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    getTemplate(align: string): DynamicTemplateDirective | undefined {

        if (this.model.type !== DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

            return this.layoutService
                .filterTemplatesByModel(this.model, this.templates)
                .find(template => template.as === null && template.align === align);
        }

        return undefined;
    }

    protected createFormControlComponent(): void {

        let componentType = this.componentType;

        if (componentType !== null) {

            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

            this.componentViewContainerRef.clear();
            this.componentRef = this.componentViewContainerRef.createComponent(componentFactory);

            let instance = this.componentRef.instance;

            instance.bindId = this.bindId;
            instance.group = this.group;
            instance.layout = this.layout;
            instance.model = this.model as any;

            if (this.templates) {
                instance.templates = this.templates;
            }

            this.componentSubscriptions.push(instance.blur.subscribe(($event: any) => this.onBlur($event)));
            this.componentSubscriptions.push(instance.change.subscribe(($event: any) => this.onChange($event)));
            this.componentSubscriptions.push(instance.focus.subscribe(($event: any) => this.onFocus($event)));

            if (instance.customEvent instanceof EventEmitter) {
                this.componentSubscriptions.push(instance.customEvent.subscribe(($event: any) => this.onCustomEvent($event)));
            }
        }
    }

    protected destroyFormControlComponent(): void {

        if (this.componentRef) {

            this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
            this.componentSubscriptions = [];

            this.componentRef.destroy();
        }
    }

    protected setControlRelations(): void {

        let relActivation = RelationUtils.findActivationRelation(this.model.relation);

        if (relActivation !== null) {

            let rel = relActivation as DynamicFormControlRelationGroup;

            this.updateModelDisabled(rel);

            RelationUtils.getRelatedFormControls(this.model, this.group).forEach(control => {

                this.subscriptions.push(control.valueChanges.subscribe(() => this.updateModelDisabled(rel)));
                this.subscriptions.push(control.statusChanges.subscribe(() => this.updateModelDisabled(rel)));
            });
        }
    }

    protected createDynamicFormControlEvent($event: any, type: string): DynamicFormControlEvent {
        return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }

    updateModelDisabled(relation: DynamicFormControlRelationGroup): void {

        this.model.disabledUpdates.next(RelationUtils.isFormControlToBeDisabled(relation, this.group));
    }

    unsubscribe(): void {

        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    onControlValueChanges(value: any): void {

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = this.model as DynamicFormValueControlModel<any>;

            if (model.value !== value) {
                model.valueUpdates.next(value);
            }
        }
    }

    onModelValueUpdates(value: any): void {

        if (this.control.value !== value) {
            this.control.setValue(value);
        }
    }

    onModelDisabledUpdates(value: boolean): void {
        value ? this.control.disable() : this.control.enable();
    }

    onChange($event: Event | DynamicFormControlEvent | any): void {

        if ($event && $event instanceof Event) { // native HTML5 change event

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {

                    let inputElement: any = ($event as Event).target || ($event as Event).srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(this.createDynamicFormControlEvent($event as Event, DynamicFormControlEventType.Change));

        } else if (isDynamicFormControlEvent($event)) { // event bypass

            this.change.emit($event as DynamicFormControlEvent);

        } else { // custom library value change event

            this.change.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Change));
        }
    }

    onBlur($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.blur.emit($event as DynamicFormControlEvent);

        } else { // native HTML 5 or UI library blur event

            this.hasFocus = false;
            this.blur.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Blur));
        }
    }

    onFocus($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.focus.emit($event as DynamicFormControlEvent);

        } else { // native HTML 5 or UI library focus event

            this.hasFocus = true;
            this.focus.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Focus));
        }
    }

    onCustomEvent($event: DynamicFormControlEvent | DynamicFormControlCustomEvent): void {

        if (isDynamicFormControlEvent($event)) { // child event bypass

            this.customEvent.emit($event as DynamicFormControlEvent);

        } else { // native UI library custom event

            let $customEvent = $event as DynamicFormControlCustomEvent;

            this.customEvent.emit(this.createDynamicFormControlEvent($customEvent.customEvent, $customEvent.customEventType));
        }
    }
}