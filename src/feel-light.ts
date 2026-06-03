import { tags as t } from '@lezer/highlight';
import createTheme from './create-theme.js';

export const feelLight = createTheme({
  variant: 'light',
  settings: {
    background: '#ffffff',
    foreground: '#24292f',
  },
  styles: [
    { tag: t.keyword, color: '#a31515' },
    { tag: t.bool, color: '#a31515' },
    { tag: t.null, color: '#a31515' },

    { tag: t.propertyName, color: '#9a6700' },
    { tag: t.definition(t.propertyName), color: '#9a6700' },
    { tag: t.string, color: '#0a3069' },
    { tag: t.special(t.string), color: '#0a3069' },
    { tag: t.number, color: '#06704a' },

    { tag: t.function(t.variableName), color: '#8250df' },
    { tag: t.function(t.special(t.variableName)), color: '#8250df' },
    { tag: t.function(t.definition(t.variableName)), color: '#8250df' },
    { tag: t.function(t.propertyName), color: '#8250df' },

    { tag: t.lineComment, color: '#69727b' },
    { tag: t.blockComment, color: '#69727b' },
  ]
});
