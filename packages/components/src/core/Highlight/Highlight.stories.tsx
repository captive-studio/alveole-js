import { Story } from '../../type';
import { Highlight } from './Highlight';
import { useStyles } from './Highlight.styles';

export default {
  title: 'Highlight',
  tags: ['core'],
  experimental: true,
  description: 'Affiche du code en typescript, html, json, etc. Composant de type Light (react-syntax-highlighter).',
  component: Highlight,
  styleFn: useStyles,
} satisfies Story;

export const HighlightJSON = () => (
  <Highlight language="json">{JSON.stringify({ id: 'user_id_1', name: 'Jean-Pierre', age: 20 }, null, 2)}</Highlight>
);

export const HighlightTypescript = () => (
  <Highlight language="typescript">{"const id: string = 'user_id_1';"}</Highlight>
);

export const HighlightTSX = () => (
  <Highlight language="tsx">{`<Typography tag="span" p={spacing('100')}>Bonjour</Typography>`}</Highlight>
);

const rubyCode = `# The Greeter class
class Greeter
  def initialize(name)
    @name = name.capitalize
  end

  def salute
    puts "Hello #{@name}!"
  end
end

g = Greeter.new("world")
g.salute`;
export const HighlightRuby = () => <Highlight language="ruby">{rubyCode}</Highlight>;

const htmlCode = `<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>`;
export const HighlightHTML = () => <Highlight language="html">{htmlCode}</Highlight>;

export * as Sources from './Highlight.stories.sources';
