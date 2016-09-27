import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "../dynamic-form-value-control.model";
import {serializable} from "../../decorator/serialize.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_SWITCH = "SWITCH";

export class DynamicSwitchModel extends DynamicFormValueControlModel<boolean> {

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SWITCH;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (this.value !== true) {
            this.value = false;
        }
    }
}