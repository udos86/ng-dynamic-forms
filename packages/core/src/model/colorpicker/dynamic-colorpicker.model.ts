import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean, isString } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER = "COLORPICKER";

export interface DynamicColorPickerModelConfig extends DynamicFormValueControlModelConfig<string | object> {

    format?: string;
    inline?: boolean;
}

export class DynamicColorPickerModel extends DynamicFormValueControlModel<string | object> {

    @serializable() format: string | null;
    @serializable() inline: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER;

    constructor(config: DynamicColorPickerModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.format = isString(config.format) ? config.format : null;
        this.inline = isBoolean(config.inline) ? config.inline : false;
    }
}