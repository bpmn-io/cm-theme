import { tags as t } from '@lezer/highlight';
import createTheme from './create-theme.js';

export const feelDark = createTheme({
  variant: 'dark',
  settings: {
    background: '#1c2128',
    foreground: '#adbac7',
  },
  styles: [

    // keywords (for, if, then, else, return, some, every, satisfies, between,
    //   in, instance of, and, or, function, as), boolean and null literals,
    //   type names in `instance of` expressions (number, string, boolean, date, ...)
    { tag: t.keyword, color: '#f47067' },
    { tag: t.bool, color: '#f47067' },
    { tag: t.null, color: '#f47067' },
    { tag: t.typeName, color: '#f47067' },

    // string literals ("...") and date/time literals (@"...")
    { tag: t.string, color: '#aff5b4' },
    { tag: t.special(t.string), color: '#aff5b4' },

    // numeric literals
    { tag: t.number, color: '#6bc46d' },

    // operators (arithmetic: +, -, *, /; comparison: =, !=, <, >, <=, >=)
    { tag: t.arithmeticOperator, color: '#89dceb' },
    { tag: t.compareOperator, color: '#89dceb' },

    // feelers delimiters ({{...}}, {{#if}}, {{/if}}, {{#loop}}, {{/loop}})
    { tag: t.special(t.bracket), color: '#ffa657', fontWeight: 'bold' },

    // variable names, property names, context entry keys, unary test wildcard (?)
    { tag: t.variableName, color: '#79c0ff' },
    { tag: t.definition(t.variableName), color: '#79c0ff' },
    { tag: t.special(t.variableName), color: '#79c0ff' },
    { tag: t.propertyName, color: '#79c0ff' },
    { tag: t.definition(t.propertyName), color: '#79c0ff' },

    // function calls, built-in date/time constructors and special functions,
    //   path expression variables (a.b → both a and b), function parameter definitions
    { tag: t.function(t.variableName), color: '#dcbdfb' },
    { tag: t.function(t.special(t.variableName)), color: '#dcbdfb' },
    { tag: t.function(t.definition(t.variableName)), color: '#dcbdfb' },
    { tag: t.function(t.propertyName), color: '#dcbdfb' },

    // comments
    { tag: t.lineComment, color: '#8b949e' },
    { tag: t.blockComment, color: '#8b949e' },

    // Markdown formatting
    { tag: t.heading, color: '#e3b341', fontWeight: 'bold' },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
  ]
});
