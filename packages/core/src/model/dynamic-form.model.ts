import { DynamicFormControlModel } from "./dynamic-form-control.model";
import { DynamicFormGroupModel } from "./form-group/dynamic-form-group.model";

export type DynamicFormModel = DynamicFormControlModel[];

export type DynamicUnionFormModel = DynamicFormModel | DynamicFormGroupModel;
