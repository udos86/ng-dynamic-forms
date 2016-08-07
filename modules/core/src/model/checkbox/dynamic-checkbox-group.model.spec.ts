import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP, DynamicCheckboxGroupModel} from "./dynamic-checkbox-group.model";

describe("DynamicCheckboxGroupModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", group: []};
        let defaultModel: DynamicCheckboxGroupModel;

        beforeEach(() => {
            defaultModel = new DynamicCheckboxGroupModel(config);
        });
        
        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.id).toBeDefined();
            expect(defaultModel.id).toEqual(config.id);

            expect(defaultModel.group).toBeDefined();
            expect(defaultModel.group).toEqual(config.group);
            expect(defaultModel.group.length).toBe(0);

            expect(defaultModel.legend).toBeDefined();
            expect(defaultModel.legend).toBeNull();

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });
        
    });

});