const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(process.cwd(), 'data');
const OUTPUT_DIR = path.join(process.cwd(), 'merge-data');
const I18N_FOLDER = path.join(ROOT_DIR, 'i18n');
const SERVICES_FOLDER = path.join(ROOT_DIR, 'services');
const FLAGS_IMAGES_FOLDER = path.join(ROOT_DIR, 'images/flags');
const DYNAMICS_IMAGES_FOLDER = path.join(ROOT_DIR, 'images/dynamics');

// Remove existing merge-data folder if it exists
if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    console.log(`Deleted existing folder: ${OUTPUT_DIR}`);
}

// Ensure output folder exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Recursively get all .html files in a folder
function getHtmlFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let files = [];

    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(getHtmlFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            files.push(fullPath);
        }
    });

    return files;
}

// Helper: get MIME type from file extension
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.png': return 'image/png';
        case '.jpg':
        case '.jpeg': return 'image/jpeg';
        case '.gif': return 'image/gif';
        case '.svg': return 'image/svg+xml';
        case '.webp': return 'image/webp';
        default: return 'application/octet-stream';
    }
}

// Inline JS, CSS, and images
function inlineAssetsInFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Inline JS
    html = html.replace(
        /<script\s+[^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/gi,
        (match, src) => {
            if (/^(https?:|\/\/|data:)/i.test(src)) return match;

            const jsPath = path.resolve(path.dirname(filePath), src);
            if (!fs.existsSync(jsPath)) {
                console.warn(`JS file not found: ${jsPath}`);
                return match;
            }

            const jsContent = fs.readFileSync(jsPath, 'utf8');
            console.log(`Inlined JS: ${path.relative(ROOT_DIR, filePath)} <- ${src}`);
            return `<script>\n${jsContent}\n</script>`;
        }
    );

    // Inline CSS
    html = html.replace(
        /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
        (match, href) => {
            if (/^(https?:|\/\/|data:)/i.test(href)) return match;

            const cssPath = path.resolve(path.dirname(filePath), href);
            if (!fs.existsSync(cssPath)) {
                console.warn(`CSS file not found: ${cssPath}`);
                return match;
            }

            const cssContent = fs.readFileSync(cssPath, 'utf8');
            console.log(`Inlined CSS: ${path.relative(ROOT_DIR, filePath)} <- ${href}`);
            return `<style>\n${cssContent}\n</style>`;
        }
    );

    // Inline images
    html = html.replace(
        /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*)>/gi,
        (match, beforeSrc, src, afterSrc) => {
            if (/^(https?:|\/\/|data:)/i.test(src)) return match;

            const imgPath = path.resolve(path.dirname(filePath), src);
            if (!fs.existsSync(imgPath)) {
                console.warn(`Image file not found: ${imgPath}`);
                return match;
            }

            const mimeType = getMimeType(imgPath);
            const imgData = fs.readFileSync(imgPath);
            const base64 = imgData.toString('base64');
            console.log(`Inlined Image: ${path.relative(ROOT_DIR, filePath)} <- ${src}`);

            return `<img ${beforeSrc}src="data:${mimeType};base64,${base64}"${afterSrc}>`;
        }
    );

    // Preserve folder structure
    const relativePath = path.relative(ROOT_DIR, filePath);
    const outputFilePath = path.join(OUTPUT_DIR, relativePath);

    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, html, 'utf8');
}

// Recursively copy folder
function copyFolder(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });

    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFolder(srcPath, destPath);
        } else if (entry.isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Process all HTML files and copy i18n folder
function processAll() {
    const files = getHtmlFiles(ROOT_DIR);

    console.log(`Found ${files.length} HTML files.`);

    for (const file of files) {
        inlineAssetsInFile(file);
    }

    // Copy i18n folder
    if (fs.existsSync(I18N_FOLDER)) {
        copyFolder(I18N_FOLDER, path.join(OUTPUT_DIR, 'i18n'));
        console.log(`Copied ${I18N_FOLDER} folder to merge-data/i18n`);
    }

        // Copy services folder (exclude for arduinoboard)
    if (fs.existsSync(SERVICES_FOLDER)) {
        copyFolder(SERVICES_FOLDER, path.join(OUTPUT_DIR, 'services'));
        console.log(`Copied ${SERVICES_FOLDER} folder to merge-data/services`);
    }
    // Copy images folder (exclude from Arduino, laguage selector should use emdebbed images)
    if (fs.existsSync(FLAGS_IMAGES_FOLDER)) {
        copyFolder(FLAGS_IMAGES_FOLDER, path.join(OUTPUT_DIR, 'images','flags'));
        console.log(`Copied ${FLAGS_IMAGES_FOLDER} folder to merge-data/images/flags`);
    }
    // Copy images folder (exclude from Arduino, laguage selector should use emdebbed images)
    if (fs.existsSync(DYNAMICS_IMAGES_FOLDER)) {
        copyFolder(DYNAMICS_IMAGES_FOLDER, path.join(OUTPUT_DIR, 'images','dynamics'));
        console.log(`Copied ${DYNAMICS_IMAGES_FOLDER} folder to merge-data/images/dynamics`);
    }

    console.log(`Done! Modified HTML, images, JS, CSS, and i18n saved in "${OUTPUT_DIR}".`);
}

// Only run process() if this file is executed directly
if (require.main === module) {
processAll();
}

module.exports = { processAll };
