import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {
    DynamicFormMaterialControlComponent,
    DYNAMIC_FORM_UI_MATERIAL
} from "./dynamic-form-material-control.component";
import {MdRadioDispatcher} from "@angular2-material/radio";

describe("DynamicFormMaterialControlComponent test suite", () => {

    beforeEachProviders(() => [DynamicFormMaterialControlComponent, MdRadioDispatcher]);

    it("tests if component initializes correctly", inject([DynamicFormMaterialControlComponent, MdRadioDispatcher],
        (component) => {

            expect(component).toBeDefined();
            expect(component.type).toEqual(DYNAMIC_FORM_UI_MATERIAL);
        }));

});