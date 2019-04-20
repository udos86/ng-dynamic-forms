import { DynamicFormControlInstance, DynamicFormInstancesService } from "./dynamic-form-instances.service";
import { Injectable } from "@angular/core";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";

@Injectable()
export class DynamicFormInstancesDummyService implements DynamicFormInstancesService {

    getFormControlInstance(_modelId: string, _index?: number): DynamicFormControlInstance | undefined {
        return undefined;
    }

    removeFormControlInstance(_modelId: string, _index?: number): void | never {
        return undefined;
    }

    setFormControlInstance(_model: DynamicFormControlModel, _instance: DynamicFormControlInstance, _index?: number): void {
    }
}
