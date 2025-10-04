#pragma once

#include <Arduino.h>

#define MAX_ENTRIES 20       // Max number of stored lines

class avmSerial : public Stream
{
private:
    String buffer[MAX_ENTRIES];  // Array of Strings
    unsigned long stamp[MAX_ENTRIES] = {0}; 
    uint8_t lineCount = 0;

    void shiftLines() {
        // Shift all lines one position up
        for(int i = MAX_ENTRIES-1; i > 0; i--) {
            buffer[i] = buffer[i-1];
            stamp[i] = stamp[i-1];
        }
    }

public:
    avmSerial() {}

    size_t write(uint8_t c) override
    {
        Serial.write(c); // direct output
        
        // Add character to newest line
        if(lineCount == 0) {
            lineCount = 1;
            buffer[0] = String((char)c);
        } else {
            buffer[0] += (char)c;
        }
        return 1;
    }

    size_t print(const String &s)
    {
        Serial.print(s); // direct output
        
        // Add string to newest line
        if(lineCount == 0) {
            lineCount = 1;
            buffer[0] = s;
        } else {
            buffer[0] += s;
        }
        return s.length();
    }

    size_t println(const String &s)
    {
        Serial.println(s); // direct output
        
        // Shift existing lines
        if(lineCount > 0) {
            shiftLines();
        }
        
        // Add new line at position 0
        buffer[0] = s;
        stamp[0] = millis();
        
        if(lineCount < MAX_ENTRIES) {
            lineCount++;
        }
        
        return s.length() + 1;
    }

    unsigned long getStamp(uint8_t index)
    {
        if (index >= lineCount)
            return 0;
        return stamp[index];
    }

    String getEntry(uint8_t index)
    {
        if (index >= lineCount)
            return "";
        return buffer[index];
    }

    uint8_t getNumEntries()
    {
        return lineCount;
    }

    // Stream interface requirements - simplified for String buffer
    int available() override { 
        return lineCount > 0 ? buffer[0].length() : 0;
    }
    
    int read() override
    {
        return -1; // Not implemented for String buffer
    }
    
    int peek() override { 
        return -1; // Not implemented for String buffer
    }
    
    void flush() override {} // no-op
};