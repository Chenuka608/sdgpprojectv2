import React, { useState, useEffect } from 'react';

function RAG() {
  const [data, setData] = useState({
    answer: "", // Add answer to the state
    query: "",
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the API from Flask server
    fetch(`/data?query=${data.query}`)
      .then(res => res.json())
      .then((data) => {
        // Setting data from the API response
        setData(prevData => ({ ...prevData, answer: data.answer }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false); // State to control whether to show the answer
  const [differences, setDifferences] = useState([]);

  const handleSearch = () => {
    // Perform search action here
    // For now, let's just set the query as the search result
    fetch(`/data?query=${data.query}`)
      .then(res => res.json())
      .then((data) => {
        setData(prevData => ({ ...prevData, answer: data.answer }));
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleInputChange = (e) => {
    setData({ ...data, query: e.target.value });
  };

  return (
    <div className="text-xl md:text-2xl font-bold mb-4">
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2">FullStack Develop Search Engine</h2>
        <div className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          <input
            type="text"
            value={data.query}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Search..."
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <button onClick={handleSearch} className="text-sm font-semibold px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50">
          Search
        </button>
        <textarea
          id="searchInput"
          rows="15"
          value={data.answer}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          readOnly>
        </textarea>
      </div>
    </div>
  );
}

export default RAG;
