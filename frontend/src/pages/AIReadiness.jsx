// frontend/src/pages/AIReadiness.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import "../css/AIReadiness.css";

const AIReadiness = () => {
  const [step, setStep] = useState("intro"); // intro | lead | questions | result

  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch questions once
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/ai-readiness/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to load questions", err);
      }
    };

    fetchQuestions();
  }, []);

  const handleLeadChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const startAssessment = () => {
    if (!lead.firstName || !lead.lastName || !lead.email) return;
    setStep("questions");
  };

  const answerQuestion = async (value) => {
    const question = questions[currentIndex];
    const updatedAnswers = {
      ...answers,
      [question.id]: value,
    };

    setAnswers(updatedAnswers);

    if (currentIndex === questions.length - 1) {
      setLoading(true);
      try {
        const res = await api.post("/ai-readiness/submit", {
          name: `${lead.firstName} ${lead.lastName}`,
          email: lead.email,
          answers: updatedAnswers,
        });
        setResult(res.data);
        setStep("result");
      } catch (err) {
        console.error("Submission failed", err);
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="ai-card">
          {/* INTRO */}
          {step === "intro" && (
            <>
              <h1>Is Your Business an Asset or a Job?</h1>
              <p>
                If you disappeared from your business for 30 days, would it
                grow, survive, or collapse?
              </p>
              <p>
                This 2-minute assessment reveals how dependent your business is
                on you — and what it’s costing you in freedom and exit value.
              </p>
              <button
                className="ai-btn ai-btn-primary"
                onClick={() => setStep("lead")}
              >
                Calculate My Dependence Score
              </button>
            </>
          )}

          {/* LEAD CAPTURE */}
          {step === "lead" && (
            <>
              <h2>Start Your Free Assessment</h2>
              <div className="ai-form">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={lead.firstName}
                  onChange={handleLeadChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={lead.lastName}
                  onChange={handleLeadChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={lead.email}
                  onChange={handleLeadChange}
                />
                <button
                  className="ai-btn ai-btn-primary"
                  onClick={startAssessment}
                >
                  Start Assessment
                </button>
              </div>
            </>
          )}

          {/* QUESTIONS */}
          {step === "questions" && (
            <>
              {questions.length === 0 ? (
                <p className="ai-loading">Loading questions...</p>
              ) : (
                <>
                  <p className="ai-progress">
                    Question {currentIndex + 1} of {questions.length}
                  </p>
                  <h3>{questions[currentIndex].text}</h3>

                  <div className="ai-answer-buttons">
                    <button
                      className="ai-btn ai-btn-primary"
                      onClick={() => answerQuestion(1)}
                    >
                      Yes
                    </button>
                    <button
                      className="ai-btn ai-btn-outline"
                      onClick={() => answerQuestion(0)}
                    >
                      No
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <>
              <h2>Your AI Readiness Score</h2>
              <div className="ai-score">{result.percentage}%</div>
              <p className="ai-status">{result.status}</p>
              <p>{result.cta}</p>

              <div className="ai-cta">
                <a
                  href="https://surestepbusiness.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn More About How We Help Business Owners
                </a>
              </div>
            </>
          )}

          {loading && <p className="ai-loading">Calculating your score...</p>}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AIReadiness;
