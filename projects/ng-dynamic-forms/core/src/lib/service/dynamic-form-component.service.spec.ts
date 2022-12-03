import { inject, TestBed } from "@angular/core/testing";
import { ChangeDetectorRef, ComponentRef, ElementRef, Injector, Type, ViewRef } from "@angular/core";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { DynamicFormComponentService } from "./dynamic-form-component.service";

export class TestComponentRef extends ComponentRef<any> {
    readonly changeDetectorRef!: ChangeDetectorRef;
    readonly componentType!: Type<any>;
    readonly hostView!: ViewRef;
    readonly injector!: Injector;
    readonly instance!: any;
    readonly location!: ElementRef;

    destroy(): void {
    }

    onDestroy(): void {
    }

    setInput(name: string, value: unknown) {
    }

    constructor() {
        super();
    }
}

describe("DynamicFormInstanceService test suite", () => {
    let service: DynamicFormComponentService;
    let model: DynamicFormControlModel;
    let componentRef: TestComponentRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DynamicFormComponentService]
        });

        model = new DynamicInputModel({id: "test"});
        componentRef = new TestComponentRef();
    });

    beforeEach(inject([DynamicFormComponentService],
        (componentService: DynamicFormComponentService) => service = componentService));

    it("should return undefined when nothing is registered", () => {
        expect(service.getFormControlRef(model.id)).toBeUndefined();
    });

    it("should return a component reference when registered", () => {
        service.registerFormControl(model, componentRef);

        expect(service.getFormControlRef(model.id)).toBe(componentRef);
    });

    it("should return undefined when index is invalid", () => {
        service.registerFormControl(model, componentRef);

        expect(service.getFormControlRef(model.id, 0)).toBeUndefined();
    });

    it("should return a component reference when index is valid", () => {
        service.registerFormControl(model, componentRef, 0);

        expect(service.getFormControlRef(model.id, 0)).toBe(componentRef);
    });

    it("should still have this reference at the given index, when deleting the first one", () => {
        service.registerFormControl(model, componentRef, 0);
        service.registerFormControl(model, componentRef, 1);
        service.unregisterFormControl(model.id, 0);

        expect(service.getFormControlRef(model.id, 0)).toBeDefined();
    });

    it("should no more have this reference at the given index, when deleting the first one two times", () => {
        service.registerFormControl(model, componentRef, 0);
        service.registerFormControl(model, componentRef, 1);
        service.unregisterFormControl(model.id, 0);
        service.unregisterFormControl(model.id, 0);

        expect(service.getFormControlRef(model.id, 0)).toBeUndefined();
    });

    it("should warn when a model is registered with index for a non-array form control", () => {
        spyOn(console, "warn");

        service.registerFormControl(model, componentRef);
        service.registerFormControl(model, componentRef, 1);

        expect(console.warn).toHaveBeenCalledWith(`registerFormControlRef is called with index for a non-array form control: ${model.id}`);
    });

    it("should unregister a component ref", () => {
        service.registerFormControl(model, componentRef);
        service.unregisterFormControl(model.id);

        expect(service.getFormControlRef(model.id)).toBeUndefined();
    });

    it("should return a custom form control component type", () => {
        const inputModel = new DynamicInputModel({id: "input"});

        expect(service.getCustomComponentType(inputModel)).toBe(null);
    });
});
