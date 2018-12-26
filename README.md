# Http Client Decorator

web http client decorator

### Installation

**Yarn**
```bash
yarn add http-client-decorator
```

**NPM**
```bash
npm install http-client-decorator --save
```

### Getting Started
Http client is use [Axios](https://github.com/axios/axios)

```typescript
@Http(options)  //options is Axios.create options
class Test {
  @Get('url',{data},{config})     //config is instance.request config
  method1(@Res res?) {
  }
  @Post('url',{data},{config})
  method2(@Res res?) {
  }
  @Fetch(RequestMethod.PUT,'url',{data},{config})
  method3(@Res res?) {
  }
}
```
RequestMethod is a enum
```typescript
enum  RequestMethod {
  GET = 'GET',
  POST = 'POST',
  HEAD = 'HEAD',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}
```

That's it!
