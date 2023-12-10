(() => {
  const MODULO = 20201227;

  const PUBLIC_A = 9232416;
  const PUBLIC_B = 14144084;

  // find loopSizeA
  let loopSizeA = 0;
  let a = 1;
  while (a !== PUBLIC_A) {
    a = (a * 7) % MODULO;
    loopSizeA++;
  }

  // find loopSizeB
  let loopSizeB = 0;
  let b = 1;
  while (b !== PUBLIC_B) {
    b = (b * 7) % MODULO;
    loopSizeB++;
  }

  // find encryption key
  let encryptionKey = 1;
  for (let i = 0; i < loopSizeA; i++) {
    if (i % 1000000 === 0) console.log(i);
    encryptionKey = (encryptionKey * PUBLIC_B) % MODULO;
  }

  //   check encryption key
  let checkEncryptionKey = 1;
  for (let i = 0; i < loopSizeB; i++) {
    if (i % 1000000 === 0) console.log(i);
    checkEncryptionKey = (checkEncryptionKey * PUBLIC_A) % MODULO;
  }

  if (encryptionKey !== checkEncryptionKey) {
    throw new Error('encryptionKey !== checkEncryptionKey');
  }

  console.log(encryptionKey);
})();
