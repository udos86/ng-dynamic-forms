import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
    selector: "template[modelId]"
})

export class DynamicTemplateDirective {

    @Input() modelId: string;
    @Input() type: string | null = null;

    constructor(public templateRef: TemplateRef<any>) {}
}