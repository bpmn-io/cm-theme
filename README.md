# @bpmn-io/cm-theme

The [CM theme](https://github.com/bpmn-io/cm-theme) for the [CodeMirror code editor](https://codemirror.net/).


## Usage

```javascript
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import { feelLight } from '@bpmn-io/cm-theme';

// use as a codemirror extension
const view = new EditorView({
  state: EditorState.create({
    extensions: [
      ...,
      feelLight
    ]
  })
});
```


## License

MIT
