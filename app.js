/**
 * @file Quiz Interativo para o Processo Seletivo SEBRAE/RR.
 * made by rivaed
 *
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
=============================+@+=============================================
=======================%@@@@@@@@=============================================
===================@@@@@@@@@@@@@@%===========================================
==============+@@@@@@@@@@@@@@@@@@@+==========================================
===========+@@@@@@@@@@@@@@@@@@@@@@@==========================================
=========@@@@@@@@@@@@@@@@@@@@@@@@@@%=========================================
=========@@@@@@@@@@@@@@@@@@@@@@@@@@@@========================================
==========%@@@@@@@@@@@@@@@@@@@@@@@@@@%=======================================
============@@@@@@@@@@@@@@@@@@@@@@@@@@@=======@@@@@@@========================
=============@@@@@@@@@@@@@@@@@@@@@@%%%@%+#@@@@@@@@@==========================
==============@@@@@@@@@@@@@@@@@%%%@@@@@@@@@@@@===============================
===============@@@@@@@@@@@@%%@@@@@%+======@==================================
================@@@@@%%%%@@+================@================================
=================%%%@@@=================@@===+@==============================
===============+@@@@@@===============@*@@@@@==@@=============================
==========+@@@@@@@@@@===@@@@%@======#@@@=======%=============================
=======@@@@@@@@%==@@@==@@@@@@@@@=====@===*=====%@=====@======================
=======+@@@+=====@@@=+========#@====@*#@@@@=@@==@+====@#=====================
=================@@==@====%@@@@@====+=@@@@======#@@@@@#======+@@@@@#=========
================#@@=@@=@%@=+#@@==@==@===========@@===========@=====@=========
================+@@=@============@===@@=========@@===========@=====@=========
================#@@===@=========%====@======@@@=@+===========+@@@@@@=========
================+@@==========@%==%@@@======%@+@=@==============@@@@==========
================+@@==@===@=@======@@=@@@@@@@=@==%==============@@============
=================@@+=*==%=%@@@@@@@@=+@@*===*%==+=============*@#@============
==================@@=@===@==@@=============================@+===@============
===================#@@+===%===@======@@======@============@=====@============
=====================%@@@%==++==+====@@=====@============@+==================
========================+@@@@@@@=====@@*==%==@@=========@====================
==========================*@===@==#*==@*@@@=+=%==@@+==+@=====================
============================@===@==@#@@+@++@==*+====#@=======================
============================@@===@=%++#@@@++@+=@#============================
============================@@@==@==++@@==@+++==@============================
===========================@==@%===@@+@@===*+@===@===========================
==========================#@==@%====*#+@+==@+@===@===========================
==========================@===@%======+#@==@=@====@==========================
=========================#@==@@@+%@@@+=@==@=======@==========================
=========================@@@=+@=+========@@+======@==========================
=============================@@=+===========%======%=========================
*/
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Icones do lucide-react
const Check = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const X = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const Sun = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const Moon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;

