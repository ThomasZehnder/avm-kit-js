// Auto-generated main filesystem header

#include "fs/_200_html.h"
#include "fs/_404_html.h"
#include "fs/favicon_ico.h"
#include "fs/index_html.h"
#include "fs/robots_txt.h"
#include "fs/_nuxt_builds_latest_json.h"
#include "fs/_nuxt_builds_meta_448689d2_7bf0_42b6_81af_5f49b1fd4d1c_json.h"
#include "fs/_nuxt_ButyJc4N_js.h"
#include "fs/_nuxt_CDZDShYX_js.h"
#include "fs/_nuxt_entry_CbRW_jMo_css.h"
#include "fs/_nuxt_error_404_BLrjNXsr_css.h"
#include "fs/_nuxt_error_500_DLkAwcfL_css.h"
#include "fs/_nuxt_tg33wtwT_js.h"

typedef struct {
    const char* name;
    const unsigned char* data;
    unsigned int len;
} CFileEntry;

const CFileEntry cFileSystem[] = {
    {"200.html", _200_html, _200_html_len},
    {"404.html", _404_html, _404_html_len},
    {"favicon.ico", favicon_ico, favicon_ico_len},
    {"index.html", index_html, index_html_len},
    {"robots.txt", robots_txt, robots_txt_len},
    {"_nuxt/builds/latest.json", _nuxt_builds_latest_json, _nuxt_builds_latest_json_len},
    {"_nuxt/builds/meta/448689d2-7bf0-42b6-81af-5f49b1fd4d1c.json", _nuxt_builds_meta_448689d2_7bf0_42b6_81af_5f49b1fd4d1c_json, _nuxt_builds_meta_448689d2_7bf0_42b6_81af_5f49b1fd4d1c_json_len},
    {"_nuxt/ButyJc4N.js", _nuxt_ButyJc4N_js, _nuxt_ButyJc4N_js_len},
    {"_nuxt/CDZDShYX.js", _nuxt_CDZDShYX_js, _nuxt_CDZDShYX_js_len},
    {"_nuxt/entry.CbRW-jMo.css", _nuxt_entry_CbRW_jMo_css, _nuxt_entry_CbRW_jMo_css_len},
    {"_nuxt/error-404.BLrjNXsr.css", _nuxt_error_404_BLrjNXsr_css, _nuxt_error_404_BLrjNXsr_css_len},
    {"_nuxt/error-500.DLkAwcfL.css", _nuxt_error_500_DLkAwcfL_css, _nuxt_error_500_DLkAwcfL_css_len},
    {"_nuxt/tg33wtwT.js", _nuxt_tg33wtwT_js, _nuxt_tg33wtwT_js_len},
};

const int cFileSystemCount = sizeof(cFileSystem)/sizeof(cFileSystem[0]);

const CFileEntry* findCFileSystem(const char* name);
