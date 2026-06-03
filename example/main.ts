import { feel } from 'lang-feel';
import { json } from '@codemirror/lang-json';
import { basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import { feelLight, feelDark } from '../src/index';

const feelDoc = `{
  add: function(fruit, vegetable) [ fruit, vegetable ],
  woo: every a in b satisfies a > b,
  "oop": if size(foo[> 10]) then "woop" else [ 1..20 ],
  sa: [ true, false, 100.12, @"abc-def", date and time("abc-def") ],
  result: (
    for
      fruit in [ "apple", "bananas" ],
      vegetable in vegetables
    return
      // return something special here
      {
        ingredients: add(fruit, vegetable)
      }
  )
}.result.aa(asd)`;

const jsonDoc = JSON.stringify({
  add: [ 'fruit', 'vegetable' ],
  woo: true,
  oop: 'woop',
  sa: [ true, false, 100.12, 'abc-def' ],
  result: {
    ingredients: [ 'apple', 'bananas' ]
  },
  count: null
}, null, 2);

const feelCompartment = new Compartment();
const jsonCompartment = new Compartment();

const feelView = new EditorView({
  state: EditorState.create({
    doc: feelDoc,
    extensions: [
      basicSetup,
      feelCompartment.of(feelLight),
      feel({ dialect: 'expression' })
    ]
  }),
  parent: document.getElementById('feel-editor')!
});

const jsonView = new EditorView({
  state: EditorState.create({
    doc: jsonDoc,
    extensions: [
      basicSetup,
      jsonCompartment.of(feelLight),
      json()
    ]
  }),
  parent: document.getElementById('json-editor')!
});

let isDark = false;
const toggle = document.getElementById('toggle')!;

toggle.addEventListener('click', () => {
  isDark = !isDark;
  toggle.textContent = isDark ? 'Toggle light' : 'Toggle dark';

  document.body.style.background = isDark ? '#1e1e1e' : '';
  document.body.style.color = isDark ? '#ccc' : '';

  const theme = isDark ? feelDark : feelLight;
  feelView.dispatch({ effects: feelCompartment.reconfigure(theme) });
  jsonView.dispatch({ effects: jsonCompartment.reconfigure(theme) });
});
