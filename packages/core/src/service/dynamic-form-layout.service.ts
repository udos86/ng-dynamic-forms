import { Inject, Injectable, InjectionToken, Optional, Type } from "@angular/core";
import {
    DynamicFormControlLayoutConfig,
    DynamicFormControlLayout
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";

export type DynamicFormLayout = { [id: string]: DynamicFormControlLayout };

export type DynamicFormControlMapFn = (model: DynamicFormControlModel) => Type<DynamicFormControl> | null;

export const DYNAMIC_FORM_CONTROL_MAP_FN = new InjectionToken<DynamicFormControlMapFn>("DYNAMIC_FORM_CONTROL_MAP_FN");

@Injectable()
export class DynamicFormLayoutService {

    constructor(@Optional() @Inject(DYNAMIC_FORM_CONTROL_MAP_FN) private DYNAMIC_FORM_CONTROL_MAP_FN: DynamicFormControlMapFn) {}

    findById(id: string, formLayout: DynamicFormLayout | null): DynamicFormControlLayout | null {

        if (formLayout !== null && typeof formLayout === "object") {

            for (let key of Object.keys(formLayout)) {

                if (key === id) {
                    return formLayout[key];
                }
            }
        }

        return null;
    }

    getClass(layout: DynamicFormControlLayout | null, context: string, place: string): string {

        if (layout !== null && layout.hasOwnProperty(context)) {

            let config = layout[context] as DynamicFormControlLayoutConfig;

            if (config.hasOwnProperty(place)) {
                return config[place] as string;
            }
        }

        return "";
    }

    getCustomFormControlType(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

        if (this.DYNAMIC_FORM_CONTROL_MAP_FN) {
            return this.DYNAMIC_FORM_CONTROL_MAP_FN(model);
        }

        return null;
    }
}