import {DYNAMIC_FORM_CONTROL_TYPE_ARRAY, DynamicFormArrayModel} from "./dynamic-form-array.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", createGroup: () => []};
        let defaultModel: DynamicFormArrayModel;

        beforeEach(() => {
            defaultModel = new DynamicFormArrayModel(config);
        });
        
        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.initialCount).toBeDefined();
            expect(defaultModel.initialCount).toBe(1);

            expect(defaultModel.groups).toBeDefined();
            expect(defaultModel.groups.length).toBe(defaultModel.initialCount);

            expect(defaultModel.id).toBeDefined();
            expect(defaultModel.id).toEqual(config.id);

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);

            expect(defaultModel.createGroup).toBeDefined();
            expect(defaultModel.createGroup()).toEqual([]);

            expect(defaultModel.addGroup).toBeDefined();
            expect(defaultModel.removeGroup).toBeDefined();
        });
        
    });

});