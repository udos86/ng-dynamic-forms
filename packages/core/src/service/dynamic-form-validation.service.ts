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
    DynamicValidatorsConfig,
    isValidatorDescriptor
} from "../model/misc/dynamic-form-control-validation.model";

export type Validator = ValidatorFn | AsyncValidatorFn;

export type ValidatorFactory = (args: any) => Validator;

export type ValidatorsToken = Validator[];

@Injectable()
export class DynamicFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {}


    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: ValidatorsToken = this.NG_VALIDATORS): Validator | never {

        let validatorFn: ValidatorFactory | Validator | undefined;

        if (Validators.hasOwnProperty(validatorName)) { // Built-in Angular Validators

            validatorFn = (Validators as any)[validatorName];

        } else if (validatorsToken) { // Custom Validators

            validatorFn = validatorsToken.find(validatorFn => validatorFn.name === validatorName);
        }

        if (validatorFn === undefined) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`);
        }

        if (validatorArgs !== null) {

            return (validatorFn as ValidatorFactory)(validatorArgs);
        }

        return validatorFn as Validator;
    }


    private getValidatorFns(validatorsConfig: DynamicValidatorsConfig,
                            validatorsToken: ValidatorsToken = this.NG_VALIDATORS): Validator[] {

        let validatorFns: Validator[] = [];

        if (validatorsConfig && typeof validatorsConfig === "object") {

            validatorFns = Object.keys(validatorsConfig).map(validatorConfigKey => {

                let validatorConfigValue = validatorsConfig[validatorConfigKey];

                if (isValidatorDescriptor(validatorConfigValue)) {

                    let descriptor = validatorConfigValue as DynamicValidatorDescriptor;

                    return this.getValidatorFn(descriptor.name, descriptor.args, validatorsToken);
                }

                return this.getValidatorFn(validatorConfigKey, validatorConfigValue, validatorsToken);
            });
        }

        return validatorFns;
    }


    private parseErrorMessageTemplate(template: string, model: DynamicFormControlModel, error: any = null): string {

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

        if (typeof model.errorMessages === "object" && model.errorMessages !== null) {

            let messagesConfig = model.errorMessages as DynamicValidatorsConfig;

            Object.keys(control.errors || {}).forEach(validationErrorKey => {

                let messageKey = validationErrorKey;

                if (validationErrorKey === "minlength" || validationErrorKey === "maxlength") {
                    messageKey.replace("length", "Length");
                }

                if (messagesConfig.hasOwnProperty(messageKey)) {

                    let validationError = control.getError(validationErrorKey),
                        messageTemplate = messagesConfig[messageKey] as string;

                    messages.push(this.parseErrorMessageTemplate(messageTemplate, model, validationError));
                }
            });
        }

        return messages;
    }


    isFormHook(value: any): boolean {
        return typeof value === "string" && ["blur", "change", "submit"].indexOf(value) !== -1;
    }
}