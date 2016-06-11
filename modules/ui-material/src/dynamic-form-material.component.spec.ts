import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {
    DynamicFormMaterialComponent,
    DYNAMIC_FORM_UI_MATERIAL
} from "./dynamic-form-material.component";
import {MdRadioDispatcher} from "@angular2-material/radio";

describe("DynamicFormMaterialComponent test suite", () => {

    beforeEachProviders(() => [DynamicFormMaterialComponent, MdRadioDispatcher]);

    it("tests if component initializes correctly", inject([DynamicFormMaterialComponent, MdRadioDispatcher],
        (component) => {

            expect(component).toBeDefined();
            expect(component.type).toEqual(DYNAMIC_FORM_UI_MATERIAL);
        }));

});