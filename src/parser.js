const chalk = require("chalk");
const { translations } = require("../constant/TranslationConstant");

function translate(code) {
  try {
    let jsCode = code.normalize("NFC");

    // Protect string literals, template literals, and JSX
    const stringPlaceholder = "__STRING__";
    const templatePlaceholder = "__TEMPLATE__";
    const jsxPlaceholder = "__JSX__";
    const strings = [];
    const templates = [];
    const jsxFragments = [];

    // Protect template literals FIRST
    jsCode = jsCode.replace(/`([^`\\]*(?:\\.[^`\\]*)*)`/g, (match, p1) => {
      templates.push(p1);
      return `\`${templatePlaceholder}${templates.length - 1}\``;
    });

    // Protect JSX fragments
    jsCode = jsCode.replace(/(tagi[^tagiMechie]*tagiMechie|mechieOnwe)/g, (match) => {
      jsxFragments.push(match.replace("tagi", "<").replace("tagiMechie", ">").replace("mechieOnwe", "/>"));
      return `${jsxPlaceholder}${jsxFragments.length - 1}`;
    });

    // Protect string literals
    jsCode = jsCode.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
      strings.push(p1);
      return `"${stringPlaceholder}${strings.length - 1}"`;
    });

    // FRAMEWORK-SPECIFIC TRANSLATIONS FIRST
    const expressTranslations = {
      "ngwaExpress": "express",
      "jiNgwa": "use",
      "njikwa": "middleware",
      "ụzọGet": "get",
      "ụzọPost": "post",
      "ụzọPut": "put",
      "ụzọDelete": "delete",
      "arịrịọ": "req",
      "nzipụta": "res",
      "arịrịọQuery": "req.query",
      "arịrịọBody": "req.body",
      "arịrịọParams": "req.params",
      "ozi": "message",
      "ok": "success",
      "ndi": "users",
      "onye": "user",
      "obodo": "city",
      "aha": "name",
      "id": "id"
    };

    // Apply Express-specific translations first
    Object.entries(expressTranslations).forEach(([igbo, js]) => {
      const escapedIgbo = igbo.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escapedIgbo}(?![a-zA-Z0-9])`, "g");
      jsCode = jsCode.replace(regex, `$1${js}`);
    });

    // *** ENHANCED IMPORT TRANSLATION - Handle ALL import patterns ***
    
    // Pattern 1: nwetakwa express na "express"
    jsCode = jsCode.replace(
      /\bnwetakwa\s+(\w+)\s+na\s+"([^"]+)"\s*;?/gi,
      'const $1 = require("$2");'
    );
    
    // Pattern 2: nwetakwa * na "module" site X
    jsCode = jsCode.replace(
      /\bnwetakwa\s*\*\s+na\s+"([^"]+)"\s+site\s+(\w+)\s*;?/gi,
      'const $2 = require("$1");'
    );
    
    // Pattern 3: nwetakwa "module" site X (default import)
    jsCode = jsCode.replace(
      /\bnwetakwa\s+"([^"]+)"\s+site\s+(\w+)\s*;?/gi,
      'const $2 = require("$1");'
    );
    
    // Pattern 4: Direct module name without site keyword
    jsCode = jsCode.replace(
      /\bnwetakwa\s+(\w+)\s+na\s+"(\w+)"\s*;?/gi,
      'const $1 = require("$2");'
    );
    
    // Pattern 5: Handle "import X as X" style (if user wrote it that way)
    jsCode = jsCode.replace(
      /import\s+(\w+)\s+as\s+(\w+);?/gi,
      'const $1 = require("$1");'
    );

    // Handle export statements
    jsCode = jsCode.replace(
      /\bnwapụtaNke\s+(\w+)\s*;?/gi,
      'module.exports = $1;'
    );
    jsCode = jsCode.replace(
      /\bnwapụtaNwere\s+(\w+)\s*;?/gi,
      'exports.$1 = $1;'
    );
    jsCode = jsCode.replace(
      /\bnwapụta\s+default\s*\(\s*(\w+)\s*\)\s*;?/gi,
      'module.exports = $1;'
    );
    jsCode = jsCode.replace(
      /\bexport\s+default\s+(\w+)\s*;?/gi,
      'module.exports = $1;'
    );

    // IMPROVED: Handle Express method calls with better context awareness
    const expressMethods = {
      'nzipụtaStatus': 'status',
      'nzipụtaJSON': 'json',
      'nzipụta': 'send',
      'nzipụtaHeader': 'setHeader'
    };

    // Replace method names in method chains and standalone calls
    Object.entries(expressMethods).forEach(([igbo, js]) => {
      const escapedIgbo = igbo.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
      
      // Handle method chaining: res.status(200).json(data)
      jsCode = jsCode.replace(
        new RegExp(`(nzipụta|res)\\.${escapedIgbo}\\s*\\(([^)]*)\\)`, "gi"),
        `$1.${js}($2)`
      );
      
      // Handle chained methods: res.status(200).json(data)
      jsCode = jsCode.replace(
        new RegExp(`(nzipụta|res)\\.${escapedIgbo}\\s*\\(\\s*([^)]+)\\s*\\)\\s*\\.\\s*(${escapedIgbo})\\s*\\(([^)]*)\\)`, "gi"),
        `$1.${js}($2).$3($4)`
      );
    });

    // Handle array methods
    const arrayMethods = [
      { igbo: "tinye", js: "push" },
      { igbo: "wepụ", js: "pop" },
      { igbo: "nyefee", js: "shift" },
      { igbo: "tinyeN'ihu", js: "unshift" },
      { igbo: "haziUdi", js: "map" },
      { igbo: "nyo", js: "filter" },
      { igbo: "belata", js: "reduce" },
      { igbo: "chọọ", js: "find" },
      { igbo: "haziNdepụta", js: "join" }
    ];

    for (const { igbo, js } of arrayMethods) {
      const escapedIgbo = igbo.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
      jsCode = jsCode.replace(
        new RegExp(`(\\w+)\\.${escapedIgbo}\\s*\\(([^)]*)\\)`, "gi"),
        `$1.${js}($2)`
      );
      jsCode = jsCode.replace(
        new RegExp(`(\\w+)\\.${escapedIgbo}\\s*\\(\\s*\\)`, "gi"),
        `$1.${js}()`
      );
    }

    // Replace other general keywords (excluding Express and array methods)
    const sortedKeys = Object.keys(translations)
      .filter(key => !key.includes('tagi')) // Skip JSX tags
      .filter(key => !arrayMethods.some(method => method.igbo === key)) // Skip array methods
      .filter(key => !Object.keys(expressTranslations).includes(key)) // Skip Express translations
      .filter(key => !Object.keys(expressMethods).includes(key)) // Skip Express methods
      .sort((a, b) => b.length - a.length);

    for (const igbo of sortedKeys) {
      const jsEquivalent = translations[igbo];
      const escapedIgbo = igbo
        .replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&")
        .replace(/\s+/g, "\\s+");
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escapedIgbo}(?![a-zA-Z0-9])`, "gi");
      jsCode = jsCode.replace(regex, `$1${jsEquivalent}`);
    }

    // CRITICAL FIX: Remove semicolons inside object literals
    // Fix: { key: value; } → { key: value }
    jsCode = jsCode.replace(/([{,]\s*[\w]+:\s*[^,}]+);(?=[,}])/gi, '$1');
    
    // Fix: ...newUser; → ...newUser
    jsCode = jsCode.replace(/(\.\.\.\w+);/gi, '$1');
    
    // Fix specific issues
    jsCode = jsCode.replace(/(\w+)\.nke\.length/gi, '$1.length');
    jsCode = jsCode.replace(/modul\.nwapụta\s+default\s*\(([^)]+)\)/gi, 'module.exports = $1');
    jsCode = jsCode.replace(/nwetakwa\s+(\w+)\s+site\s+\w+;/gi, 'const $1 = require("$1");');

    // Fix Number.parseInt translation
    jsCode = jsCode.replace(/nọmba\s*\(\s*([^)]+)\s*\)/gi, 'Number.parseInt($1)');

    // Restore protected content
    jsCode = jsCode.replace(new RegExp(`"${stringPlaceholder}(\\d+)"`, "gi"), (match, index) => {
      return `"${strings[index] || ''}"`;
    });
    
    jsCode = jsCode.replace(new RegExp(`\\\`${templatePlaceholder}(\\d+)\\\``, "gi"), (match, index) => {
      return `\`${templates[index] || ''}\``;
    });
    
    jsCode = jsCode.replace(new RegExp(`${jsxPlaceholder}(\\d+)`, "gi"), (match, index) => {
      return jsxFragments[index] || match;
    });

    // IMPROVED: Add missing app variable declaration
    if (jsCode.includes('express') && !jsCode.includes('const app =')) {
      const firstImportIndex = jsCode.indexOf('const express');
      if (firstImportIndex !== -1) {
        const appDeclaration = '\nconst app = express();\n';
        jsCode = jsCode.slice(0, firstImportIndex + 'const express'.length) + appDeclaration + jsCode.slice(firstImportIndex + 'const express'.length);
      }
    }

    // IMPROVED: Intelligent semicolon management - MORE CAREFUL
    const lines = jsCode.split("\n");
    const fixedLines = lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return line;

      // Skip lines that already end with semicolon or are structural
      if (
        trimmed.endsWith(";") ||
        trimmed.endsWith("{") ||
        trimmed.endsWith("}") ||
        trimmed.endsWith(",") ||
        trimmed.endsWith(")") || // Function calls
        trimmed.match(/^(const|let|var|function|if|else|for|while|switch|return|export|import|class)\b/) ||
        trimmed.includes("=>") ||
        trimmed.match(/^\/\/.*$/) || // Comments
        trimmed.match(/^\s*\//) ||   // Block comments
        // Skip method calls
        trimmed.includes('.json(') ||
        trimmed.includes('.status(') ||
        trimmed.includes('.send(') ||
        trimmed.includes('.listen(') ||
        // Skip object literals and array declarations
        (trimmed.includes('{') && trimmed.includes('}')) ||
        (trimmed.includes('[') && trimmed.includes(']'))
      ) {
        return line;
      }

      // Add semicolon only for standalone statements that need it
      if (
        // Variable assignments
        trimmed.includes('=') && !trimmed.includes('=>') && 
        !trimmed.includes('{') && !trimmed.includes('[') && 
        !trimmed.includes('(')
      ) {
        const indent = line.match(/^\s*/)[0];
        return indent + trimmed + ";";
      }

      return line;
    });

    jsCode = fixedLines.join("\n");

    // Final cleanup for Express app
    jsCode = jsCode.replace(
      /const\s+ngwaExpress\s*=\s*require\s*\(\s*"express"\s*\)/gi,
      'const express = require("express")'
    );

    // Ensure app variable is properly named
    jsCode = jsCode.replace(/const\s+ngwa\s*=/gi, 'const app = ');

    // Fix any remaining res.res or req.req patterns
    jsCode = jsCode.replace(/\bres\.res\b/gi, 'res');
    jsCode = jsCode.replace(/\breq\.req\b/gi, 'req');

    // FINAL FIX: Ensure proper export syntax
    jsCode = jsCode.replace(/export\s+default\s*\(\s*app\s*\)/gi, 'module.exports = app');
    jsCode = jsCode.replace(/export\s+default\s*\(\s*(\w+)\s*\)/gi, 'module.exports = $1');

    return jsCode;
  } catch (error) {
    throw new Error(`Nsogbu na ntụgharị: ${error.message} (Translation Error)`);
  }
}

module.exports = { translate };