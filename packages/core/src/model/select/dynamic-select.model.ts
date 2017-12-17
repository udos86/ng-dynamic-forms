import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { DynamicFormControlLayout } from "../dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export interface DynamicSelectModelConfig<T> extends DynamicOptionControlModelConfig<T> {

    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
}

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    @serializable() filterable: boolean;
    @serializable() multiple: boolean;
    @serializable() placeholder: string;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SELECT;

    constructor(config: DynamicSelectModelConfig<T>, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.filterable = typeof config.filterable === "boolean" ? config.filterable : false;
        this.multiple = typeof config.multiple === "boolean" ? config.multiple : false;
        this.placeholder = config.placeholder || "";
    }

    select(...indices: number[]): void {

        let value = this.multiple ? indices.map(index => this.get(index).value) : this.get(indices[0]).value;

        this.valueUpdates.next(value);
    }
}