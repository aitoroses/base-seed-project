/// <reference path="../react/react.d.ts" />

declare module 'redux-devtools' {
  import * as React from 'react'
  import * as Redux from 'redux'

  export var persistState: (x: string) =>  Redux.Middleware
  export var createDevTools: (x: React.ReactElement<any>) => any
}
