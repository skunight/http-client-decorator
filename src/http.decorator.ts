import "reflect-metadata"
import { HttpClient, HttpClientOptions, RequestMethod } from './http'

const HttpMetadataKey = Symbol("Http")
const ResMetadataKey = Symbol("Res")
export function Http(options: HttpClientOptions) {
  return function (_constructor: Function) {
    const client: HttpClient = new HttpClient(options)
    Reflect.defineMetadata(HttpMetadataKey, client, global)
  }
}

export function Res(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  Reflect.defineMetadata(ResMetadataKey, parameterIndex, target, propertyKey);
}

export function Post(url: string, data: any, options: any) {
  return createHttpDecoratorFunction(RequestMethod.POST, url, data, options)
}

export function Get(url: string, data: any, options: any) {
  return createHttpDecoratorFunction(RequestMethod.GET, url, data, options)
}

export function Fetch(type: RequestMethod, url: string, data: any, options: any) {
  return createHttpDecoratorFunction(type, url, data, options)
}

const createHttpDecoratorFunction = (type: RequestMethod, url: string, data: any, options: any) => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    descriptor.value = async function () {
      const resIndex: number = Reflect.getOwnMetadata(ResMetadataKey, target, propertyKey)
      const client = Reflect.getMetadata(HttpMetadataKey, global)
      try {
        const res = await client.common(type, url, data, options)
        const args = [...arguments]
        if (resIndex >= 0) {
          args.splice(resIndex, 1, res)
        }
        return method.apply(this, args)
      } catch (error) {
        throw error
      }
    }
  }
}