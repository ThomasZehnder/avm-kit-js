#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WebSocketsServer.h>
#include <FS.h> // SPIFFS filesystem
#include "avmSerial.h"
#include "websocket_service.hpp"
#include "passwordStorage.hpp"
#include ".credentials.h"

const char *ssid = __SSID;
const char *wlanPassword = __WLAN_PASSWORD;

String appPassword = __APP_PASSWORD;

ESP8266WebServer server(80);

// --- Example avm overloades serial out---
avmSerial mySerial;

PasswordStorage passStorage;

String getAvmSerialAsHtmlList()
{
  String html = "<h2>avmSerial Log (newest first)</h2>";
  for (uint8_t i = 0; i < mySerial.getNumEntries(); i++)
  {
    html += String(mySerial.getStamp(i)) + " > " + String(mySerial.getEntry(i)) + "<br>";
  }
  html += "<br>";
  return html;
}

// MIME-Type anhand Endung bestimmen
String getMimeType(const String &path)
{
  if (path.endsWith(".html"))
    return "text/html";
  if (path.endsWith(".css"))
    return "text/css";
  if (path.endsWith(".js"))
    return "application/javascript";
  if (path.endsWith(".json"))
    return "application/json";
  if (path.endsWith(".txt"))
    return "text/plain";
  if (path.endsWith(".png"))
    return "image/png";
  if (path.endsWith(".svg"))
    return "image/svg+xml";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg"))
    return "image/jpeg";
  return "application/octet-stream";
}

String getCFileDirectoryAsHtmlList()
{
  String html = "<h2>note available</h2><ul>";
  /*for (int i = 0; i < cFileSystemCount; i++)
  {
    html += "<li><a href=\"/";
    html += cFileSystem[i].name;
    html += "\">";
    html += cFileSystem[i].name;
    html += " (" + String(cFileSystem[i].len) + " bytes)";
    html += "</a></li>";
  }
  html += "</ul>";
  */
  return html;
}

String methodToString(HTTPMethod method)
{
  switch (method)
  {
  case HTTP_GET:
    return "GET";
  case HTTP_POST:
    return "POST";
  case HTTP_PUT:
    return "PUT";
  case HTTP_DELETE:
    return "DELETE";
  case HTTP_PATCH:
    return "PATCH";
  case HTTP_HEAD:
    return "HEAD";
  case HTTP_OPTIONS:
    return "OPTIONS";
  default:
    return "UNKNOWN";
  }
}

void handleRoot()
{
  String html = "<H1> C File Directory</H1>";
  html += getCFileDirectoryAsHtmlList();
  html += getAvmSerialAsHtmlList();
  server.send(200, "text/html", html);
}

void handleFile()
{
  String path = server.uri();
  mySerial.println(" File Request: " + path);
  mySerial.println(" Method Request: " + methodToString(server.method()));

  // Try to open file from SPIFFS
  if (!SPIFFS.exists(path))
  {
    // If path doesn't have leading slash, try adding it
    if (!path.startsWith("/"))
    {
      path = "/" + path;
    }
  }

  if (SPIFFS.exists(path))
  {
    File file = SPIFFS.open(path, "r");
    if (file)
    {
      String mime = getMimeType(path);
      server.streamFile(file, mime);
      file.close();
      mySerial.println(" Served from SPIFFS: " + path);
    }
    else
    {
      server.send(500, "text/plain", "Failed to open file");
      mySerial.println(" Error: Failed to open file: " + path);
    }
  }
  else
  {
    server.send(404, "text/plain", "File not found");
    mySerial.println(" Error: File not found: " + path);
  }
}

void handleMessageLog()
{
  server.send(200, "text/html", getAvmSerialAsHtmlList());
}
void handleFileDirectory()
{
  server.send(200, "text/html", getCFileDirectoryAsHtmlList());
}

int counter = 0;
bool toggle = false;

