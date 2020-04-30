import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    OnChanges,
    OnDestroy,
    QueryList,
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
} from "./dynamic-form-control-event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayGroupModel
} from "../model/form-array/dynamic-form-array.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX } from "../model/checkbox/dynamic-checkbox.model";
import {
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DynamicInputModel
} from "../model/input/dynamic-input.model";
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControl } from "./dynamic-form-control-interface";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicFormComponentService } from "../service/dynamic-form-component.service";
import { isString } from "../utils/core.utils";
import { DynamicFormRelationService } from "../service/dynamic-form-relation.service";
import { DynamicFormGroupComponent } from "./dynamic-form-group.component";
import { DynamicFormArrayComponent } from "./dynamic-form-array.component";

export abstract class DynamicFormControlContainerComponent implements OnChanges, OnDestroy {

    private _hasFocus = false;

    context: DynamicFormArrayGroupModel | null = null;
    control: FormControl;
    group: FormGroup;
    hostClass: string[];
    klass: string;
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
    protected controlLayout: DynamicFormControlLayout;
    protected subscriptions: Subscription[] = [];

    protected constructor(protected changeDetectorRef: ChangeDetectorRef,
                          protected componentFactoryResolver: ComponentFactoryResolver,
                          protected layoutService: DynamicFormLayoutService,
                          protected validationService: DynamicFormValidationService,
                          protected componentService: DynamicFormComponentService,
                          protected relationService: DynamicFormRelationService) {
    }

    ngOnChanges(changes: SimpleChanges) {

        const groupChange = (changes as Pick<SimpleChanges, "group">).group;
        const layoutChange = (changes as Pick<SimpleChanges, "layout">).layout;
        const modelChange = (changes as Pick<SimpleChanges, "model">).model;

        if (layoutChange || modelChange) {
            this.onLayoutOrModelChange();
        }

        if (modelChange) {
            this.onModelChange();
        }

        if (groupChange || modelChange) {
            this.onGroupOrModelChange();
        }
    }

    ngOnDestroy() {

        this.destroyFormControlComponent();
        this.unsubscribe();
    }

    abstract get componentType(): Type<DynamicFormControl> | null;

    get id(): string {
        return this.layoutService.getElementId(this.model);
    }

    get hasFocus(): boolean {
        return this._hasFocus;
    }

