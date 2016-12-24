import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
    selector: "template[modelId]"
})

export class DynamicTemplateDirective {

    @Input() modelId: string;

    constructor(public templateRef: TemplateRef<any>) {}
}