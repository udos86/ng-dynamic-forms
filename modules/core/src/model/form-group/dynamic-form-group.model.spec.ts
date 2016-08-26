import {DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel} from "./dynamic-form-group.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", group: []};
        let defaultModel: DynamicFormGroupModel;

        beforeEach(() => {
            defaultModel = new DynamicFormGroupModel(config);
        });
        
        it("tests if default object is correctly initialized", () => {

            expect(defaultModel.id).toBeDefined();
            expect(defaultModel.id).toEqual(config.id);

            expect(defaultModel.group).toBeDefined();
            expect(defaultModel.group).toEqual(config.group);
            expect(defaultModel.group.length).toBe(0);

            expect(defaultModel.legend).toBeDefined();
            expect(defaultModel.legend).toBeNull();

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);

            expect(defaultModel.asyncValidator).toBeDefined();
            expect(defaultModel.asyncValidator).toBeNull();

            expect(defaultModel.validator).toBeDefined();
            expect(defaultModel.validator).toBeNull();
        });
        
    });

});