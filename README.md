# Igboscript 🇳🇬

**Ime koodu n'asụsụ Igbo | Code in the Igbo Language**

Igboscript is a lightweight programming language that allows you to write JavaScript using Igbo syntax and keywords. It compiles cleanly to JavaScript, enabling you to build applications while celebrating the Igbo language.

**Tinye ya | Install it:**
```bash
npm install -g igboscript
```
# 📦 Kedu ihe bụ Igboscript? (What is Igboscript?)

Igboscript is a superset of JavaScript. If you know JavaScript, you already know Igboscript! We simply map Igbo keywords to their JavaScript equivalents, allowing you to code in a more familiar and expressive way.

**Example:**

```bash
// Instead of:
console.log("Hello World");

// You can write:
pụta("Ndeewo Ụwa!");
```

# 🚀 Malite ngwa ngwa (Quick Start)

1. Create your first Igboscript file (```hello.is```):

```bash
pụta("Ndeewo Ụwa!");

ka ọnụọgụ = 10;
ka aha = "Chioma";

ọ bụrụ (ọnụọgụ > 5) {
    pụta(aha + ", ọnụọgụ gị dị elu!");
}
```

2. Run it from the terminal:

```bash
igboscript hello.is
```
3. See the output:

```bash 
Ndeewo Ụwa!
Chioma, ọnụọgụ gị dị elu!
```

# 🔧 Ojiji na oru ngo (Usage in a Project)

You can also use Igboscript directly inside your Node.js project.

1. install it locally

```bash
npm install igboscript
```

2. Require the loader at the top of your main file (e.g., ```index.js``` or ```app.js```) to enable ```.is``` import support:

```bash
require("igboscript/src/loader");
```

3. Now, you can import Igboscript files directly!

```bash
// This will import and run `./routes/user.is`
require("./routes/user.is");
```

# 🌐 Framework Support

Igboscript automatically detects and supports popular JavaScript frameworks:

```bash
nwetakwa ngwaExpress na "express";

ka ngwa = ngwaExpress();

ngwa.ụzọGet("/", (arịrịọ, nzipụta) => {
    nzipụta.json({ ozi: "Ndeewo n'ụlọ ọrụ Igbo!" });
});

ngwa.ṅaa(3000, () => {
    pụta("Ngwa na-arụ ọrụ na port 3000");
});
```

# React Component Example (`Component.is`)

```bash
 nwetakwa React na "react";
nwetakwa { jiSteeti } na "react";

ọrụ NwaAkwụkwọ({ iberibe }) {
    ka [aha, setAha] = jiSteeti("");
    
    laghachi (
        <div>
            <ntinye 
                ụdịNjikwa={(e) => setAha(e.nke.ntinye)} 
                ebeNchekwa="text" 
                okwu="Tinye aha gị"
                uru={aha}
            />
            <p>Ndeewo, {aha}!</p>
        </div>
    );
}
```

# ⚡ CLI Commands

Igboscript provides a powerful CLI with multiple commands:

```bash
# Run a single file
igboscript app.is

# Watch for changes
igboscript src/ --watch

# Debug mode (shows translated code)
igboscript app.is --debug

# Build project to dist folder
igboscript src/ --build --out-dir=dist/

# Force framework context
igboscript api/ --framework=express

# List all available keywords
igboscript --list-keywords

# Show help
igboscript --help
```


# 📖 Nkọwa Okwu (Keyword Reference)

# Igboscript to JavaScript Keyword Mappings

## Core Keywords
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| pụta | console.log | Print / Output |
| ka | let | Variable declaration |
| nye | let | Variable declaration (synonym) |
| nke | const | Constant declaration |
| nwere | var | Variable declaration (older) |
| oBuru | if | If conditional |
| maOBuru | else if | Else if conditional |
| oBughi | else | Else conditional |
| maka | for | For loop |
| mgbe | while | While loop |
| ọrụ | function | Function declaration |
| laghachi | return | Return value |
| nkwụsị | break | Break loop/switch |
| gaa | continue | Continue loop |
| dịka | switch | Switch statement |
| nkeji | case | Case in switch |
| ndabara | default | Default in switch |
| klas | class | Class declaration |
| welite | extends | Class inheritance |
| nlele | debugger | Debugger statement |
| naEzi | true | Boolean true |
| naỤgha | false | Boolean false |
| efu | null | Null value |
| anọghị | undefined | Undefined value |
| ụlọ | prototype | Object prototype |
| nkea | this | Current object context |
| dị | typeof | Type of value |
| ụdị | instanceof | Instance check |
| ọ bụghị | ! | Logical NOT |
| ma | && | Logical AND |
| maọbụ | \|\| | Logical OR |
| nọrọ | await | Await asynchronous result |
| nkwado | async | Asynchronous function |
| kwe | yield | Yield in generator |
| ịṅa | in | Property check |
| nwapụ | try | Try block |
| jide | catch | Catch block |
| tufuo | throw | Throw error |
| ọhụrụ | new | Create new instance |

