import {
    DynamicFormControlModel,
    DynamicFormControlModelConfig,
    DynamicValidatorsMap,
    ClsConfig
} from "../dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../dynamic-form-value-control.model";
import { serializable, serialize } from "../../decorator/serializable.decorator";
import { getValue, isFunction } from "../../utils";

export class DynamicFormArrayGroupModel {

    context: DynamicFormArrayModel;
    @serializable() group: Array<DynamicFormValueControlModel<DynamicFormControlValue>>;
    @serializable() index: number | null;

    constructor(context: DynamicFormArrayModel,
                group: Array<DynamicFormValueControlModel<DynamicFormControlValue>> = [],
                index: number | null = null) {

        this.context = context;
        this.group = group;
        this.index = index;
    }

    get(index: number): DynamicFormValueControlModel<DynamicFormControlValue> {
        return this.group[index];
    }

    toJSON() {
        return serialize(this);
    }
}

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export interface DynamicFormArrayModelConfig extends DynamicFormControlModelConfig {

    asyncValidator?: DynamicValidatorsMap;
    createGroup?: () => Array<DynamicFormValueControlModel<DynamicFormControlValue>>;
    groups?: Array<DynamicFormArrayGroupModel>;
    initialCount?: number;
    validator?: DynamicValidatorsMap;
}

export class DynamicFormArrayModel extends DynamicFormControlModel {

    @serializable() private groups: Array<DynamicFormArrayGroupModel> = [];
    @serializable() private originGroup: Array<DynamicFormValueControlModel<DynamicFormControlValue>>; // only to reinstantiate from JSON

    @serializable() asyncValidator: DynamicValidatorsMap | null;
    createGroup: () => Array<DynamicFormValueControlModel<DynamicFormControlValue>>;
    @serializable() initialCount: number;
    @serializable() validator: DynamicValidatorsMap | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;

    constructor(config: DynamicFormArrayModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }

        this.asyncValidator = getValue(config, "asyncValidator", null);
        this.createGroup = config["createGroup"];
        this.initialCount = getValue(config, "initialCount", 1);
        this.originGroup = this.createGroup();
        this.validator = getValue(config, "validator", null);

        if (Array.isArray(config.groups)) {

            config.groups.forEach((arrayGroup, index) => {
                this.groups.push(new DynamicFormArrayGroupModel(this, arrayGroup.group, arrayGroup.index || index));
            });

        } else {

            for (let i = 0; i < this.initialCount; i += 1) {
                this.addGroup();
            }
        }
    }

    get size(): number {
        return this.groups.length;
    }

    private updateGroupIndex(): void {
        this.groups.forEach((group, index) => group.index = index);
    }

    get(index: number): DynamicFormArrayGroupModel {
        return this.groups[index];
    }

    addGroup(): DynamicFormArrayGroupModel {
        return this.insertGroup(this.groups.length);
    }

    insertGroup(index: number): DynamicFormArrayGroupModel {

        let group = new DynamicFormArrayGroupModel(this, this.createGroup());

        this.groups.splice(index, 0, group);
        this.updateGroupIndex();

        return group;
    }

    removeGroup(index: number): void {

        this.groups.splice(index, 1);
        this.updateGroupIndex();
    }

    moveGroup(index: number, step: number): void {

        let newIndex = index + step,
            group = this.groups[index];

        this.groups[index] = this.groups[newIndex];
        this.groups[newIndex] = group;
        this.updateGroupIndex();
    }
}