import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPhoneNumber from "./pages/AddPhoneNumber";
import PhoneNumbers from "./pages/PhoneNumbers";
import UpdatePhoneNumber from "./pages/UpdatePhoneNumber";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneNumbers />} />
          <Route path="/add" element={<AddPhoneNumber />} />
          <Route path="/update/:id" element={<UpdatePhoneNumber />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
