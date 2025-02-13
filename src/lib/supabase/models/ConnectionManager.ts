export interface ConnectionManager<T> {
    getInstance(): Promise<T>;
}