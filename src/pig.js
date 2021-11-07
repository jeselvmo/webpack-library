const Lib = require('../dist/webpack-library.min');

export default function haha() {
  const cat = new Lib.Dog();
  console.log('🚀 ~ haha ~ cat', cat);
}
