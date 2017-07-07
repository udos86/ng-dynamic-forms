import {
    DynamicFormControlModel,
    DynamicFormControlModelConfig,
    DynamicValidatorsMap,
    ClsConfig
} from "../dynamic-form-control.model";
import { serializable, serialize } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export class DynamicFormArrayGroupModel {

    context: DynamicFormArrayModel;
    @serializable() group: DynamicFormControlModel[];
    @serializable() index: number | null;

    private _parent: DynamicFormArrayGroupModel | null = null;

    constructor(context: DynamicFormArrayModel, group: DynamicFormControlModel[] = [], index: number | null = null) {

        this.context = context;
        this.group = group;
        this.index = index;
    }

    get parent(): DynamicFormArrayGroupModel {
        return this._parent;
    }

    set parent(parent: DynamicFormArrayGroupModel) {
        this._parent = parent;
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

    asyncValidator?: DynamicValidatorsMap;
    groupAsyncValidator?: DynamicValidatorsMap;
    groupFactory?: () => DynamicFormControlModel[];
    groupValidator?: DynamicValidatorsMap;
    groups?: DynamicFormArrayGroupModel[];
    initialCount?: number;
    validator?: DynamicValidatorsMap;
}

export class DynamicFormArrayModel extends DynamicFormControlModel {

    @serializable() asyncValidator: DynamicValidatorsMap | null;
    @serializable() groupAsyncValidator?: DynamicValidatorsMap | null;
    groupFactory: () => DynamicFormControlModel[];
    @serializable() groupValidator?: DynamicValidatorsMap | null;
    @serializable() groups: DynamicFormArrayGroupModel[] = [];
    @serializable() initialCount: number;
    @serializable() validator: DynamicValidatorsMap | null;

    @serializable() readonly groupPrototype: DynamicFormControlModel[]; // only to recreate model from JSON
    readonly origin: DynamicFormControlModel[]; // deprecated - only for backwards compatibility;
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;

    constructor(config: DynamicFormArrayModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!Utils.isFunction(config.groupFactory)) {
            throw new Error("group factory function must be specified for DynamicFormArrayModel");
        }

        this.asyncValidator = config.asyncValidator || null;
        this.groupAsyncValidator = config.groupAsyncValidator || null;
        this.groupFactory = config.groupFactory;
        this.groupPrototype = this.groupFactory();
        this.groupValidator = config.groupValidator || null;
        this.initialCount = Utils.isNumber(config.initialCount) ? config.initialCount : 1;
        this.validator = config.validator || null;

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