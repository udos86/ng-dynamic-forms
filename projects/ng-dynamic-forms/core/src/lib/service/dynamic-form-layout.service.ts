import { Injectable, QueryList } from "@angular/core";
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutConfig,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";
import {
    DynamicTemplateDirective,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT
} from "../directive/dynamic-template.directive";
import { isObject, isString } from "../utils/core.utils";

export type DynamicFormLayout = { [id: string]: DynamicFormControlLayout };

export type DynamicFormControlTemplates = QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

@Injectable({
    providedIn: "root"
})
export class DynamicFormLayoutService {

    findById(id: string, formLayout: DynamicFormLayout | null): DynamicFormControlLayout | null {

        if (isObject(formLayout)) {

            for (const key of Object.keys(formLayout)) {

                if (key === id) {
                    return formLayout[key];
                }
            }
        }

        return null;
    }

    findByModel(model: DynamicFormControlModel, formLayout: DynamicFormLayout | null): DynamicFormControlLayout | null {

        let controlLayout: DynamicFormControlLayout = null;

        if (isObject(formLayout)) {

            for (const key of Object.keys(formLayout)) {

                key.split(",").forEach(substring => {

                    const selector = substring.trim();

                    if (selector === model.id || selector === model.type) {
                        controlLayout = formLayout[key];
                    }
                });
            }
        }

        return controlLayout;
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

    getAlignedTemplate(model: DynamicFormControlModel, templates: DynamicFormControlTemplates,
                       alignment: DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT): DynamicTemplateDirective | undefined {

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

    getClass(layout: DynamicFormControlLayout | null | undefined, context: DynamicFormControlLayoutContext,
             place: DynamicFormControlLayoutPlace): string {

        if (isObject(layout) && layout.hasOwnProperty(context)) {

            const config = layout[context] as DynamicFormControlLayoutConfig;

            if (config.hasOwnProperty(place)) {
                return config[place] as string;
            }
        }

        return "";
    }

    getHostClass(layout: DynamicFormControlLayout | null | undefined): string {

        const keys: (keyof DynamicFormControlLayout)[] = ["element", "grid"];
        let cls = "";

        if (isObject(layout)) {
            keys.forEach(key => {
                if (isObject(layout[key]) && isString(layout[key].host)) {
                    cls = cls + ` ${layout[key].host}`;
                }
            });
        }

        return cls;
    }

    getElementId(model: DynamicFormControlModel): string {

        let id = model.id;
        let parent = model.parent;

        while (parent !== null) {

            if (parent instanceof DynamicFormArrayGroupModel) {

                id = `${parent.context.id}-${parent.index}-${model.id}`;
                break;
            }

            parent = parent.parent;
        }

        return id;
    }
}
