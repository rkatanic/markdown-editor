import MarkdownEditor from "./components/MarkdownEditor";
import "./App.css";

const App = (): JSX.Element => {
  return (
    <div className="App h-screen dark:bg-zinc-900">
      <MarkdownEditor />
    </div>
  );
};

export default App;
