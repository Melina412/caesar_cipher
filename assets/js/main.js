let alphabet_str = "abcdefghijklmnopqrstuvwxyz";

// - E N C O D E ----------------------------------------------------------------------------------

function encoder() {
  // * input aus html lesen
  let text_input = document.getElementById("textInput").value;
  console.log(text_input);
  let key = Number(document.getElementById("keyInput").value);

  //   * regex benutzen zum entfernen von satzzeichen und leerzeichen
  let clean_text = text_input.replace(/[^\w\s]/g, "").replace(/\s/g, "");
  clean_text = clean_text.toLowerCase();
  console.log(clean_text);

  //   * input text splitten und einzelne buchstaben in word_array speichern
  let word_array = clean_text.split("");
  console.log("word array", word_array);

  // * alphabet string splitten und einzelne buchstaben als elemente in array speichern
  let alphabet_array = alphabet_str.split("");
  console.log("alphabet array", alphabet_array);

  // * loop der durch die buchstaben des input läuft
  let encoded_index_array = [];
  for (let i = 0; i < word_array.length; i++) {
    //
    // * loop sucht für jedes element im word_array (input) den buchstaben im alphabet
    // * und ordnet ihm einen alphabetisch aufsteigenden index zu:
    // * also a=0, b=1, c=2, ...., z=25;
    const alphabet_index = alphabet_array.indexOf(word_array[i]);

    // * prüfen ob eingegebene buchstaben im alphabet vorhanden sind
    if (alphabet_index !== -1) {
      //
      // * verschiebung des index um ~key~ solange (index+key) < 26 ist,
      // * sonst (index+key) - 26 --> "modulo-addition"
      // * und pusht dann die verschobenen indices in einen neuen array
      const encoded_index = (alphabet_index + key) % 26;
      encoded_index_array.push(encoded_index);
      console.log(`index-verschiebung: ${alphabet_index} -> ${encoded_index}`);
    }
  }
  console.log("encoded index array", encoded_index_array);

  // * loop der durch den array mit den verschobenen indices läuft
  let encoded_letters = [];
  for (let i = 0; i < encoded_index_array.length; i++) {
    //
    // * inhalt der variablen encoded_index hier und im loop oben ist identisch, deshalb gleiche benennung
    // * verschobenen indices die zugehörigen buchstaben des alphabets zuweisen u. diese in array pushen
    let encoded_index = encoded_index_array[i];
    encoded_letters.push(alphabet_array[encoded_index]);
  }
  console.log("encoded letters", encoded_letters);
  //
  // * output text für html generieren
  let encoded_text = encoded_letters.join("");
  encodedOutput.innerHTML = encoded_text;
  console.log(encoded_text);
}

// - D E C O D E ----------------------------------------------------------------------------------

// * ablauf ist analog zu encode, jedoch mit negativem key und modulo-subtraktion
function decoder() {
  let text_input = document.getElementById("textInput").value;
  let clean_text = text_input.replace(/[^\w\s]/g, "").replace(/\s/g, "");
  clean_text = clean_text.toLowerCase();

  let word_array = clean_text.split("");
  let key = Number(document.getElementById("keyInput").value);

  let alphabet_array = alphabet_str.split("");
  let decoded_index_array = [];
  for (let i = 0; i < word_array.length; i++) {
    const alphabet_index = alphabet_array.indexOf(word_array[i]);
    if (alphabet_index !== -1) {
      let decoded_index = (alphabet_index - key) % 26; // hier modulo-subtraktion
      if (decoded_index < 0) {
        decoded_index += 26;
      }
      decoded_index_array.push(decoded_index);
    }
  }
  let decoded_letters = [];
  for (let i = 0; i < decoded_index_array.length; i++) {
    const decoded_index = decoded_index_array[i];
    decoded_letters.push(alphabet_array[decoded_index]);
  }
  let decoded_text = decoded_letters.join("");
  decodedOutput.innerHTML = decoded_text;
}

// ? mögliche variante:
// theoretisch brauche ich keine zwei funktionen, ich könnte auf beiden buttons die gleiche
// funktion auslösen und je nach value des buttons unterscheiden ob encode/decode
// und dann entsprechenden modulo addition oder subtraktion ausführen
