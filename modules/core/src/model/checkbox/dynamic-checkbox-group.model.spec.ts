import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP, DynamicCheckboxGroupModel} from "./dynamic-checkbox-group.model";

describe("DynamicCheckboxGroupModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicCheckboxGroupModel;

        beforeEach(() => {
            defaultObject = new DynamicCheckboxGroupModel({id: "default", group: []});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });
        
    });

});