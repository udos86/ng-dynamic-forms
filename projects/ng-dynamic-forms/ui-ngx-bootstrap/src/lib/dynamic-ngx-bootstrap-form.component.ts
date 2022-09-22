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
import { UntypedFormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormComponentService,
    DynamicFormControlEvent,
    DynamicFormLayout,
    DynamicFormModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicNGxBootstrapFormControlContainerComponent } from "./dynamic-ngx-bootstrap-form-control-container.component";

@Component({
    selector: "dynamic-ngx-bootstrap-form",
    templateUrl: "./dynamic-ngx-bootstrap-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicNGxBootstrapFormComponent extends DynamicFormComponent {
    @Input() group!: UntypedFormGroup;
    @Input() model!: DynamicFormModel;
    @Input() layout?: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @Output() bsEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates!: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicNGxBootstrapFormControlContainerComponent)
    components!: QueryList<DynamicNGxBootstrapFormControlContainerComponent>;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentService: DynamicFormComponentService) {
        super(changeDetectorRef, componentService);
    }
}
