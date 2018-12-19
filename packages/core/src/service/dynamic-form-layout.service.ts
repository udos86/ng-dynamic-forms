import { Inject, Injectable, InjectionToken, Optional, QueryList, Type } from "@angular/core";
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutConfig,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";
import { DynamicFormControl } from "../component/dynamic-form-control.interface";
import {
    DynamicTemplateDirective,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT
} from "../directive/dynamic-template.directive";
import { isObject } from "../utils/core.utils";

export type DynamicFormLayout = { [id: string]: DynamicFormControlLayout };

export type DynamicFormControlMapFn = (model: DynamicFormControlModel) => Type<DynamicFormControl> | null;

export type DynamicFormControlTemplates = QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

export const DYNAMIC_FORM_CONTROL_MAP_FN = new InjectionToken<DynamicFormControlMapFn>("DYNAMIC_FORM_CONTROL_MAP_FN");

@Injectable({
    providedIn: "root"
})
export class DynamicFormLayoutService {

    constructor(@Inject(DYNAMIC_FORM_CONTROL_MAP_FN) @Optional() private readonly DYNAMIC_FORM_CONTROL_MAP_FN: any) {
        this.DYNAMIC_FORM_CONTROL_MAP_FN = DYNAMIC_FORM_CONTROL_MAP_FN as DynamicFormControlMapFn;
    }

    findById(id: string, formLayout: DynamicFormLayout | null): DynamicFormControlLayout | null {

        if (isObject(formLayout)) {

            for (let key of Object.keys(formLayout)) {

                if (key === id) {
                    return formLayout[key];
                }
            }
        }

        return null;
    }

    filterTemplatesByModel(model: DynamicFormControlModel, templates: DynamicFormControlTemplates): DynamicTemplateDirective[] {

        const filterCallback: (template: DynamicTemplateDirective) => boolean = (template: DynamicTemplateDirective) => {
            return template.modelId === model.id || template.modelType === model.type;
        };

        if (templates instanceof QueryList) {
            return templates.filter(filterCallback);

        } else if (Array.isArray(templates)) {
            return templates.filter(filterCallback);
        }

        return [];
    }

    getAlignedTemplate(model: DynamicFormControlModel, templates: DynamicFormControlTemplates, alignment: DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT): DynamicTemplateDirective | undefined {

        return this.filterTemplatesByModel(model, templates)
            .find(template => template.as === null && template.align === alignment);
    }
    /*
    getIndexedTemplates(model: DynamicFormControlModel, templates: DynamicFormControlTemplates): DynamicTemplateDirective[] | undefined {
        return this.filterTemplatesByModel(model, templates).filter(template => template.as === null);
    }
    */
    getStartTemplate(model: DynamicFormControlModel, templates: DynamicFormControlTemplates): DynamicTemplateDirective | undefined {
        return this.getAlignedTemplate(model, templates, DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT.Start);
    }

    getEndTemplate(model: DynamicFormControlModel, templates: DynamicFormControlTemplates): DynamicTemplateDirective | undefined {
        return this.getAlignedTemplate(model, templates, DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT.End);
    }

    getClass(layout: DynamicFormControlLayout | null, context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace): string {

        if (layout !== null && layout.hasOwnProperty(context)) {

            let config = layout[context] as DynamicFormControlLayoutConfig;

            if (config.hasOwnProperty(place)) {
                return config[place] as string;
            }
        }

        return "";
    }

    getElementId(model: DynamicFormControlModel): string {

        let id = model.id,
            parent = model.parent;

        while (parent !== null) {

            if (parent instanceof DynamicFormArrayGroupModel) {

                id = `${parent.context.id}-${parent.index}-${model.id}`;
                break;
            }

            parent = parent.parent;
        }

        return id;
    }

    getCustomComponentType(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

        if (this.DYNAMIC_FORM_CONTROL_MAP_FN) {
            return this.DYNAMIC_FORM_CONTROL_MAP_FN(model);
        }

        return null;
    }
}
