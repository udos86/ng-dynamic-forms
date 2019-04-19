import { InjectionToken } from "@angular/core";
import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export type Validator = ValidatorFn | AsyncValidatorFn;

export type ValidatorFactory = (args: any) => Validator;

export type ValidatorsToken = Validator[];

export type ValidatorsMap = Map<string, Validator | ValidatorFactory>;

export const DYNAMIC_VALIDATORS = new InjectionToken<ValidatorsMap>("DYNAMIC_VALIDATORS");
