import {
    DynamicFormValueControlModel,
    DynamicFormValueControlModelConfig,
    serializable,
    ClsConfig,
    getValue,
    DynamicFormControlEvent
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX";

export interface DynamicToggleCheckboxModelConfig extends DynamicFormValueControlModelConfig<string> {
    indeterminate?: string;
    labelPosition?: string;
    trueValue? : string;
    falseValue? : string;
}

export class DynamicToggleValueCheckboxModel extends DynamicFormValueControlModel<string> {

    @serializable() indeterminate: string;
    @serializable() labelPosition: string | null;
    @serializable() trueValue : string;
    @serializable() falseValue : string;
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_CHECKBOX;

    constructor(config: DynamicToggleCheckboxModelConfig, cls?: ClsConfig) {
        super(config, cls);

        this.labelPosition = getValue(config, "labelPosition", null);
        this.trueValue = getValue(config, "trueValue", "true");
        this.falseValue = getValue(config, "falseValue", "false");
        this.indeterminate = getValue(config, "indeterminate", this.falseValue);
        this.value = this.falseValue;
        this.valueUpdates.subscribe((value_)=>{
            this.resolveValue(value_);
        });
    }

    resolveValue(value_:string) : void {
        value_ ? this.value = this.trueValue : this.value = this.falseValue;
    }

    get checked(): boolean {
        if(this.value === this.trueValue){
            return true;
        }
        if(this.value === this.falseValue){
            return false;
        }
        return false;
    }

    set checked(checked: boolean) {
        this.valueUpdates.next(checked ? this.trueValue : this.falseValue);
    }

    toggle(): void {
        this.checked = !this.checked;
    }
}
