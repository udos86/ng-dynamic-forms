import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {
    DynamicFormBootstrapControlComponent, 
    DYNAMIC_FORM_UI_BOOTSTRAP
} from "./dynamic-form-bootstrap-control.component";

describe("DynamicFormBootstrapControlComponent test suite", () => {

    beforeEachProviders(() => [DynamicFormBootstrapControlComponent]);

    it("tests if component initializes correctly", inject([DynamicFormBootstrapControlComponent], (component) => {

        expect(component).toBeDefined();
        expect(component.type).toEqual(DYNAMIC_FORM_UI_BOOTSTRAP);
    }));

});