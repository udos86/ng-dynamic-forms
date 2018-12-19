import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { maskToString } from "../../utils/json.utils";
import { isBoolean, isNumber } from "../../utils/core.utils";
import { Observable, isObservable, of } from "rxjs";
import { tap } from "rxjs/operators";

export const DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";

export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE = "date";
//export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
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

export interface DynamicInputModelConfig extends DynamicInputControlModelConfig<string | number | Date | string[]> {

    accept?: string;
    inputType?: string;
    list?: any[] | Observable<any[]>;
    mask?: string | RegExp | Function | (string | RegExp)[];
    max?: number | string | Date;
    min?: number | string | Date;
    multiple?: boolean;
    pattern?: string;
    step?: number;
}

export class DynamicInputModel extends DynamicInputControlModel<string | number | Date | string[]> {

    @serializable() accept: string | null;
    @serializable() inputType: string;
    files: FileList | null = null;
    list$: Observable<any[]> | null = null;
    @serializable() mask: string | RegExp | Function | (string | RegExp)[] | null;
    @serializable() max: number | string | Date | null;
    @serializable() min: number | string | Date | null;
    @serializable() multiple: boolean | null;
    @serializable() pattern: string | null;
    @serializable() step: number | null;

    @serializable("list") private _list: any[] | null = null;
    private readonly _listId: string | null = null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_INPUT;

    constructor(config: DynamicInputModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.accept = config.accept || null;
        this.inputType = config.inputType || DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT;
        this.mask = config.mask || null;
        this.max = config.max !== undefined ? config.max : null;
        this.min = config.min !== undefined ? config.min : null;
        this.multiple = isBoolean(config.multiple) ? config.multiple : null;
        this.pattern = config.pattern || null;
        this.step = isNumber(config.step) ? config.step : null;

        if (config.list !== undefined) {

            this.list = config.list;
            this._listId = `${this.id}List`;
        }
    }

    get listId(): string | null {
        return this._listId;
    }

    get hasList(): boolean {
        return isObservable(this.list$);
    }

    set list(list: any[] | Observable<any[]> | null) {

        if (Array.isArray(list)) {

            this._list = list;
            this.list$ = of(this._list);

        } else if (isObservable(list)) {

            this.list$ = (list as Observable<any[]>).pipe(tap(list => this._list = list));

        } else {

            this._list = null;
            this.list$ = null;
        }
    }

    toJSON() {

        let json: any = super.toJSON();

        if (this.mask !== null) { 
            if (this.mask instanceof Function) {
                json.mask = this.mask;
            } else {
                json.mask = maskToString(this.mask);
            }
        }

        return json;
    }
}
