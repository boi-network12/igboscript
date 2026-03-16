<p align="center">
  <h1 align="center">Igboscript 🇳🇬</h1>
  <p align="center">
    Write JavaScript using the Igbo Language
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/igboscript" />
  <img src="https://img.shields.io/npm/dw/igboscript" />
  <img src="https://img.shields.io/github/license/boi-network12/igboscript" />
</p>



# Igboscript 🇳🇬

> **Ime koodu n'asụsụ Igbo \| Code in the Igbo Language**

Igboscript is a lightweight programming language that allows developers
to write **JavaScript using Igbo syntax and keywords**. It compiles
cleanly to JavaScript, enabling you to build modern applications while
celebrating the **Igbo language and culture**.

The goal of Igboscript is to explore how programming can work using
**African languages**, while remaining fully compatible with the
JavaScript ecosystem.

------------------------------------------------------------------------

# 📦 Installation

Install globally using npm:

``` bash
npm install -g igboscript
```

Or install locally inside a project:

``` bash
npm install igboscript
```

------------------------------------------------------------------------

# 📖 What is Igboscript?

Igboscript is a **JavaScript superset**.

If you already know JavaScript, you already know **most of Igboscript**.

It simply maps **Igbo keywords to JavaScript equivalents**, allowing you
to write code in a more expressive and culturally familiar way.

### Example

JavaScript:

``` javascript
console.log("Hello World");
```

Igboscript:

``` javascript
pụta("Ndeewo Ụwa!");
```

Both produce the same output.

------------------------------------------------------------------------

# 🚀 Quick Start

Create your first Igboscript file:

`hello.is`

``` javascript
pụta("Ndeewo Ụwa!");

ka ọnụọgụ = 10;
ka aha = "Chioma";

ọ bụrụ (ọnụọgụ > 5) {
    pụta(aha + ", ọnụọgụ gị dị elu!");
}
```

Run it from your terminal:

``` bash
igboscript hello.is
```

Output:

    Ndeewo Ụwa!
    Chioma, ọnụọgụ gị dị elu!

------------------------------------------------------------------------

# 🔧 Using Igboscript in a Node.js Project

You can integrate Igboscript directly into existing **Node.js
applications**.

### 1 Install the package

``` bash
npm install igboscript
```

### 2 Enable the loader

Add this to the top of your entry file:

``` javascript
require("igboscript/src/loader");
```

### 3 Import `.is` files

``` javascript
require("./routes/user.is");
```

Node.js will automatically compile and execute the Igboscript file.

------------------------------------------------------------------------

# 🌐 Framework Support

Igboscript works with popular JavaScript frameworks.

### Express Example

``` javascript
nwetakwa ngwaExpress na "express";

ka ngwa = ngwaExpress();

ngwa.ụzọGet("/", (arịrịọ, nzipụta) => {
    nzipụta.json({ ozi: "Ndeewo n'ụlọ ọrụ Igbo!" });
});

ngwa.ṅaa(3000, () => {
    pụta("Ngwa na-arụ ọrụ na port 3000");
});
```

------------------------------------------------------------------------

# ⚛ React Example

`Component.is`

``` javascript
nwetakwa React na "react";
nwetakwa { jiSteeti } na "react";

ọrụ NwaAkwụkwọ({ iberibe }) {
    ka [aha, setAha] = jiSteeti("");

    laghachi (
        <div>
            <input
                onChange={(e) => setAha(e.target.value)}
                placeholder="Tinye aha gị"
                value={aha}
            />
            <p>Ndeewo, {aha}!</p>
        </div>
    );
}
```

------------------------------------------------------------------------

# ⚡ CLI Commands

``` bash
# Run a single file
igboscript app.is

# Watch for changes
igboscript src/ --watch

# Debug mode (shows translated JavaScript)
igboscript app.is --debug

# Build project to dist folder
igboscript src/ --build --out-dir=dist/

# Show help
igboscript --help
```

------------------------------------------------------------------------

# ⚙️ How It Works

Igboscript translates Igbo syntax into JavaScript before execution.

Workflow:

Igboscript (.is) → Translator → JavaScript → Executed by Node.js

Example:

Igboscript:

``` javascript
pụta("Ndeewo Ụwa")
```

Generated JavaScript:

``` javascript
console.log("Ndeewo Ụwa")
```

------------------------------------------------------------------------

# 🤝 Contributing

Nnoo! (Welcome!) Contributions are welcome.

1.  Fork the repository
2.  Create a branch

```{=html}
<!-- -->
```
    git checkout -b new-feature

3.  Commit changes

```{=html}
<!-- -->
```
    git commit -m "Add new feature"

4.  Push

```{=html}
<!-- -->
```
    git push origin new-feature

5.  Open a Pull Request

------------------------------------------------------------------------

# 👨🏾‍💻 Author

**Okolo Kamdilichukwu Samuel (Kamdi)**

GitHub: https://github.com/boi-network12\
Portfolio: https://kamdidev.vercel.app

------------------------------------------------------------------------

# 📜 License

MIT License

------------------------------------------------------------------------

# 🎯 Roadmap

-   Core Igbo keyword translations
-   CLI build and watch mode
-   Express.js support
-   React support
-   VS Code syntax highlighting
-   Online playground
-   More framework integrations

------------------------------------------------------------------------

## Kee koodu n'asụsụ ala gị!

**Code in your native language.**
