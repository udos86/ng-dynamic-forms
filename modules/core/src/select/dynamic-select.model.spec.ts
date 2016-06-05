import {DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel} from "./dynamic-select.model";

describe("DynamicSelectModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicSelectModel<any>;

        beforeEach(() => {
            defaultObject = new DynamicSelectModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
        });
        
    });

});