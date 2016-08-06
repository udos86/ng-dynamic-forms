import {DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel} from "./dynamic-form-group.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormGroupModel;

        beforeEach(() => {
            defaultObject = new DynamicFormGroupModel({id: "default", group: []});
        });
        
        it("tests if correct default type property is set", () => {

            expect(defaultObject.id).toEqual("default");
            expect(defaultObject.group).toBeDefined();
            expect(defaultObject.group.length).toBe(0);
            expect(defaultObject.legend).toBeDefined();
            expect(defaultObject.legend).toBeNull();
            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        });
        
    });

});