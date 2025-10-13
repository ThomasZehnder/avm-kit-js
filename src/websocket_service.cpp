#include "websocket_service.hpp"
#include "avmSerial.h" // To use your custom logging
#include <ESP8266WiFi.h>

extern avmSerial mySerial; // reference from main.cpp

// Create WebSocket instance (port 81)
WebSocketsServer webSocket = WebSocketsServer(81);

// Event handler
void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_CONNECTED:
  {
    IPAddress ip = webSocket.remoteIP(num);
    String msg = "WebSocket client connected: " + ip.toString();
    mySerial.println(msg);
    webSocket.sendTXT(num, "Connected to ESP8266 WebSocket!");
    break;
  }

  case WStype_DISCONNECTED:
    mySerial.println("WebSocket client disconnected");
    break;

  case WStype_TEXT:
  {
    String msg = String((char *)payload);
    mySerial.println("WebSocket message: " + msg);

    if (msg == "toggleLED")
    {
      digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
      webSocket.sendTXT(num, "LED toggled!");
    }
    break;
  }

  default:
    break;
  }
}

void setupWebSocket()
{
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
  mySerial.println("WebSocket server started (port 81).");
}

void loopWebSocket()
{
  webSocket.loop();
}

void sendWebSocketLog(String &msg)
{
  webSocket.broadcastTXT(msg);
}
