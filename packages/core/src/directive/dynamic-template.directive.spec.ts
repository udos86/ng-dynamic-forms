import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, TemplateRef } from "@angular/core";
import { DynamicTemplateDirective, DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END } from "./dynamic-template.directive";

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

        expect(directive.pre).toEqual(false);
        expect(directive.post).toEqual(false);
        expect(directive.align).toEqual(DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END);
        expect(directive.align).toEqual(DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END);
        expect(directive.as).toBeNull();
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
    });
});