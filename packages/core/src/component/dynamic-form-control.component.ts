import {
    AfterViewInit,
    ChangeDetectorRef,
    EventEmitter,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChange,
    SimpleChanges
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";
import { DynamicFormControlRelationGroup } from "../model/dynamic-form-control-relation.model";
import {
    DynamicFormArrayGroupModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY
} from "../model/form-array/dynamic-form-array.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import {
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START,
    DynamicTemplateDirective
} from "../directive/dynamic-template.directive";
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService
} from "../service/dynamic-form-layout.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { RelationUtils } from "../utils/relation.utils";

export interface DynamicFormControlEvent {

    $event: Event | FocusEvent | DynamicFormControlEvent | any;
    context: DynamicFormArrayGroupModel | null;
    control: FormControl;
    group: FormGroup;
    model: DynamicFormControlModel;
    type: string;
}

export const DYNAMIC_FORM_CONTROL_EVENT_TYPE_BLUR = "blur";
export const DYNAMIC_FORM_CONTROL_EVENT_TYPE_CHANGE = "change";
export const DYNAMIC_FORM_CONTROL_EVENT_TYPE_FOCUS = "focus";
export const DYNAMIC_FORM_CONTROL_EVENT_TYPE_CUSTOM = "custom";

export enum DynamicFormControlComponentTemplatePosition {start = 0, end, array}

export abstract class DynamicFormControlComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

    bindId: boolean;
    context: DynamicFormArrayGroupModel | null;
    control: FormControl;
    group: FormGroup;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    layout: DynamicFormLayout;
    model: DynamicFormControlModel;

    contentTemplateList: QueryList<DynamicTemplateDirective>;
    inputTemplateList: QueryList<DynamicTemplateDirective> | null = null;
    templates: DynamicTemplateDirective[] = [];

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;

    private subscriptions: Subscription[] = [];

    abstract type: number | string | null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) { }

    ngOnChanges(changes: SimpleChanges) {

        let groupChange = changes["group"] as SimpleChange,
            modelChange = changes["model"] as SimpleChange;

        if (groupChange || modelChange) {

            if (this.model) {

                this.unsubscribe();

                if (this.group) {

                    this.control = this.group.get(this.model.id) as FormControl;
                    this.subscriptions.push(this.control.valueChanges.subscribe(value => this.onControlValueChanges(value)));
                }

                this.subscriptions.push(this.model.disabledUpdates.subscribe(value => this.onModelDisabledUpdates(value)));

                if (this.model instanceof DynamicFormValueControlModel) {

                    let model = this.model as DynamicFormValueControlModel<DynamicFormControlValue>;

                    this.subscriptions.push(model.valueUpdates.subscribe(value => this.onModelValueUpdates(value)));
                }

                if (this.model.relation.length > 0) {
                    this.setControlRelations();
                }
            }
        }
    }

    ngOnInit() {

        if (!this.model && !this.group) {
            throw new Error(`no [model] or [group] input set for DynamicFormControlComponent`);
        }
    }

    ngAfterViewInit() {

        this.setTemplates();
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    get errorMessages(): string[] {
        return this.validationService.createErrorMessages(this.control, this.model);
    }

    get showHint(): boolean { // needed for AOT
        return (this.model as DynamicFormValueControlModel<DynamicFormControlValue>).hint !== null;
    }

    get hasList(): boolean { // needed for AOT
        return (this.model as DynamicInputModel).list !== null;
    }

    get isInvalid(): boolean {
        return this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get showErrorMessages(): boolean {
        return this.hasErrorMessaging && this.control.touched && !this.hasFocus && this.isInvalid;
    }

    get templateList(): QueryList<DynamicTemplateDirective> {
        return this.inputTemplateList !== null ? this.inputTemplateList : this.contentTemplateList;
    }

    getClass(context: string, place: string, model: DynamicFormControlModel = this.model): string {

        let controlLayout = (this.layout && this.layout[model.id]) || model.cls as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    getOther(key: string, defaultValue: any = null): any {

        let model = this.model as DynamicFormValueControlModel<DynamicFormControlValue>;

        return model.other !== null && model.other.hasOwnProperty(key) ? model.other[key] : defaultValue;
    }

    protected createDynamicFormControlEvent($event: any, type: string): DynamicFormControlEvent {
        return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }

    protected setTemplates(): void {

        this.templateList.forEach((template: DynamicTemplateDirective) => {

            if ((template.modelType === this.model.type || template.modelId === this.model.id) && template.as === null) {

                if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                    this.templates[DynamicFormControlComponentTemplatePosition.array] = template;

                } else if (template.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START) {

                    this.templates[DynamicFormControlComponentTemplatePosition.start] = template;

                } else if (template.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END) {

                    this.templates[DynamicFormControlComponentTemplatePosition.end] = template;
                }
            }
        });
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

    updateModelDisabled(relation: DynamicFormControlRelationGroup): void {

        this.model.disabledUpdates.next(RelationUtils.isFormControlToBeDisabled(relation, this.group));
    }

    unsubscribe(): void {

        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    onControlValueChanges(value: DynamicFormControlValue): void {

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = this.model as DynamicFormValueControlModel<DynamicFormControlValue>;

            if (model.value !== value) {
                model.valueUpdates.next(value);
            }
        }
    }

    onModelValueUpdates(value: DynamicFormControlValue): void {

        if (this.control.value !== value) {
            this.control.setValue(value);
        }
    }

    onModelDisabledUpdates(value: boolean): void {
        value ? this.control.disable() : this.control.enable();
    }

    onValueChange($event: Event | DynamicFormControlEvent | any): void {

        if ($event && $event instanceof Event) { // native HTML5 change event

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {

                    let inputElement: any = ($event as Event).target || ($event as Event).srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(this.createDynamicFormControlEvent($event as Event, "change"));

        } else if (DynamicFormControlComponent.isDynamicFormControlEvent($event)) { // event bypass

            this.change.emit($event as DynamicFormControlEvent);

        } else { // custom library value change event

            this.change.emit(this.createDynamicFormControlEvent($event, "change"));
        }
    }

    onBlur($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (DynamicFormControlComponent.isDynamicFormControlEvent($event)) { // event bypass

            this.blur.emit($event as DynamicFormControlEvent);

        } else { // native HTML 5 or UI library blur event

            this.hasFocus = false;
            this.blur.emit(this.createDynamicFormControlEvent($event, "blur"));
        }
    }

    onFocus($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (DynamicFormControlComponent.isDynamicFormControlEvent($event)) { // event bypass

            this.focus.emit($event as DynamicFormControlEvent);

        } else { // native HTML 5 or UI library focus event

            this.hasFocus = true;
            this.focus.emit(this.createDynamicFormControlEvent($event, "focus"));
        }
    }

    onCustomEvent($event: any, type: string): void {

        if (DynamicFormControlComponent.isDynamicFormControlEvent($event)) { // child event bypass

            this.customEvent.emit($event as DynamicFormControlEvent);

        } else { // native UI library custom event

            this.customEvent.emit(this.createDynamicFormControlEvent($event, type));
        }
    }

    static isDynamicFormControlEvent($event: any): boolean {
        return $event !== null && typeof $event === "object" && $event.hasOwnProperty("$event");
    }
}