    get isInvalid(): boolean {
        return this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get errorMessages(): string[] {
        return this.validationService.createErrorMessages(this.control, this.model);
    }

    get showErrorMessages(): boolean {
        return this.validationService.showErrorMessages(this.control, this.model, this.hasFocus);
    }

    get hasLabel(): boolean {
        return isString(this.model.label);
    }

    get hasHint(): boolean {
        return isString((this.model as DynamicFormValueControlModel<any>).hint);
    }

    get hint(): string | null {
        return (this.model as DynamicFormValueControlModel<any>).hint ?? null;
    }

    get isCheckbox(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
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

    getClass(context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace): string {
        return this.layoutService.getClass(this.controlLayout, context, place);
    }

    markForCheck(): void {

        this.changeDetectorRef.markForCheck();

        const component = this.componentRef && this.componentRef.instance;

        if (component && (component instanceof DynamicFormGroupComponent || component instanceof DynamicFormArrayComponent)) {
            component.markForCheck();
        }
    }

    protected createFormControlComponent(): void {

        const componentType = this.componentType;

        if (componentType !== null) {

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

            this.componentViewContainerRef.clear();
            this.componentRef = this.componentViewContainerRef.createComponent(componentFactory);

            const component = this.componentRef.instance;

            component.formLayout = this.layout;
            component.group = this.group;
            component.layout = this.controlLayout;
            component.model = this.model;

            if (this.templates) {
                component.templates = this.templates;
            }

            this.componentSubscriptions.push(component.blur.subscribe(($event: any) => this.onBlur($event)));
            this.componentSubscriptions.push(component.change.subscribe(($event: any) => this.onChange($event)));
            this.componentSubscriptions.push(component.focus.subscribe(($event: any) => this.onFocus($event)));

            if (component.customEvent !== undefined) {
                this.componentSubscriptions.push(
                    component.customEvent.subscribe(($event: any) => this.onCustomEvent($event)));
            }

            this.registerFormControlComponentRef(this.componentRef);
        }
    }

    protected destroyFormControlComponent(): void {

        if (this.componentRef) {

            this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
            this.componentSubscriptions = [];

            this.unregisterFormControlComponentRef();
            this.componentRef.destroy();
        }
    }

    protected createDynamicFormControlEvent($event: any, type: string): DynamicFormControlEvent {
        return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }

    unsubscribe(): void {

        // this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
        // this.componentSubscriptions = [];

        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    onControlValueChanges(value: any): void {
        if (this.model instanceof DynamicFormValueControlModel && this.model.value !== value) {
            this.model.value = value;
        }
    }

    onModelValueUpdates(value: any): void {
        if (this.control.value !== value) {
            this.control.setValue(value);
        }
    }

    onModelDisabledUpdates(disabled: boolean): void {
        disabled ? this.control.disable() : this.control.enable();
    }

    onLayoutOrModelChange(): void {
        this.controlLayout = this.layoutService.findByModel(this.model, this.layout) ?? this.model.layout as DynamicFormControlLayout;
        this.klass = `${Array.isArray(this.hostClass) ? this.hostClass.join(" ") : ""} ${this.layoutService.getHostClass(this.controlLayout)}`;
    }

    onModelChange(): void {
        this.destroyFormControlComponent();
        this.createFormControlComponent();
    }

    onGroupOrModelChange(): void {

        if (this.model) {

            this.unsubscribe();

            if (this.group) {

                this.control = this.group.get(this.model.id) as FormControl;
                this.subscriptions.push(this.control.valueChanges.subscribe(value => this.onControlValueChanges(value)));
            }

            this.subscriptions.push(this.model.disabledChanges.subscribe(value => this.onModelDisabledUpdates(value)));

            if (this.model instanceof DynamicFormValueControlModel) {

                const model = this.model as DynamicFormValueControlModel<any>;

                this.subscriptions.push(model.valueChanges.subscribe(value => this.onModelValueUpdates(value)));
            }

            if (this.model.relations.length > 0) {

                this.subscriptions.push(...this.relationService.subscribeRelations(this.model, this.group, this.control));
            }
        }
    }

    onChange($event: Event | DynamicFormControlEvent | any): void {

        if ($event instanceof Event) { // native HTML5 change event

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                const model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {

                    const inputElement: any = $event.target ?? $event.srcElement;

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

            this._hasFocus = false;
            this.blur.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Blur));
        }
    }

    onFocus($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.focus.emit($event);

        } else { // native HTML 5 or UI library focus event

            this._hasFocus = true;
            this.focus.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Focus));
        }
    }

    onCustomEvent($event: DynamicFormControlEvent | DynamicFormControlCustomEvent): void {

        const emitter = this.customEvent as EventEmitter<DynamicFormControlEvent>;

        if (isDynamicFormControlEvent($event)) { // child event bypass

            emitter.emit($event);

        } else { // native UI library custom event

            emitter.emit(this.createDynamicFormControlEvent($event.customEvent, $event.customEventType));
        }
    }

    private registerFormControlComponentRef(ref: ComponentRef<DynamicFormControl>): void {

        if (this.context instanceof DynamicFormArrayGroupModel) {

            this.componentService.registerFormControl(this.model, ref, this.context.index);

        } else {
            this.componentService.registerFormControl(this.model, ref);
        }
    }

    private unregisterFormControlComponentRef(): void {

        if (this.context instanceof DynamicFormArrayGroupModel) {

            this.componentService.unregisterFormControl(this.model.id, this.context.index);

        } else {
            this.componentService.unregisterFormControl(this.model.id);
        }
    }
}
