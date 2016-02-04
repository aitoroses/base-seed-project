declare var require: {
  (id: string): any
}

declare var global

declare var componentHandler: any

declare var module: any

declare var __DEV__
declare var LOGIN_REDIRECT

declare var log

interface Object {
  assign: Function
}

declare var __config__: {
  __DEV__: string,
  apiUrl: string
}

// xml-mapping library
declare module 'xml-mapping' {
  export function load<T>(xml: string): T
  export function dump<T>(xmlObject: T): string
  export interface XMLNode {
    $t: string
  }
}

// Reselect library
declare module 'reselect' {
  export function createSelector(...args: Function[]): any
}

// JWT-Decode function
declare module 'jwt-decode' {
  function jwtDecode<T>(jwtToken: string): T
  export = jwtDecode
}
