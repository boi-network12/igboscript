// src/frameworks.js
const { translations } = require("../constant/TranslationConstant");

const frameworkPresets = {
  express: {
    additionalTranslations: {
      "ngwaExpress": "express",
      "jiNgwa": "use",
      "njikwa": "middleware",
      "ụzọGet": "get",
      "ụzọPost": "post",
      "ụzọPut": "put",
      "ụzọDelete": "delete",
      "nzipụtaJSON": "res.json",
      "nzipụtaStatus": "res.status",
      "arịrịọQuery": "req.query",
      "arịrịọBody": "req.body",
      "arịrịọParams": "req.params"
    },
    // Express-specific semicolon rules
    semicolonRules: {
      skipAfter: ["nzipụtaJSON", "nzipụtaStatus", "ṅaa"]
    }
  },
  
  react: {
    additionalTranslations: {
      "jiSteeti": "useState",
      "jiMmetụta": "useEffect",
      "jiNcheta": "useMemo",
      "jiNlere": "useRef",
      "jiNgbanwe": "useReducer",
      "jiỌnọdụ": "useContext",
      "komponenti": "component",
      "iberibe": "props",
      "steeti": "state",
      "na-agba": "render"
    },
    jsxProtection: true
  },
  
  nextjs: {
    additionalTranslations: {
      "peeji": "page",
      "ụzọAPI": "api",
      "nwetakwaData": "getServerSideProps",
      "nwetakwaStaticData": "getStaticProps",
      "nkeNjem": "router",
      "njem": "useRouter",
      "njikọ": "Link"
    },
    pageConventions: true
  }
};

function getFrameworkPreset(detectedFramework) {
  return frameworkPresets[detectedFramework] || {};
}

module.exports = { frameworkPresets, getFrameworkPreset };