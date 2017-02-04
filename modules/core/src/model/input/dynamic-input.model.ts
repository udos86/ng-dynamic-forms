import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";

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

export interface DynamicInputModelConfig extends DynamicInputControlModelConfig<string | number | string[]> {

    accept?: string;
    inputType?: string;
    list?: string[];
    mask?: string | null;
    max?: number | string;
    min?: number | string;
    multiple?: boolean;
    pattern?: string;
    step?: number;
    dateFormat?: string;
    defaultDate?: Date;
    maxDate?: Date;
    minDate?: Date;
    dateOnly?: boolean;
    timeOnly?: boolean;
}

export class DynamicInputModel extends DynamicInputControlModel<string | number | string[]> {

    @serializable() accept: string | null;
    @serializable() inputType: string;
    files: FileList | null = null;
    @serializable() list: string[] | null;
    @serializable() mask: string | null;
    @serializable() max: number | string | null;
    @serializable() min: number | string | null;
    @serializable() multiple: boolean | null;
    @serializable() pattern: string | null;
    @serializable() step: number | null;
    @serializable() dateFormat: number | null;
    @serializable() defaultDate: Date | null;
    @serializable() maxDate: Date | null;
    @serializable() minDate: Date | null;
    @serializable() dateOnly: boolean | null;
    @serializable() timeOnly: boolean | null;

    private listId: string | null = null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_INPUT;

    constructor(config: DynamicInputModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.accept = getValue(config, "accept", null);
        this.inputType = getValue(config, "inputType", DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        this.list = getValue(config, "list", null);
        this.mask = getValue(config, "mask", null);
        this.max = getValue(config, "max", null);
        this.min = getValue(config, "min", null);
        this.multiple = getValue(config, "multiple", null);
        this.pattern = getValue(config, "pattern", null);
        this.step = getValue(config, "step", null);
        this.dateFormat = getValue(config, "dateFormat", null);
        this.defaultDate = getValue(config, "defaultDate", null);
        this.maxDate = getValue(config, "defaultDate", null);
        this.minDate = getValue(config, "defaultDate", null);
        this.dateOnly = getValue(config, "dateOnly", null);
        this.timeOnly = getValue(config, "timeOnly", null);

        if (this.list) {
            this.listId = `${this.id}List`;
        }
    }
}