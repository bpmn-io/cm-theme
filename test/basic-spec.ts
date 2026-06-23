import { expect } from 'chai';

import { feel } from 'lang-feel';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { feelersLanguage } from 'feelers/lang';

import { basicSetup } from 'codemirror';

import { EditorState, Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { setDiagnostics } from '@codemirror/lint';

import { feelLight, feelDark } from '@bpmn-io/cm-theme';


type EnvWindow = {
  __env__?: {
    SINGLE_START?: string
  }
};

const singleStart = (window as EnvWindow).__env__?.SINGLE_START === '1';

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

const markdownDoc = `
# Heading

Some text! [yes](./yes.html) include *emphasis* and **bold** font.

<small class="embedded-html-tag">HTML embedded</small>

## Secondary Heading

![Some image](./some-image.png)

### Ternary Heading

> With nice quote.
`.trim();

const feelersDoc = `
# Employees

{{#loop users}}
## {{name}}
*Currently {{age}} years old, contact* [@{{twitter}}]({{"https://twitter.com/" + twitter}})

### Skills
{{#loop skills}}
- {{this}}
{{/loop}}

{{/loop}}

# Some conditions

{{#if count(users) > 1}}There are multiple users{{/if}}
{{#if false}}This should not display{{/if}}
{{#if true}}This should display{{/if}}

*Some italic text*
**Some bold text**

# Prices

| Item | Category | Price | Stock |
| -- | --:| --:| --:|
{{#loop prices}}
| {{name}} | {{category}} | {{parent.currencySymbol}}{{price}} | {{stock}} |
{{/loop}}
`.trim();


describe('cm-theme', function() {

  let container: HTMLDivElement;

  beforeEach(function() {

    container = document.createElement('div');
    container.setAttribute('style', 'width: 600px');

    document.body.appendChild(container);
  });


  (singleStart ? it.only : it)('should highlight FEEL expressions and lint squiggles', function() {

    const feelCompartment = new Compartment();
    const jsonCompartment = new Compartment();
    const markdownCompartment = new Compartment();
    const feelersCompartment = new Compartment();

    const feelLabel = document.createElement('strong');
    feelLabel.textContent = 'FEEL';
    feelLabel.setAttribute('style', 'display: block; margin-bottom: 4px');

    const feelParent = document.createElement('div');
    feelParent.setAttribute('style', 'border: solid 1px #CCC; margin-bottom: 16px');

    const jsonLabel = document.createElement('strong');
    jsonLabel.textContent = 'JSON';
    jsonLabel.setAttribute('style', 'display: block; margin-bottom: 4px');

    const jsonParent = document.createElement('div');
    jsonParent.setAttribute('style', 'border: solid 1px #CCC; margin-bottom: 16px');

    const markdownLabel = document.createElement('strong');
    markdownLabel.textContent = 'MARKDOWN';
    markdownLabel.setAttribute('style', 'display: block; margin-bottom: 4px');

    const markdownParent = document.createElement('div');
    markdownParent.setAttribute('style', 'border: solid 1px #CCC; margin-bottom: 16px');

    const feelersLabel = document.createElement('strong');
    feelersLabel.textContent = 'Feelers';
    feelersLabel.setAttribute('style', 'display: block; margin-bottom: 4px');

    const feelersParent = document.createElement('div');
    feelersParent.setAttribute('style', 'border: solid 1px #CCC; margin-bottom: 16px');

    container.appendChild(feelLabel);
    container.appendChild(feelParent);
    container.appendChild(jsonLabel);
    container.appendChild(jsonParent);
    container.appendChild(markdownLabel);
    container.appendChild(markdownParent);
    container.appendChild(feelersLabel);
    container.appendChild(feelersParent);

    const feelView = new EditorView({
      state: EditorState.create({
        doc: feelDoc,
        extensions: [
          basicSetup,
          feelCompartment.of(feelLight),
          feel({ dialect: 'expression' })
        ]
      }),
      parent: feelParent
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
      parent: jsonParent
    });

    const markdownView = new EditorView({
      state: EditorState.create({
        doc: markdownDoc,
        extensions: [
          basicSetup,
          markdownCompartment.of(feelLight),
          markdown()
        ]
      }),
      parent: markdownParent
    });

    const feelersView = new EditorView({
      state: EditorState.create({
        doc: feelersDoc,
        extensions: [
          basicSetup,
          feelersCompartment.of(feelLight),
          feelersLanguage()
        ]
      }),
      parent: feelersParent
    });

    let isDark = false;

    const toggle = document.createElement('button');
    toggle.style.marginBottom = '10px';
    toggle.textContent = 'Toggle dark';
    toggle.addEventListener('click', () => {
      isDark = !isDark;

      toggle.textContent = isDark ? 'Toggle light' : 'Toggle dark';
      feelView.dispatch({
        effects: feelCompartment.reconfigure(isDark ? feelDark : feelLight)
      });
      jsonView.dispatch({
        effects: jsonCompartment.reconfigure(isDark ? feelDark : feelLight)
      });
      markdownView.dispatch({
        effects: markdownCompartment.reconfigure(isDark ? feelDark : feelLight)
      });
      feelersView.dispatch({
        effects: feelersCompartment.reconfigure(isDark ? feelDark : feelLight)
      });
    });

    container.before(toggle);

    feelView.focus();

    // surface lint squiggles (toggling the theme recolors them too)
    const lintRange = (token: string) => {
      const from = feelDoc.indexOf(token);
      return { from, to: from + token.length };
    };

    feelView.dispatch(setDiagnostics(feelView.state, [
      { ...lintRange('vegetables'), severity: 'warning', message: '"vegetables" is not defined in the context' },
      { ...lintRange('asd'), severity: 'error', message: '"asd" is not defined in the context' }
    ]));

    const lintRanges = feelParent.querySelectorAll('.cm-lintRange');

    expect(feelView).to.exist;
    expect(jsonView).to.exist;
    expect(markdownView).to.exist;
    expect(feelersView).to.exist;
    expect(lintRanges.length).to.be.greaterThan(0);
  });

});
