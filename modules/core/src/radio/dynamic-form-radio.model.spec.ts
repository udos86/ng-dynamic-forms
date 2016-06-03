import {DYNAMIC_FORM_CONTROL_TYPE_RADIO, DynamicFormRadioModel} from "./dynamic-form-radio.model";

describe("DynamicFormRadioModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormRadioModel<any>;

        beforeEach(() => {
            defaultObject = new DynamicFormRadioModel({});
        });

        it("tests if correct default type property is set", () => {

            expect(defaultObject.type).toBeDefined();
            expect(defaultObject.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO);
        });
        
    });

});