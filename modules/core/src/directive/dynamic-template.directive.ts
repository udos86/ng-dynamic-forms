import { Directive, Input, TemplateRef } from "@angular/core";

export const DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START = "START";
export const DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END = "END";

@Directive({
    selector: "ng-template[modelId],ng-template[modelType]"
})
export class DynamicTemplateDirective {

    @Input() align: string = DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END;
    @Input() as: string | null = null;
    @Input() modelId: string;
    @Input() modelType: string;

    constructor(public templateRef: TemplateRef<any>) {}
}