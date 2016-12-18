import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicCheckControlModel } from "../dynamic-check-control.model";
import { DynamicFormValueControlModelConfig } from "../dynamic-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_SWITCH = "SWITCH";

export interface DynamicSwitchModelConfig extends DynamicFormValueControlModelConfig<boolean> {

    offLabel?: string;
    onLabel?: string;
}

export class DynamicSwitchModel extends DynamicCheckControlModel {

    @serializable() offLabel: string | null;
    @serializable() onLabel: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SWITCH;

    constructor(config: DynamicSwitchModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.offLabel = getValue(config, "offLabel", null);
        this.onLabel = getValue(config, "onLabel", null);
    }
}