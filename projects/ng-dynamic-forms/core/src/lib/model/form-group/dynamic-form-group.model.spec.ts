import { DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel } from "./dynamic-form-group.model";
import { DynamicInputModel } from "../input/dynamic-input.model";

describe("DynamicFormGroupModel test suite", () => {

    let model: DynamicFormGroupModel,
        config: any = {
            id: "formGroup",
            group: [
                new DynamicInputModel({
                    id: "input"
                })
            ],
            validators: {
                required: null
            }
        };

    beforeEach(() => model = new DynamicFormGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.id).toEqual(config.id);
        expect(model.group.length).toBe(1);
        expect(model.size()).toBe(model.group.length);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should get the correct DynamicFormControlModel of group", () => {

        expect(model.get(0) === model.group[0]).toBe(true);
    });

    it("should correctly set a DynamicFormControlModel", () => {

        let newModel = new DynamicInputModel({id: "setInput"});

        model.set(0, newModel);

        expect(model.get(0) === newModel).toBe(true);
    });

    it("should correctly add a DynamicFormControlModel", () => {

        let newModel = new DynamicInputModel({id: "addInput"});

        model.add(newModel);

        expect(model.get(model.size() - 1) === newModel).toBe(true);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        expect(Object.keys(json.validators)[0]).toEqual("required");
    });
});
