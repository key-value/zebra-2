// export  namespace App {
//   export class SomeClass {
//     getName(): string {
//       return 'name';
//     }
//   }

export class NavBody {
  // [key: string]: any;
  index: number
  title: string
  url: string
  icon: string

  constructor (index: number, title: string, url: string, icon: string) {
    this.index = index
    this.icon = icon
    this.url = url
    this.title = title
  }
}

class Address {
  index = 1
}
export default new Address()
// }
