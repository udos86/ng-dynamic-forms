export interface DynamicPathable {
    id?: string;
    index?: number | null;
    parent: DynamicPathable | null;
}
