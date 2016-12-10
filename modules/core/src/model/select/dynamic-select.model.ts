import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicOptionControlModel, DynamicOptionControlModelConfig} from "../dynamic-option-control.model";
import {serializable} from "../../decorator/serializable.decorator";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export interface DynamicSelectModelConfig<T> extends DynamicOptionControlModelConfig<T> {

    multiple?: boolean;
}

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    @serializable() multiple: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SELECT;

    constructor(config: DynamicSelectModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.multiple = getValue(config, "multiple", false);
    }

    select(...indices: Array<number>): void {

        let value = this.multiple ? indices.map(index => this.get(index).value) : this.get(indices[0]).value;

        this.valueUpdates.next(value);
    }
}