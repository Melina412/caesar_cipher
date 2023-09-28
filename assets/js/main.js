let alphabet_str = "abcdefghijklmnopqrstuvwxyz";

// - E N C O D E --------------------------------------------------------------

function encoder() {
  let text_input = document.getElementById("textInput").value;
  console.log(text_input);
  //   regex benutzem zum entfernen von satzzeichen und leerzeichen
  let clean_text = text_input.replace(/[^\w\s]/g, "").replace(/\s/g, "");
  clean_text = clean_text.toLowerCase();
  console.log(clean_text);
  //   text splitten und einzelne buchstaben in array speichern
  let word_array = clean_text.split("");
  console.log("word array", word_array);
  let key = Number(document.getElementById("keyInput").value);

  //
  let letter_array = alphabet_str.split("");
  let encoded_index_array = [];
  for (let i = 0; i < word_array.length; i++) {
    // const char = word_array[i].toLowerCase();
    const index = letter_array.indexOf(word_array[i]);
    // prüfen ob word_array[i] im alphabet enthalten ist
    if (index !== -1) {
      // verschiebung des index um ~key~ solange (index+key) < 26 ist,
      //   sonst (index+key) -26 --> "modulo-addition"
      const encoded_index = (index + key) % 26;
      encoded_index_array.push(encoded_index);
      console.log(index, "->", encoded_index);
    }
  }

  console.log("encoded num array", encoded_index_array);

  let encoded_letters = [];
  for (let i = 0; i < encoded_index_array.length; i++) {
    let encoded_index = encoded_index_array[i];
    encoded_letters.push(letter_array[encoded_index]);
    console.log("encoded index", encoded_index);
  }
  console.log(word_array);
  console.log(encoded_letters);

  let encoded_text = encoded_letters.join("");
  encodedOutput.innerHTML = `</br> ${encoded_text}`;
  console.log(encoded_text);
}

// - D E C O D E --------------------------------------------------------------
// genau gleich nur mit negativem key
function decoder() {
  let text_input = document.getElementById("textInput").value;
  console.log(text_input);
  let clean_text = text_input.replace(/[^\w\s]/g, "").replace(/\s/g, "");
  clean_text = clean_text.toLowerCase();
  console.log(clean_text);

  let word_array = clean_text.split("");
  console.log("word array", word_array);
  let key = Number(document.getElementById("keyInput").value);

  let letter_array = alphabet_str.split("");
  let decoded_index_array = [];
  for (let i = 0; i < word_array.length; i++) {
    const index = letter_array.indexOf(word_array[i]);
    if (index !== -1) {
      let decoded_index = (index - key) % 26;
      if (decoded_index < 0) {
        decoded_index += 26;
      }
      decoded_index_array.push(decoded_index);
      console.log(index, "->", decoded_index);
    }
  }
  console.log("decoded num array", decoded_index_array);

  let decoded_letters = [];
  for (let i = 0; i < decoded_index_array.length; i++) {
    const decoded_index = decoded_index_array[i];
    decoded_letters.push(letter_array[decoded_index]);
    console.log("decoded index", decoded_index);
  }
  console.log(word_array);
  console.log(decoded_letters);

  let decoded_text = decoded_letters.join("");
  decodedOutput.innerHTML = `<br> ${decoded_text} `;
  console.log(decoded_text);
}
