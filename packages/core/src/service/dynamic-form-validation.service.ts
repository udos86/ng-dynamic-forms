import { Injectable, Inject, Optional } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    ValidatorFn,
    Validators,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import {
    DynamicValidatorDescriptor,
    DynamicValidatorsConfig
} from "../model/misc/dynamic-form-control-validation.model";
import { isObject, isString } from "../utils/core.utils";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory, ValidatorsToken } from "./dynamic-form.validators";

@Injectable({
    providedIn: "root"
})
export class DynamicFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[],
                @Optional() @Inject(DYNAMIC_VALIDATORS) private DYNAMIC_VALIDATORS: Map<string, Validator | ValidatorFactory>) {}


    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: ValidatorsToken = this.NG_VALIDATORS): Validator | never {

        let validatorFn: ValidatorFactory | Validator | undefined;

        if (Validators.hasOwnProperty(validatorName)) { // Built-in Angular Validators

            validatorFn = (Validators as any)[validatorName];

        } else { // Custom Validators

            if (this.DYNAMIC_VALIDATORS && this.DYNAMIC_VALIDATORS.has(validatorName)) {
                validatorFn = this.DYNAMIC_VALIDATORS.get(validatorName);

            } else if (validatorsToken) {
                validatorFn = validatorsToken.find(validatorFn => validatorFn.name === validatorName);
            }
        }

        if (validatorFn === undefined) { // throw when no validator could be resolved
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS, NG_ASYNC_VALIDATORS or DYNAMIC_FORM_VALIDATORS`);
        }

        if (validatorArgs !== null) {
            return (validatorFn as ValidatorFactory)(validatorArgs);
        }

        return validatorFn as Validator;
    }


    private getValidatorFns(validatorsConfig: DynamicValidatorsConfig,
                            validatorsToken: ValidatorsToken = this.NG_VALIDATORS): Validator[] {

        let validatorFns: Validator[] = [];

        if (isObject(validatorsConfig)) {

            validatorFns = Object.keys(validatorsConfig).map(validatorConfigKey => {

                let validatorConfigValue = (validatorsConfig as DynamicValidatorsConfig)[validatorConfigKey];

                if (this.isValidatorDescriptor(validatorConfigValue)) {

                    let descriptor = validatorConfigValue as DynamicValidatorDescriptor;

                    return this.getValidatorFn(descriptor.name, descriptor.args, validatorsToken);
                }

                return this.getValidatorFn(validatorConfigKey, validatorConfigValue, validatorsToken);
            });
        }

        return validatorFns;
    }


    private parseErrorMessageConfig(template: string, model: DynamicFormControlModel, error: any = null): string {

        return template.replace(/{{\s*(.+?)\s*}}/mg, (_match: string, expression: string) => {

            let propertySource: any = model,
                propertyName: string = expression;

            if (expression.indexOf("validator.") >= 0 && error) {

                propertySource = error;
                propertyName = expression.replace("validator.", "");
            }

            return propertySource[propertyName] ? propertySource[propertyName] : null;
        });
    }


    getValidator(validatorName: string, validatorArgs: any = null): ValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs) as ValidatorFn;
    }


    getAsyncValidator(validatorName: string, validatorArgs: any = null): AsyncValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn;
    }


    getValidators(validatorsConfig: DynamicValidatorsConfig): ValidatorFn[] {
        return this.getValidatorFns(validatorsConfig) as ValidatorFn[];
    }


    getAsyncValidators(asyncValidatorsConfig: DynamicValidatorsConfig): AsyncValidatorFn[] {
        return this.getValidatorFns(asyncValidatorsConfig, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn[];
    }


    updateValidators(validatorsConfig: DynamicValidatorsConfig | null, control: AbstractControl,
                     model: DynamicFormControlModel): void {

        model.validators = validatorsConfig;

        if (validatorsConfig === null) {

            control.clearValidators();

        } else {
            control.setValidators(this.getValidators(validatorsConfig));
        }
    }


    updateAsyncValidators(asyncValidatorsConfig: DynamicValidatorsConfig | null, control: AbstractControl,
                          model: DynamicFormControlModel): void {

        model.asyncValidators = asyncValidatorsConfig;

        if (asyncValidatorsConfig === null) {

            control.clearAsyncValidators();

        } else {
            control.setAsyncValidators(this.getAsyncValidators(asyncValidatorsConfig));
        }
    }


    createErrorMessages(control: AbstractControl, model: DynamicFormControlModel): string[] {

        let messages: string[] = [];

        if (model.hasErrorMessages) {

            let messagesConfig = model.errorMessages as DynamicValidatorsConfig;

            Object.keys(control.errors || {}).forEach(validationErrorKey => {

                let messageKey = validationErrorKey;

                if (validationErrorKey === "minlength" || validationErrorKey === "maxlength") {
                    messageKey = messageKey.replace("length", "Length");
                }

                if (messagesConfig.hasOwnProperty(messageKey)) {

                    let validationError = control.getError(validationErrorKey),
                        messageTemplate = messagesConfig[messageKey] as string;

                    messages.push(this.parseErrorMessageConfig(messageTemplate, model, validationError));
                }
            });
        }

        return messages;
    }


    isFormHook(value: any): boolean {
        return isString(value) && ["blur", "change", "submit"].indexOf(value) !== -1;
    }


    isValidatorDescriptor(value: any): boolean {

        if (isObject(value)) {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}
