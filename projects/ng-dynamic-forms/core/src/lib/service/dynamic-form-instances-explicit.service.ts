import { Injectable } from "@angular/core";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormControlInstance, DynamicFormInstancesService } from "./dynamic-form-instances.service";
import { isNumber } from "../utils/core.utils";

@Injectable()
export class DynamicFormInstancesExplicitService implements DynamicFormInstancesService {

    protected instances: { [key: string]: DynamicFormControlInstance | DynamicFormControlInstance[] } = {};

    getFormControlInstance(modelId: string, index?: number): DynamicFormControlInstance | undefined {

        const instance: DynamicFormControlInstance | DynamicFormControlInstance[] = this.instances[modelId];

        if (isNumber(index)) {

            return Array.isArray(instance) ? instance[index] : undefined;

        } else {
            return instance as DynamicFormControlInstance;
        }
    }

    setFormControlInstance(model: DynamicFormControlModel, instance: DynamicFormControlInstance, index?: number): void {

        if (isNumber(index)) {

            const arrayInstance: DynamicFormControlInstance[] = this.instances[model.id] as DynamicFormControlInstance[] || [];

            arrayInstance.splice(index, 0, instance);
            this.instances[model.id] = arrayInstance;

        } else {
            this.instances[model.id] = instance;
        }
    }

    removeFormControlInstance(modelId: string, index?: number): void {

        const instance = this.instances[modelId];

        if (isNumber(index)) {

            if (Array.isArray(instance) && instance[index] !== undefined) {
                instance.splice(index, 1);
            }

        } else if (instance !== undefined) {
            delete this.instances[modelId];
        }
    }
}
