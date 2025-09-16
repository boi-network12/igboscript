function translate(code) {
  return code
    .replace(/pụta/g, "console.log")  // Igbo "print"
    .replace(/mgbe/g, "if")           // Igbo "if"
    .replace(/ọzọ/g, "else");         // Igbo "else"
}

module.exports = { translate };
