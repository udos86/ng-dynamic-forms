import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { serializable, serialize } from "../decorator/serializable.decorator";

export interface DynamicFormOptionConfig<T> {

    disabled?: boolean;
    label?: string;
    value: T;
}

export class DynamicFormOption<T> {

    @serializable() disabled: boolean;
    @serializable() label: string | null;
    @serializable() value: T;

    constructor(config: DynamicFormOptionConfig<T>) {

        this.disabled = typeof config.disabled === "boolean" ? config.disabled : false;
        this.label = config.label || null;
        this.value = config.value;
    }

    get text() {
        return this.label;
    }

    set text(text: string | null) {
        this.label = text;
    }

    toJSON() {
        return serialize(this);
    }
}

export interface DynamicOptionControlModelConfig<T> extends DynamicFormValueControlModelConfig<T | T[]> {

    options?: DynamicFormOptionConfig<T>[] | Observable<DynamicFormOptionConfig<T>[]>;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormValueControlModel<T | T[]> {

    @serializable("options") _options: DynamicFormOption<T>[] = [];
    options$: Observable<DynamicFormOption<T>[]>;

    constructor(config: DynamicOptionControlModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.options = config.options;
    }

    private updateOptions$(): void {
        this.options$ = Observable.of(this.options);
    }

    set options(options: any) {

        if (Array.isArray(options)) {

            this._options = (options as DynamicFormOptionConfig<T>[]).map(optionConfig => {
                return new DynamicFormOption<T>(optionConfig);
            });

            this.updateOptions$();

        } else if (options instanceof Observable) {

            this.options$ = (options as Observable<DynamicFormOptionConfig<T>[]>).map(optionsConfig => {

                let options = optionsConfig.map(optionConfig => new DynamicFormOption<T>(optionConfig));
                this._options = options;

                return options;
            });

        } else {

            this.updateOptions$();
        }
    }

    get options(): any {
        return this._options;
    }

    add(optionConfig: DynamicFormOptionConfig<T>): DynamicFormOption<T> {
        return this.insert(this.options.length, optionConfig);
    }

    get(index: number): DynamicFormOption<T> {
        return this.options[index];
    }

    insert(index: number, optionConfig: DynamicFormOptionConfig<T>): DynamicFormOption<T> {

        let option = new DynamicFormOption(optionConfig);

        this.options.splice(index, 0, option);
        this.updateOptions$();

        return option;
    }

    remove(...indices: number[]): void {

        indices.forEach(index => this.options.splice(index, 1));
        this.updateOptions$();
    }

    abstract select(...indices: number[]): void;
}