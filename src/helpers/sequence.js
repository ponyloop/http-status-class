

function* statusClassSequence(num) {
  const lengths = [3, 8, 8, 29, 11];
  const extras = [null, [226], null, [431, 444, 451, 499], [599]];

  for (let i=0; i<lengths[num-1]; i++) yield num * 100 + i;

  if (extras[num - 1]) yield* extras[num - 1];
}


module.exports = statusClassSequence;
