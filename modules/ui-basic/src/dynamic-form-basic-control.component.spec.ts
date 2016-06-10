import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {DynamicFormBasicControlComponent, DYNAMIC_FORM_UI_BASIC} from "./dynamic-form-basic-control.component";

describe("DynamicFormBasicControlComponent test suite", () => {

    beforeEachProviders(() => [DynamicFormBasicControlComponent]);

    it("tests if component initializes correctly", inject([DynamicFormBasicControlComponent], (component) => {

        expect(component).toBeDefined();
        expect(component.type).toEqual(DYNAMIC_FORM_UI_BASIC);
    }));

});