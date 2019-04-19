export interface DynamicFormControlLayoutConfig {

    children?: string;
    container?: string;
    control?: string;
    errors?: string;
    group?: string;
    hint?: string;
    host?: string;
    label?: string;
    option?: string;

    [key: string]: string | undefined;
}

export interface DynamicFormControlLayout {

    element?: DynamicFormControlLayoutConfig;
    grid?: DynamicFormControlLayoutConfig;

    [key: string]: DynamicFormControlLayoutConfig | undefined;
}

export type DynamicFormControlLayoutPlace = keyof DynamicFormControlLayoutConfig;

export type DynamicFormControlLayoutContext = keyof DynamicFormControlLayout;

