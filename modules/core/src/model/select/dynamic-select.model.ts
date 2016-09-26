import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicOptionControlModel, DynamicOptionControlModelConfig} from "../dynamic-option-control.model";
import {serializable} from "../../decorator/serialize.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    @serializable readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SELECT;

    constructor(config: DynamicOptionControlModelConfig, cls?: ClsConfig) {

        super(config, cls);
    }
}