import { ɵlooseIdentical as looseIdentical } from "@angular/core";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean, isFunction } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export interface DynamicSelectModelConfig<T> extends DynamicOptionControlModelConfig<T> {

    compareWithFn?: (o1: any, o2: any) => boolean;
    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
    prefix?: string;
    suffix?: string;
}

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    compareWithFn: (o1: any, o2: any) => boolean;
    @serializable() filterable: boolean;
    @serializable() multiple: boolean;
    @serializable() placeholder: string;
    @serializable() prefix: string | null;
    @serializable() suffix: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SELECT;

    constructor(config: DynamicSelectModelConfig<T>, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.compareWithFn = isFunction(config.compareWithFn) ? config.compareWithFn : looseIdentical;
        this.filterable = isBoolean(config.filterable) ? config.filterable : false;
        this.multiple = isBoolean(config.multiple) ? config.multiple : false;
        this.placeholder = config.placeholder || "";
        this.prefix = config.prefix || null;
        this.suffix = config.suffix || null;
    }

    select(...indices: number[]): void {

        let value = this.multiple ? indices.map(index => this.get(index).value) : this.get(indices[0]).value;

        this.valueUpdates.next(value);
    }
}