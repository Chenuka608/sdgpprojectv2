import React, { useState, useEffect,useContext } from 'react';
import MainBox from './MainBox';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
import RAG from './RAG';

const Questionnaire = () => {
  const [data, setData] = useState({
    answer: "", // Add answer to the state
    query: "",

  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  const { user} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in, if not, redirect to login page
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the API from Flask server
    fetch("/data")
      .then(res => res.json())
      .then((data) => {
        // Setting data from the API response
        setData({
          answer: data.answer, // Set the answer in the state
          query: data.query,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const questions = [
    {
      id: 1,
      question: "Write a Java program to find the factorial of a number.",
      hint: "Hint: Use a loop to calculate the factorial.",
      Answer: `import java.util.Scanner;
          
          public class Main {
            public static void main(String[] args) {
              Scanner input = new Scanner(System.in);
              System.out.print("Enter a number: ");
              int num = input.nextInt();
              int factorial = 1;
              for (int i = 1; i <= num; ++i) {
                factorial *= i;
              }
              System.out.println("Factorial of " + num + " = " + factorial);
            }
          }`
    },
    {
      id: 2,
      question: "Write a Java program to check if a number is prime or not.",
      hint: "Hint: Use a loop to check divisibility.",
      Answer: `import java.util.Scanner;
          
          public class Main {
            public static void main(String[] args) {
              Scanner input = new Scanner(System.in);
              System.out.print("Enter a number: ");
              int num = input.nextInt();
              boolean isPrime = true;
              if (num <= 1) {
                isPrime = false;
              } else {
                for (int i = 2; i <= num / 2; ++i) {
                  if (num % i == 0) {
                    isPrime = false;
                    break;
                  }
                }
              }
              if (isPrime) {
                System.out.println(num + " is a prime number.");
              } else {
                System.out.println(num + " is not a prime number.");
              }
            }
          }`
    },
    {
      id: 3,
      question: "Write a Java program to reverse a string.",
      hint: "Hint: Use two pointers to reverse the string.",
      Answer: `import java.util.Scanner;
              
              public class Main {
                public static void main(String[] args) {
                  Scanner input = new Scanner(System.in);
                  System.out.print("Enter a string: ");
                  String str = input.nextLine();
                  String reversed = "";
                  for (int i = str.length() - 1; i >= 0; i--) {
                    reversed += str.charAt(i);
                  }
                  System.out.println("Reversed string: " + reversed);
                }
              }`
    },
    {
      id: 4,
      question: "Write a Java program to find the sum of all elements in an array.",
      hint: "Hint: Iterate through the array and accumulate the sum.",
      Answer: `import java.util.Scanner;
              
              public class Main {
                public static void main(String[] args) {
                  Scanner input = new Scanner(System.in);
                  System.out.print("Enter the number of elements: ");
                  int n = input.nextInt();
                  int[] arr = new int[n];
                  System.out.println("Enter the elements:");
                  for (int i = 0; i < n; i++) {
                    arr[i] = input.nextInt();
                  }
                  int sum = 0;
                  for (int num : arr) {
                    sum += num;
                  }
                  System.out.println("Sum of elements: " + sum);
                }
              }`
    },
    {
      id: 5,
      question: "Write a Java program to find the Fibonacci series up to n terms.",
      hint: "Hint: Use a loop to generate the Fibonacci series.",
      Answer: `import java.util.Scanner;
              
              public class Main {
                public static void main(String[] args) {
                  Scanner input = new Scanner(System.in);
                  System.out.print("Enter the number of terms: ");
                  int n = input.nextInt();
                  int first = 0, second = 1;
                  System.out.println("Fibonacci series up to " + n + " terms:");
                  for (int i = 1; i <= n; i++) {
                    System.out.print(first + " ");
                    int next = first + second;
                    first = second;
                    second = next;
                  }
                }
              }`
    }
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false); // State to control whether to show the answer
  const [differences, setDifferences] = useState([]);


  // Event handler for code input change
  const handleCodeInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setUserInput('');
    setShowAnswer(false); // Hide the answer when navigating to the previous question
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setUserInput('');
    setShowAnswer(false); // Hide the answer when navigating to the next question
  };

  // Function to show the answer based on user's input
  const showAnswerHandler = () => {
    setShowAnswer(true);
  };

  const handleSearch = () => {

    // Perform search action here
    // For now, let's just set the query as the search result
    setData(prevData => ({ ...prevData, answer: prevData.answer }));
  };

  return (
    <div className="container mx-auto py-16 md:py-32 lg:py-40 relative bg-contain">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#0C024B]">Coding Questionnaire</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Questions */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Java Coding Question {questions[currentQuestion].id}</h2>
          <p className="text-lg md:text-xl font-semibold mb-2">{questions[currentQuestion].question}</p>
          <p className="text-sm text-gray-600 mb-4">{questions[currentQuestion].hint}</p>
          {/* Add more questions as needed */}
          <div className="flex justify-between">
            {/* Buttons to navigate through questions */}
            <button onClick={prevQuestion} disabled={currentQuestion === 0} className="text-sm font-semibold px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50" type="button">Previous</button>
            <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} 
            className="text-sm font-semibold px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50" 
            style={{ marginRight: '550px' }}
            type="button">Next</button>
          </div>
          {/* <textarea id={`question${questions[currentQuestion].id}`} name={`question${questions[currentQuestion].id}`} value={userInput} onChange={handleInputChange} rows="10" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea> */}
          <textarea
            id={`question${questions[currentQuestion].id}`}
            name={`question${questions[currentQuestion].id}`}
            value={showAnswer ? questions[currentQuestion].Answer : userInput} // Use the answer if showAnswer is true
            onChange={handleInputChange}
            rows={showAnswer ? questions[currentQuestion].Answer.split('\n').length + 1 : 10}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            readOnly={!showAnswer} // Make the textarea read-only when showAnswer is true
          ></textarea>
          {/* Show answer button */}
          <div className="mt-4">
            <button onClick={showAnswerHandler} className="text-sm font-semibold px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50" type="button">Show Answer</button>
          </div>
          <br></br>
        </div>
        {/* Right side - Code Editor and Compiler */}
        <div>
          <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Feedback Compiler</h2>
              <MainBox />
            </div>
        </div>
        {/* Search questionnaire starting part*/}
        <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#0C024B]">Search Questionnaire</h1>
        <RAG/>
       </div>
    </div>
</div>
  );
};

export default Questionnaire;