## Import/Export
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| nwetakwa | import | Import module |
| na | from | Specify module source |
| site | as | Alias imported module |
| nwapụta | export | Export module |
| nwapụtaNke | export default | Default export |
| nwapụtaNwere | export const | Named export |
| nyeaka | require | CommonJS import |
| modul | module | Module object |

*Example Usage*:
- `nwetakwa X na "module" site Y` → `import X from "module" as Y`
- `nwapụtaNke X` → `export default X`
- `nyeaka("module")` → `require("module")`

## Array Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| tinye | push | Add to end |
| wepụ | pop | Remove from end |
| nyefee | shift | Remove from start |
| tinyeN'ihu | unshift | Add to start |
| haziUdi | map | Transform each element |
| nyo | filter | Filter items |
| belata | reduce | Reduce to single value |
| chọọ | find | Find first match |
| hazi | Array.from | Create array from iterable |
| haziNdepụta | join | Join array into string |
| kewapụ | slice | Extract portion of array |

## String Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| kewaa | split | Split string into array |
| ncha | trim | Remove whitespace |
| kewapụta | replace | Replace string content |
| chọta | includes | Check if string contains |
| ịkọ | concat | Concatenate strings |
| nchọta | search | Search for pattern |
| gbanwee | toLowerCase | Convert to lowercase |
| gbanweeElu | toUpperCase | Convert to uppercase |

## Object Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| ịkpa | keys | Get object keys |
| ịkpaUru | values | Get object values |
| ịkpaNtinye | entries | Get object key-value pairs |
| hazie | assign | Copy properties to object |

## Math Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| kọọ | floor | Round down |
| ịgụ | round | Round to nearest |
| elu | ceil | Round up |
| ọṅụ | random | Generate random number |
| nọmba | parseInt | Parse integer |
| nọmbaN'ọnụ | parseFloat | Parse floating-point number |

## Timing Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| bido | setTimeout | Set one-time delay |
| kwụsị | clearTimeout | Clear timeout |
| bidoOge | setInterval | Set repeated interval |
| kwụsịOge | clearInterval | Clear interval |

## File System Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| dee | writeFileSync | Write file synchronously |
| gụọ | readFileSync | Read file synchronously |
| sistemụ | fs | File system module |

## HTTP Methods
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| nweta | get | HTTP GET request |
| ziga | post | HTTP POST request |
| hapụ | delete | HTTP DELETE request |
| ụlọọrụ | http | HTTP module |
| ụlọọrụS | https | HTTPS module |

## Express Keywords
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| ngwaExpress | express | Express framework |
| jiNgwa | use | Use middleware |
| njikwa | middleware | Middleware function |
| ụzọGet | get | GET route |
| ụzọPost | post | POST route |
| ụzọPut | put | PUT route |
| ụzọDelete | delete | DELETE route |
| arịrịọ | req | Request object |
| nzipụta | res | Response object |
| arịrịọQuery | req.query | Query parameters |
| arịrịọBody | req.body | Request body |
| arịrịọParams | req.params | URL parameters |
| nzipụtaStatus | res.status | Set status code |
| nzipụtaJSON | res.json | Send JSON response |
| nzipụta | res.send | Send response |
| nzipụtaHeader | res.setHeader | Set response header |
| ṅaa | listen | Start server |
| ọdụ | port | Server port |

## React/Next.js Keywords
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| jiSteeti | useState | State hook |
| jiMmetụta | useEffect | Effect hook |
| jiNcheta | useMemo | Memoization hook |
| jiNlere | useRef | Reference hook |
| jiNgbanwe | useReducer | Reducer hook |
| jiỌnọdụ | useContext | Context hook |
| komponenti | component | React component |
| iberibe | props | Component properties |
| steeti | state | Component state |
| mmetụta | effect | Side effect |
| ncheta | memo | Memoized value |
| nlere | ref | Reference to DOM/value |
| ọnọdụ | context | Context for data sharing |
| na-agba | render | Render component |
| tagi | < | Opening HTML tag |
| tagiMechie | > | Closing HTML tag |
| mechieOnwe | /> | Self-closing tag |
| okwu | className | CSS class name |
| ụdịMmetụta | onClick | Click event handler |
| ụdịNjikwa | onChange | Change event handler |
| peeji | page | Next.js page |
| ụzọAPI | api | Next.js API route |
| nwetakwaData | getServerSideProps | Server-side data fetching |
| nwetakwaStaticData | getStaticProps | Static data fetching |
| nwetakwaStaticỤzọ | getStaticPaths | Static path generation |
| nkeNjem | router | Next.js router |
| njem | useRouter | Router hook |
| njikọ | Link | Next.js link component |

