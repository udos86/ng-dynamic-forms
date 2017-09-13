import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";

export interface DynamicTextAreaModelConfig extends DynamicInputControlModelConfig<string> {

    cols?: number;
    rows?: number;
    wrap?: string;
}

export class DynamicTextAreaModel extends DynamicInputControlModel<string> {

    @serializable() cols: number;
    @serializable() rows: number;
    @serializable() wrap: string;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;

    constructor(config: DynamicTextAreaModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.cols = typeof config.cols === "number" ? config.cols : 20;
        this.rows = typeof config.rows === "number" ? config.rows : 2;
        this.wrap = config.wrap || DYNAMIC_FORM_TEXTAREA_WRAP_SOFT;
    }
}