#include <Arduino.h>
#include "cfilesystem.h"   // generated FS from Node-Skript

// Datei im FS suchen
const CFileEntry* findCFileSystem(const char* name) {
  for (int i = 0; i < cFileSystemCount; i++) {
    if (strcmp(cFileSystem[i].name, name) == 0) {
      return &cFileSystem[i];
    }
  }
  return nullptr;
}

