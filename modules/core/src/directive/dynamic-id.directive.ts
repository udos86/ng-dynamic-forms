import { Directive, ElementRef, Input, Renderer, AfterViewInit } from "@angular/core";

@Directive({
    selector: "[dynamicId]"
})

export class DynamicIdDirective implements AfterViewInit {

    @Input() dynamicId: string | boolean;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {}

    ngAfterViewInit() {

        if (this.dynamicId) {
            this.renderer.setElementAttribute(this.elementRef.nativeElement, "id", this.dynamicId as string);
        }
    }
}