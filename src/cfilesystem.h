// Auto-generated main filesystem header

#include "fs/css_customer_css.h"
#include "fs/css_customer_light_pico_css.h"
#include "fs/css_i18n_css.h"
#include "fs/css_pages_css.h"
#include "fs/css_pico_conditional_min_css.h"
#include "fs/i18n_de_json.h"
#include "fs/i18n_en_json.h"
#include "fs/i18n_kr_json.h"
#include "fs/images_diagnosis_icon_png.h"
#include "fs/images_favicon_png.h"
#include "fs/images_flags_de_svg.h"
#include "fs/images_flags_en_svg.h"
#include "fs/images_flags_es_svg.h"
#include "fs/images_flags_fr_svg.h"
#include "fs/images_flags_it_svg.h"
#include "fs/images_flags_kr_svg.h"
#include "fs/images_globe_icon_svg.h"
#include "fs/images_home_icon_png.h"
#include "fs/images_logout_icon_svg.h"
#include "fs/index_html.h"
#include "fs/js_diagnosispage_js.h"
#include "fs/js_monitorpage_js.h"
#include "fs/js_pico_connector_js.h"
#include "fs/js_pico_i18n_js.h"
#include "fs/js_pico_pages_js.h"
#include "fs/js_pico_theme_switcher_js.h"
#include "fs/lamp_html.h"
#include "fs/languagedemo_html.h"
#include "fs/pagedemo_html.h"
#include "fs/pages_diagnosispage_html.h"
#include "fs/pages_monitorpage_html.h"
#include "fs/pages_servicepage_html.h"
#include "fs/pages_startpage_html.h"
#include "fs/services_currentstate.h"
#include "fs/services_filedirectory_html.h"
#include "fs/services_getpassword.h"
#include "fs/services_messagelog_html.h"
#include "fs/test_includes_html.h"

typedef struct {
    const char* name;
    const unsigned char* data;
    unsigned int len;
} CFileEntry;

const CFileEntry cFileSystem[] = {
    {"css/customer.css", css_customer_css, css_customer_css_len},
    {"css/customer.light.pico.css", css_customer_light_pico_css, css_customer_light_pico_css_len},
    {"css/i18n.css", css_i18n_css, css_i18n_css_len},
    {"css/pages.css", css_pages_css, css_pages_css_len},
    {"css/pico.conditional.min.css", css_pico_conditional_min_css, css_pico_conditional_min_css_len},
    {"i18n/de.json", i18n_de_json, i18n_de_json_len},
    {"i18n/en.json", i18n_en_json, i18n_en_json_len},
    {"i18n/kr.json", i18n_kr_json, i18n_kr_json_len},
    {"images/diagnosis_icon.png", images_diagnosis_icon_png, images_diagnosis_icon_png_len},
    {"images/favicon.png", images_favicon_png, images_favicon_png_len},
    {"images/flags/de.svg", images_flags_de_svg, images_flags_de_svg_len},
    {"images/flags/en.svg", images_flags_en_svg, images_flags_en_svg_len},
    {"images/flags/es.svg", images_flags_es_svg, images_flags_es_svg_len},
    {"images/flags/fr.svg", images_flags_fr_svg, images_flags_fr_svg_len},
    {"images/flags/it.svg", images_flags_it_svg, images_flags_it_svg_len},
    {"images/flags/kr.svg", images_flags_kr_svg, images_flags_kr_svg_len},
    {"images/globe_icon.svg", images_globe_icon_svg, images_globe_icon_svg_len},
    {"images/home_icon.png", images_home_icon_png, images_home_icon_png_len},
    {"images/logout_icon.svg", images_logout_icon_svg, images_logout_icon_svg_len},
    {"index.html", index_html, index_html_len},
    {"js/diagnosispage.js", js_diagnosispage_js, js_diagnosispage_js_len},
    {"js/monitorpage.js", js_monitorpage_js, js_monitorpage_js_len},
    {"js/pico/connector.js", js_pico_connector_js, js_pico_connector_js_len},
    {"js/pico/i18n.js", js_pico_i18n_js, js_pico_i18n_js_len},
    {"js/pico/pages.js", js_pico_pages_js, js_pico_pages_js_len},
    {"js/pico/theme-switcher.js", js_pico_theme_switcher_js, js_pico_theme_switcher_js_len},
    {"lamp.html", lamp_html, lamp_html_len},
    {"languagedemo.html", languagedemo_html, languagedemo_html_len},
    {"pagedemo.html", pagedemo_html, pagedemo_html_len},
    {"pages/diagnosispage.html", pages_diagnosispage_html, pages_diagnosispage_html_len},
    {"pages/monitorpage.html", pages_monitorpage_html, pages_monitorpage_html_len},
    {"pages/servicepage.html", pages_servicepage_html, pages_servicepage_html_len},
    {"pages/startpage.html", pages_startpage_html, pages_startpage_html_len},
    {"services/currentstate", services_currentstate, services_currentstate_len},
    {"services/filedirectory.html", services_filedirectory_html, services_filedirectory_html_len},
    {"services/getpassword", services_getpassword, services_getpassword_len},
    {"services/messagelog.html", services_messagelog_html, services_messagelog_html_len},
    {"test-includes.html", test_includes_html, test_includes_html_len},
};

const int cFileSystemCount = sizeof(cFileSystem)/sizeof(cFileSystem[0]);

const CFileEntry* findCFileSystem(const char* name);
