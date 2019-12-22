import {InjectionToken, ValueProvider} from "@angular/core";
import {AbstractControl, AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {DynamicFormControlModel} from '../model/dynamic-form-control.model';

export type Validator = ValidatorFn | AsyncValidatorFn;

export type ValidatorFactory = (args: any) => Validator;

export type ValidatorsToken = Validator[];

export type ValidatorsMap = Map<string, Validator | ValidatorFactory>;

export type ValidatorErrorMessageFn = (model: DynamicFormControlModel, error: any) => string;

export type ValidatorErrorMessagesMap = Map<string, ValidatorErrorMessageFn | string>;

export const DYNAMIC_VALIDATORS = new InjectionToken<ValidatorsMap>("DYNAMIC_VALIDATORS");

export const DYNAMIC_GLOBAL_ERROR_MESSAGES = new InjectionToken<ValidatorErrorMessagesMap>("DYNAMIC_ERROR_MESSAGES");
