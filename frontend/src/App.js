import React, { useState } from "react";
import "./App.css";

// List of questions for differential diagnosis
const questions = [
  { question: "Do you feel sad, hopeless, or empty most of the time?", symptom: "The patient is feeling sad, hopeless, or empty most of the time.", yes: "Possible Depression, Bipolar Disorder", no: "Continue" },
  { question: "Do you have difficulty finding joy in activities you used to enjoy?", symptom: "The patient has difficulty finding joy in activities they used to enjoy.", yes: "Depression", no: "Continue" },
  { question: "Do you experience extreme mood swings or irritability?", symptom: "The patient experiences extreme mood swings or irritability.", yes: "Consider Bipolar Disorder", no: "Continue" },
  { question: "Do you experience excessive worry about daily life or the future?", symptom: "The patient experiences excessive worry about daily life or the future.", yes: "Generalized Anxiety Disorder", no: "Continue" },
  { question: "Do you experience panic attacks (rapid heartbeat, shortness of breath, fear of dying)?", symptom: "The patient is experiencing panic attacks.", yes: "Panic Disorder", no: "Continue" },
  { question: "Do you have persistent feelings of worthlessness or guilt?", symptom: "The patient has persistent feelings of worthlessness or guilt.", yes: "Major Depressive Disorder", no: "Continue" },
  { question: "Do you have any suicidal thoughts or intent?", symptom: "The patient has suicidal thoughts or intent.", yes: "Major Depressive Disorder (Suicidal Risk)", no: "Continue" },
  { question: "Do you hear voices or see things that others don’t?", symptom: "The patient hears voices or sees things that others don’t.", yes: "Psychotic Disorders (e.g., Schizophrenia)", no: "Continue" },
  { question: "Have you experienced a period of unusually high energy or reduced need for sleep?", symptom: "The patient has experienced a period of unusually high energy or reduced need for sleep.", yes: "Consider Mania or Hypomania (Bipolar Disorder)", no: "Continue" },
  { question: "Do you have noticeable changes in appetite or eating patterns?", symptom: "The patient has noticeable changes in appetite or eating patterns.", yes: "Consider Depression or Eating Disorders", no: "Continue" },
  { question: "Do you have a history of alcohol or drug use?", symptom: "The patient has a history of alcohol or drug use.", yes: "Substance Use Disorders", no: "Continue" },
  { question: "Do you have any thyroid issues?", symptom: "The patient has thyroid issues.", yes: "Consider Thyroid Disease as cause of anxiety or depression", no: "Continue" },
  { question: "Do you have diabetes or any metabolic disorder?", symptom: "The patient has diabetes or a metabolic disorder.", yes: "Consider Diabetic Neuropathy, Hypoglycemia, or Depression", no: "Continue" },
  { question: "Do you have a history of head trauma or brain injury?", symptom: "The patient has a history of head trauma or brain injury.", yes: "Consider Traumatic Brain Injury (TBI)", no: "Continue" },
  { question: "Do you have any fever, headache, or stiff neck?", symptom: "The patient has fever, headache, or stiff neck.", yes: "Consider Infection (e.g., Meningitis, Encephalitis)", no: "Continue" },
  { question: "Do you have unexplained weight loss, fatigue, or weakness?", symptom: "The patient has unexplained weight loss, fatigue, or weakness.", yes: "Consider Endocrine Issues (e.g., Hyperthyroidism, Adrenal Insufficiency)", no: "Continue" }
];

function App() {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  const [step, setStep] = useState(0); // Current question index
  const [answers, setAnswers] = useState([]); // Store user's answers
  const [diagnosis, setDiagnosis] = useState(""); // Store final diagnosis
  const [showDiagnosis, setShowDiagnosis] = useState(false); // To display final diagnosis after completing all questions

  // Handle patient details input
  const handlePatientDetailChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };

  // Handle answer selection (Yes/No)
  const handleAnswer = (answer) => {
    const currentQuestion = questions[step];

    // Store the answer for the current question
    setAnswers([...answers, { question: currentQuestion.question, answer, symptom: currentQuestion.symptom }]);
    
    // Move to the next question
    setStep(step + 1);
    
    // After last question, show the diagnosis
    if (step === questions.length - 1) {
      generateDiagnosis();
    }
  };

  // Logic to generate the diagnosis based on answers
  const generateDiagnosis = () => {
    let diagnosisText = "Based on your responses, potential diagnoses include:";

    // Sample logic to determine diagnosis based on answers
    let possibleDiagnosis = [];

    answers.forEach((answer) => {
      if (answer.answer === "Yes") {
        if (answer.question.includes("suicidal thoughts")) {
          possibleDiagnosis.push("Major Depressive Disorder (Suicidal Risk)");
        }
        if (answer.question.includes("hear voices")) {
          possibleDiagnosis.push("Psychotic Disorders (e.g., Schizophrenia)");
        }
        if (answer.question.includes("period of unusually high energy")) {
          possibleDiagnosis.push("Bipolar Disorder");
        }
        if (answer.question.includes("panic attacks")) {
          possibleDiagnosis.push("Panic Disorder");
        }
        // Add more conditions here based on your logic and flowchart
      }
    });

    if (possibleDiagnosis.length > 0) {
      diagnosisText += " " + possibleDiagnosis.join(", ");
    } else {
      diagnosisText += " No clear diagnosis based on responses.";
    }

    setDiagnosis(diagnosisText);
    setShowDiagnosis(true);
  };

  return (
    <div className="App">
      <h1>Psychiatric Differential Diagnosis App</h1>
      
      {/* Patient Details Form */}
      {!showDiagnosis && (
        <div>
          <h2>Patient Details</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={patientDetails.name}
              onChange={handlePatientDetailChange}
              placeholder="Enter name"
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={patientDetails.age}
              onChange={handlePatientDetailChange}
              placeholder="Enter age"
            />
          </label>
          <br />
          <label>
            Gender:
            <select
              name="gender"
              value={patientDetails.gender}
              onChange={handlePatientDetailChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <label>
            Contact:
            <input
              type="text"
              name="contact"
              value={patientDetails.contact}
              onChange={handlePatientDetailChange}
              placeholder="Enter contact details"
            />
          </label>
          <br />
          <button onClick={() => setStep(0)}>Start Diagnosis</button>
        </div>
      )}

      {/* Diagnostic Flow */}
      {step < questions.length && !showDiagnosis && (
        <div>
          <h2>Question {step + 1}: {questions[step].question}</h2>
          <button onClick={() => handleAnswer("Yes")}>Yes</button>
          <button onClick={() => handleAnswer("No")}>No</button>
        </div>
      )}

      {/* Display Diagnosis */}
      {showDiagnosis && (
        <div>
          <h2>Patient Report</h2>
          <div className="report-section">
            <h3>Patient Details</h3>
            <ul>
              <li><strong>Name:</strong> {patientDetails.name}</li>
              <li><strong>Age:</strong> {patientDetails.age}</li>
              <li><strong>Gender:</strong> {patientDetails.gender}</li>
              <li><strong>Contact:</strong> {patientDetails.contact}</li>
            </ul>
          </div>

          <div className="report-section">
            <h3>Symptoms</h3>
            <ul>
              {answers.filter((answer) => answer.answer === "Yes").map((answer, index) => (
                <li key={index}>
                  <strong>{answer.symptom}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="report-section">
            <h3>Diagnosis Reasoning</h3>
            <p>{diagnosis}</p>
          </div>

          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
