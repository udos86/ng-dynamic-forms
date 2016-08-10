import {inject, addProviders} from "@angular/core/testing";
import {FormBuilder} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form.service";

describe("DynamicFormService test suite", () => {

    beforeEach(() => {
        addProviders([FormBuilder, DynamicFormService]);
    });

    it("tests if service works correctly", inject([DynamicFormService], service => {

        expect(service).toBeDefined();
    }));

});