import { tags as t } from '@lezer/highlight';
import createTheme from './create-theme.js';

export const feelLight = createTheme({
  variant: 'light',
  settings: {
    foreground: '#24292f',
    warning: '#debd71',
    error: '#9f1c15',
  },
  styles: [

    // keywords (for, if, then, else, return, some, every, satisfies, between,
    //   in, instance of, and, or, function, as), boolean and null literals,
    //   type names in `instance of` expressions (number, string, boolean, date, ...)
    { tag: t.keyword, color: '#a31515' },
    { tag: t.bool, color: '#a31515' },
    { tag: t.null, color: '#a31515' },
    { tag: t.typeName, color: '#a31515' },

    // string literals ("...") and date/time literals (@"...")
    { tag: t.string, color: '#1a7f37' },
    { tag: t.special(t.string), color: '#1a7f37' },

    // numeric literals
    { tag: t.number, color: '#06704a' },

    // operators (arithmetic: +, -, *, /; comparison: =, !=, <, >, <=, >=)
    { tag: t.arithmeticOperator, color: '#0969da' },
    { tag: t.compareOperator, color: '#0969da' },

    // feelers delimiters ({{...}}, {{#if}}, {{/if}}, {{#loop}}, {{/loop}})
    { tag: t.special(t.bracket), color: '#b54a00', fontWeight: 'bold' },

    // variable names, property names, context entry keys, unary test wildcard (?)
    { tag: t.variableName, color: '#0550ae' },
    { tag: t.definition(t.variableName), color: '#0550ae' },
    { tag: t.special(t.variableName), color: '#0550ae' },
    { tag: t.propertyName, color: '#0550ae' },
    { tag: t.definition(t.propertyName), color: '#0550ae' },

    // function calls, built-in date/time constructors and special functions,
    //   path expression variables (a.b → both a and b), function parameter definitions
    { tag: t.function(t.variableName), color: '#8250df' },
    { tag: t.function(t.special(t.variableName)), color: '#8250df' },
    { tag: t.function(t.definition(t.variableName)), color: '#8250df' },
    { tag: t.function(t.propertyName), color: '#8250df' },

    // comments
    { tag: t.lineComment, color: '#69727b' },
    { tag: t.blockComment, color: '#69727b' },

    // Markdown formatting
    { tag: t.heading, color: '#953800', fontWeight: 'bold' },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },

    // Markdown links and escapes
    { tag: t.link, color: '#0969da', textDecoration: 'underline' },
    { tag: t.url, color: '#0969da' },
    { tag: t.escape, color: '#0969da' },

    // Markdown structure (blockquotes, list/heading markers, thematic breaks, metadata)
    { tag: t.quote, color: '#69727b' },
    { tag: t.processingInstruction, color: '#69727b' },
    { tag: t.contentSeparator, color: '#69727b', fontWeight: 'bold' },
    { tag: t.meta, color: '#69727b' },

    // diff-style inserted/deleted lines
    { tag: t.inserted, color: '#1a7f37' },
    { tag: t.deleted, color: '#a31515' },

    // embedded HTML — tag and attribute names share the heading color
    //   (heading stays bold to stand apart); the attribute value reads as a string
    { tag: t.tagName, color: '#953800' },
    { tag: t.attributeName, color: '#953800' },
    { tag: t.angleBracket, color: '#69727b' },
    { tag: t.attributeValue, color: '#1a7f37' },
  ]
});
