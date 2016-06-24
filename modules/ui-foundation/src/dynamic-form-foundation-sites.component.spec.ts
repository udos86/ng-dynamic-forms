import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {
    DynamicFormFoundationSitesComponent,
    DYNAMIC_FORM_UI_FOUNDATION_SITES
} from "./dynamic-form-foundation-sites.component";

describe("DynamicFormFoundationSitesComponent test suite", () => {

    beforeEachProviders(() => [DynamicFormFoundationSitesComponent]);

    it("tests if component initializes correctly", inject([DynamicFormFoundationSitesComponent],
        (component) => {

            expect(component).toBeDefined();
            expect(component.type).toEqual(DYNAMIC_FORM_UI_FOUNDATION_SITES);
        }));

});