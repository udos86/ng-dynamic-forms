import { Injectable } from "@angular/core";

export interface DynamicFormControlLayoutConfig {

    container?: string;
    control?: string;
    errors?: string;
    group?: string;
    hint?: string;
    host?: string;
    label?: string;
    option?: string;

    [key: string]: string | undefined;
}

export interface DynamicFormControlLayout {

    element?: DynamicFormControlLayoutConfig;
    grid?: DynamicFormControlLayoutConfig;

    [key: string]: DynamicFormControlLayoutConfig | undefined;
}

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