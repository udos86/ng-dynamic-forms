import { Injectable, Inject, Optional } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormArray,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import {
    DynamicFormControlModel,
    DynamicValidatorConfig,
    DynamicValidatorsMap
} from "../model/dynamic-form-control.model";
import { Utils } from "../utils/core.utils";
import { ValidationUtils } from "../utils/validation.utils";

export type ValidatorFactory = (args: any) => ValidatorFn | AsyncValidatorFn;

export type ValidatorsToken = (ValidatorFn | AsyncValidatorFn)[];

export interface ValidatorFnParams {

    validatorName: string;
    validatorArgs: any;
}

@Injectable()
export class DynamicFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {}


    private getValidatorFnParams(validatorFnKey: string, validatorConfig: any): ValidatorFnParams {

        let validatorName,
            validatorArgs = null;

        if (ValidationUtils.isExpandedValidatorConfig(validatorConfig)) {

            validatorName = (validatorConfig as DynamicValidatorConfig).name;
            validatorArgs = (validatorConfig as DynamicValidatorConfig).args;

        } else {

            validatorName = validatorFnKey;
            validatorArgs = validatorConfig;
        }

        return {validatorName, validatorArgs};
    }


    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: ValidatorsToken = this.NG_VALIDATORS): ValidatorFn | AsyncValidatorFn | never {

        let validatorFn: ValidatorFactory | ValidatorFn | AsyncValidatorFn | undefined;

        if (Validators.hasOwnProperty(validatorName)) { // Angular Standard Validators

            validatorFn = (Validators as any)[validatorName];

        } else if (validatorsToken) { // Custom Validators

            validatorFn = validatorsToken.find(validatorFn => validatorFn.name === validatorName);
        }

        if (validatorFn === undefined) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`);
        }

        if (validatorArgs !== null) {
            return (validatorFn as Function)(validatorArgs);
        }

        return validatorFn as ValidatorFn | AsyncValidatorFn;
    }


    private getValidatorFns(validatorsConfig: DynamicValidatorsMap,
                            validatorsToken: ValidatorsToken = this.NG_VALIDATORS): ValidatorFn[] | AsyncValidatorFn[] {

        let validatorFns: ValidatorFn[] | AsyncValidatorFn[] = [];

        if (Utils.isNonEmptyObject(validatorsConfig)) {

            validatorFns = Object.keys(validatorsConfig).map(validatorFnKey => {

                let params = this.getValidatorFnParams(validatorFnKey, validatorsConfig[validatorFnKey]);

                return this.getValidatorFn(params.validatorName, params.validatorArgs, validatorsToken);
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


    getValidator(validatorsConfig: DynamicValidatorsMap, validatorsToken: ValidatorsToken = this.NG_VALIDATORS): ValidatorFn | null {

        if (Utils.isNonEmptyObject(validatorsConfig)) {

            let validatorFnKey = Object.keys(validatorsConfig)[0],
                params = this.getValidatorFnParams(validatorFnKey, validatorsConfig[validatorFnKey]);

            return this.getValidatorFn(
                params.validatorName, params.validatorArgs, validatorsToken) as ValidatorFn;
        }

        return null;
    }


    getAsyncValidator(validatorsConfig: DynamicValidatorsMap): AsyncValidatorFn | null {
        return this.getValidator(validatorsConfig, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn;
    }


    getValidatorByName(validatorName: string, validatorArgs: any = null): ValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs) as ValidatorFn;
    }


    getAsyncValidatorByName(validatorName: string, validatorArgs: any = null): AsyncValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn;
    }


    getValidators(validatorsConfig: DynamicValidatorsMap): ValidatorFn[] {
        return this.getValidatorFns(validatorsConfig) as ValidatorFn[];
    }


    getAsyncValidators(validatorsConfig: DynamicValidatorsMap): AsyncValidatorFn[] {
        return this.getValidatorFns(validatorsConfig, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn[];
    }


    createErrorMessages(control: AbstractControl, model: DynamicFormControlModel): string[] {

        let messages: string[] = [];

        if (model.errorMessages !== null) {

            let errorMessages = model.errorMessages as DynamicValidatorsMap;

            if (control instanceof FormControl) {

                Object.keys(control.errors || {}).forEach(errorCode => {

                    let messageKey = Utils.equals(errorCode, "minlength", "maxlength") ?
                        errorCode.replace("length", "Length") : errorCode;

                    if (errorMessages.hasOwnProperty(messageKey)) {

                        let error = control.getError(errorCode),
                            template = errorMessages[messageKey] as string;

                        messages.push(this.parseErrorMessageTemplate(template, model, error));
                    }
                });

            } else if (control instanceof FormGroup || control instanceof FormArray) {

                let messageKey = Object.keys(errorMessages)[0] as string;

                if (errorMessages.hasOwnProperty(messageKey)) {

                    let template = errorMessages[messageKey] as string;

                    messages.push(this.parseErrorMessageTemplate(template, model));
                }
            }
        }

        return messages;
    }
}