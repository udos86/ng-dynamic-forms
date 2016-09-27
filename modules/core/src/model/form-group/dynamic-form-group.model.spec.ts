import {DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel} from "./dynamic-form-group.model";
import {DynamicInputModel} from "../input/dynamic-input.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", group: [new DynamicInputModel({id: "defaultInput"})]};
        let defaultModel: DynamicFormGroupModel;

        beforeEach(() => {
            defaultModel = new DynamicFormGroupModel(config);
        });

        it("tests if default object is correctly initialized", () => {

            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.group.length).toBe(1);
            expect(defaultModel.legend).toBeNull();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
            expect(defaultModel.asyncValidator).toBeNull();
            expect(defaultModel.validator).toBeNull();
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        });

    });

});