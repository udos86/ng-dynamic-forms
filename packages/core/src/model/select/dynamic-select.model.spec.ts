import { async } from "@angular/core/testing";
import { Observable } from "rxjs";
import { DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel } from "./dynamic-select.model";
import { ɵlooseIdentical as looseIdentical } from "@angular/core";

describe("DynamicSelectModel test suite", () => {

    let model: DynamicSelectModel<string>,
        config = {
            id: "select",
            multiple: false,
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

    beforeEach(() => model = new DynamicSelectModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.filterable).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.multiple).toBe(config.multiple);
        expect(model.options.length).toBe(config.options.length);
        expect(model.options$ instanceof Observable).toBe(true);
        expect(model.placeholder).toEqual("");
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
        expect(model.value).toBeNull();
        expect(model.compareWithFn).toBe(looseIdentical);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should get and set text property correctly", () => {

        expect(model.get(0).text).toEqual("One");

        model.get(0).text = "Eins";

        expect(model.get(0).text).toEqual("Eins");
    });

    it("should correctly create options Observable", async(() => {

        model.options$.subscribe(options => {
            expect(options.length).toBe(config.options.length);
        });
    }));

    it("should add another option", () => {

        let option = {label: "test option", value: "test-option"};

        model.add(option);

        expect(model.options.length).toBe(config.options.length + 1);
        expect(model.get(model.options.length - 1).value).toEqual(option.value);
    });

    it("should insert another option", () => {

        let option = {label: "test option", value: "test-option"},
            index = 1;

        model.insert(index, option);

        expect(model.options.length).toBe(config.options.length + 1);
        expect(model.get(index).value).toEqual(option.value);
    });

    it("should remove a given option", () => {

        model.remove(1);

        expect(model.options.length).toBe(config.options.length - 1);
    });

    it("should get the correct option", () => {

        expect(model.get(0)).toEqual(model.options[0]);
        expect(model.get(1)).toEqual(model.options[1]);
    });

    it("should select correct option", () => {

        model.select(1);

        expect(model.value).toEqual(model.get(1).value);
    });

    it("should select multiple options", () => {

        model.multiple = true;
        model.select(0, 1);

        expect(model.value).toEqual([model.get(0).value, model.get(1).value]);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.options.length).toBe(model.options.length);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
    });
});