import { DynamicFormControlModel, DynamicFormControlModelConfig } from "../dynamic-form-control.model";
import { DynamicFormModel } from "../dynamic-form.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { DynamicPathable } from "../misc/dynamic-form-control-path.model";
import { DynamicValidatorsConfig } from "../misc/dynamic-form-control-validation.model";
import { serializable, serialize } from "../../decorator/serializable.decorator";
import { isFunction, isNumber } from "../../utils/core.utils";

export class DynamicFormArrayGroupModel implements DynamicPathable {

    $implicit: DynamicFormArrayGroupModel;
    context: DynamicFormArrayModel;
    @serializable() group: DynamicFormModel;
    @serializable() index: number;

    constructor(context: DynamicFormArrayModel, group: DynamicFormModel = [], index: number = -1) {

        this.$implicit = this;
        this.context = context;
        this.group = group;
        this.index = index;
    }

    get parent(): DynamicFormArrayModel {
        return this.context;
    }

    get(index: number): DynamicFormControlModel {
        return this.group[index];
    }

    toJSON() {
        return serialize(this);
    }
}

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export interface DynamicFormArrayModelConfig extends DynamicFormControlModelConfig {

    groupAsyncValidators?: DynamicValidatorsConfig;
    groupFactory?: () => DynamicFormModel;
    groupValidators?: DynamicValidatorsConfig;
    groups?: DynamicFormArrayGroupModel[] | null;
    initialCount?: number;
}

export class DynamicFormArrayModel extends DynamicFormControlModel {

    @serializable() groupAsyncValidators: DynamicValidatorsConfig | null;
    groupFactory: () => DynamicFormModel;
    @serializable() groupValidators: DynamicValidatorsConfig | null;
    @serializable() groups: DynamicFormArrayGroupModel[] = [];
    @serializable() initialCount: number;

    @serializable() readonly groupPrototype: DynamicFormModel; // only to recreate model from JSON
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;

    constructor(config: DynamicFormArrayModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        if (isFunction(config.groupFactory)) {
            this.groupFactory = config.groupFactory;
        } else {
            throw new Error("group factory function must be specified for DynamicFormArrayModel");
        }

        this.groupAsyncValidators = config.groupAsyncValidators || null;
        this.groupPrototype = this.groupFactory();
        this.groupValidators = config.groupValidators || null;
        this.initialCount = isNumber(config.initialCount) ? config.initialCount : 1;

        if (Array.isArray(config.groups)) {

            config.groups.forEach((arrayGroup, index) => {
                this.groups.push(new DynamicFormArrayGroupModel(this, arrayGroup.group, arrayGroup.index || index));
            });

        } else {

            for (let index = 0; index < this.initialCount; index++) {
                this.addGroup();
            }
        }
    }

    private updateGroupIndex(): void {
        this.groups.forEach((group, index) => group.index = index);
    }

    get size(): number {
        return this.groups.length;
    }

    get(index: number): DynamicFormArrayGroupModel {
        return this.groups[index];
    }

    addGroup(): DynamicFormArrayGroupModel {
        return this.insertGroup(this.groups.length);
    }

    insertGroup(index: number): DynamicFormArrayGroupModel {

        let group = new DynamicFormArrayGroupModel(this, this.groupFactory());

        this.groups.splice(index, 0, group);
        this.updateGroupIndex();

        return group;
    }

    moveGroup(index: number, step: number): void {

        this.groups.splice(index + step, 0, ...this.groups.splice(index, 1));
        this.updateGroupIndex();
    }

    removeGroup(index: number): void {

        this.groups.splice(index, 1);
        this.updateGroupIndex();
    }
}
