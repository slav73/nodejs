function* testGenerator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

const myGenerator = testGenerator(['Никита', 'Роман', 'Кирилл']);

let item = myGenerator.next();

while (!item.done) {
  console.log(item);
  item = myGenerator.next();
}
