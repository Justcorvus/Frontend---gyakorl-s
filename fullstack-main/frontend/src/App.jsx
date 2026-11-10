import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App container-lg mt-3 d-flex flex-column min-vh-100">
        <Navbar />

        <div className="content-wrapper flex-grow-1">
          <Routes>
            
            <Route path="/tanuloi-utmutato" element={<CoursePage fileName="TANULOI_UTMUTATO" />} />
            <Route path="/mvc-magyarazat" element={<CoursePage fileName="MVC_MAGYARAZAT" />} />
            <Route path="/fogalmak-crud" element={<CoursePage fileName="FOGALMAK_CRUD_FULLSTACK" />} />
            <Route path="/teszteles-altalanos" element={<CoursePage fileName="TESTING_GENERAL" />} />
            <Route path="/hasznalt-modulok" element={<CoursePage fileName="USED_MODULES" />} />
            <Route path="/unit-tesztek" element={<CoursePage fileName="TESTING_UNIT" />} />
            <Route path="/integracios-tesztek" element={<CoursePage fileName="TESTING_INTEGRATION" />} />
            <Route path="/docs-app" element={<CoursePage fileName="DOCS_App_component" />} />
            <Route path="/docs-userform" element={<CoursePage fileName="DOCS_UserForm_component" />} />
            <Route path="/docs-usertable" element={<CoursePage fileName="DOCS_UserTable_component" />} />
            <Route path="/docs-usertablerow" element={<CoursePage fileName="DOCS_UserTableRow_component" />} />
          </Routes>
        </div>

        {/* Állandó lábléc: Ajánlott irodalom és készítő */}
        <footer className="mt-5 mb-3 p-4 bg-light rounded border text-center">
          <div className="mb-3">
            <h5 className="text-secondary mb-3">📚 Ajánlott oldalak (Felhasznált irodalom)</h5>
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">React</a></li>
              <li className="list-inline-item text-muted">|</li>
              <li className="list-inline-item"><a href="https://nodejs.org/en/docs/" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">Node.js</a></li>
              <li className="list-inline-item text-muted">|</li>
              <li className="list-inline-item"><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">Express</a></li>
              <li className="list-inline-item text-muted">|</li>
              <li className="list-inline-item"><a href="https://dev.mysql.com/doc/" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">MySQL</a></li>
              <li className="list-inline-item text-muted">|</li>
              <li className="list-inline-item"><a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">Vite</a></li>
            </ul>
          </div>
          <div>
            <small className="text-muted">Készítette: Bencze István &copy; {new Date().getFullYear()}</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
