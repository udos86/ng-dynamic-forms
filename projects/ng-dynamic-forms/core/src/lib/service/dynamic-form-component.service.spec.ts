import { inject, TestBed } from "@angular/core/testing";
import { ChangeDetectorRef, ComponentRef, ElementRef, Injector, Type, ViewRef } from "@angular/core";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { DynamicFormComponentService } from "./dynamic-form-component.service";

export class TestComponentRef extends ComponentRef<any> {

    readonly changeDetectorRef: ChangeDetectorRef;
    readonly componentType: Type<any>;
    readonly hostView: ViewRef;
    readonly injector: Injector;
    readonly instance: any;
    readonly location: ElementRef;

    destroy(): void {}

    onDestroy(): void {}

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

        service.registerFormControlRef(model, componentRef);

        expect(service.getFormControlRef(model.id)).toBe(componentRef);
    });

    it("should return undefined when index is invalid", () => {

        service.registerFormControlRef(model, componentRef);

        expect(service.getFormControlRef(model.id, 0)).toBeUndefined();
    });

    it("should return a component reference when index is valid", () => {

        service.registerFormControlRef(model, componentRef, 0);

        expect(service.getFormControlRef(model.id, 0)).toBe(componentRef);
    });

    it("should still have this reference at the given index, when deleting the first one", () => {

        service.registerFormControlRef(model, componentRef, 0);
        service.registerFormControlRef(model, componentRef, 1);
        service.unregisterFormControlRef(model.id, 0);

        expect(service.getFormControlRef(model.id, 0)).toBeDefined();
    });

    it("should no more have this reference at the given index, when deleting the first one two times", () => {

        service.registerFormControlRef(model, componentRef, 0);
        service.registerFormControlRef(model, componentRef, 1);
        service.unregisterFormControlRef(model.id, 0);
        service.unregisterFormControlRef(model.id, 0);

        expect(service.getFormControlRef(model.id, 0)).toBeUndefined();
    });

    it("should warn when a model is registered with index for a non-array form control", () => {

        spyOn(console, "warn");

        service.registerFormControlRef(model, componentRef);
        service.registerFormControlRef(model, componentRef, 1);

        expect(console.warn).toHaveBeenCalledWith(`registerFormControlRef is called with index for a non-array form control: ${model.id}`);
    });

    it("should unregister a component ref", () => {

        service.registerFormControlRef(model, componentRef);
        service.unregisterFormControlRef(model.id);

        expect(service.getFormControlRef(model.id)).toBeUndefined();
    });
    /*
    it("should throw exception when trying to delete non existent objects", () => {

        const modelId: string = model.id;
        const index: number = 0;

        expect(() => service.removeFormControlInstance(modelId)).toThrowError(`There exists no form control with id: ${modelId}`);

        expect(() => service.removeFormControlInstance(modelId, 0)).toThrowError(`There exists no form control with id: ${modelId} and/or index ${index}`);
    });
     */

    it("should return a custom form control component type", () => {

        let model = new DynamicInputModel({id: "input"});

        expect(service.getCustomComponentType(model)).toBe(null);
    });
});
