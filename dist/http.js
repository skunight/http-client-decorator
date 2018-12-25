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
const axios_1 = require("axios");
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["POST"] = "POST";
    RequestMethod["HEAD"] = "HEAD";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["DELETE"] = "DELETE";
    RequestMethod["OPTIONS"] = "OPTIONS";
    RequestMethod["PATCH"] = "PATCH";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
class HttpClient {
    constructor(options) {
        this.instance = axios_1.default.create(options);
    }
    common(type, url, data = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                method: type,
                cache: options.cache == null ? true : options.cache,
                url: url,
                dataType: 'json',
            };
            if (type.toLowerCase() === 'GET') {
                config.params = data;
            }
            else {
                config.data = data;
            }
            try {
                return yield this.instance(Object.assign({}, config, options));
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.HttpClient = HttpClient;
