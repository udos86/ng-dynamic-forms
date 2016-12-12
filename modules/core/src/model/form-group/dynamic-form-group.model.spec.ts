import {DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel} from "./dynamic-form-group.model";
import {DynamicInputModel} from "../input/dynamic-input.model";

describe("DynamicFormGroupModel test suite", () => {

    let model: DynamicFormGroupModel,
        config = {
            id: "formGroup",
            group: [
                new DynamicInputModel({
                    id: "defaultInput"
                })
            ],
            validator: {required: null}
        };

    beforeEach(() => model = new DynamicFormGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.id).toEqual(config.id);
        expect(model.group.length).toBe(1);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        expect(model.asyncValidator).toBeNull();
        expect(model.validator).toBeDefined();
    });

    it("should throw when no group array is specified", () => {

        expect(() => new DynamicFormGroupModel({id: "test"}))
            .toThrow(new Error("group array must be specified for DynamicFormGroupModel"));
    });

    it("should get the correct DynamicFormControlModel of group", () => {

        expect(model.get(0)).toEqual(model.group[0]);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        expect(Object.keys(json.validator)[0]).toEqual("required");
    });
});