import Modal from "./components/Modal/Modal";
import Tabs from "./components/Tabs/Tabs";
import Disclosure from "./components/Disclosure/Disclosure";

function App() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Accessible Components Playground</h1>

      <Modal />

      <hr />

      <Tabs />

      <hr />

      <Disclosure />
    </div>
  );
}

export default App;