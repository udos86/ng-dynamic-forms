import { Directive, Input, TemplateRef } from "@angular/core";

export enum DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT { Start = "START", End = "END"}

@Directive({
    selector: "ng-template[modelId],ng-template[modelType]"
})
export class DynamicTemplateDirective {

    @Input() align: string = DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT.End;
    @Input() as: string | null = null;
    @Input() index: number | undefined;
    @Input() modelId: string;
    @Input() modelType: string;

    constructor(public templateRef: TemplateRef<any>) {}
}
