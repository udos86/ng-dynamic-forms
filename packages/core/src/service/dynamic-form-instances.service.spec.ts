import { inject, TestBed } from "@angular/core/testing";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { DynamicFormInstancesService } from "./dynamic-form-instances.service";
import { ChangeDetectorRef, ComponentRef, ElementRef, Injector, Type, ViewRef } from "@angular/core";

export class TestComponentRef extends ComponentRef<any> {
    readonly changeDetectorRef: ChangeDetectorRef;
    readonly componentType: Type<any>;
    readonly hostView: ViewRef;
    readonly injector: Injector;
    readonly instance: any;
    readonly location: ElementRef;

    destroy(): void {
    }

    onDestroy(callback: Function): void {
        callback.call(() => null);
    }

    constructor() {
        super();
    }

}

describe("DynamicFormInstanceService test suite", () => {

    let service: DynamicFormInstancesService;
    let model: DynamicFormControlModel;

    let instanceRef: TestComponentRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DynamicFormInstancesService]
        });

        model = new DynamicInputModel({
            id: "test"
        });
        instanceRef = new TestComponentRef();
    });

    beforeEach(inject([DynamicFormInstancesService],
        (instanceService: DynamicFormInstancesService) => service = instanceService));


    it("should be empty when nothing set", () => {
        expect(service.getFormControlInstance(model.id)).toBeUndefined();
    });

    it("should have this reference when set", () => {
        service.setFormControlInstance(model, instanceRef);
        expect(service.getFormControlInstance(model.id)).toBe(instanceRef);
    });

    it("should not have this reference at the given index", () => {
        service.setFormControlInstance(model, instanceRef);
        expect(service.getFormControlInstance(model.id, 0)).toBeUndefined();
    });

    it("should have this reference after set to index", () => {
        service.setFormControlInstance(model, instanceRef, 0);
        expect(service.getFormControlInstance(model.id, 0)).toBe(instanceRef);
    });

    it("should no more have this reference at the given index, when deleted", () => {
        service.setFormControlInstance(model, instanceRef, 0);
        service.removeFormControlInstance(model.id, 0);
        expect(service.getFormControlInstance(model.id, 0)).toBeUndefined();
    });

    it("should no more have this reference, when deleted", () => {
        service.setFormControlInstance(model, instanceRef);
        service.removeFormControlInstance(model.id);
        expect(service.getFormControlInstance(model.id)).toBeUndefined();
    });
});