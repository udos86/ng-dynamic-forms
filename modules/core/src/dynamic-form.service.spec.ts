import {describe, expect, inject, it, beforeEachProviders} from "@angular/core/testing";
import {DynamicFormService} from "./dynamic-form.service";

describe("DynamicFormService test suite", () => {

    beforeEachProviders(() => [DynamicFormService]);

    it("tests if service works correctly", inject([DynamicFormService], (dynamicFormService) => {

        expect(dynamicFormService).toBeDefined();
    }));

});