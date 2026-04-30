import { render } from '@/__tests__/helpers';
import { Highlight } from './Highlight';

describe('Highlight', () => {
  const testCode = 'const greeting = "Hello, World!";';

  it.each(['json', 'typescript', 'tsx', 'ruby', 'bash', 'plaintext', 'html'] as const)(
    'renders code with %s language',
    language => {
      const { getByText } = render(
        <Highlight language={language}>
          {testCode}
        </Highlight>,
      );

      expect(getByText(testCode)).toBeTruthy();
    },
  );

  it('renders with custom style', () => {
    const { getByText } = render(
      <Highlight language="typescript" style={{ padding: 20 }}>
        {testCode}
      </Highlight>,
    );

    expect(getByText(testCode)).toBeTruthy();
  });

  it('renders with wrapping enabled', () => {
    const { getByText } = render(
      <Highlight language="json">
        {testCode}
      </Highlight>,
    );

    expect(getByText(testCode)).toBeTruthy();
  });

  it('uses Prism highlighter for TSX', () => {
    const { getByProps } = render(
      <Highlight language="tsx">
        {testCode}
      </Highlight>,
    );

    const highlighter = getByProps({ highlighter: 'prism' });
    expect(highlighter).toBeTruthy();
  });

  it('uses hljs highlighter for other languages', () => {
    const { getByProps } = render(
      <Highlight language="typescript">
        {testCode}
      </Highlight>,
    );

    const highlighter = getByProps({ highlighter: 'hljs' });
    expect(highlighter).toBeTruthy();
  });

  it('renders code inside SyntaxHighlighter component with wrapLongLines', () => {
    const { getByProps } = render(
      <Highlight language="json">
        {testCode}
      </Highlight>,
    );

    const syntaxHighlighter = getByProps({ language: 'json', wrapLongLines: true });
    expect(syntaxHighlighter).toBeTruthy();
    expect(syntaxHighlighter.props.children).toBe(testCode);
    expect(syntaxHighlighter.props.customStyle).toBeTruthy();
  });
});