// Componentes de UI básicos simulados do shadcn
const Card = ({ children, className }) => <div className={`card-custom flex flex-col ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({ children, className }) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
const Button = ({ children, className, ...props }) => <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 h-9 px-4 py-2 bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 ${className}`} {...props}>{children}</button>;
const Progress = ({ value, className }) => <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 ${className}`}><div className="h-full w-full flex-1 bg-gray-900 transition-all dark:bg-gray-50" style={{ transform: `translateX(-${100 - (value || 0)}%)`}}></div></div>;


// Cores para o gráfico de pizza
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [userAnswers, setUserAnswers] = useState({});

  // Função para embaralhar um array
  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Função para selecionar um número específico de questões por tópico
  const getRandomQuiz = (allQuestions, proportions) => {
    const groupedQuestions = allQuestions.reduce((acc, q) => {
      if (!acc[q.topic]) {
        acc[q.topic] = [];
      }
      acc[q.topic].push(q);
      return acc;
    }, {});

    let selectedQuestions = [];
    Object.keys(proportions).forEach(topic => {
      const questionsForTopic = groupedQuestions[topic];
      if (questionsForTopic) {
        const shuffledTopicQuestions = shuffleArray(questionsForTopic);
        selectedQuestions = selectedQuestions.concat(
          shuffledTopicQuestions.slice(0, proportions[topic])
        );
      }
    });

    return shuffleArray(selectedQuestions);
  };

  // Carrega os dados do quiz do arquivo JSON e os embaralha
  useEffect(() => {
    const proportions = {
      "Língua Portuguesa": 10,
      "LGPD": 5,
      "Raciocínio Lógico": 5,
      "Conhecimentos SEBRAE": 5,
      "Conhecimentos Específicos": 25
    };
    
    fetch('/quizData.json')
      .then(response => response.json())
      .then(data => {
        const randomizedQuiz = getRandomQuiz(data, proportions);
        setQuizData(randomizedQuiz);
      })
      .catch(error => console.error('Error loading quiz data:', error));
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
    const isCorrect = option === quizData[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setFeedback(null);
    setUserAnswers({});
    window.location.reload(); 
  };
  
  const handleFinishQuiz = () => {
    setShowResult(true);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (quizData.length === 0) {
    return <p>Carregando quiz...</p>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / quizData.length) * 100;

  const getTopicStats = () => {
    const stats = {};
    const topics = ["Língua Portuguesa", "LGPD", "Raciocínio Lógico", "Conhecimentos SEBRAE", "Conhecimentos Específicos"];
    
    topics.forEach(topic => {
      stats[topic] = { total: 0, correct: 0 };
    });

    quizData.forEach(q => {
        stats[q.topic].total += 1;
    });

    Object.keys(userAnswers).forEach(index => {
      const question = quizData[index];
      if (userAnswers[index] === question.answer) {
        stats[question.topic].correct += 1;
      }
    });

    return stats;
  };

  const topicStats = showResult ? getTopicStats() : {};
  const chartData = Object.keys(topicStats).map((topic, index) => ({
    name: topic,
    value: topicStats[topic].correct,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className={`container ${theme}`}>
      <div className="max-w-2xl w-full">
        <Button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
        {showResult ? (
          <Card className="card-custom">
            <CardHeader>
              <CardTitle>Quiz Finalizado!</CardTitle>
              <CardDescription>
                Parabéns por completar o quiz. Aqui está o seu resultado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="text-xl font-bold">Resumo do Desempenho</h4>
              <p className="text-lg">Você acertou <span className="font-semibold">{score}</span> de <span className="font-semibold">{quizData.length}</span> perguntas.</p>
              <p className="text-lg">Sua pontuação: <span className="font-semibold">{((score / quizData.length) * 100).toFixed(0)}%</span></p>
              
              <h4 className="text-xl font-bold mt-8">Acertos por Tópico</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {Object.keys(topicStats).map(topic => (
                <div key={topic} className="flex justify-between items-center">
                  <span className="font-semibold">{topic}:</span>
                  <span>{topicStats[topic].correct} / {topicStats[topic].total}</span>
                </div>
              ))}

              <h4 className="text-xl font-bold mt-8">Gabarito Completo</h4>
              <div className="space-y-4">
                {quizData.map((q, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <p className="font-bold">Questão {index + 1}: {q.question}</p>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold">Sua Resposta:</span> {userAnswers[index] || "Não respondida"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Resposta Correta:</span> {q.answer}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Explicação:</span> {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRestartQuiz} className="w-full">
                Tentar Novamente
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="card-custom">
            <CardHeader>
              <CardTitle>Questão {currentQuestionIndex + 1} de {quizData.length}</CardTitle>
              <Progress value={progressValue} className="w-full mt-2" />
              <CardDescription>
                <span className="font-bold">{currentQuestion.topic}</span>: {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="w-full">
                  <Button
                    onClick={() => handleOptionClick(option)}
                    disabled={selectedOption !== null}
                    className={`option-button flex items-center justify-between
                      ${selectedOption === option ?
                        (feedback === 'correct' ? 'correct-feedback' : 'incorrect-feedback') : ''}
                      ${feedback && option === currentQuestion.answer ? 'correct-feedback' : ''}
                    `}
                  >
                    <span>{option}</span>
                    {selectedOption === option && feedback && (
                      feedback === 'correct' ? <Check className="ml-2" /> : <X className="ml-2" />
                    )}
                    {feedback && option === currentQuestion.answer && feedback !== 'correct' && (
                      <Check className="ml-2" />
                    )}
                  </Button>
                </div>
              ))}
              {feedback && (
                <div className={`mt-4 p-4 rounded-lg
                  ${feedback === 'correct' ? 'correct-feedback' : 'incorrect-feedback'}
                `}>
                  <p className="font-bold">
                    {feedback === 'correct' ? "Resposta Correta!" : "Resposta Incorreta."}
                  </p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col">
              <Button onClick={handleNextQuestion} disabled={selectedOption === null} className="w-full mb-2">
                {currentQuestionIndex < quizData.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
              </Button>
              <Button onClick={handleFinishQuiz} variant="outline" className="w-full">
                Finalizar Teste
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
