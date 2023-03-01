import { useState } from "react";
import "./App.css";

const steps = [
  {
    question: "1.Services updates?",
  },
  {
    question: "2.What you worked on yesterday?",
  },
  {
    question: "3.What you plan on working on today?",
  },
  {
    question: "4.Any blockers?",
  },
];
const greetingByDay = [
  [],
  [
    ["Good morning team!"],
    ["Have a nice Monday team!"],
    ["Begin well the week team!"],
    ["Good Monday!"],
  ],
  [["Good morning team!"], ["Have a nice Tuesday team!"], ["Good Tuesday!"]],
  [
    ["Good morning team!"],
    ["Have a nice Wednesday team!"],
    ["Good Wednesday!"],
  ],
  [["Good morning team!"], ["Have a nice Thursday team!"], ["Good Thursday!"]],
  [
    ["Good morning team!"],
    ["Have a nice Friday team!"],
    ["Have a nice end of week team!"],
    ["Enjoy your weekend team!"],
    ["Good Friday!"],
  ],
  [],
];
const getNiceGreetingByDay = () => {
  const dayOfWeek = new Date().getDay();
  const options = greetingByDay[dayOfWeek];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};
const capitalizeTheFirstLetterOnly = (phrase: string) => {
  const firstLetter = phrase.charAt(0).toUpperCase();
  const restOfThePhrase = phrase.slice(1);
  return firstLetter + restOfThePhrase;
};

function App() {
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);

  const setResultByAnswers = (answers: string[]) => {
    const answersCap = answers.map((a) => capitalizeTheFirstLetterOnly(a));
    setShowResult(true);
    const niceGreetingByDay = getNiceGreetingByDay();
    const message = `${niceGreetingByDay}\n 1.  ${answersCap[0]}\n 2.  ${answersCap[1]}\n 3.  ${answersCap[2]}\n 4.  ${answersCap[3]}\n`;
    setResult(message);
    copyToClipboard(message);
  };
  const goToNextStep = () => {
    setAnswers((ans) => {
      const newAns = ans.map((a, idx) =>
        idx === currentStepNumber ? currentAnswer : a
      );
      if (currentStepNumber === 3) setResultByAnswers(newAns);
      return newAns;
    });
    if (currentStepNumber >= 3) return;
    setCurrentAnswer(answers[currentStepNumber + 1]);
    setCurrentStepNumber((n) => n + 1);
    setCurrentStep(steps[currentStepNumber + 1]);
  };
  const goToPreviousStep = () => {
    if (currentStepNumber === 3 && showResult) {
      setShowResult(false);
      setCurrentAnswer(answers[currentStepNumber]);
      return;
    }
    setAnswers(
      answers.map((a, idx) => (idx === currentStepNumber ? currentAnswer : a))
    );
    setCurrentAnswer(answers[currentStepNumber - 1]);
    if (currentStepNumber <= 0) return;
    setCurrentStepNumber((n) => n - 1);
    setCurrentStep(steps[currentStepNumber - 1]);
  };
  const copyToClipboard = (r: string) => navigator.clipboard.writeText(r);
  const goToNextStepByEnter = (e: any) => {
    if (e.key === "Enter") goToNextStep();
  };
  return (
    <div className="App">
      <h1>
        {showResult ? "Result copied to clipboard!!" : currentStep.question}
      </h1>
      <div className="">
        {showResult ? (
          <textarea
            rows={6}
            cols={50}
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            placeholder="Insert your answer here..."
            onKeyDown={goToNextStepByEnter}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        )}
      </div>
      <div className="card">
        <button onClick={goToPreviousStep}>Prev Step</button>
        <button
          onClick={() =>
            showResult ? copyToClipboard(result) : goToNextStep()
          }
        >
          {showResult ? "Copy Result" : "Next Step (Enter)"}
        </button>
      </div>
    </div>
  );
}

export default App;
