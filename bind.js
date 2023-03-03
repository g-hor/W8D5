Function.prototype.myBind = function (ctx) {
  // return ()=>(this.call(ctx,arg1,arg2))
  // debugger;
  let that = this;
  let args = Array.from(arguments);
  let others = args.slice(1);

  return function () {
    let args2 = Array.from(arguments)
    return that.apply(ctx, others.concat(args2));
  };
  // return dontKnowHowName(args2);
};

Function.prototype.myBindXD = function (ctx, ...args) {
  let that = this;
  // args is a real arr
  return function (...args2) {
    return that.apply(ctx, args.concat(args2.slice(1)));
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// bind time args are "meow" and "Kush", no call time args
let bsays = markov.says.myBindXD(pavlov, "meow", "Kush");
// Pavlov says meow to Kush!
// true
bsays();
// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBindXD(pavlov)("meow", "a tree");
//bsays(args)
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBindXD(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBindXD(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true
