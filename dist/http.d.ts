import { AxiosRequestConfig } from 'axios';
export interface HttpClientOptions extends AxiosRequestConfig {
}
export declare enum RequestMethod {
    GET = "GET",
    POST = "POST",
    HEAD = "HEAD",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH"
}
export declare class HttpClient {
    private instance;
    constructor(options: HttpClientOptions);
    common(type: RequestMethod, url: string, data?: any, options?: any): Promise<import("axios").AxiosResponse<any>>;
}
