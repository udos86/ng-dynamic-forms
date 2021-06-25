import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormComponentService,
    DynamicFormControlEvent,
    DynamicFormLayout,
    DynamicFormModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicFoundationFormControlContainerComponent } from "./dynamic-foundation-form-control-container.component";

@Component({
    selector: "dynamic-foundation-form",
    templateUrl: "./dynamic-foundation-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFoundationFormComponent extends DynamicFormComponent {
    @Input() group!: FormGroup;
    @Input() model!: DynamicFormModel;
    @Input() layout?: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates!: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicFoundationFormControlContainerComponent) components!: QueryList<DynamicFoundationFormControlContainerComponent>;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentService: DynamicFormComponentService) {
        super(changeDetectorRef, componentService);
    }
}
