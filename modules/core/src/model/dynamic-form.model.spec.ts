import {DynamicFormModel} from "./dynamic-form.model";

describe("DynamicTextAreaModel test suite", () => {

    describe("default object test suite", () => {

        let defaultObject: DynamicFormModel;

        beforeEach(() => {
            defaultObject = new DynamicFormModel(null);
        });

        it("tests if correct default model property is set", () => {

            expect(defaultObject.group).toBeDefined();
            expect(defaultObject.group).toEqual([]);
        });
        
    });

});