let fizzbuzz = (number) => {
  let count = 1;
  while (count <= number) {
    let divBy3 = false;
    let divBy5 = false;
    if (count % 3 === 0) {
      divBy3 = true;
    }
    if (count % 5 === 0) {
      divBy5 = true;
    }
    if (divBy3 || divBy5) {
      const out = (divBy3 ? "Fizz" : "") + (divBy5 ? "Buzz" : "");
      console.log(out.replace(/ /g, ""));
    } else {
      console.log(count);
    }
    count++;
  }
};

fizzbuzz(16);
