// Auto-generated main filesystem header

#include "fs/_200_html.h"
#include "fs/_404_html.h"
#include "fs/index_html.h"
#include "fs/_nuxt_8Tf9c2cc_js.h"
#include "fs/_nuxt_Bdzf3zCY_js.h"
#include "fs/_nuxt_builds_latest_json.h"
#include "fs/_nuxt_builds_meta_b203cf25_dd4c_4254_a40d_1fce9c897812_json.h"
#include "fs/_nuxt_entry_BthoZnY9_css.h"
#include "fs/_nuxt_error_404_BLrjNXsr_css.h"
#include "fs/_nuxt_error_500_DLkAwcfL_css.h"
#include "fs/_nuxt_SoH6cW5w_js.h"
#include "fs/_nuxt_WgpzvLzv_js.h"

typedef struct {
    const char* name;
    const unsigned char* data;
    unsigned int len;
} CFileEntry;

const CFileEntry cFileSystem[] = {
    {"200.html", _200_html, _200_html_len},
    {"404.html", _404_html, _404_html_len},
    {"index.html", index_html, index_html_len},
    {"_nuxt/8Tf9c2cc.js", _nuxt_8Tf9c2cc_js, _nuxt_8Tf9c2cc_js_len},
    {"_nuxt/Bdzf3zCY.js", _nuxt_Bdzf3zCY_js, _nuxt_Bdzf3zCY_js_len},
    {"_nuxt/builds/latest.json", _nuxt_builds_latest_json, _nuxt_builds_latest_json_len},
    {"_nuxt/builds/meta/b203cf25-dd4c-4254-a40d-1fce9c897812.json", _nuxt_builds_meta_b203cf25_dd4c_4254_a40d_1fce9c897812_json, _nuxt_builds_meta_b203cf25_dd4c_4254_a40d_1fce9c897812_json_len},
    {"_nuxt/entry.BthoZnY9.css", _nuxt_entry_BthoZnY9_css, _nuxt_entry_BthoZnY9_css_len},
    {"_nuxt/error-404.BLrjNXsr.css", _nuxt_error_404_BLrjNXsr_css, _nuxt_error_404_BLrjNXsr_css_len},
    {"_nuxt/error-500.DLkAwcfL.css", _nuxt_error_500_DLkAwcfL_css, _nuxt_error_500_DLkAwcfL_css_len},
    {"_nuxt/SoH6cW5w.js", _nuxt_SoH6cW5w_js, _nuxt_SoH6cW5w_js_len},
    {"_nuxt/WgpzvLzv.js", _nuxt_WgpzvLzv_js, _nuxt_WgpzvLzv_js_len},
};

const int cFileSystemCount = sizeof(cFileSystem)/sizeof(cFileSystem[0]);

const CFileEntry* findCFileSystem(const char* name);
