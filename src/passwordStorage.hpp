#ifndef PASSWORD_STORAGE_H
#define PASSWORD_STORAGE_H

#include <Arduino.h>
#include <EEPROM.h>

class PasswordStorage {
public:
    PasswordStorage(int startAddress = 0);
    void begin(size_t eepromSize = 256);

    String readPassword();
    void writePassword(const String &password);
    void resetPassword();  // <-- new method

private:
    int _startAddress;
    const byte INIT_FLAG = 0xAA;  // marks EEPROM as initialized
    void initializeDefaultPassword();
};

#endif
