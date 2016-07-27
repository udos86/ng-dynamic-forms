import {Directive, Input} from "@angular/core";
import {TemplateRef, ViewContainerRef, Renderer, ElementRef} from "@angular/core";

@Directive({
    selector: "[dfTest]"
})

export class DynamicFormTestDirective {

    constructor(private renderer: Renderer, private element: ElementRef) {
    }

    @Input() set dfTest(condition: boolean) {

        if (condition) {
            console.log("TEST");
            this.renderer.setElementProperty(this.element.nativeElement, "[formArrayName]", "test");
            this.renderer.setElementStyle(this.element.nativeElement, "background-color", "red");
        }
    }
}