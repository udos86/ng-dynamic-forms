import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP, DynamicRadioGroupModel} from "./dynamic-radio-group.model";

describe("DynamicRadioModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicRadioGroupModel<any>;

        beforeEach(() => {
            defaultObject = new DynamicRadioGroupModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
        });

        it("tests if correct default type legend is set", () => {

            expect(defaultObject.legend).toBeDefined();
            expect(defaultObject.legend).toBeNull();
        });
        
    });

});