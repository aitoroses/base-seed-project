export default function findDeep(obj: Object, prop: string) {
    var res = null
    for (let property in obj) {
       if(property === prop) {
           res = obj[property]
       }
       if(typeof obj[property] == 'object' && obj[property]!= null && res == null) {
          res = findDeep(obj[property], prop)
       }

       if(res) {
         return typeof res == 'object' ? JSON.stringify(res) : res
       }
    }
}
