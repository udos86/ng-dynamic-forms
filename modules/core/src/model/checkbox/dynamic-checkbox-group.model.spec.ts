import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP, DynamicCheckboxGroupModel} from "./dynamic-checkbox-group.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";

describe("DynamicCheckboxGroupModel test suite", () => {

    describe("default model test suite", () => {

        let defaultModel: DynamicCheckboxGroupModel,
            config = {
                id: "default",
                group: [
                    new DynamicCheckboxModel(
                        {
                            id: "checkbox1",
                            label: "Checkbox 1",
                            value: true
                        }
                    ),
                    new DynamicCheckboxModel(
                        {
                            id: "checkbox2",
                            label: "Checkbox 2",
                            value: false
                        }
                    )
                ]
            };

        beforeEach(() => {
            defaultModel = new DynamicCheckboxGroupModel(config);
        });

        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.group.length).toBe(config.group.length);
            expect(defaultModel.legend).toBeNull();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });

        it("tests if checkAll function works correctly", () => {

            defaultModel.checkAll();

            expect(defaultModel.group[0].value).toEqual(true);
            expect(defaultModel.group[1].value).toEqual(true);
        });

        it("tests if uncheckAll function works correctly", () => {

            defaultModel.uncheckAll();

            expect(defaultModel.group[0].value).toEqual(false);
            expect(defaultModel.group[1].value).toEqual(false);
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });


        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        });

    });

});