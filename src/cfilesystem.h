// Auto-generated main filesystem header

#include "fs/i18n_de_json.h"
#include "fs/i18n_en_json.h"
#include "fs/i18n_kr_json.h"
#include "fs/images_flags_de_svg.h"
#include "fs/images_flags_en_svg.h"
#include "fs/images_flags_es_svg.h"
#include "fs/images_flags_fr_svg.h"
#include "fs/images_flags_it_svg.h"
#include "fs/images_flags_kr_svg.h"
#include "fs/index_html.h"
#include "fs/lamp_html.h"
#include "fs/languagedemo_html.h"
#include "fs/pagedemo_html.h"
#include "fs/pages_diagnosispage_html.h"
#include "fs/pages_loginpage_html.h"
#include "fs/pages_machineselectpage_html.h"
#include "fs/pages_monitorpage_html.h"
#include "fs/pages_servicepage_html.h"
#include "fs/services_currentstate_json.h"
#include "fs/services_filedirectory_html.h"
#include "fs/services_getdatabase.h"
#include "fs/services_getpassword.h"
#include "fs/services_messagelog_html.h"
#include "fs/test_includes_html.h"
#include "fs/toplineanimation_html.h"
#include "fs/websocketdemo_html.h"

typedef struct {
    const char* name;
    const unsigned char* data;
    unsigned int len;
} CFileEntry;

const CFileEntry cFileSystem[] = {
    {"i18n/de.json", i18n_de_json, i18n_de_json_len},
    {"i18n/en.json", i18n_en_json, i18n_en_json_len},
    {"i18n/kr.json", i18n_kr_json, i18n_kr_json_len},
    {"images/flags/de.svg", images_flags_de_svg, images_flags_de_svg_len},
    {"images/flags/en.svg", images_flags_en_svg, images_flags_en_svg_len},
    {"images/flags/es.svg", images_flags_es_svg, images_flags_es_svg_len},
    {"images/flags/fr.svg", images_flags_fr_svg, images_flags_fr_svg_len},
    {"images/flags/it.svg", images_flags_it_svg, images_flags_it_svg_len},
    {"images/flags/kr.svg", images_flags_kr_svg, images_flags_kr_svg_len},
    {"index.html", index_html, index_html_len},
    {"lamp.html", lamp_html, lamp_html_len},
    {"languagedemo.html", languagedemo_html, languagedemo_html_len},
    {"pagedemo.html", pagedemo_html, pagedemo_html_len},
    {"pages/diagnosispage.html", pages_diagnosispage_html, pages_diagnosispage_html_len},
    {"pages/loginpage.html", pages_loginpage_html, pages_loginpage_html_len},
    {"pages/machineselectpage.html", pages_machineselectpage_html, pages_machineselectpage_html_len},
    {"pages/monitorpage.html", pages_monitorpage_html, pages_monitorpage_html_len},
    {"pages/servicepage.html", pages_servicepage_html, pages_servicepage_html_len},
    {"services/currentstate.json", services_currentstate_json, services_currentstate_json_len},
    {"services/filedirectory.html", services_filedirectory_html, services_filedirectory_html_len},
    {"services/getdatabase", services_getdatabase, services_getdatabase_len},
    {"services/getpassword", services_getpassword, services_getpassword_len},
    {"services/messagelog.html", services_messagelog_html, services_messagelog_html_len},
    {"test-includes.html", test_includes_html, test_includes_html_len},
    {"toplineanimation.html", toplineanimation_html, toplineanimation_html_len},
    {"websocketdemo.html", websocketdemo_html, websocketdemo_html_len},
};

const int cFileSystemCount = sizeof(cFileSystem)/sizeof(cFileSystem[0]);

const CFileEntry* findCFileSystem(const char* name);
