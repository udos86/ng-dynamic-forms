import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from "@angular/core";
import { isString } from "../utils/core.utils";

@Directive({
    selector: "[dynamicList]",
    standalone: true
})
export class DynamicListDirective implements AfterViewInit {
    @Input("dynamicList") listId?: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        if (isString(this.listId)) {
            this.renderer.setAttribute(this.elementRef.nativeElement, "list", this.listId as string);
        }
    }
}
