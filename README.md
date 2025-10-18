# Images

## DEMO for ESP8266

adopt SSI .credentials.h

Connect to WLAN, observe console to get IP Adress

## Elements of Demo

* Navigation
* Load HTML-Page dynamic
* sample to load HTML Page with active JS Code
* Localisation

## grid generator

nice css tool :-) <https://cssgrid-generator.netlify.app/>

## Flags loaded from

geladen von <https://hampusborgos.github.io/country-flags/>

git clone <git@github.com>:hampusborgos/country-flags.git

## Icons ins SVG

see: <https://www.svgviewer.dev/s/490702/world>

## Check pico.css

load test-includes.html

## test service to develop ui

"/services/currentstate"
{"counter":"14","ssid":"zhs_22_wil","ip":"192.168.1.197","rssi":-55,"mac":"50:02:91:DC:BF:79","x":2.52,"y":-0.48}

## websocket

use the WebSocketsServer library (part of the ESP8266 core) to add real-time, bidirectional communication — perfect for streaming your avmSerial logs or sensor data live to a webpage.

## password in EEPROM

emulated on stm boards

    Summary of Available Methods
    Method                  Description
    begin(size_t size)      Initializes EEPROM and sets default password if needed
    readPassword()          Reads the current 20-byte password
    writePassword(String)   Stores a new password (max 20 chars)
    resetPassword()         Resets password to "1234" and commits it    

## Todo

* next websocket demo (first fake with polling get-request)
* add listener to websocket change event

* rename include files
* all in english
