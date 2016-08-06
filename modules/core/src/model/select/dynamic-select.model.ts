import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicOptionControlModel, DynamicOptionControlModelConfig} from "../dynamic-option-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    constructor(config: DynamicOptionControlModelConfig = {}, cls?: ClsConfig) {

        super(config, cls);

        this.type = DYNAMIC_FORM_CONTROL_TYPE_SELECT;
    }
}