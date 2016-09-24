import {Directive, ElementRef, Input, Renderer, OnInit} from "@angular/core";

@Directive({
    selector: "[dynamicId]"
})

export class DynamicIdDirective implements OnInit {

    @Input() dynamicId: string | boolean;

    constructor(private elmRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {

        if (this.dynamicId) {
            this.renderer.setElementAttribute(this.elmRef.nativeElement, "id", <string> this.dynamicId);
        }
    }
}