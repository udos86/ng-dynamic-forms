import { ComponentRef, Injectable } from "@angular/core";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormInstancesDummyService } from "./dynamic-form-instances-dummy.service";

export type DynamicFormControlInstance = ComponentRef<DynamicFormControl>;

@Injectable({
    providedIn: "root",
    useClass: DynamicFormInstancesDummyService
})
export abstract class DynamicFormInstancesService {

    abstract getFormControlInstance(modelId: string, index?: number): DynamicFormControlInstance | undefined;

    abstract setFormControlInstance(model: DynamicFormControlModel, instance: DynamicFormControlInstance, index?: number): void;

    abstract removeFormControlInstance(modelId: string, index?: number): void | never;
}
