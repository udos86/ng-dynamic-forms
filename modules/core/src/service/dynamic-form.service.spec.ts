import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {FormBuilder} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form.service";

describe("DynamicFormService test suite", () => {

    beforeEachProviders(() => [FormBuilder, DynamicFormService]);

    it("tests if service works correctly", inject([FormBuilder, DynamicFormService],
        (dynamicFormService) => {

            expect(dynamicFormService).toBeDefined();
        }));

});