## Miscellaneous
| Igboscript | JavaScript | Meaning |
|------------|------------|---------|
| ajụjụ | question | Readline question |
| mechie | close | Close readline interface |
| nhapụta | createInterface | Create readline interface |
| ntinye | input | Readline input |
| mmepụta | output | Readline output |
| ịkpuchi | JSON.stringify | Convert to JSON string |
| ịkpuba | JSON.parse | Parse JSON string |
| ozi | message | Response message |
| ok | success | Success status |
| ndi | users | Users data |
| onye | user | Single user |
| obodo | city | City data |
| aha | name | Name field |
| id | id | Identifier |
| nkePromise | Promise | Promise object |
| kwePromise | resolve | Resolve promise |
| jụPromise | reject | Reject promise |
| nkeMap | Map | Map data structure |
| nkeSet | Set | Set data structure |
| nkeWeakMap | WeakMap | WeakMap data structure |
| nkeWeakSet | WeakSet | WeakSet data structure |
| nkeArrayBuffer | ArrayBuffer | ArrayBuffer object |
| nkeDataView | DataView | DataView object |

## Notes
- Synonyms like `ka` and `nye` both map to `let`, reflecting flexibility in Igboscript variable declarations.
- The `translations` object uses `oBuru`, `maOBuru`, and `oBughi` instead of the original `ọ bụrụ`, `ma ọ bụrụ`, and `ọ bụghị`. The updated tables use the new terms for consistency.
- Complex import/export patterns (e.g., `nwetakwa X na "module"`) are simplified into individual keywords (`nwetakwa`, `na`, `site`) with examples provided.
- New categories (String Methods, Object Methods, etc.) were added to accommodate the expanded keyword list.
- Meanings are derived from JavaScript functionality, ensuring clarity for each term.

_This table will expand as the language grows!_

# 🔍 Advanced Features

## Framework Detection

Igboscript automatically detects your project framework and applies appropriate translations:

- **Express**: Detects from `package.json` or file paths like `/routes/` or `/api/`
- **React**: Detects from   `react` dependency or `useState` usage
- **Next.js**: Detects from `next` dependency or `/pages/` folder structure
- `Vanilla`: Default for plain Node.js projects

## Syntax Highlighting

VS Code extension provides full syntax highlighting for `.is` files with:

- Keyword highlighting in Igbo
- String and template literal support
- Comment syntax
- JSX support for React components

## Build System
Compile your entire project:

```bash
# Build all .is files to ./dist
igboscript src/ --build --out-dir=dist/

# Watch and rebuild on changes
igboscript src/ --watch --build
```




# 🤝 Ntụnye aka (Contributing)

Nnoo! (Welcome!) We welcome contributions from everyone. Whether you want to add new keywords, improve the compiler, or write documentation, your help is valued.

1. Fork the repository.
2. Create a feature branch: `git checkout -b new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin new-feature`.
5. Submit a pull request.

## Development Setup

```bash
# Clone and install
git clone https://github.com/boi-network12/igboscript.git
cd igboscript
npm install

# Run tests
npm test

# Development mode
npm run dev
```

# 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

# 🔗 Njikọ (Links)

- **GitHub Repository**: [Igboscript](https://github.com/boi-network12/igboscript)
- **NPM Package**: [npmjs.com/package/igboscript](https://www.npmjs.com/package/igboscript)
- **Issue Tracker**: [GitHub Issues](https://github.com/boi-network12/igboscript/issues)
- **VS Code Extension**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=kamdi.igboscript) *(Coming soon)*

## 🎯 Roadmap

- [x] Core JavaScript keyword translations
- [x] Express.js framework support
- [x] React hooks support
- [x] CLI with watch/build modes
- [ ] VS Code syntax highlighting
- [ ] TypeScript support
- [ ] More framework integrations (Vue, Svelte)
- [ ] WebAssembly compilation
- [ ] Mobile app support
- [ ] Online playground

## Kee koodu n'asụsụ ala gị! | Code in your native language!


---

# Igboscript Update Notes 🇳🇬

**Ime koodu n'asụsụ Igbo | Code in the Igbo Language**

## 📢 What's New in This Update

1. **Framework Showcase**: Added dedicated sections for Express and React examples to demonstrate Igboscript's compatibility with popular frameworks.
2. **Enhanced CLI**: Complete documentation of all CLI commands and options for a seamless developer experience.
3. **Comprehensive Keywords**: Expanded keyword table with framework-specific terms to support diverse use cases.
4. **Advanced Features**: Documented framework detection, syntax highlighting, and build system for robust project integration.
5. **Development Setup**: Added contributor development instructions to encourage community participation.
6. **Roadmap**: Outlined project direction with completed and planned features for transparency.
7. **Better Links**: Improved external links section for easier access to resources.
8. **Visual Improvements**: Enhanced formatting with emojis, clearer section breaks, and a polished look.
