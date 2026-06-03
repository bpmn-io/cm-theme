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
    }
  }, {
    dark: variant === 'dark',
  });
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [ theme, syntaxHighlighting(highlightStyle) ];
  return extension;
};

export default createTheme;
