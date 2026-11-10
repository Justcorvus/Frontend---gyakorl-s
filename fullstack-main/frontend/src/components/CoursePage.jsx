import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const CoursePage = ({ fileName }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);

    // Közvetlenül a public mappából kéri le a fájlt: pl. /TANULOI_UTMUTATO.md
    fetch(`/${fileName}.md`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('A fájl nem található a public mappában');
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [fileName]);

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <p className="text-muted">Tartalom betöltése...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Hiba: A tananyag (<strong>{fileName}.md</strong>) nem tölthető be. Ellenőrizd, hogy a fájl létezik-e a <code>public</code> mappában!
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default CoursePage;