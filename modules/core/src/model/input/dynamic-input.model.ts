import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicInputControlModel, DynamicInputControlModelConfig} from "../dynamic-input-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";

export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = "file";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = "time";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = "week";

export interface InputModelConfig extends DynamicInputControlModelConfig {

    accept?: string;
    inputType?: string;
    list?: Array<string>;
    max?: number;
    min?: number;
    multiple?: boolean;
    step?: number;
}

export class DynamicInputModel extends DynamicInputControlModel<any> {

    accept: string;
    inputType: string;
    list: Array<string>;
    max: number;
    min: number;
    multiple: boolean;
    step: number;

    private listId: string = null;

    constructor(config: InputModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.accept = getValue(config, "accept", null);
        this.inputType = getValue(config, "inputType", DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        this.list = getValue(config, "list", null);
        this.max = getValue(config, "max", null);
        this.min = getValue(config, "min", null);
        this.multiple = getValue(config, "multiple", null);
        this.step = getValue(config, "step", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_INPUT;

        if (this.list) {
            this.listId = `${this.id}List`;
        }
    }
}