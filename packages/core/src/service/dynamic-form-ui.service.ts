import { Injectable, Type } from "@angular/core";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";

export type DynamicModelComponentMapper = (model: DynamicFormControlModel) => Type<DynamicFormControl>;

@Injectable()
export class DynamicFormUIService {


}