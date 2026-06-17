import { tags as t } from '@lezer/highlight';
import createTheme from './create-theme.js';

export const feelLight = createTheme({
  variant: 'light',
  settings: {
    background: '#ffffff',
    foreground: '#24292f',
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
  ]
});
