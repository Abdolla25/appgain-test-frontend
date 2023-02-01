import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from "react-bootstrap";
import './App.css';

const App = () => {
  const [links, setLinks] = useState <any[]> ([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/shortlinks')
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          setLinks(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to my frontend, you can start trying the api here...
        </p>
      </header>
      <main className="App-content">
        <div>
            <h2>
              Create Shortlink
            </h2>
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text>Slug</InputGroup.Text>
                <Form.Control aria-label="Slug" />
              </InputGroup>

              <hr />

              <InputGroup className="mb-3">
                <InputGroup.Text>IOS</InputGroup.Text>
                <Form.Control aria-label="IOS Primary" />
                <InputGroup.Text>Primary</InputGroup.Text>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>IOS</InputGroup.Text>
                <Form.Control aria-label="IOS Fallback" />
                <InputGroup.Text>Fallback</InputGroup.Text>
              </InputGroup>

              <hr />

              <InputGroup className="mb-3">
                <InputGroup.Text>Android</InputGroup.Text>
                <Form.Control aria-label="Android Primary" />
                <InputGroup.Text>Primary</InputGroup.Text>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Android</InputGroup.Text>
                <Form.Control aria-label="Android Fallback" />
                <InputGroup.Text>Fallback</InputGroup.Text>
              </InputGroup>

              <hr />

              <InputGroup className="mb-3">
                <InputGroup.Text>Web</InputGroup.Text>
                <Form.Control aria-label="Web" />
              </InputGroup>

              <Button variant="secondary" type="submit">
                Create
              </Button>
              {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
            </Form>
        </div>
        <div>
            <h2>
              List All Shortlinks
            </h2>
            <div>
            {links.map((link) => {
               return (
                  <div className="post-card" key={link.slug}>
                     <h2 className="post-title">{link.ios.primary}</h2>
                     <p className="post-body">{link.ios.fallback}</p>
                     <h2 className="post-title">{link.android.primary}</h2>
                     <p className="post-body">{link.android.fallback}</p>
                     <h2 className="post-title">{link.web}</h2>
                  </div>
               );
            })}
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
