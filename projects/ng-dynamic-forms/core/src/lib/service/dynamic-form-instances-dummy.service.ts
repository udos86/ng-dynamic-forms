import { DynamicFormInstancesService } from "./dynamic-form-instances.service";
import { ComponentRef, Injectable } from "@angular/core";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";

@Injectable()
export class DynamicFormInstancesDummyService implements DynamicFormInstancesService {

    getFormControlInstance(_modelId: string, _index?: number): ComponentRef<DynamicFormControl> | undefined {
        return undefined;
    }

    removeFormControlInstance(_modelId: string, _index?: number): void | never {
        return undefined;
    }

    setFormControlInstance(_model: DynamicFormControlModel, _instance: ComponentRef<DynamicFormControl>, _index?: number): void {
    }

}