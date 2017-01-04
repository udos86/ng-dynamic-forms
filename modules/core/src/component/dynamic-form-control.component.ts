import { EventEmitter, TemplateRef, OnInit, AfterContentInit, OnDestroy, QueryList } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";
import { DynamicFormControlRelationGroup } from "../model/dynamic-form-control-relation.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import { DynamicFormRelationService } from "../service/dynamic-form-relation.service";
import { isDefined } from "../utils";

export interface DynamicFormControlEvent {

    $event: Event | FocusEvent | any;
    control: FormControl;
    model: DynamicFormControlModel;
}

export abstract class DynamicFormControlComponent implements OnInit, AfterContentInit, OnDestroy {

    bindId: boolean;
    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    control: FormControl;
    controlGroup: FormGroup;
    focus: EventEmitter<DynamicFormControlEvent>;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    model: DynamicFormControlModel;
    nestedTemplates: QueryList<any>;
    template: TemplateRef<any>;
    templates: QueryList<any>;

    private subscriptions: Array<Subscription> = [];

    abstract readonly type: string;

    constructor(private relationService: DynamicFormRelationService) {}

    ngOnInit(): void {

        if (!isDefined(this.model) || !isDefined(this.controlGroup)) {
            throw new Error(`no [model] or [controlGroup] property binding defined for DynamicFormControlComponent`);
        }

        this.control = <FormControl> this.controlGroup.get(this.model.id);

        this.subscriptions.push(this.control.valueChanges.subscribe(this.onControlValueChanges.bind(this)));
        this.subscriptions.push(this.model.disabledUpdates.subscribe(this.onModelDisabledUpdates.bind(this)));

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = <DynamicFormValueControlModel<DynamicFormControlValue>> this.model;

            this.subscriptions.push(model.valueUpdates.subscribe(this.onModelValueUpdates.bind(this)));
        }

        if (this.model.relation.length > 0) {
            this.setControlRelations();
        }
    }

    ngAfterContentInit(): void {

        if (this.nestedTemplates) {
            this.templates = this.nestedTemplates;
        }

        this.templates.forEach(dynamicTemplate => {

            if (dynamicTemplate.modelId === this.model.id) {
                this.template = dynamicTemplate.templateRef;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    get errorMessages(): Array<string> {

        let messages = [];

        if (isDefined(this.model["errorMessages"])) {

            for (let validatorName in this.control.errors) {

                let message;

                if (validatorName === "minlength" || validatorName === "maxlength") {
                    validatorName = validatorName.replace("length", "Length");
                }

                if (this.model["errorMessages"][validatorName]) {

                    message = this.model["errorMessages"][validatorName].replace(/\{\{(.+?)\}\}/mg,
                        (match, expression) => {

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

    get isValid(): boolean {
        return this.control.valid;
    }

    get isInvalid(): boolean {
        return this.control.touched && this.control.invalid;
    }

    setControlRelations(): void {

        let relActivation = this.relationService.findActivationRelation(this.model.relation);

        if (relActivation) {

            this.updateModelDisabled(relActivation);

            this.relationService.getRelatedFormControls(this.model, this.controlGroup).forEach(control => {

                this.subscriptions.push(control.valueChanges.subscribe(() => this.updateModelDisabled(relActivation)));
                this.subscriptions.push(control.statusChanges.subscribe(() => this.updateModelDisabled(relActivation)));
            });
        }
    }

    updateModelDisabled(relation: DynamicFormControlRelationGroup): void {

        this.model.disabledUpdates.next(this.relationService.isFormControlToBeDisabled(relation, this.controlGroup));
    }

    onControlValueChanges(value: DynamicFormControlValue): void {

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = <DynamicFormValueControlModel<DynamicFormControlValue>> this.model;

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

    onValueChange($event: Event |  DynamicFormControlEvent): void {

        if ($event instanceof Event) { // native HTML5 change event

            $event.stopImmediatePropagation();

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = <DynamicInputModel> this.model;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
                    model.files = $event.srcElement["files"];
                }
            }

            this.change.emit({$event: $event as Event, control: this.control, model: this.model});

        } else if ($event.hasOwnProperty("source") || $event.hasOwnProperty("originalEvent")) { // Material 2 and PrimeNG change event

            this.change.emit({$event: $event, control: this.control, model: this.model});

        } else {

            this.change.emit($event as DynamicFormControlEvent);
        }
    }

    onFocusChange($event: FocusEvent | DynamicFormControlEvent): void {

        if ($event instanceof FocusEvent) {

            $event.stopPropagation();

            this.hasFocus = $event.type === "focus";

            this[$event.type].emit({$event: $event, control: this.control, model: this.model});

        } else {
            this[(<FocusEvent> (<DynamicFormControlEvent> $event).$event).type].emit($event);
        }
    }
}