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

# 📖 Nkọwa Okwu (Keyword Reference)

# Igboscript Keywords

| **Igboscript** | **JavaScript** | **Meaning**          |
|----------------|----------------|----------------------|
| `pụta`          | `console.log`    | Print / Output       |
| `ka`             | `let`            | Variable declaration |
| `ọ bụrụ`        | `if`             | If conditional       |
| `ma ọ bụrụ`     | `else if`        | Else if conditional  |
| `ọ bụghị`        | `else`           | Else conditional     |
| `maka`           | `for`            | For loop             |
| `mgbe`           | `while`          | While loop           |
| `ọrụ`           | `function`       | Function             |

_This table will expand as the language grows!_

# 🤝 Ntụnye aka (Contributing)

Nnoo! (Welcome!) We welcome contributions from everyone. Whether you want to add new keywords, improve the compiler, or write documentation, your help is valued.

1. Fork the repository.
2. Create a feature branch: `git checkout -b new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin new-feature`.
5. Submit a pull request.

# 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

# 🔗 Njikọ (Links)

- **GitHub Repository**: [git hub repo ](https://github.com/boi-network12/igboscript.git)
- **Issue Tracker**: Please report bugs and suggest features here.

**Kee koodu n'asụsụ ala gị! | Code in your native language!**


---

### Key Improvements in this Draft:

1.  **Cultural Identity:** The Nigerian flag (🇳🇬) and consistent use of Igbo headings immediately establish a unique and proud identity.
2.  **Clarity:** It answers "What is this?" and "Why should I use it?" in the first few lines.
3.  **Visual Appeal:** Code blocks, tables, and emojis make it easy and enjoyable to read.
4.  **Action-Oriented:** The installation command is right at the top. The "Quick Start" section gets a user from zero to a running program in seconds.
5.  **Comprehensive:** It covers all use cases: global CLI usage and local project integration.
6.  **Community Focused:** The contributing section is inviting and clear, encouraging others to help the project grow.
7.  **Professional:** It includes all standard open-source project sections like License, Links, and a clear keyword reference table.

**Next Step:** Copy this into your `README.md` file, **don't forget to replace the GitHub repository link** with your actual URL, and you'll be ready to publish a truly professional npm package!