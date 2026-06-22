import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting, TagStyle } from '@codemirror/language';

type Variant = 'dark' | 'light';

type Settings = {
  background: string;
  foreground: string;
  warning: string;
  error: string;
};

const urlifyColor = (color: string) => color.startsWith('#') ? `%23${color.slice(1)}` : color;

const squiggle = (color: string) =>
  `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='3'><path d='m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0' stroke='${urlifyColor(color)}' fill='none' stroke-width='1.2'/></svg>")`;

const createTheme = ({ variant, settings, styles } : {
  variant: Variant,
  settings: Settings,
  styles: TagStyle[]
}) => {
  const theme = EditorView.theme({
    '&': {
      backgroundColor: settings.background,
      color: settings.foreground,
    },

    // recolor the lint squiggles to the theme palette; CodeMirror's
    // baseTheme already supplies the squiggle geometry and positioning
    '& .cm-lintRange-error': {
      backgroundImage: squiggle(settings.error),
    },
    '& .cm-lintRange-warning': {
      backgroundImage: squiggle(settings.warning),
    },
  }, {
    dark: variant === 'dark',
  });
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [ theme, syntaxHighlighting(highlightStyle) ];
  return extension;
};

export default createTheme;
