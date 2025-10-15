function hash_djb2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
        // Optional: Um Überlauf wie bei 32-Bit-Unsigned zu simulieren
        hash = hash >>> 0;
    }
    return hash;
}

// Test
console.log(hash_djb2("Hello Arduino!")); // Beispiel-Output

console.log(hash_djb2("1234")); // Beispiel-Output

console.log(hash_djb2("1")); // Beispiel-Output

console.log(hash_djb2("2")); // Beispiel-Output

/* c implementierung

unsigned long hash_djb2(const char* str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c; // hash * 33 + c
    }
    return hash;
}

void setup() {
    Serial.begin(9600);
    const char* text = "Hello Arduino!";
    Serial.println(hash_djb2(text));
}

*/