import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {DynamicFormBasicComponent, DYNAMIC_FORM_UI_BASIC} from "./dynamic-form-basic.component";

describe("DynamicFormBasicComponent test suite", () => {

    beforeEachProviders(() => [DynamicFormBasicComponent]);

    it("tests if component initializes correctly", inject([DynamicFormBasicComponent],
        (component) => {

            expect(component).toBeDefined();
            expect(component.type).toEqual(DYNAMIC_FORM_UI_BASIC);
        }));

});