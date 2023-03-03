function sum(nums) {
  let args = Array.from(arguments);
  return args.reduce((acc, el) => (acc += el), 0);
}

function sum2(...nums) {
  return nums.reduce((acc, el) => (acc += el), 0);
}


