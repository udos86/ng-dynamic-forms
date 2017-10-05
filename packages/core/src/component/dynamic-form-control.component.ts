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
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { Utils } from "../utils/core.utils";
import { RelationUtils } from "../utils/relation.utils";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";

export interface DynamicFormControlEvent {

    $event: Event | FocusEvent | DynamicFormControlEvent | any;
    context: DynamicFormArrayGroupModel | null;
    control: FormControl;
    group: FormGroup;
    model: DynamicFormControlModel;
    type: string;
}

export enum DynamicFormControlEventType {

    Blur = 1,
    Change = 2,
    Focus = 3,
    Custom = 4
}

export abstract class DynamicFormControlComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

    bindId: boolean;
    context: DynamicFormArrayGroupModel | null;
    control: FormControl;
    group: FormGroup;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    model: DynamicFormControlModel;

    contentTemplates: QueryList<DynamicTemplateDirective>;
    inputTemplates: QueryList<DynamicTemplateDirective> | null = null;
    preTemplate: DynamicTemplateDirective;
    postTemplate: DynamicTemplateDirective;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;

    private subscriptions: Subscription[] = [];

    abstract type: number | string | null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
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

    ngOnInit(): void {

        if (!Utils.isDefined(this.model) || !Utils.isDefined(this.group)) {
            throw new Error(`no [model] or [group] input set for DynamicFormControlComponent`);
        }
    }

    ngAfterViewInit(): void {

        this.setTemplates();
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    get errorMessages(): string[] {

        if (this.hasErrorMessaging && this.model.hasErrorMessages) {
            return this.validationService.createErrorMessages(this.control, this.model);
        }

        return [];
    }

    get hasHint(): boolean { // needed for AOT
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

    get templates(): QueryList<DynamicTemplateDirective> {
        return this.inputTemplates ? this.inputTemplates : this.contentTemplates;
    }

    protected getEvent($event: any, type: string): DynamicFormControlEvent {
        return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }

    protected setTemplates(): void {

        this.templates.forEach((template: DynamicTemplateDirective) => {

            if ((template.pre || template.align === "START") && template.as === null && (template.modelType === this.model.type || template.modelId === this.model.id)) {
                this.preTemplate = template;
            } else if ((template.post || template.align === "END") && template.as === null && (template.modelType === this.model.type || template.modelId === this.model.id)) {
                this.postTemplate = template;
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

        if (this.model instanceof DynamicFormValueControlModel
        ) {

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

            ($event as Event).stopPropagation();

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {

                    let inputElement: any = ($event as Event).target || ($event as Event).srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(this.getEvent($event as Event, "change"));

        } else if ($event && $event.hasOwnProperty("$event")) { // event bypass

            this.change.emit($event as DynamicFormControlEvent);

        } else { // custom library value change event

            this.change.emit(this.getEvent($event, "change"));
        }
    }


    onBlurEvent($event: FocusEvent | DynamicFormControlEvent | any): void {

        if ($event && $event.hasOwnProperty("$event")) {

            this.blur.emit($event as DynamicFormControlEvent);

        } else {

            if ($event instanceof FocusEvent) {
                $event.stopPropagation();
            }

            this.hasFocus = false;
            this.blur.emit(this.getEvent($event, "blur"));
        }
    }


    onFocusEvent($event: FocusEvent | DynamicFormControlEvent | any): void {

        if ($event && $event.hasOwnProperty("$event")) {

            this.focus.emit($event as DynamicFormControlEvent);

        } else {

            if ($event instanceof FocusEvent) {
                $event.stopPropagation();
            }

            this.hasFocus = true;
            this.focus.emit(this.getEvent($event, "focus"));
        }
    }


    onCustomEvent($event: any, type: string | null = null): void {

        if ($event && $event.hasOwnProperty("$event") && $event.hasOwnProperty("type")) { // child event bypass

            this.customEvent.emit($event as DynamicFormControlEvent);

        } else { // native UI library custom event

            this.customEvent.emit(this.getEvent($event, type));
        }
    }
}