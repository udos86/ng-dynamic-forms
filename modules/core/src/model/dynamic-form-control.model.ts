import {FormGroup} from "@angular/forms";
import {getValue, isEmptyString} from "../utils";

export interface Cls {

    container?: string;
    control?: string;
    label?: string;
}

export interface ClsConfig {

    element?: Cls;
    grid?: Cls;
}

export interface DynamicFormControlDependency {

    disableStatus?: string;
    disableValue?: boolean | number | string;
    enableStatus?: string;
    enableValue?: boolean | number | string;
    on: string;
}

export interface DynamicFormControlModelConfig {

    disabled?: boolean;
    depends?: Array<DynamicFormControlDependency>;
    id?: string;
    label?: string;
}

export abstract class DynamicFormControlModel {

    cls: any = {};
    disabled: boolean;
    depends: Array<DynamicFormControlDependency>;
    id: string;
    label: string | null;
    name: string;

    abstract readonly type: string;

    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig) {

        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = getValue(cls, "element", {container: "", control: "", label: ""});
        this.cls.grid = getValue(cls, "grid", {container: "", control: "", label: ""});

        this.depends = getValue(config, "depends", []);
        this.disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id;
    }

    static toBeDisabled(deps: Array<DynamicFormControlDependency>, formGroup: FormGroup): boolean {

        return deps.reduce((toBeDisabled: boolean, dep: DynamicFormControlDependency, index: number) => {

            let control = formGroup.get(dep.on);

            if (dep.disableValue || dep.disableStatus) {

                if (index > 0 && !toBeDisabled) {
                    return false;
                }
                return dep.disableValue === control.value || dep.disableStatus === control.status;
            }

            if (dep.enableValue || dep.enableStatus) {

                if (index > 0 && toBeDisabled) {
                    return true;
                }
                return !(dep.enableValue === control.value || dep.enableStatus === control.status);
            }

            return false;

        }, false);
    }
}