import {DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel} from "./dynamic-select.model";

describe("DynamicSelectModel test suite", () => {

    describe("default model test suite", () => {

        let defaultModel: DynamicSelectModel<string>,
            config = {
                id: "default",
                options: [
                    {
                        value: "1",
                        label: "One"
                    },
                    {
                        value: "2",
                        label: "Two"
                    }
                ]
            };


        beforeEach(() => {
            defaultModel = new DynamicSelectModel(config);
        });

        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.options.length).toBe(config.options.length);
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
            expect(defaultModel.value).toBeNull();
        });

        it("should get and set text property correctly", () => {

            expect(defaultModel.options[0].text).toEqual("One");

            defaultModel.options[0].text = "Eins";

            expect(defaultModel.options[0].text).toEqual("Eins");
        });

        it("should get the correct option", () => {

            expect(defaultModel.get(0)).toEqual(defaultModel.options[0]);
            expect(defaultModel.get(1)).toEqual(defaultModel.options[1]);
        });

        it("should select correct option", () => {

            defaultModel.select(1);
            expect(defaultModel.value).toEqual(defaultModel.options[1].value);
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.options.length).toBe(defaultModel.options.length);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
        });

    });

});