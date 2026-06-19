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
    '& .cm-lintRange': {
      position: 'relative',
    },
    '& .cm-lintRange.cm-lintRange-warning, & .cm-lintRange.cm-lintRange-error': {
      backgroundImage: 'none',
    },
    '& .cm-lintRange::after': {
      content: '""',
      width: '100%',
      position: 'absolute',
      left: '0px',
      bottom: '-2px',
      height: '3px',
      backgroundRepeat: 'repeat-x',
    },
    '& .cm-lintRange.cm-lintRange-warning::after': {
      backgroundImage: squiggle(settings.warning),
    },
    '& .cm-lintRange.cm-lintRange-error::after': {
      backgroundImage: squiggle(settings.error),
    },
  }, {
    dark: variant === 'dark',
  });
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [ theme, syntaxHighlighting(highlightStyle) ];
  return extension;
};

export default createTheme;
