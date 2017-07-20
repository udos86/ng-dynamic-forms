import { Injectable, Inject, Optional } from "@angular/core";
import {
    AbstractControl,
    ValidatorFn,
    AsyncValidatorFn,
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

@Injectable()
export class DynamicFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {}


    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: ValidatorsToken = this.NG_VALIDATORS): ValidatorFn | AsyncValidatorFn | never {

        let validatorFn: ValidatorFactory | ValidatorFn | AsyncValidatorFn | null = null;

        if (Validators.hasOwnProperty(validatorName)) { // Angular Standard Validators

            validatorFn = (Validators as any)[validatorName];

        } else if (validatorsToken) { // Custom Validators

            validatorFn = validatorsToken.find(validatorFn => validatorFn.name === validatorName);
        }

        if (!Utils.isFunction(validatorFn)) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`);
        }

        if (Utils.isDefined(validatorArgs)) {
            return (validatorFn as Function)(validatorArgs);
        }

        return validatorFn;
    }


    private getValidatorFns(validatorsConfig: DynamicValidatorsMap,
                            validatorsToken: ValidatorsToken = this.NG_VALIDATORS): ValidatorFn[] | AsyncValidatorFn[] {

        let validatorFns: ValidatorFn[] | AsyncValidatorFn[] = [];

        if (Utils.isTrueObject(validatorsConfig)) {

            validatorFns = Object.keys(validatorsConfig).map(validatorFnKey => {

                let validatorConfig = validatorsConfig[validatorFnKey],
                    validatorName,
                    validatorArgs;

                if (ValidationUtils.isExpandedValidatorConfig(validatorConfig)) {

                    validatorName = (validatorConfig as DynamicValidatorConfig).name;
                    validatorArgs = (validatorConfig as DynamicValidatorConfig).args;

                } else {

                    validatorName = validatorFnKey;
                    validatorArgs = validatorConfig;
                }

                return this.getValidatorFn(validatorName, validatorArgs, validatorsToken);
            });
        }

        return validatorFns;
    }


    getValidatorByName(validatorName: string, validatorArgs: any = null): ValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs) as ValidatorFn;
    }


    getAsyncValidatorByName(validatorName: string, validatorArgs: any = null): AsyncValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn;
    }


    getValidator(validatorConfig: DynamicValidatorsMap): ValidatorFn | null {

        if (Utils.isNonEmptyObject(validatorConfig)) {

            let validatorName = Object.keys(validatorConfig)[0];

            return this.getValidatorFn(validatorName, validatorConfig[validatorName]) as ValidatorFn;
        }

        return null;
    }


    getAsyncValidator(validatorConfig: DynamicValidatorsMap): AsyncValidatorFn | null {

        if (Utils.isNonEmptyObject(validatorConfig)) {

            let validatorName = Object.keys(validatorConfig)[0];

            return this.getValidatorFn(validatorName, validatorConfig[validatorName], this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn;
        }

        return null;
    }


    getValidators(validatorsConfig: DynamicValidatorsMap): ValidatorFn[] {
        return this.getValidatorFns(validatorsConfig) as ValidatorFn[];
    }


    getAsyncValidators(validatorsConfig: DynamicValidatorsMap): AsyncValidatorFn[] {
        return this.getValidatorFns(validatorsConfig, this.NG_ASYNC_VALIDATORS) as AsyncValidatorFn[];
    }


    createErrorMessages(control: AbstractControl, model: DynamicFormControlModel): string[] {

        return Object.keys(control.errors || {}).map(errorCode => {

            let error = control.getError(errorCode),
                message = `Validation error: ${errorCode}`,
                messageKey = Utils.equals(errorCode, "minlength", "maxlength") ? errorCode.replace("length", "Length") : errorCode;

            if (model.errorMessages.hasOwnProperty(messageKey)) {

                message = (model.errorMessages[messageKey] as string).replace(/{{\s*(.+?)\s*}}/mg,
                    (match: string, expression: string) => {

                        let propertySource: any = model,
                            propertyName: string = expression;

                        if (expression.indexOf("validator.") >= 0) {

                            propertySource = error;
                            propertyName = expression.replace("validator.", "");
                        }

                        return propertySource[propertyName] ? propertySource[propertyName] : null;
                    });
            }

            return message;
        });
    }
}