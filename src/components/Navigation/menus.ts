type MenuItem = {
  id: number;
  title: string;
  to: string;
};

type Menu = {
  en: MenuItem[];
  np: MenuItem[];
};

export const publicMenu: Menu = {
  en: [
    { id: 100, title: "Home", to: "/#home" },
    { id: 200, title: "Features", to: "/#features" },
    { id: 300, title: "Get the app", to: "/#get_the_app" },
  ],
  np: [
    { id: 100, title: "गृहपृष्ठ", to: "/#home" },
    { id: 200, title: "विशेषताहरु", to: "/#features" },
    { id: 300, title: "एप डाउनलोड गर्नुहोस्", to: "/#get_the_app" },
  ],
};

export const privateMenu: Menu = {
  en: [
    { id: 1, title: "Home", to: "/dashboard" },
    { id: 2, title: "About Us", to: "about" },
    { id: 3, title: "Genealogy Tree", to: "banshwali" },
    // { id: 3, title: "Banshawali Tree", to: "/banshwali" },
    // { id: 4, title: "My Bansaj", to: "/family" },
    { id: 4, title: "Gallery", to: "/gallery" },
    { id: 5, title: "Contributions", to: "/contributions" },
    { id: 6, title: "Articles", to: "article" },
    // { id: 6, title: "Alekh", to: "/alekh" },
    // { id: 7, title: "Bansaj Yogdan", to: "/yogdan" },
    { id: 8, title: "Downloads", to: "/documents" },
    { id: 9, title: "Notice", to: "/notice" },
  ],

  np: [
    { id: 1, title: "गृहपृष्ठ", to: "/dashboard" },
    { id: 2, title: "हाम्रो बारेमा", to: "about" },
    { id: 3, title: "बंशवृक्ष", to: "banshwali" },
    { id: 4, title: "ग्यालेरी", to: "/gallery" },
    // { id: 3, title: "बंशावली चार्ट ", to: "/banshwali" },
    // { id: 4, title: "मेरो बंशज", to: "/family" },
    { id: 5, title: "योगदान", to: "/contributions" },
    { id: 6, title: "लेख", to: "article" },
    // { id: 6, title: "आलेख ", to: "/alekh" },
    // { id: 7, title: "बंशज योगदान", to: "/yogdan" },
    { id: 8, title: "डाउनलोड", to: "/documents" },
    { id: 9, title: "सूचना", to: "/notice" },
  ],
};
export const banshwaliMenu = {
  en: [
    { id: 92, title: "Full Genealogy Tree", to: "/banshwali" },
    { id: 93, title: "My Genealogy Tree", to: "/family" },
  ],
  np: [
    { id: 92, title: "पूर्ण बंशवृक्ष", to: "/banshwali" },
    { id: 93, title: "मेरो बंशवृक्ष", to: "/family" },
  ],
};

export const articleMenus = {
  en: [
    { id: 11, title: "Alekh", to: "/alekh" },
    { id: 10, title: "Literatures", to: "/literature" },
    { id: 12, title: "Bansaj Yogdan", to: "/yogdan" },
  ],
  np: [
    { id: 11, title: "आलेख", to: "/alekh" },
    { id: 10, title: "साहित्य संगालो", to: "/literature" },
    { id: 12, title: "वंशज योगदान", to: "/yogdan" },
  ],
};

export const aboutMenu = {
  en: [
    { id: 20, title: "About Organization", to: "/about" },
    { id: 25, title: "Well Wishes", to: "/about/well-wishes" },
    { id: 21, title: "Chairman's Message", to: "/about/message-from-chairman" },
    {
      id: 23,
      title: "Banshwali Editor's Message",
      to: "/about/message-from-banshwali-editor",
    },
    { id: 22, title: "Comittees", to: "committee" },
  ],
  np: [
    { id: 20, title: "संस्थाको बारेमा", to: "/about" },
    { id: 25, title: "शुभकामना", to: "/about/well-wishes" },
    { id: 23, title: "अध्यक्षको संदेश ", to: "/about/message-from-chairman" },
    {
      id: 24,
      title: "बंशावली संयोजकको सन्देश",
      to: "/about/message-from-banshwali-editor",
    },
    { id: 22, title: "समितिहरु", to: "committee" },
  ],
};

export const committeeMenu = {
  en: [
    // { id: 32, title: "Board of Directors", to: "/bod" },
    {
      id: 31,
      title: "Central Comittee",
      to: "/about/comittee/central-comittee",
    },
    {
      id: 32,
      title: "Province Comittee",
      to: "/about/comittee/province-comittee",
    },
    {
      id: 33,
      title: "District Comittee",
      to: "/about/comittee/district-comittee",
    },
    {
      id: 34,
      title: "Banshwali Comittee",
      to: "/about/comittee/banshwali-comittee",
    },
    {
      id: 35,
      title: "Finance Comittee",
      to: "/about/comittee/finance-comittee",
    },
    {
      id: 35,
      title: "Comittee History",
      to: "/about/comittee/comittee-history",
    },
    // { id: 31, title: "Audit Comittee", to: "/audit-comittee" },
  ],
  np: [
    // { id: 32, title: "संचालक समिति", to: "/bod" },

    {
      id: 31,
      title: "केन्द्रिय समिति",
      to: "/about/comittee/central-comittee",
    },
    { id: 32, title: "प्रदेश समिति", to: "/about/comittee/province-comittee" },
    { id: 33, title: "जिल्ला समिति", to: "/about/comittee/district-comittee" },
    {
      id: 34,
      title: "वंशावली समिति ",
      to: "/about/comittee/banshwali-comittee",
    },
    {
      id: 35,
      title: "लेखा समिति ",
      to: "/about/comittee/finance-comittee",
    },
    // { id: 31, title: "लेखा समिति", to: "/audit-comittee" },
  ],
};

export const profileMenu = {
  en: [
    { id: 72, title: "Dashboard", to: "/profile" },
    { id: 73, title: "Edit Profile", to: "/profile/edit" },
    { id: 74, title: "ID Card", to: "/profile/id_card" },
    { id: 75, title: "Merge Requests", to: "/profile/merge" },
    { id: 76, title: "Contributions", to: "/profile/contributions" },
    { id: 77, title: "Edit Trees", to: "/profile/tree-edit" },
  ],
  np: [
    { id: 72, title: "ड्यासबोर्ड", to: "/profile" },
    { id: 73, title: "प्रोफाइल सम्पादन", to: "/profile/edit" },
    { id: 74, title: "परिचय-पत्र", to: "/profile/id_card" },
    { id: 75, title: "मर्ज अनुरोध ", to: "/profile/merge" },
    { id: 76, title: "योगदानहरू", to: "/profile/contributions" },
    { id: 77, title: "वंशावली वृक्ष सम्पादन", to: "/profile/tree-edit" },
  ],
};
