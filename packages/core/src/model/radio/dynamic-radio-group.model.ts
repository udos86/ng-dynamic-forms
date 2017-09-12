import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export interface DynamicRadioGroupModelConfig<T> extends DynamicOptionControlModelConfig<T> {

    legend?: string;
}

export class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> {

    @serializable() legend: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;

    constructor(config: DynamicRadioGroupModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.legend = config.legend || null;
    }

    select(index: number): void {
        this.valueUpdates.next(this.get(index).value);
    }
}