import { EventEmitter, OnInit, AfterViewInit, OnDestroy, QueryList, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";
import { DynamicFormControlRelationGroup } from "../model/dynamic-form-control-relation.model";
import { DYNAMIC_FORM_CONTROL_TYPE_ARRAY } from "../model/form-array/dynamic-form-array.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX } from "../model/checkbox/dynamic-checkbox.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP } from "../model/checkbox/dynamic-checkbox-group.model";
import { DYNAMIC_FORM_CONTROL_TYPE_GROUP } from "../model/form-group/dynamic-form-group.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import { DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP } from "../model/radio/dynamic-radio-group.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SELECT } from "../model/select/dynamic-select.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SWITCH } from "../model/switch/dynamic-switch.model";
import { DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA } from "../model/textarea/dynamic-textarea.model";
import { DynamicFormRelationService } from "../service/dynamic-form-relation.service";
import {
    DynamicTemplateDirective,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START
} from "../directive/dynamic-template.directive";
import { isDefined } from "../utils";

export interface DynamicFormControlEvent {

    $event: Event | FocusEvent | DynamicFormControlEvent | any;
    control: FormControl;
    model: DynamicFormControlModel;
}

export const enum CoreFormControlType {

    Array = 1,
    Checkbox = 2,
    Group = 3,
    Input = 4,
    RadioGroup = 5,
    Select = 6,
    Switch = 7,
    TextArea = 8
}

export abstract class DynamicFormControlComponent implements OnInit, AfterViewInit, OnDestroy {

    bindId: boolean;
    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    control: FormControl;
    controlGroup: FormGroup; // deprecated
    focus: EventEmitter<DynamicFormControlEvent>;
    group: FormGroup;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    model: DynamicFormControlModel;
    nestedTemplates: QueryList<DynamicTemplateDirective>;
    template: TemplateRef<any>;
    templateDirective: DynamicTemplateDirective;
    templates: QueryList<DynamicTemplateDirective>;
    type: number | null;

    private subscriptions: Subscription[] = [];

    constructor(private relationService: DynamicFormRelationService) {}

    ngOnInit(): void {

        if (!isDefined(this.model) || !isDefined(this.group)) {
            throw new Error(`no [model] or [group] input binding defined for DynamicFormControlComponent`);
        }

        this.control = this.group.get(this.model.id) as FormControl;
        this.type = this.getFormControlType();

        this.subscriptions.push(this.control.valueChanges.subscribe(this.onControlValueChanges.bind(this)));
        this.subscriptions.push(this.model.disabledUpdates.subscribe(this.onModelDisabledUpdates.bind(this)));

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = this.model as DynamicFormValueControlModel<DynamicFormControlValue>;

            this.subscriptions.push(model.valueUpdates.subscribe(this.onModelValueUpdates.bind(this)));
        }

        if (this.model.relation.length > 0) {
            this.setControlRelations();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.setTemplates(), 0); // setTimeout to trigger change detection
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    get errorMessages(): string[] {

        let messages = [];

        if (isDefined(this.model["errorMessages"])) {

            for (let validatorName in this.control.errors) {

                let message;

                if (validatorName === "minlength" || validatorName === "maxlength") {
                    validatorName = validatorName.replace("length", "Length");
                }

                if (this.model["errorMessages"][validatorName]) {

                    message = this.model["errorMessages"][validatorName].replace(/\{\{(.+?)\}\}/mg,
                        (match: string, expression: string) => {

                            let propertySource = this.model,
                                propertyName = expression;

                            if (expression.indexOf("validator.") >= 0) {

                                propertySource = this.control.errors[validatorName];
                                propertyName = expression.replace("validator.", "");
                            }

                            return propertySource[propertyName] ? propertySource[propertyName] : null;
                        });

                } else {
                    message = `Error on "${validatorName}" validation`;
                }

                messages.push(message);
            }
        }

        return messages;
    }

    get hasHint(): boolean { // needed for AOT
        return (this.model as DynamicInputModel).hint !== null;
    }

    get hasList(): boolean { // needed for AOT
        return (this.model as DynamicInputModel).list !== null;
    }

    get hasEndTemplate(): boolean {
        return !!this.template && this.templateDirective.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END;
    }

    get hasStartTemplate(): boolean {
        return !!this.template && this.templateDirective.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START;
    }

    get showErrorMessages(): boolean {
        return this.control.touched && !this.hasFocus && this.isInvalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get isInvalid(): boolean {
        return this.control.touched && this.control.invalid;
    }

    get templateDirectives(): QueryList<DynamicTemplateDirective> {
        return this.nestedTemplates ? this.nestedTemplates : this.templates;
    }

    protected getFormControlType(): number | null {

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return CoreFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return CoreFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return CoreFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return CoreFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return CoreFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return CoreFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return CoreFormControlType.Switch;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return CoreFormControlType.TextArea;

            default:
                return null;
        }
    }

    protected setTemplates(): void {

        this.templateDirectives.forEach((directive: DynamicTemplateDirective) => {

            if (directive.type !== null) {
                return; // templates with type property need to be processed by concrete UI component
            }

            if (directive.modelType === this.model.type || directive.modelId === this.model.id) {

                this.templateDirective = directive;
                this.template = directive.templateRef;
            }
        });
    }

    protected setControlRelations(): void {

        let relActivation = this.relationService.findActivationRelation(this.model.relation);

        if (relActivation) {

            this.updateModelDisabled(relActivation);

            this.relationService.getRelatedFormControls(this.model, this.group).forEach(control => {

                this.subscriptions.push(control.valueChanges.subscribe(() => this.updateModelDisabled(relActivation)));
                this.subscriptions.push(control.statusChanges.subscribe(() => this.updateModelDisabled(relActivation)));
            });
        }
    }

    updateModelDisabled(relation: DynamicFormControlRelationGroup): void {

        this.model.disabledUpdates.next(this.relationService.isFormControlToBeDisabled(relation, this.group));
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

    onValueChange($event: Event |  DynamicFormControlEvent | any): void {

        if ($event instanceof Event) { // native HTML5 change event

            $event.stopPropagation();

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
                    model.files = $event.srcElement["files"];
                }
            }

            this.change.emit({$event: $event as Event, control: this.control, model: this.model});

        } else if ($event.hasOwnProperty("$event") && $event.hasOwnProperty("control") && $event.hasOwnProperty("model")) {

            this.change.emit($event as DynamicFormControlEvent);

        } else {

            this.change.emit({$event: $event, control: this.control, model: this.model});
        }
    }

    onFocusChange($event: FocusEvent | DynamicFormControlEvent): void {

        if ($event instanceof FocusEvent) {

            $event.stopPropagation();

            this.hasFocus = $event.type === "focus";

            this[$event.type].emit({$event: $event, control: this.control, model: this.model});

        } else {

            this[(($event as DynamicFormControlEvent).$event as FocusEvent).type].emit($event);
        }
    }
}