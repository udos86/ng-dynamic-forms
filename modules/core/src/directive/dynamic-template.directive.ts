import { Directive, Input, TemplateRef } from "@angular/core";

export const DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START = "START";
export const DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END = "END";

@Directive({
    selector: "template[modelId],template[modelType]"
})

export class DynamicTemplateDirective {

    @Input() align: string = DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END;
    @Input() modelId: string;
    @Input() modelType: string;
    @Input() type: string | null = null;

    constructor(public templateRef: TemplateRef<any>) {}
}