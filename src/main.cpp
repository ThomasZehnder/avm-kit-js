#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "cfilesystem.h"   // Dein generiertes FS aus Node-Skript
#include "avmSerial.h"
#include ".credentials.h"


const char* ssid = __SSID;
const char* wlanPassword = __WLAN_PASSWORD;

String appPassword = __APP_PASSWORD;

ESP8266WebServer server(80);

// --- Example avm overloades serial out---
avmSerial mySerial;

String getAvmSerialAsHtmlList() {
  String html = "<h2>avmSerial Log (newest first)</h2>";
  for (uint8_t i = 0; i < mySerial.getNumEntries(); i++) {
    html +=  String(mySerial.getStamp(i)) + " > " + String(mySerial.getEntry(i)) + "<br>";
  }
  html += "<br>";
  return html;
}

// MIME-Type anhand Endung bestimmen
String getMimeType(const String& path) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".css"))  return "text/css";
  if (path.endsWith(".js"))   return "application/javascript";
  if (path.endsWith(".json"))   return "application/json";
  if (path.endsWith(".txt"))  return "text/plain";
  if (path.endsWith(".png"))  return "image/png";
  if (path.endsWith(".svg"))  return "image/svg+xml";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

String getCFileDirectoryAsHtmlList() {
  String html = "<h2>Available files</h2><ul>";
  for (int i = 0; i < cFileSystemCount; i++) {
    html += "<li><a href=\"/";
    html += cFileSystem[i].name;
    html += "\">";
    html += cFileSystem[i].name;
    html += " (" + String(cFileSystem[i].len) + " bytes)";
    html += "</a></li>";
  }
  html += "</ul>";
  return html;
}

String methodToString(HTTPMethod method) {
  switch (method) {
    case HTTP_GET: return "GET";
    case HTTP_POST: return "POST";
    case HTTP_PUT: return "PUT";
    case HTTP_DELETE: return "DELETE";
    case HTTP_PATCH: return "PATCH";
    case HTTP_HEAD: return "HEAD";
    case HTTP_OPTIONS: return "OPTIONS";
    default: return "UNKNOWN";
  }
}   

void handleRoot() {
  String html = "<H1> C File Directory</H1>";
  html += getCFileDirectoryAsHtmlList();
  html += getAvmSerialAsHtmlList();
  server.send(200, "text/html", html);
}

void handleFile() {
  String path = server.uri();
  mySerial.println(" File Request: "+ path);
  mySerial.println(" Method Request: "+ methodToString(server.method( )));
  
  if (path.startsWith("/")) path.remove(0, 1); // "/" removen

  const CFileEntry* file = findCFileSystem(path.c_str());
  if (file) {
    String mime = getMimeType(path);
    server.send_P(200, mime.c_str(), (const char*)file->data, file->len);
  } else {
    server.send(404, "text/plain", "File not found");
  }
}

void handleMessageLog() {
  server.send(200, "text/html", getAvmSerialAsHtmlList());
}
void handleFileDirectory() {
  server.send(200, "text/html", getCFileDirectoryAsHtmlList());
}   


int counter = 0;
bool toggle = false;

void handleCurrentState() {
  counter++;
  toggle = !toggle; 
  digitalWrite(LED_BUILTIN, toggle ? LOW : HIGH); // LED an/aus

  String json = "{";
  json += "\"counter\":\"" + String(counter) + "\",";
  json += "\"ssid\":\"" + WiFi.SSID() + "\",";
  json += "\"ip\":\"" + WiFi.localIP().toString() + "\",";
  json += "\"rssi\":" + String(WiFi.RSSI()) + ",";
  json += "\"mac\":\"" + WiFi.macAddress() + "\",";
  json += "\"x\":" + String(2.0+millis()%100/100.0) + ",";
  json += "\"y\":" + String(-1.0+millis()%100/100.0) + "";
  json += "}";

  server.send(200, "application/json", json);
}

void handleGetPassword() {

  String json = "{";
  json += "\"password\":\""+appPassword+"\"";
  json += "}";

  server.send(200, "application/json", json);
}

void setup() {
  Serial.begin(115200);
  delay(500);

  //test mySerial
    mySerial.println("Line 1");
    mySerial.println("Line 2");
    mySerial.println("Line 3");
    mySerial.println("Line 4");

    Serial.println("\n--- History (newest first) ---");
    for (uint8_t i = 0; i < mySerial.getNumEntries(); i++) {
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

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    mySerial.print(".");
  }

  mySerial.println("\nWiFi connected.");
  mySerial.print("IP address: ");
  mySerial.println(WiFi.localIP().toString());

  // Routen
  server.on("/", handleRoot);
  server.on("/services/messagelog.html", handleMessageLog);  // Add new route
  server.on("/services/filedirectory.html", handleFileDirectory);  // Add new route
  server.on("/services/currentstate", handleCurrentState);  // Add new route
  server.on("/services/getpassword", handleGetPassword);  // Add new route
  server.onNotFound(handleFile);

  // Webserver starten
  server.begin();
  mySerial.println("HTTP server started.");

  // Builtin LED als Ausgang
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  server.handleClient();
}
