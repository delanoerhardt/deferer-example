import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import AppService from "./ModulesService";
import { AppServiceDeferer } from "./AppServiceDeferer";
import ClientService from "./NameService";

function App() {
  const [list, setList] = useState<String[]>([]);
  const [name, setName] = useState<String | undefined>();

  useEffect(() => {
    AppService.requestList().then((list) => setList(list));
    ClientService.requestName().then((name) => setName(name));
  }, []);

  const onKey: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
    if (key.key === "g") {
      AppServiceDeferer.executeDefered();
    } else if (key.key === "d") {
      AppServiceDeferer.discardDefered({ defaultObject: [] });
    }
  };

  return (
    <div className="App" tabIndex={-1} onKeyDown={onKey}>
      <header className="App-header">
        <h1>{name}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {list.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
