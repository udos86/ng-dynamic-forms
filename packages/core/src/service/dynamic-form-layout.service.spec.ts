import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormLayoutService } from "./dynamic-form-layout.service";

describe("DynamicFormLayoutService test suite", () => {

    let service: DynamicFormLayoutService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormLayoutService]
        });
    });

    beforeEach(inject([DynamicFormLayoutService],
        (layoutService: DynamicFormLayoutService) => service = layoutService));


    it("should", () => {

    });
});