void handleCurrentState()
{
  counter++;
  toggle = !toggle;
  digitalWrite(LED_BUILTIN, toggle ? LOW : HIGH); // LED an/aus

  String json = "{";
  json += "\"counter\":\"" + String(counter) + "\",";
  json += "\"ssid\":\"" + WiFi.SSID() + "\",";
  json += "\"ip\":\"" + WiFi.localIP().toString() + "\",";
  json += "\"rssi\":" + String(WiFi.RSSI()) + ",";
  json += "\"mac\":\"" + WiFi.macAddress() + "\",";
  json += "\"actX\":" + String(2.0 + counter % 10) + ",";
  json += "\"actY\":" + String(2.0 - millis() % 10000 / 2000.0) + ",";
  json += "\"targetX\":" + String(-3.0 - counter % 10) + ",";
  json += "\"targetY\":" + String(-3.0 + millis() % 10000 / 2000.0) + "";
  json += "}";

  server.send(200, "application/json", json);
}

void handleGetPassword()
{
  String json = "{";
  json += "\"password\":\"" + passStorage.readPassword() + "\"";
  json += "}";

  server.send(200, "application/json", json);
}

void handleSetPassword()
{
  if (!server.hasArg("password"))
  {
    server.send(400, "text/plain", "Error: missing 'password' parameter");
    return;
  }

  String newPass = server.arg("password");

  if (newPass.length() > 20)
  {
    server.send(400, "text/plain", "Error: password too long (max 20 chars)");
    return;
  }

  passStorage.writePassword(newPass);
  Serial.print("New password saved: ");
  Serial.println(newPass);

  server.send(200, "text/plain", "Password updated successfully");
}

void handleResetPassword()
{
  passStorage.resetPassword();
  Serial.println("Password reset to default...");
  server.send(200, "text/plain", "Password has been reset to default");
}

void setup()
{
  Serial.begin(115200);
  delay(500);

  // Initialize SPIFFS
  if (!SPIFFS.begin())
  {
    Serial.println("SPIFFS Mount Failed!");
    mySerial.println("SPIFFS Mount Failed!");
  }
  else
  {
    Serial.println("SPIFFS Mounted Successfully");
    mySerial.println("SPIFFS Mounted Successfully");
  }

  // test mySerial
  mySerial.println("Line 1");
  mySerial.println("Line 2");
  mySerial.println("Line 3");
  mySerial.println("Line 4");

  Serial.println("\n--- History (newest first) ---");
  for (uint8_t i = 0; i < mySerial.getNumEntries(); i++)
  {
    Serial.print("Entry ");
    Serial.print(i);
    Serial.print(": ");
    Serial.println(mySerial.getEntry(i));
  }

  mySerial.println("...");
  mySerial.print("Connecting to WiFi: ");
  mySerial.print(ssid);
  mySerial.println(" ...");
  WiFi.begin(ssid, wlanPassword);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    mySerial.print(".");
  }

  mySerial.println("\nWiFi connected.");
  mySerial.print("IP address: ");
  mySerial.println(WiFi.localIP().toString());

  // Routen
  server.on("/", handleRoot);
  server.on("/services/messagelog.html", handleMessageLog); // Add new route
  server.on("/services/filedirectory.html", handleFileDirectory);
  server.on("/services/currentstate.json", handleCurrentState);

  server.on("/services/getpassword", handleGetPassword);
  server.on("/services/setpassword", handleSetPassword);
  server.on("/services/resetpassword", handleResetPassword);

  server.onNotFound(handleFile);

  // Webserver starten
  server.begin();
  mySerial.println("HTTP server started.");

  // Websocket starten
  setupWebSocket();

  // Builtin LED als Ausgang
  pinMode(LED_BUILTIN, OUTPUT);

  // add password storage
  passStorage.begin();

  String pwd = passStorage.readPassword();
  Serial.print("Stored password: ");
  Serial.println(pwd);
}

unsigned long nextTimeToCall = 0;
int wsCounter = 0;

void loop()
{
  server.handleClient();
  loopWebSocket(); // Handle WebSocket events

  if (int(millis() - nextTimeToCall) > 0)
  {
    wsCounter++;
    String msg = String(wsCounter);
    sendWebSocketLog(msg);
    nextTimeToCall = millis() + 500;
  }
}
