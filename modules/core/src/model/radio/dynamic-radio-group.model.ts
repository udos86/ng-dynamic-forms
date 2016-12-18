import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { DynamicFieldSet } from "../form-group/dynamic-form-group.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export interface DynamicRadioGroupModelConfig<T> extends DynamicOptionControlModelConfig<T> {

    legend?: string;
}

export class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> implements DynamicFieldSet {

    @serializable() legend: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;

    constructor(config: DynamicRadioGroupModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.legend = getValue(config, "legend", null);
    }

    select(index: number): void {
        this.valueUpdates.next(this.get(index).value);
    }
}