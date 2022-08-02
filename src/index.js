/*eslint no-useless-escape: "off"*/

// CONSTS
const KEYWORDS = [
	"include",
	"as",
	"public",
	"struct",
	"break",
	"continue",
	"action",
	"return",
	"if",
	"else",
	"for",
	"in",
	"while",
	"addTo",
	"remove",
	"lengthOf",
	"notEmpty",
	"hasProp",
	"toStr",
	"toNum",
];
const TYPES = ["bool", "num", "str", "obj"];

// CODEMIRROR
function codeMirror() {
	return {
		start: [
			{ token: "comment", regex: /\s*#[^\n\r]*/ },
			{
				token: "keyword",
				regex: new RegExp(`\\b(${KEYWORDS.join("|")})\\b`),
			},
			{
				token: ["def", null],
				regex: /\b([_a-zA-Z][_a-zA-Z0-9]*)(\()/,
			},
			{
				token: "type",
				regex: new RegExp(`\\b(${TYPES.join("|")})\\b`),
			},
			{
				token: "atom",
				regex: new RegExp(`\\b(true|false)\\b`),
			},
			{
				token: "atom",
				regex: new RegExp(`[A-Z]+(?=\\.)`),
			},
			{ token: "variable", regex: /\b[_a-zA-Z][_a-zA-Z0-9]*\b/ },
			{ token: "number", regex: /\d+\.?\d*/ },
			{ token: "string", regex: /("[^"\n\r]*")|('[^'\n\r]*')/ },

			{ regex: /[\{\[\(]/, indent: true },
			{ regex: /[\}\]\)]/, dedent: true },
		],
		meta: {
			lineComment: "#",
			fold: "brace",
		},
	};
}

// HIGHLIGHT JS
function highlightJS(hljs) {
	return {
		case_insensitive: true, // language is case-insensitive
		contains: [
			hljs.HASH_COMMENT_MODE,
			{
				className: "keyword",
				variants: [{ begin: `\\b(${KEYWORDS.join("|")})\\b` }],
			},
			{
				className: "built_in",
				variants: [{ begin: "\\b[_a-zA-Z][_a-zA-Z0-9]*(?=\\()" }],
			},
			{
				className: "title",
				variants: [{ begin: `\\b(${TYPES.join("|")})\\b` }],
			},
			{
				className: "literal",
				variants: [
					{
						begin: `\\b(true|false)\\b`,
					},
				],
			},
			{
				className: "literal",
				variants: [
					{
						begin: `[A-Z]+(?=\\.)`,
					},
				],
			},
			{
				className: "variable",
				variants: [{ begin: "\\b[_a-zA-Z][_a-zA-Z0-9]*\\b" }],
			},
			{ className: "number", variants: [{ begin: "\\d+\\.?\\d*" }] },
			{
				className: "string",
				variants: [{ begin: `("[^"\\n\\r]*")|('[^'\\n\\r]*')` }],
			},
		],
	};
}

module.exports = { codeMirror, highlightJS };
