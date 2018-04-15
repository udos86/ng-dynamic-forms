import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormLayout, DynamicFormLayoutService } from "./dynamic-form-layout.service";
import { DynamicInputModel } from "../model/input/dynamic-input.model";

describe("DynamicFormLayoutService test suite", () => {

    let service: DynamicFormLayoutService,
        formLayout: DynamicFormLayout;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormLayoutService]
        });

        formLayout = {
            "test1": {
                element: {
                    label: "element-test-class",
                    control: "element-test-class"
                },
                grid: {
                    label: "grid-test-class",
                    control: "grid-test-class"
                }
            },
            "test2": {
                element: {
                    label: "element-test-class",
                    control: "element-test-class"
                }
            },
            "test3": {
                grid: {
                    label: "grid-test-class",
                    control: "grid-test-class"
                }
            }
        };
    });

    beforeEach(inject([DynamicFormLayoutService],
        (layoutService: DynamicFormLayoutService) => service = layoutService));

    it("should find a form control layout in form layout", () => {

        expect(service.findById("test", formLayout)).toBeNull();
        expect(service.findById("test1", formLayout)).toBe(formLayout["test1"]);
        expect(service.findById("test3", formLayout)).toBe(formLayout["test3"]);
        expect(service.findById("test1", null)).toBeNull();
    });

    it("should extract a CSS class string from a form control layout", () => {

        expect(service.getClass(null, "element", "control")).toEqual("");
        expect(service.getClass(formLayout["test1"], "element", "control")).toEqual("element-test-class");
        expect(service.getClass(formLayout["test1"], "element", "container")).toEqual("");
        expect(service.getClass(formLayout["test2"], "grid", "control")).toEqual("");
        expect(service.getClass(formLayout["test3"], "grid", "control")).toEqual("grid-test-class");
    });

    it("should return a custom form control component type", () => {

        let model = new DynamicInputModel({id: "input"});

        expect(service.getCustomComponentType(model)).toBe(null);
    });
});