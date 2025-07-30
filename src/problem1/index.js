var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += 1;
  }

  return sum;
};

var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

// Cons: can overflow the callstack if n is too big
var sum_to_n_c = function (n) {
  if (n <= 1) {
    return n;
  }

  return sum_to_n_c(n - 1);
};
