import { async } from "@angular/core/testing";
import { isObservable, of } from "rxjs";
import { DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP, DynamicRadioGroupModel } from "./dynamic-radio-group.model";

describe("DynamicRadioModel test suite", () => {

    let model: DynamicRadioGroupModel<string>,
        config = {
            id: "radio",
            options: of([
                {
                    value: "1",
                    label: "One"
                },
                {
                    value: "2",
                    label: "Two"
                }
            ])
        };

    beforeEach(() => model = new DynamicRadioGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.errorMessages).toBeNull();
        expect(model.hasErrorMessages).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.legend).toBeNull();
        expect(isObservable(model.options$)).toBe(true);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
        expect(model.value).toBeNull();
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should select the correct option", async(() => {

        model.options$.subscribe(() => {

            model.select(1);

            expect(model.value).toEqual(model.get(1).value);
        });
    }));

    it("should correctly create options Observable", async(() => {

        model.options$.subscribe(options => {
            expect(options.length).toBe(2);
        });
    }));

    it("should insert another option", async(() => {

        let option = {label: "test option", value: "test-option"},
            index = 1;

        model.options$.subscribe(() => {

            model.insert(index, option);

            expect(model.options.length).toBe(3);
            expect(model.get(index).value).toEqual(option.value);
        });
    }));

    it("should remove a given option correctly", async(() => {

        model.options$.subscribe(() => {

            model.remove(1);

            expect(model.options.length).toBe(1);
        });
    }));

    it("should get the correct option", () => {

        expect(model.get(0)).toEqual(model.options[0]);
        expect(model.get(1)).toEqual(model.options[1]);
    });

    it("should make options Observable deliver an empty array when options are set to non-expected value", async(() => {

        model.options = null;

        model.options$.subscribe(options => {

            expect(options.length).toBe(0);
        });
    }));

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.options.length).toBe(model.options.length);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
    });
});