import { ComponentRef, Injectable } from "@angular/core";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormInstancesDummyService } from "./dynamic-form-instances-dummy.service";

@Injectable({
    providedIn: "root",
    useClass: DynamicFormInstancesDummyService
})
export abstract class DynamicFormInstancesService {
    abstract getFormControlInstance(modelId: string, index?: number): ComponentRef<DynamicFormControl> | undefined;

    abstract setFormControlInstance(model: DynamicFormControlModel, instance: ComponentRef<DynamicFormControl>, index?: number): void;

    abstract removeFormControlInstance(modelId: string, index?: number): void | never;
}
