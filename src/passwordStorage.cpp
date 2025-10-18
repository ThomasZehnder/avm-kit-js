#include "passwordStorage.hpp"

#define DEFAULT_PASSWORD "12345"

PasswordStorage::PasswordStorage(int startAddress)
    : _startAddress(startAddress) {}

void PasswordStorage::begin(size_t eepromSize) {
    EEPROM.begin(eepromSize);

    // Check initialization flag
    byte flag = EEPROM.read(_startAddress);
    if (flag != INIT_FLAG) {
        Serial.println("EEPROM not initialized, setting default password...");
        initializeDefaultPassword();
    } 
}

String PasswordStorage::readPassword() {
    char buffer[21];
    for (int i = 0; i < 20; i++) {
        buffer[i] = EEPROM.read(_startAddress + 1 + i); // +1 for flag
    }
    buffer[20] = '\0';
    return String(buffer);
}

void PasswordStorage::writePassword(const String &password) {
    EEPROM.write(_startAddress, INIT_FLAG); // ensure flag is set

    int len = min((int)password.length(), 20);
    for (int i = 0; i < 20; i++) {
        if (i < len)
            EEPROM.write(_startAddress + 1 + i, password[i]);
        else
            EEPROM.write(_startAddress + 1 + i, '\0');
    }
    EEPROM.commit();
}

void PasswordStorage::initializeDefaultPassword() {
    writePassword(DEFAULT_PASSWORD);
}

void PasswordStorage::resetPassword() {
    Serial.print("Resetting password to default: ");
    Serial.println(DEFAULT_PASSWORD);
    initializeDefaultPassword();
}
