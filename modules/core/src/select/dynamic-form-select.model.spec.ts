import {DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicFormSelectModel} from "./dynamic-form-select.model";

describe("DynamicFormSelectModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormSelectModel<any>;

        beforeEach(() => {
            defaultObject = new DynamicFormSelectModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
        });
        
    });

});