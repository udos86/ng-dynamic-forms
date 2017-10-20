export interface DynamicClsConfig {

    container?: string;
    control?: string;
    errors?: string;
    group?: string;
    hint?: string;
    host?: string;
    label?: string;
    option?: string;
}

export class DynamicClsConfigFactory {

    static create(): DynamicClsConfig {

        return {
            container: "",
            control: "",
            errors: "",
            group: "",
            hint: "",
            host: "",
            label: "",
            option: ""
        };
    }
}