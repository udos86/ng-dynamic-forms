import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { ɵlooseIdentical as looseIdentical } from "@angular/core";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export interface DynamicSelectModelConfig<T> extends DynamicOptionControlModelConfig<T> {

    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
    prefix?: string;
    suffix?: string;
    compareWithFn?: (o1: any, o2: any) => boolean;
}

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    @serializable() filterable: boolean;
    @serializable() multiple: boolean;
    @serializable() placeholder: string;
    @serializable() prefix: string | null;
    @serializable() suffix: string | null;
    compareWithFn: (o1: any, o2: any) => boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SELECT;

    constructor(config: DynamicSelectModelConfig<T>, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.filterable = typeof config.filterable === "boolean" ? config.filterable : false;
        this.multiple = typeof config.multiple === "boolean" ? config.multiple : false;
        this.placeholder = config.placeholder || "";
        this.prefix = config.prefix || null;
        this.suffix = config.suffix || null;
        this.compareWithFn = config.compareWithFn || looseIdentical;
    }

    select(...indices: number[]): void {

        let value = this.multiple ? indices.map(index => this.get(index).value) : this.get(indices[0]).value;

        this.valueUpdates.next(value);
    }
}