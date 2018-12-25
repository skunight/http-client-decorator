import "reflect-metadata";
import { HttpClientOptions, RequestMethod } from './http';
export declare function Http(options: HttpClientOptions): (_constructor: Function) => void;
export declare function Res(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
export declare function Post(url: string, data: any, options: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Get(url: string, data: any, options: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Fetch(type: RequestMethod, url: string, data: any, options: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
