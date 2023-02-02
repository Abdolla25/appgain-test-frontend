import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import './App.css';

const App = () => {
  const [links, setLinks] = useState <any[]> ([])
  const [slug, setSlug] = useState('');
  const [ios_primary, setIosPrimary] = useState('');
  const [ios_fallback, setIosFallback] = useState('');
  const [android_primary, setAndroidPrimary] = useState('');
  const [android_fallback, setAndroidFallback] = useState('');
  const [web, setWeb] = useState('');

  useEffect(() => {
    fetch('https://quiet-hollows-04464.herokuapp.com/api/shortlinks', {
      method: 'GET' 
    })
      .then(res => {
        return res.json()
      })
      .then((data) => {
        setLinks(data.shortlinks);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = () => {
    fetch('https://quiet-hollows-04464.herokuapp.com/api/shortlinks', {
       method: 'POST',
       body: JSON.stringify({
        slug: slug,
        ios: {
          primary: ios_primary,
          fallback: ios_fallback
        },
        android: {
          primary: android_primary,
          fallback: android_fallback
        },
        web: web,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((res) => res.json())
       .catch((err) => {
          console.log(err.message);
       });
  };

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
            <Form onSubmit={handleSubmit}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Slug</InputGroup.Text>
                <Form.Control aria-label="Slug" onChange={(e) => setSlug(e.target.value)} />
              </InputGroup>

              <hr />

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>IOS</InputGroup.Text>
                <Form.Control aria-label="IOS Primary" onChange={(e) => setIosPrimary(e.target.value)} />
                <InputGroup.Text>Primary</InputGroup.Text>
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>IOS</InputGroup.Text>
                <Form.Control aria-label="IOS Fallback" onChange={(e) => setIosFallback(e.target.value)} />
                <InputGroup.Text>Fallback</InputGroup.Text>
              </InputGroup>

              <hr />

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Android</InputGroup.Text>
                <Form.Control aria-label="Android Primary" onChange={(e) => setAndroidPrimary(e.target.value)} />
                <InputGroup.Text>Primary</InputGroup.Text>
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Android</InputGroup.Text>
                <Form.Control aria-label="Android Fallback" onChange={(e) => setAndroidFallback(e.target.value)} />
                <InputGroup.Text>Fallback</InputGroup.Text>
              </InputGroup>

              <hr />

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Web</InputGroup.Text>
                <Form.Control aria-label="Web" onChange={(e) => setWeb(e.target.value)} />
              </InputGroup>

              <Button variant="secondary" type="submit">
                Create
              </Button>
              {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
            </Form>
        </div>
        <div className="widthContain">
            <h2>
              List All Shortlinks
            </h2>
            <div>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th rowSpan={2}>Slug</th>
                    <th colSpan={2}>IOS</th>
                    <th colSpan={2}>Android</th>
                    <th rowSpan={2}>Web</th>
                  </tr>
                  <tr>
                    <td>Primary</td>
                    <td>Fallback</td>
                    <td>Primary</td>
                    <td>Fallback</td>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    return (
                        <tr key={link.slug}>
                          <td>{link.slug}</td>
                          <td>{link.ios.primary}</td>
                          <td>{link.ios.fallback}</td>
                          <td>{link.android.primary}</td>
                          <td>{link.android.fallback}</td>
                          <td>{link.web}</td>
                        </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
