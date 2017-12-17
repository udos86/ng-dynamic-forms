import { Injectable } from "@angular/core";
import { DynamicFormControlLayoutConfig, DynamicFormControlLayout } from "../model/dynamic-form-control-layout.model";

export type DynamicFormLayout = { [id: string]: DynamicFormControlLayout };

@Injectable()
export class DynamicFormLayoutService {

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
}