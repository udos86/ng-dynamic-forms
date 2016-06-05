import {DYNAMIC_FORM_CONTROL_TYPE_RADIO, DynamicRadioModel} from "./dynamic-radio.model";

describe("DynamicRadioModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicRadioModel<any>;

        beforeEach(() => {
            defaultObject = new DynamicRadioModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO);
        });
        
    });

});