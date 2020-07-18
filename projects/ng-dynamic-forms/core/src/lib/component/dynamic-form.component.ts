import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, QueryList, Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlContainerComponent } from "./dynamic-form-control-container.component";
import { DynamicFormControlEvent } from "./dynamic-form-control-event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormModel } from "../model/dynamic-form.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";
import { DynamicFormComponentService } from "../service/dynamic-form-component.service";

@Directive()
export abstract class DynamicFormComponent implements OnInit, OnDestroy {

    group: FormGroup;
    model: DynamicFormModel;
    layout: DynamicFormLayout;

    components: QueryList<DynamicFormControlContainerComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;

    protected constructor(protected changeDetectorRef: ChangeDetectorRef,
                          protected componentService: DynamicFormComponentService) {
    }

    ngOnInit(): void {
        this.componentService.registerForm(this);
    }

    ngOnDestroy(): void {
        this.componentService.unregisterForm(this);
    }

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    markForCheck(): void {
        this.changeDetectorRef.markForCheck();

        if (this.components instanceof QueryList) {
            this.components.forEach(component => component.markForCheck());
        }
    }

    detectChanges(): void {
        this.changeDetectorRef.detectChanges();
    }

    onBlur($event: DynamicFormControlEvent) {
        this.blur.emit($event);
    }

    onChange($event: DynamicFormControlEvent) {
        this.change.emit($event);
    }

    onFocus($event: DynamicFormControlEvent) {
        this.focus.emit($event);
    }

    onCustomEvent($event: DynamicFormControlEvent, customEventEmitter: EventEmitter<DynamicFormControlEvent>) {
        customEventEmitter.emit($event);
    }
}
