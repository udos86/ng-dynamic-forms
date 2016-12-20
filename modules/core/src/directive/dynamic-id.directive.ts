import { Directive, ElementRef, Input, Renderer, OnInit } from "@angular/core";

@Directive({
    selector: "[dynamicId]"
})

export class DynamicIdDirective implements OnInit {

    @Input() dynamicId: string | boolean;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {}

    ngOnInit() {

        if (this.dynamicId) {
            this.renderer.setElementAttribute(this.elementRef.nativeElement, "id", <string> this.dynamicId);
        }
    }
}