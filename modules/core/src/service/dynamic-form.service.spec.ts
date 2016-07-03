import {describe, expect, inject, it, beforeEach, addProviders} from "@angular/core/testing";
import {FormBuilder} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form.service";

describe("DynamicFormService test suite", () => {

    beforeEach(() => {
        addProviders([FormBuilder, DynamicFormService]);
    });

    it("tests if service works correctly", inject([FormBuilder, DynamicFormService],
        (dynamicFormService) => {

            expect(dynamicFormService).toBeDefined();
        }));

});