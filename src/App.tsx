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

function App() {
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);

  const setResultByAnswers = (answers: string[]) => {
    setShowResult(true);
    const message = `1. ${answers[0]}\n2. ${answers[1]}\n3. ${answers[2]}\n4. ${answers[3]}\n`;
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
