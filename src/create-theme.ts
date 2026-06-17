import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting, TagStyle } from '@codemirror/language';

type Variant = 'dark' | 'light';

type Settings = {
  background: string;
  foreground: string;
};

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
    '& .cm-lintRange::after': {
      content: '""',
      width: '100%',
      position: 'absolute',
      left: '0px',
      bottom: '-2px',
      height: '3px',
      backgroundRepeat: 'repeat-x',
    },
    '& .cm-lintRange.cm-lintRange-warning, & .cm-lintRange.cm-lintRange-error': {
      backgroundImage: 'none',
    },
    '& .cm-lintPoint::after': {
      bottom: '-2px',
    },
  }, {
    dark: variant === 'dark',
  });
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [ theme, syntaxHighlighting(highlightStyle) ];
  return extension;
};

export default createTheme;
