#pragma once
#include <Arduino.h>
#include <WebSocketsServer.h>

// Expose the global WebSocket server instance
extern WebSocketsServer webSocket;

// Setup function to initialize WebSocket server
void setupWebSocket();

// Must be called in loop() to handle WebSocket events
void loopWebSocket();

// Optional helper to broadcast messages to all clients
void sendWebSocketLog(String &msg);
