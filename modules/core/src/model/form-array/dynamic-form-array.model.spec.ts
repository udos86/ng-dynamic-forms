import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayModel,
    DynamicFormArrayGroupModel
} from "./dynamic-form-array.model";
import {DynamicInputModel} from "../input/dynamic-input.model";

describe("DynamicFormArrayModel test suite", () => {

    let model: DynamicFormArrayModel,
        config = {
            id: "formArray",
            initialCount: 3,
            createGroup: () => [new DynamicInputModel({id: "defaultInput"})],
            validator: {required: null}
        };

    beforeEach(() => model = new DynamicFormArrayModel(config));

    it("should initialize correctly", () => {

        expect(model.initialCount).toBe(config.initialCount);
        expect(model.size).toBe(model.initialCount);
        expect(model.id).toEqual(config.id);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
        expect(model.asyncValidator).toBeNull();
        expect(model.validator).toBeDefined();
        expect(model.createGroup().length).toEqual(1);
        expect(model.removeGroup).toBeDefined();
    });

    it("should throw when no createGroup function is specified", () => {

        expect(() => new DynamicFormArrayModel({id: "test"}))
            .toThrow(new Error("createGroup function must be specified for DynamicFormArrayModel"));
    });

    it("should get the correct group model", () => {

        expect(model.get(0) instanceof DynamicFormArrayGroupModel).toBe(true);
        expect(model.get(1) instanceof DynamicFormArrayGroupModel).toBe(true);
    });

    it("should add another form array group", () => {

        model.addGroup();

        expect(model.size).toBe(config.initialCount + 1);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.asyncValidators).toBeUndefined();
        expect(json.id).toEqual(model.id);
        expect(json.groups.length).toEqual(model.size);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
        expect(Object.keys(json.validator)[0]).toEqual("required");
        expect(json.validators).toBeUndefined();
    });
});