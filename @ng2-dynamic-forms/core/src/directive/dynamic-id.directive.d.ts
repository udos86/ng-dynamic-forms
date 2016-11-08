import { ElementRef, Renderer, OnInit } from "@angular/core";
export declare class DynamicIdDirective implements OnInit {
    private elementRef;
    private renderer;
    dynamicId: string | boolean;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnInit(): void;
}
