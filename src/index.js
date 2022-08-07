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
			{ token: "comment", regex: new RegExp(`\\s*#[^\\n\\r]*`) },
			{
				token: "keyword",
				regex: new RegExp(`\\b(${KEYWORDS.join("|")})\\b`),
			},
			{
				token: ["def"],
				regex: new RegExp(`\\b([_a-zA-Z][_a-zA-Z0-9]*)(\\()`),
			},
			{
				token: "type",
				regex: new RegExp(`\\b(${TYPES.join("|")})\\b`),
			},
			{
				token: ["keyword", "type"],
				regex: new RegExp(`\\b(struct)\\s+([_a-zA-Z][_a-zA-Z0-9]*)\\b`),
			},
			{
				token: ["type"],
				regex: new RegExp(
					`\\b([_a-zA-Z][_a-zA-Z0-9]*)\\s*(\\[\\])*\\s+action\\b`
				),
			},
			{
				token: ["type", null, "variable"],
				regex: new RegExp(
					`\\b([_a-zA-Z][_a-zA-Z0-9]*)\\s*(\\[\\])*\\s+([_a-zA-Z][_a-zA-Z0-9]*)\\b`
				),
			},
			{
				token: ["type"],
				regex: new RegExp(`\\b([_a-zA-Z][_a-zA-Z0-9]*)\\s*({)`),
			},
			{
				token: [null, "type"],
				regex: new RegExp(
					`(<)([_a-zA-Z][_a-zA-Z0-9]*)\\s*(\\[\\])*(>)`
				),
			},
			{
				token: [null, "type"],
				regex: new RegExp(
					`(\\()([_a-zA-Z][_a-zA-Z0-9]*)\\s*(\\[\\])*(\\))`
				),
			},
			{
				token: "atom",
				regex: new RegExp(`\\b(true|false)\\b`),
			},
			{
				token: ["atom"],
				regex: new RegExp(`([A-Z]+)(\\.)`),
			},
			{
				token: "variable",
				regex: new RegExp(`\\b[_a-zA-Z][_a-zA-Z0-9]*\\b`),
			},
			{ token: "number", regex: new RegExp(`\\d+\\.?\\d*`) },
			{
				token: "string",
				regex: new RegExp(`("[^"\\n\\r]*")|('[^'\\n\\r]*')`),
			},
			{ regex: new RegExp(`[\\{\\[\\(]`), indent: true },
			{ regex: new RegExp(`[\\}\\]\\)]`), dedent: true },
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
