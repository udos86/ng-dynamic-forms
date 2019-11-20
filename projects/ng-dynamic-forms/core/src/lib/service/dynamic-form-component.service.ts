import { ComponentRef, Inject, Injectable, InjectionToken, Optional, Type } from "@angular/core";
import { DynamicFormControl } from "../component/dynamic-form-control-interface";
import { DynamicFormComponent } from "../component/dynamic-form.component";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { isFunction, isNumber } from "../utils/core.utils";

export type DynamicFormControlRef = ComponentRef<DynamicFormControl>;
export type DynamicFormControlMapFn = (model: DynamicFormControlModel) => Type<DynamicFormControl> | null;

export const DYNAMIC_FORM_CONTROL_MAP_FN = new InjectionToken<DynamicFormControlMapFn>("DYNAMIC_FORM_CONTROL_MAP_FN");

@Injectable({
    providedIn: "root"
})
export class DynamicFormComponentService {

    private forms: DynamicFormComponent[] = [];
    private formControls: { [key: string]: DynamicFormControlRef | DynamicFormControlRef[] } = {};

    constructor(@Inject(DYNAMIC_FORM_CONTROL_MAP_FN) @Optional() private readonly DYNAMIC_FORM_CONTROL_MAP_FN: any) {
        this.DYNAMIC_FORM_CONTROL_MAP_FN = DYNAMIC_FORM_CONTROL_MAP_FN as DynamicFormControlMapFn;
    }

    getForms(): IterableIterator<DynamicFormComponent> {
        return this.forms.values();
    }

    registerForm(component: DynamicFormComponent): void {
        this.forms.push(component);
    }

    unregisterForm(component: DynamicFormComponent): void {

        const indexOf = this.forms.indexOf(component);

        if (indexOf !== -1) {
            this.forms.splice(indexOf, 1);
        }
    }

    getFormControlRef(modelId: string, index?: number): DynamicFormControlRef | undefined {

        const ref: DynamicFormControlRef | DynamicFormControlRef[] = this.formControls[modelId];

        if (isNumber(index)) {

            return Array.isArray(ref) ? ref[index] : undefined;

        } else {
            return ref as DynamicFormControlRef;
        }
    }

    registerFormControl(model: DynamicFormControlModel, ref: DynamicFormControlRef, index?: number): void {

        if (isNumber(index)) { // threat model as array child

            const arrayRef: DynamicFormControlRef[] = this.formControls[model.id] as DynamicFormControlRef[] || [];

            if (Array.isArray(arrayRef)) {

                arrayRef.splice(index, 0, ref);
                this.formControls[model.id] = arrayRef;

            } else {
                console.warn(`registerFormControlRef is called with index for a non-array form control: ${model.id}`);
            }

        } else {
            this.formControls[model.id] = ref;
        }

    }

    unregisterFormControl(modelId: string, index?: number): void {

        const componentRef = this.formControls[modelId];

        if (isNumber(index)) {

            if (Array.isArray(componentRef) && componentRef[index] !== undefined) {
                componentRef.splice(index, 1);
            }

        } else if (componentRef !== undefined) {
            delete this.formControls[modelId];
        }
    }

    getCustomComponentType(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
        return isFunction(this.DYNAMIC_FORM_CONTROL_MAP_FN) ? this.DYNAMIC_FORM_CONTROL_MAP_FN(model) : null;
    }
}
