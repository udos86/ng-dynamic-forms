import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, TemplateRef } from "@angular/core";
import { DynamicTemplateDirective, DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT } from "./dynamic-template.directive";

@Component({
    template: `
        <ng-template modelId="test1"></ng-template>
        <ng-template modelId="test2" as="test"></ng-template>
    `
})
class TestComponent {
}

describe("DynamicTemplateDirective test suite", () => {

    let directive: DynamicTemplateDirective,
        fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {

        directive = new DynamicTemplateDirective({} as TemplateRef<any>);

        fixture = TestBed.configureTestingModule({

            declarations: [DynamicTemplateDirective, TestComponent]

        }).createComponent(TestComponent);

        fixture.detectChanges();
    });

    it("should be initialized correctly", () => {

        expect(directive.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT.End).toBe(true);
        expect(directive.as).toBeNull();
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
    });
});