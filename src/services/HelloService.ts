import ServiceWrapper from './ServiceWrapper'

export default class HelloService extends ServiceWrapper {
  
  // Returns a promise
  hello() {
    return this.get('/hello')
  }
}
