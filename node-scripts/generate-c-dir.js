const fs = require('fs');
const path = require('path');
const processAll = require('./merge-js-img.js')

// Get the first argument after "node ./node-scripts/generate-c-dir.js"
const inputDir = process.argv[2] || "data";
const outputSrcDir = 'src';       // Hauptordner für generierte H-Files
const outputFsDir = path.join(outputSrcDir, 'fs'); // Unterordner für Einzel-H-Files
const mainHeaderFile = path.join(outputSrcDir, 'cfilesystem.h'); // Haupt-H File

if (inputDir.startsWith("merge")) {
    console.log("Start merge js, css and images into HTML files...");
    processAll.processAll();
    console.log("finished to preprocess HTML files...");
}


// Remove existing merge-data folder if it exists
if (fs.existsSync(outputFsDir)) {
    fs.rmSync(outputFsDir, { recursive: true, force: true });
    console.log(`Deleted existing folder: ${outputFsDir}`);
}

// Ordner ./src und ./src/fs erstellen, falls nicht existiert
if (!fs.existsSync(outputSrcDir)) fs.mkdirSync(outputSrcDir);
if (!fs.existsSync(outputFsDir)) fs.mkdirSync(outputFsDir);

let fileEntries = [];

// Hilfsfunktion: C-kompatibler Variablenname
function sanitizeVariableName(name) {
    return name.replace(/[^a-zA-Z0-9_]/g, '_');
}

// Einzel-H-File erzeugen
async function createFileHeader(filePath, relativePath) {

    const varName = sanitizeVariableName(relativePath);
    data = fs.readFileSync(filePath);

    let content = `// Auto-generated from ${relativePath}\n`;
    content += `const unsigned char ${varName}[] PROGMEM = {\n`;

    for (let i = 0; i < data.length; i++) {
        content += `0x${data[i].toString(16).padStart(2, '0')}, `;
        if ((i + 1) % 12 === 0) content += '\n';
    }
    content += `\n};\n`;
    content += `const unsigned int ${varName}_len = ${data.length};\n`;

    // Datei im fs/ Ordner speichern
    const headerFileName = path.join(outputFsDir, sanitizeVariableName(relativePath) + '.h');
    fs.writeFileSync(headerFileName, content);

    fileEntries.push({ path: relativePath, varName, headerFile: headerFileName });
}

// Rekursive Durchsuchung bis maxDepth Ebenen
function walkDir(dir, baseDir = '', depth = 0, maxDepth = 2) {
    if (depth > maxDepth) return;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        const relPath = path.join(baseDir, item).replace(/\\/g, '/');

        if (stat.isDirectory()) {
            walkDir(fullPath, relPath, depth + 1, maxDepth);
        } else if (stat.isFile()) {
            console.log("Create h-file: ", fullPath);
            createFileHeader(fullPath, relPath);
        }
    });
}

// Ordner durchlaufen (max. 2 Ebenen)
(async () => {
    console.log('Generate h-Files started...');
    await walkDir(inputDir);
    console.log('Finished!');
})();

// Haupt-H File erzeugen
let mainHeaderContent = `// Auto-generated main filesystem header\n\n`;

fileEntries.forEach(f => {
    const relativeInclude = path.relative(outputSrcDir, f.headerFile).replace(/\\/g, '/');
    mainHeaderContent += `#include "${relativeInclude}"\n`;
});

mainHeaderContent += `\ntypedef struct {\n`;
mainHeaderContent += `    const char* name;\n`;
mainHeaderContent += `    const unsigned char* data;\n`;
mainHeaderContent += `    unsigned int len;\n`;
mainHeaderContent += `} CFileEntry;\n\n`;

mainHeaderContent += `const CFileEntry cFileSystem[] = {\n`;  // <- Name geändert
fileEntries.forEach(f => {
    mainHeaderContent += `    {"${f.path}", ${f.varName}, ${f.varName}_len},\n`;
});
mainHeaderContent += `};\n\n`;
mainHeaderContent += `const int cFileSystemCount = sizeof(cFileSystem)/sizeof(cFileSystem[0]);\n\n`;

mainHeaderContent += `const CFileEntry* findCFileSystem(const char* name);\n`;

fs.writeFileSync(mainHeaderFile, mainHeaderContent);

console.log(`Generated ${fileEntries.length} files in '${outputFsDir}' and main header '${mainHeaderFile}'.`);
