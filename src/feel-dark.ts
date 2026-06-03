import { tags as t } from '@lezer/highlight';
import createTheme from './create-theme.js';

export const feelDark = createTheme({
  variant: 'dark',
  settings: {
    background: '#1c2128',
    foreground: '#adbac7',
  },
  styles: [
    { tag: t.keyword, color: '#f47067' },
    { tag: t.bool, color: '#f47067' },
    { tag: t.null, color: '#f47067' },

    { tag: t.propertyName, color: '#f69d50' },
    { tag: t.definition(t.propertyName), color: '#f69d50' },
    { tag: t.string, color: '#96d0ff' },
    { tag: t.special(t.string), color: '#96d0ff' },
    { tag: t.number, color: '#6bc46d' },

    { tag: t.function(t.variableName), color: '#dcbdfb' },
    { tag: t.function(t.special(t.variableName)), color: '#dcbdfb' },
    { tag: t.function(t.definition(t.variableName)), color: '#dcbdfb' },
    { tag: t.function(t.propertyName), color: '#dcbdfb' },

    { tag: t.lineComment, color: '#768390' },
    { tag: t.blockComment, color: '#768390' },
  ]
});
