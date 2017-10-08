import { DYNAMIC_CHECK_CONTROL_LABEL_POSITION_AFTER } from "../dynamic-check-control.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SWITCH, DynamicSwitchModel } from "./dynamic-switch.model";

describe("DynamicSwitchModel test suite", () => {

    let model: DynamicSwitchModel,
        config = {
            id: "switch"
        };

    beforeEach(() => model = new DynamicSwitchModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.labelPosition).toEqual(DYNAMIC_CHECK_CONTROL_LABEL_POSITION_AFTER);
        expect(model.offLabel).toBeNull();
        expect(model.onLabel).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SWITCH);
        expect(model.value).toBe(false);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SWITCH);
    });
});