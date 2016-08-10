import {inject, addProviders} from "@angular/core/testing";
import {DynamicFormPrimeNGComponent, DYNAMIC_FORM_UI_PRIME_NG} from "./dynamic-form-primeng.component";

describe("DynamicFormPrimeNGComponent test suite", () => {

    beforeEach(() => {
        addProviders([DynamicFormPrimeNGComponent]);
    });

    it("tests if component initializes correctly", inject([DynamicFormPrimeNGComponent],
        (component) => {

            expect(component).toBeDefined();
            expect(component.type).toEqual(DYNAMIC_FORM_UI_PRIME_NG);
        }));
});