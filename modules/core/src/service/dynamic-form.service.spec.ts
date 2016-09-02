import {TestBed, inject} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormService} from "./dynamic-form.service";

describe("DynamicFormService test suite", () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormService]
        });
    });

    it("tests if service works correctly", inject([DynamicFormService], service => {

        expect(service).toBeDefined();
    }));

});