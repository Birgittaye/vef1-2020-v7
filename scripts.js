/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;


/**
 * Byrja forrit.
 */
function start() {
  let correct = false;
  let action;
  let number;
  let string_to_change;

  // fá action
  do {
  	let input = prompt(`Hvort viltu kóða eða afkóða streng? Skrifaðu "kóða" eða "afkóða"`, ``);
  	input = input.toLocaleLowerCase();

  	if (input == `kóða` || input == `afkóða`) {
  		correct = true;
  		action = input;
  	} else {
  		alert(`Veit ekki hvað aðgerð ${input} er. Reyndu aftur.`);
  	}
  } while (!correct)
  
  // fá number
  correct = false;
  do {
  	let input = prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`,``);
  	number = Number.parseInt(input);
  	if (Number.isInteger(number)) {
  		if(number >= 1 && number <= 31) {
  			correct = true;
  		}
  	}

  	if (!correct) {
  		alert(`${input} er ekki heiltala á bilinu [1, 31].`);
  	}
  } while (!correct)

  // fá string_to_change
  correct = false;
  do {
  	let input = prompt(`Gefðu upp strenginn sem á að ${action} með hliðrun ${number}:`);
  	if (input == null || input == ``) {
  		alert(`Þú gafst ekki upp streng. Reyndu aftur`);
  	} else {
  		correct = true;
  		string_to_change = input.toLocaleUpperCase();
  		for (var i = 0; i < string_to_change.length; i++) {
  			if(!LETTERS.includes(string_to_change[i])) {
  				correct = false;
  			}
  		}
  		if(!correct) {
  			alert(`Þú gafst upp stafi sem ekki er hægt að ${action}.`);
  		}
  	}
  } while (!correct)

  // sýna encode/decode
  if(action == `kóða` ? true : false) {
  	alert(encode(string_to_change, number));
  } else {
  	alert(decode(string_to_change, number));
  }
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let mystring = ``;
  for (let i = 0; i < str.length; i++) {
  	mystring += _helper(str.charAt(i), n, true);
  }
  return mystring;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let mystring = ``;
  for (let i = 0; i < str.length; i++) {
  	mystring += _helper(str.charAt(i), n, false);
  }
  return mystring;
}

/**
 * Hjalparfall sem gerir encode/decode á einn staf
 *
 * @param {char} letter Stafurinn sem á að breyta
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {bool} enc Hvort að það á aðhliðra til hægri (true) eða vinstri (false)
 * @returns {string} Upprunalegi stafurinn hliðraður um n
 */
function _helper(letter, n, enc) {
	if (enc) {
		return LETTERS.charAt((LETTERS.indexOf(letter) + n) % LETTERS.length);
	}
	else {
		return LETTERS.charAt((LETTERS.indexOf(letter) - n + LETTERS.length) % LETTERS.length);
	}
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
