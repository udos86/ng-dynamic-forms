import { ComponentRef, Injectable } from "@angular/core";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";

@Injectable()
export class DynamicFormInstancesService {

    protected formControlInstances: { [key: string]: ComponentRef<DynamicFormControl> | Array<ComponentRef<DynamicFormControl>> } = {};

    getFormControlInstance(modelId: string, index?: number): ComponentRef<DynamicFormControl> | undefined {
        const retInstance: ComponentRef<DynamicFormControl> | Array<ComponentRef<DynamicFormControl>> =
            this.formControlInstances[modelId];
        if (Array.isArray(retInstance) && index) {
            return retInstance[index];
        } else {
            return this.formControlInstances[modelId] as ComponentRef<DynamicFormControl>;
        }

    }

    setFormControlInstance(model: DynamicFormControlModel, instance: ComponentRef<DynamicFormControl>, index?: number): void {
        if (index !== undefined) {
            const arrayRef: Array<ComponentRef<DynamicFormControl>> =
                this.formControlInstances[model.id] as Array<ComponentRef<DynamicFormControl>> || [];
            arrayRef[index] = instance;
            this.formControlInstances[model.id] = arrayRef;
        } else {
            this.formControlInstances[model.id] = instance;
        }
    }

    removeFormControlInstance(modelId: string, index?: number): void {
        const instanceRef = this.formControlInstances[modelId];
        if (index !== undefined) {

            if (Array.isArray(instanceRef)) {
                delete instanceRef[index];
            }
        } else {
            delete this.formControlInstances[modelId];
        }
    }

}