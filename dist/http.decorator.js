"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = require("./http");
const HttpMetadataKey = Symbol("Http");
const ResMetadataKey = Symbol("Res");
function Http(options) {
    return function (_constructor) {
        const client = new http_1.HttpClient(options);
        Reflect.defineMetadata(HttpMetadataKey, client, global);
    };
}
exports.Http = Http;
function Res(target, propertyKey, parameterIndex) {
    Reflect.defineMetadata(ResMetadataKey, parameterIndex, target, propertyKey);
}
exports.Res = Res;
function Post(url, data, options) {
    return createHttpDecoratorFunction(http_1.RequestMethod.POST, url, data, options);
}
exports.Post = Post;
function Get(url, data, options) {
    return createHttpDecoratorFunction(http_1.RequestMethod.GET, url, data, options);
}
exports.Get = Get;
function Fetch(type, url, data, options) {
    return createHttpDecoratorFunction(type, url, data, options);
}
exports.Fetch = Fetch;
const createHttpDecoratorFunction = (type, url, data, options) => {
    return function (target, propertyKey, descriptor) {
        let method = descriptor.value;
        descriptor.value = function () {
            return __awaiter(this, arguments, void 0, function* () {
                const resIndex = Reflect.getOwnMetadata(ResMetadataKey, target, propertyKey);
                const client = Reflect.getMetadata(HttpMetadataKey, global);
                try {
                    const res = yield client.common(type, url, data, options);
                    const args = [...arguments];
                    if (resIndex >= 0) {
                        args.splice(resIndex, 1, res);
                    }
                    return method.apply(this, args);
                }
                catch (error) {
                    throw error;
                }
            });
        };
    };
};
