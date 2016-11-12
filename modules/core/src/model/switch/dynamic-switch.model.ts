import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicCheckControlModel} from "../dynamic-check-control.model";
import {DynamicFormValueControlModelConfig} from "../dynamic-form-value-control.model";
import {serializable} from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_SWITCH = "SWITCH";

export class DynamicSwitchModel extends DynamicCheckControlModel {

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SWITCH;

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {
        super(config, cls);
    }
}