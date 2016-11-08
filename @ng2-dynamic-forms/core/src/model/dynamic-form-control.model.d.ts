/// <reference types="core-js" />
import { DynamicFormControlRelationGroup } from "./dynamic-form-control-relation.model";
import { Subject } from "rxjs/Subject";
export interface Cls {
    container?: string;
    control?: string;
    errors?: string;
    label?: string;
}
export interface ClsConfig {
    element?: Cls;
    grid?: Cls;
}
export interface DynamicFormControlModelConfig {
    disabled?: boolean;
    id?: string;
    label?: string;
    relation?: Array<DynamicFormControlRelationGroup>;
}
export declare abstract class DynamicFormControlModel {
    cls: any;
    _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    id: string;
    label: string | null;
    name: string;
    relation: Array<DynamicFormControlRelationGroup>;
    readonly abstract type: string;
    constructor(config: DynamicFormControlModelConfig, cls?: ClsConfig);
    disabled: boolean;
    toJSON(): Object;
}
