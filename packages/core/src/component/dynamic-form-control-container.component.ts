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
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControlRelationGroup } from "../model/misc/dynamic-form-control-relation.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { findActivationRelation, getRelatedFormControls, isFormControlToBeDisabled } from "../utils/relation.utils";
import { DynamicFormControl } from "./dynamic-form-control.interface";
import { isString } from "../utils/core.utils";

export abstract class DynamicFormControlContainerComponent implements OnChanges, OnDestroy {

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
    customEvent: EventEmitter<DynamicFormControlEvent> | undefined;
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
        return isString((this.model as DynamicFormValueControlModel<any>).hint);
    }

    get hasLabel(): boolean {
        return isString(this.model.label);
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

    get startTemplate(): DynamicTemplateDirective | undefined {
        return this.model.type !== DYNAMIC_FORM_CONTROL_TYPE_ARRAY ?
            this.layoutService.getStartTemplate(this.model, this.templates) : undefined;
    }

    get endTemplate(): DynamicTemplateDirective | undefined {
        return this.model.type !== DYNAMIC_FORM_CONTROL_TYPE_ARRAY ?
            this.layoutService.getEndTemplate(this.model, this.templates) : undefined;
    }

    getClass(context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace, model: DynamicFormControlModel = this.model): string {

        let controlLayout = (this.layout && this.layout[model.id]) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    protected createFormControlComponent(): void {

        let componentType = this.componentType;

        if (componentType !== null) {

            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

            this.componentViewContainerRef.clear();
            this.componentRef = this.componentViewContainerRef.createComponent(componentFactory);

            let instance = this.componentRef.instance;

            instance.group = this.group;
            instance.layout = this.layout;
            instance.model = this.model as any;

            if (this.templates) {
                instance.templates = this.templates;
            }

            this.componentSubscriptions.push(instance.blur.subscribe(($event: any) => this.onBlur($event)));
            this.componentSubscriptions.push(instance.change.subscribe(($event: any) => this.onChange($event)));
            this.componentSubscriptions.push(instance.focus.subscribe(($event: any) => this.onFocus($event)));

            if (instance.customEvent !== undefined) {
                this.componentSubscriptions.push(
                    instance.customEvent.subscribe(($event: any) => this.onCustomEvent($event)));
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

        let relActivation = findActivationRelation(this.model.relation);

        if (relActivation !== null) {

            let rel = relActivation as DynamicFormControlRelationGroup;

            this.updateModelDisabled(rel);

            getRelatedFormControls(this.model, this.group).forEach(control => {

                this.subscriptions.push(control.valueChanges.subscribe(() => this.updateModelDisabled(rel)));
                this.subscriptions.push(control.statusChanges.subscribe(() => this.updateModelDisabled(rel)));
            });
        }
    }

    protected createDynamicFormControlEvent($event: any, type: string): DynamicFormControlEvent {
        return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }

    updateModelDisabled(relation: DynamicFormControlRelationGroup): void {

        this.model.disabledUpdates.next(isFormControlToBeDisabled(relation, this.group));
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

                    let inputElement: any = $event.target || $event.srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Change));

        } else if (isDynamicFormControlEvent($event)) { // event bypass

            this.change.emit($event);

        } else { // custom library value change event

            this.change.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Change));
        }
    }

    onBlur($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.blur.emit($event);

        } else { // native HTML 5 or UI library blur event

            this.hasFocus = false;
            this.blur.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Blur));
        }
    }

    onFocus($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.focus.emit($event);

        } else { // native HTML 5 or UI library focus event

            this.hasFocus = true;
            this.focus.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Focus));
        }
    }

    onCustomEvent($event: DynamicFormControlEvent | DynamicFormControlCustomEvent): void {

        let emitter = this.customEvent as EventEmitter<DynamicFormControlEvent>;

        if (isDynamicFormControlEvent($event)) { // child event bypass

            emitter.emit($event);

        } else { // native UI library custom event

            emitter.emit(this.createDynamicFormControlEvent($event.customEvent, $event.customEventType));
        }
    }
}
