export class ModelUtility {
  static merge(target: any, source: any, deep?: boolean): any {
    deep = deep || false // tue 深 copy false 浅 copy
    for (const pro in source) {
      if (!deep) {
        target[pro] = source[pro]
      } else {
        if (typeof source[pro] === 'object') {
          if (
            Object.prototype.toString.call(source[pro]) === '[object Object]'
          ) {
            for (const key of Object.keys(source[pro])) {
              target[key] = source[pro][key]
            }
          }
        } else {
          target[pro] = source[pro]
        }
      }
    }
    return target
  }
}
