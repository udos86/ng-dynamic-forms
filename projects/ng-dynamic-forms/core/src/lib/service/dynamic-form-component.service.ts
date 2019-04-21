import { ComponentRef, Injectable } from "@angular/core";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { isNumber } from "../utils/core.utils";

export type DynamicFormControlRef = ComponentRef<DynamicFormControl>

@Injectable({
    providedIn: "root"
})
export class DynamicFormComponentService {

    private componentRefs: { [key: string]: DynamicFormControlRef | DynamicFormControlRef[] } = {};

    getFormControlRef(modelId: string, index?: number): DynamicFormControlRef | undefined {

        const ref: DynamicFormControlRef | DynamicFormControlRef[] = this.componentRefs[modelId];

        if (isNumber(index)) {

            return Array.isArray(ref) ? ref[index] : undefined;

        } else {
            return ref as DynamicFormControlRef;
        }
    }

    registerFormControlRef(model: DynamicFormControlModel, instance: DynamicFormControlRef, index?: number): void {

        if (isNumber(index)) {

            const arrayRef: DynamicFormControlRef[] = this.componentRefs[model.id] as DynamicFormControlRef[] || [];

            arrayRef.splice(index, 0, instance);
            this.componentRefs[model.id] = arrayRef;

        } else {
            this.componentRefs[model.id] = instance;
        }
    }

    unregisterFormControlRef(modelId: string, index?: number): void {

        const ref = this.componentRefs[modelId];

        if (isNumber(index)) {

            if (Array.isArray(ref) && ref[index] !== undefined) {
                ref.splice(index, 1);
            }

        } else if (ref !== undefined) {
            delete this.componentRefs[modelId];
        }
    }
}
