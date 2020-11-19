import { Observable } from "@nativescript/core";
export declare class Common extends Observable {
    private apikey;
    constructor(key: string);
    search(terms: string, countryISO?: string, types?: string): Promise<any[]>;
    getPlaceById(placeId: any): Promise<any>;
    private handleErrors;
}
