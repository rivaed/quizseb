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

const quizData = [
  // --- Língua Portuguesa (20 questões) ---
  {
    topic: "Língua Portuguesa",
    question: "Na frase 'O SEBRAE oferece, além do salário, os seguintes benefícios fixos', o uso da vírgula antes de 'além' é para:",
    options: [
      "a) Separar um adjunto adverbial deslocado.",
      "b) Indicar uma oração coordenada sindética aditiva.",
      "c) Separar o sujeito do predicado.",
      "d) Isolar uma oração subordinada adjetiva."
    ],
    answer: "a) Separar um adjunto adverbial deslocado.",
    explanation: "A expressão 'além do salário' é um adjunto adverbial de inclusão. Quando ele está deslocado, deve ser separada por vírgula."
  },
  {
    topic: "Língua Portuguesa",
    question: "De acordo com as regras de concordância verbal, qual das frases está correta?",
    options: [
      "a) Havia muitos candidatos na fila.",
      "b) Fazem muitos anos que o SEBRAE existe.",
      "c) Vão-se fazer muitos estudos.",
      "d) Fui eu quem elaboraram o projeto."
    ],
    answer: "a) Havia muitos candidatos na fila.",
    explanation: "O verbo 'haver' no sentido de existir é impessoal e deve ser usado no singular. O correto é 'Havia muitos candidatos...'."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual palavra está escrita de acordo com a nova ortografia?",
    options: [
      "a) Pássaro",
      "b) Cinqüenta",
      "c) Lingüiça",
      "d) Idéia"
    ],
    answer: "a) Pássaro",
    explanation: "Com a nova ortografia, a trema foi eliminada em palavras como 'cinquenta' e 'linguiça', e palavras paroxítonas com ditongos abertos 'éi' e 'ói' perderam o acento, como em 'ideia'."
  },
  {
    topic: "Língua Portuguesa",
    question: "Identifique a frase com erro de concordância nominal:",
    options: [
      "a) É proibido a entrada de pessoas não autorizadas.",
      "b) O anexo seguem a proposta do projeto.",
      "c) Menos pessoas compareceram à reunião.",
      "d) O documento está incluso na pasta."
    ],
    answer: "a) É proibido a entrada de pessoas não autorizadas.",
    explanation: "O adjetivo 'proibido' deve concordar com o substantivo 'entrada'. O correto é 'É proibida a entrada...'. Se não houvesse o artigo, o correto seria 'É proibido entrada...'"
  },
  {
    topic: "Língua Portuguesa",
    question: "Na frase 'Ele aspirava ao cargo de analista', o verbo 'aspirar' é transitivo:",
    options: [
      "a) Direto, com sentido de inalar.",
      "b) Indireto, com sentido de desejar.",
      "c) Direto e indireto, com ambos os sentidos.",
      "d) Intransitivo, com sentido de desejar."
    ],
    answer: "b) Indireto, com sentido de desejar.",
    explanation: "Quando o verbo 'aspirar' tem o sentido de 'desejar', ele é transitivo indireto e exige a preposição 'a'."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual alternativa apresenta o uso correto da crase?",
    options: [
      "a) Voltamos a casa.",
      "b) A palestra iniciou a uma hora.",
      "c) Ele obedece à regras do SEBRAE.",
      "d) Fomos à Paris."
    ],
    answer: "c) Ele obedece à regras do SEBRAE.",
    explanation: "O verbo 'obedecer' exige a preposição 'a', e o substantivo 'regras' é feminino e exige o artigo 'a', resultando em crase."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual é a classificação do termo 'de projetos' na frase 'O analista fará a gestão de projetos'?",
    options: [
      "a) Objeto direto.",
      "b) Objeto indireto.",
      "c) Complemento nominal.",
      "d) Adjunto adnominal."
    ],
    answer: "d) Adjunto adnominal.",
    explanation: "O termo 'de projetos' especifica o substantivo 'gestão', funcionando como adjunto adnominal."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual dos termos a seguir é um sinônimo de 'inverídicas'?",
    options: [
      "a) verdadeiras",
      "b) falsas",
      "c) autênticas",
      "d) confirmadas"
    ],
    answer": "b) falsas",
    explanation: "A palavra 'inverídicas' significa 'não verdadeiras', ou seja, 'falsas'."
  },
  {
    topic: "Língua Portuguesa",
    question: "Na frase 'O SEBRAE/RR não atenderá nenhuma pessoa candidata', qual é a classe gramatical da palavra 'nenhuma'?",
    options: [
      "a) Adjetivo.",
      "b) Advérbio.",
      "c) Pronome indefinido.",
      "d) Substantivo."
    ],
    answer: "c) Pronome indefinido.",
    explanation: "A palavra 'nenhuma' está no lugar de um substantivo (pessoa), mas de forma indeterminada, por isso é um pronome indefinido."
  },
  {
    topic: "Língua Portuguesa",
    question: "Em qual frase o uso da pontuação está incorreto?",
    options: [
      "a) O relatório, que é crucial, está pronto.",
      "b) Os candidatos, devem ler o edital com atenção.",
      "c) Maria, venha aqui!",
      "d) Precisamos de: dados, análises e relatórios."
    ],
    answer": "b) Os candidatos, devem ler o edital com atenção.",
    "explanation": "O erro está na separação do sujeito ('Os candidatos') do predicado ('devem ler o edital') por uma vírgula. Isso não é permitido pela norma padrão."
  },
  {
    topic: "Língua Portuguesa",
    question: "O que o texto 'A inexatidão das declarações (...) eliminará a pessoa candidata' significa?",
    options: [
      "a) Declarações incorretas podem desclassificar o candidato.",
      "b) A falta de precisão não afeta a candidatura.",
      "c) O candidato deve ser exato apenas nas datas.",
      "d) Apenas irregularidades formais levam à eliminação."
    ],
    answer": "a) Declarações incorretas podem desclassificar o candidato.",
    "explanation": "A palavra 'inexatidão' significa falta de exatidão, ou seja, imprecisão ou incorreção nas declarações, o que leva à eliminação do candidato."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual dos verbos a seguir é transitivo direto e indireto ao mesmo tempo?",
    options: [
      "a) Morrer",
      "b) Amar",
      "c) Pagar",
      "d) Sorrir"
    ],
    answer": "c) Pagar",
    explanation": "O verbo 'pagar' é transitivo direto quando se paga 'algo' e indireto quando se paga 'a alguém'."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual é o sentido figurado da palavra 'ferramentas' na frase 'ferramentas de gestão'?",
    options": [
      "a) Instrumentos de trabalho manuais.",
      "b) Meios ou recursos para atingir um objetivo.",
      "c) Utensílios de uma oficina.",
      "d) Objetos de metal para construção."
    ],
    "answer": "b) Meios ou recursos para atingir um objetivo.",
    "explanation": "No contexto de 'ferramentas de gestão', a palavra é usada em sentido figurado para se referir a recursos ou métodos que auxiliam na administração."
  },
  {
    topic: "Língua Portuguesa",
    question: "Acentuação: qual palavra segue a regra de acentuação de paroxítonas terminadas em ditongo oral crescente?",
    options": [
      "a) História",
      "b) Álcool",
      "c) Fácil",
      "d) Fóssil"
    ],
    "answer": "a) História",
    "explanation": "A palavra 'história' é uma paroxítona terminada em ditongo oral crescente 'ia', e por isso é acentuada."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual frase usa corretamente a voz passiva analítica?",
    "options": [
      "a) Os resultados serão divulgados pela FAPETEC.",
      "b) Os resultados divulgaram-se.",
      "c) Divulgou-se os resultados.",
      "d) Divulgaram os resultados."
    ],
    "answer": "a) Os resultados serão divulgados pela FAPETEC.",
    "explanation": "A voz passiva analítica é formada pelo verbo ser + particípio (serão divulgados) e indica o agente da ação ('pela FAPETEC')."
  },
  {
    topic: "Língua Portuguesa",
    question: "Identifique a frase com erro de regência verbal:",
    "options": [
      "a) Prefiro a tecnologia à tradição.",
      "b) Assistimos ao filme no cinema.",
      "c) Ele obedeceu o regulamento.",
      "d) Chegamos ao escritório no horário."
    ],
    "answer": "c) Ele obedeceu o regulamento.",
    "explanation": "O verbo 'obedecer' é transitivo indireto e exige a preposição 'a'. O correto seria 'Ele obedeceu ao regulamento'."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual a função do 'se' na frase 'Precisam-se de novos talentos'?",
    "options": [
      "a) Partícula apassivadora.",
      "b) Pronome reflexivo.",
      "c) Índice de indeterminação do sujeito.",
      "d) Conjunção integrante."
    ],
    "answer": "c) Índice de indeterminação do sujeito.",
    "explanation": "Nesse caso, 'precisam-se de' indica que o sujeito que 'precisa' é indeterminado. A presença da preposição 'de' após o verbo impede que ele concorde com o objeto ('novos talentos')."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual a alternativa com o 'porquê' usado corretamente?",
    "options": [
      "a) A vaga é para Analista II, por que ele é mais experiente.",
      "b) Ele não foi ao curso, porque estava doente.",
      "c) Ele sabe o porquê de sua aprovação.",
      "d) Você não estudou? Por que?"
    ],
    "answer": "b) Ele não foi ao curso, porque estava doente.",
    "explanation": "'Porque' junto e sem acento é usado para explicar ou dar uma causa."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual a frase em que a palavra 'onde' foi usada corretamente?",
    "options": [
      "a) Onde a empresa precisa de novas ideias.",
      "b) O projeto, onde ele trabalhou, foi um sucesso.",
      "c) A vaga onde ele se candidatou é para TI.",
      "d) Onde está o edital?"
    ],
    "answer": "b) O projeto, onde ele trabalhou, foi um sucesso.",
    "explanation": "O pronome 'onde' se refere a um lugar físico. No contexto, 'o projeto' funciona como um lugar metafórico."
  },
  {
    topic: "Língua Portuguesa",
    question: "Qual frase demonstra o uso correto do 'em anexo'?",
    "options": [
      "a) As cópias seguem em anexo.",
      "b) As cópias seguem anexo.",
      "c) A cópia segue em anexa.",
      "d) A cópia segue em anexo."
    ],
    "answer": "d) A cópia segue em anexo.",
    "explanation": "'Anexo' é um adjetivo que concorda com o substantivo. Porém, na expressão 'em anexo', 'anexo' é um advérbio e não flexiona. O correto é sempre usar 'em anexo' ou 'o anexo'."
  },

  // --- LGPD - Lei Geral de Proteção de Dados (20 questões) ---
  {
    topic: "LGPD",
    question: "O que é um 'controlador' de dados, segundo a LGPD?",
    options: [
      "a) A pessoa natural a quem se referem os dados pessoais.",
      "b) A pessoa natural ou jurídica, de direito público ou privado, a quem compete as decisões referentes ao tratamento de dados pessoais.",
      "c) A pessoa que realiza o tratamento de dados pessoais em nome do controlador.",
      "d) A autoridade nacional de proteção de dados."
    ],
    answer: "b) A pessoa natural ou jurídica, de direito público ou privado, a quem compete as decisões referentes ao tratamento de dados pessoais.",
    explanation: "O controlador é a entidade que toma as decisões sobre o tratamento dos dados pessoais. O SEBRAE, por exemplo, atua como controlador ao tratar os dados dos candidatos."
  },
  {
    topic: "LGPD",
    question: "Segundo a LGPD, para que o tratamento de dados pessoais seja legítimo, ele deve ter um(a):",
    options: [
      "a) Plano de negócios.",
      "b) Consentimento do titular.",
      "c) Base legal.",
      "d) Autorização do governo."
    ],
    answer: "c) Base legal.",
    explanation: "O tratamento de dados pessoais deve se basear em uma das hipóteses legais previstas na LGPD, como o consentimento, o cumprimento de obrigação legal ou o legítimo interesse."
  },
  {
    topic: "LGPD",
    question: "Qual dos seguintes direitos o titular dos dados NÃO possui, conforme a LGPD?",
    options: [
      "a) Direito de acesso aos dados.",
      "b) Direito de portabilidade dos dados.",
      "c) Direito de exclusão dos dados.",
      "d) Direito de receber indenização automática em caso de tratamento indevido."
    ],
    answer: "d) Direito de receber indenização automática em caso de tratamento indevido.",
    explanation: "A LGPD não garante indenização automática, mas sim o direito à reparação de danos em caso de tratamento de dados em desconformidade com a lei."
  },
  {
    topic: "LGPD",
    question: "Qual é o principal objetivo da LGPD?",
    options: [
      "a) Controlar a circulação de notícias falsas.",
      "b) Proteger os direitos de propriedade intelectual.",
      "c) Proteger a liberdade e a privacidade dos dados pessoais dos cidadãos.",
      "d) Regulamentar o comércio eletrônico."
    ],
    answer": "c) Proteger a liberdade e a privacidade dos dados pessoais dos cidadãos.",
    "explanation": "O objetivo central da LGPD é proteger os direitos fundamentais de liberdade e privacidade e o livre desenvolvimento da personalidade da pessoa natural."
  },
  {
    topic: "LGPD",
    question: "O que são 'dados pessoais sensíveis'?",
    options: [
      "a) Dados de contato como e-mail e telefone.",
      "b) Dados relacionados à origem racial ou étnica, convicções religiosas, opinião política, saúde ou vida sexual, dados genéticos ou biométricos.",
      "c) Qualquer dado que uma pessoa considere importante.",
      "d) Informações financeiras e de crédito."
    ],
    answer": "b) Dados relacionados à origem racial ou étnica, convicções religiosas, opinião política, saúde ou vida sexual, dados genéticos ou biométricos.",
    "explanation": "A LGPD define dados sensíveis como aqueles que exigem um nível mais alto de proteção devido ao seu potencial de causar discriminação."
  },
  {
    topic: "LGPD",
    question: "Qual das seguintes ações é uma forma de 'tratamento de dados'?",
    "options": [
      "a) Apenas a coleta de dados.",
      "b) Apenas o armazenamento de dados.",
      "c) Apenas o descarte de dados.",
      "d) Todas as ações mencionadas e mais, desde a coleta até o descarte."
    ],
    "answer": "d) Todas as ações mencionadas e mais, desde a coleta até o descarte.",
    "explanation": "O tratamento de dados é qualquer operação realizada com dados pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, controle, modificação, comunicação, transferência, difusão ou extração."
  },
  {
    topic: "LGPD",
    question: "Qual órgão é responsável por fiscalizar e aplicar a LGPD no Brasil?",
    "options": [
      "a) Ministério da Justiça.",
      "b) Autoridade Nacional de Proteção de Dados (ANPD).",
      "c) O Conselho Nacional de Justiça.",
      "d) O Instituto Nacional de Tecnologia da Informação."
    ],
    "answer": "b) Autoridade Nacional de Proteção de Dados (ANPD).",
    "explanation": "A ANPD é o órgão da administração pública federal responsável por zelar, implementar e fiscalizar o cumprimento da LGPD."
  },
  {
    topic: "LGPD",
    question: "Em qual situação o SEBRAE pode tratar os dados dos candidatos sem o seu consentimento explícito?",
    "options": [
      "a) Para fazer publicidade dos seus cursos.",
      "b) Para cumprimento de obrigação legal ou regulatória.",
      "c) Para compartilhar com outras empresas parceiras sem aviso prévio.",
      "d) Para vender a lista de contatos dos candidatos."
    ],
    "answer": "b) Para cumprimento de obrigação legal ou regulatória.",
    "explanation": "O tratamento de dados pode ocorrer sem consentimento para cumprir uma obrigação legal ou regulatória, entre outras bases legais."
  },
  {
    topic: "LGPD",
    question: "O direito do titular de solicitar a 'anonimização' dos dados significa que:",
    "options": [
      "a) Os dados serão apagados permanentemente.",
      "b) Os dados serão editados para que a pessoa não seja identificada.",
      "c) Os dados serão transferidos para outra empresa.",
      "d) O titular poderá ter acesso aos seus dados."
    ],
    "answer": "b) Os dados serão editados para que a pessoa não seja identificada.",
    "explanation": "A anonimização é a utilização de meios técnicos para garantir que o dado não possa ser associado a uma pessoa, sem a necessidade de eliminação."
  },
  {
    topic: "LGPD",
    question: "O que a LGPD estabelece para as organizações em caso de vazamento de dados pessoais?",
    "options": [
      "a) A organização deve notificar a ANPD e os titulares imediatamente.",
      "b) A organização não precisa tomar nenhuma atitude, pois é um risco comum.",
      "c) Apenas os titulares devem ser notificados, não a ANPD.",
      "d) Apenas a ANPD deve ser notificada, não os titulares."
    ],
    "answer": "a) A organização deve notificar a ANPD e os titulares imediatamente.",
    "explanation": "Em caso de incidentes de segurança que possam acarretar risco ou dano relevante aos titulares, a organização tem a obrigação de comunicar o ocorrido à ANPD e aos titulares, em prazo razoável."
  },
  {
    topic: "LGPD",
    question: "Qual dos seguintes princípios NÃO faz parte da LGPD?",
    "options": [
      "a) Finalidade.",
      "b) Adequação.",
      "c) Necessidade.",
      "d) Publicidade."
    ],
    "answer": "d) Publicidade.",
    "explanation": "A publicidade não é um dos 10 princípios da LGPD. Os princípios incluem finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização e prestação de contas."
  },
  {
    topic: "LGPD",
    question: "A LGPD se aplica a empresas com sede no exterior que tratam dados de pessoas localizadas no Brasil?",
    "options": [
      "a) Não, a LGPD só se aplica a empresas brasileiras.",
      "b) Sim, desde que o tratamento de dados ocorra no território nacional.",
      "c) Sim, a LGPD se aplica independentemente da localização da empresa.",
      "d) Não, a lei de cada país é que determina."
    ],
    answer": "b) Sim, desde que o tratamento de dados ocorra no território nacional.",
    "explanation": "A LGPD tem 'aplicação extraterritorial', ou seja, se aplica a empresas estrangeiras que oferecem bens ou serviços para o Brasil ou que coletam dados de brasileiros."
  },
  {
    topic: "LGPD",
    question: "Qual é a principal responsabilidade do 'encarregado' de dados (DPO)?",
    "options": [
      "a) Ser o ponto de contato entre o controlador, os titulares e a ANPD.",
      "b) Realizar o tratamento dos dados pessoais.",
      "c) Tomar as decisões sobre o tratamento de dados.",
      "d) Ser o responsável legal da empresa."
    ],
    answer": "a) Ser o ponto de contato entre o controlador, os titulares e a ANPD.",
    "explanation": "O DPO é a pessoa indicada pelo controlador para atuar como canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD)."
  },
  {
    topic: "LGPD",
    question: "Qual das seguintes bases legais NÃO é uma das previstas na LGPD?",
    "options": [
      "a) Consentimento do titular.",
      "b) Cumprimento de obrigação legal.",
      "c) Proteção ao crédito.",
      "d) Legítimo interesse do controlador."
    ],
    "answer": "d) Legítimo interesse do controlador.",
    "explanation": "O 'legítimo interesse' é uma das bases legais, mas a 'proteção ao crédito' é a base legal correta para o tratamento de dados com essa finalidade."
  },
  {
    topic: "LGPD",
    question: "A LGPD se aplica a dados de pessoas jurídicas?",
    "options": [
      "a) Sim, a LGPD protege tanto pessoas físicas quanto jurídicas.",
      "b) Não, a LGPD protege apenas dados de pessoas naturais (físicas).",
      "c) Sim, mas apenas para pequenas empresas.",
      "d) Sim, mas apenas para dados de empresas públicas."
    ],
    "answer": "b) Não, a LGPD protege apenas dados de pessoas naturais (físicas).",
    "explanation": "A LGPD protege a liberdade e a privacidade dos dados pessoais de pessoas físicas, não de pessoas jurídicas."
  },
  {
    topic: "LGPD",
    question: "O que significa o direito de 'portabilidade' dos dados?",
    "options": [
      "a) Transferir dados para outros países.",
      "b) Receber os dados em formato impresso.",
      "c) Transferir os dados para outro fornecedor de serviço, a pedido do titular.",
      "d) Excluir os dados da base de uma empresa."
    ],
    "answer": "c) Transferir os dados para outro fornecedor de serviço, a pedido do titular.",
    "explanation": "A portabilidade é o direito de receber os dados em um formato que permita sua transferência para outro fornecedor de serviço ou produto, sem impedimentos."
  },
  {
    topic: "LGPD",
    question: "A LGPD exige o consentimento para o tratamento de dados tornados manifestamente públicos pelo titular?",
    "options": [
      "a) Sim, o consentimento é sempre obrigatório.",
      "b) Não, desde que a finalidade do tratamento seja compatível com a original.",
      "c) Não, se os dados forem usados para fins de marketing.",
      "d) Sim, mas apenas para dados sensíveis."
    ],
    "answer": "b) Não, desde que a finalidade do tratamento seja compatível com a original.",
    "explanation": "A LGPD dispensa o consentimento para dados manifestamente públicos, desde que o tratamento seja compatível com a finalidade para a qual o titular os tornou públicos."
  },
  {
    topic: "LGPD",
    question: "A LGPD se aplica a dados de pessoas mortas?",
    "options": [
      "a) Sim, a LGPD protege dados de pessoas mortas.",
      "b) Não, a LGPD não se aplica a dados de pessoas mortas.",
      "c) A LGPD se aplica apenas a dados de pessoas vivas.",
      "d) A LGPD não se aplica a dados de pessoas mortas, mas os herdeiros têm direito a acesso."
    ],
    "answer": "d) A LGPD não se aplica a dados de pessoas mortas, mas os herdeiros têm direito a acesso.",
    "explanation": "A LGPD não se aplica a dados de pessoas mortas, mas a Lei garante que os herdeiros possam acessar e tratar esses dados."
  },
  {
    topic: "LGPD",
    question: "O que é 'finalidade' na LGPD?",
    "options": [
      "a) O tipo de dado que será coletado.",
      "b) A razão específica e legítima para o tratamento de dados.",
      "c) A quantidade de dados a ser coletada.",
      "d) A forma como os dados são armazenados."
    ],
    "answer": "b) A razão específica e legítima para o tratamento de dados.",
    "explanation": "'Finalidade' é um dos princípios da LGPD, que exige que o tratamento de dados tenha um propósito específico e legítimo, e que o titular seja informado sobre ele."
  },
  {
    topic: "LGPD",
    question: "O que a LGPD define como 'agentes de tratamento'?",
    "options": [
      "a) Apenas o controlador.",
      "b) O controlador e o operador.",
      "c) Apenas a ANPD.",
      "d) Os titulares de dados e a ANPD."
    ],
    "answer": "b) O controlador e o operador.",
    "explanation": "A LGPD define como agentes de tratamento o controlador e o operador, ou seja, quem toma as decisões sobre os dados e quem os processa em nome do controlador."
  },

  // --- Raciocínio Lógico (20 questões) ---
  {
    topic: "Raciocínio Lógico",
    question: "Considerando as proposições P: 'O processo seletivo é online' e Q: 'É necessário ter um computador', a proposição composta 'P e Q' é verdadeira se:",
    options: [
      "a) Ambas são verdadeiras.",
      "b) Apenas P é verdadeira.",
      "c) Apenas Q é verdadeira.",
      "d) Ambas são falsas."
    ],
    answer: "a) Ambas são verdadeiras.",
    explanation: "Em uma conjunção ('e'), a proposição composta só é verdadeira se as duas proposições simples (P e Q) forem verdadeiras."
  },
  {
    topic: "Raciocínio Lógico",
    question: "A negação da proposição 'João estuda e Maria trabalha' é:",
    options: [
      "a) João não estuda e Maria não trabalha.",
      "b) Se João estuda, então Maria trabalha.",
      "c) João não estuda ou Maria não trabalha.",
      "d) João estuda ou Maria não trabalha."
    ],
    answer": "c) João não estuda ou Maria não trabalha.",
    "explanation": "A negação de uma proposição com 'e' é feita negando ambas as proposições e trocando o 'e' por 'ou'. Essa é uma das Leis de De Morgan."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Em uma tabela-verdade de duas proposições (P e Q), quantas linhas a tabela terá?",
    "options": [
      "a) 2",
      "b) 3",
      "c) 4",
      "d) 5"
    ],
    "answer": "c) 4",
    "explanation": "O número de linhas de uma tabela-verdade é calculado pela fórmula 2^n, onde 'n' é o número de proposições. Para duas proposições, 2^2 = 4."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual das seguintes frases NÃO é uma proposição?",
    "options": [
      "a) 5 é um número primo.",
      "b) O Sol é uma estrela.",
      "c) Onde fica o SEBRAE?",
      "d) O gato é um mamífero."
    ],
    "answer": "c) Onde fica o SEBRAE?",
    "explanation": "Uma proposição é uma frase declarativa que pode ser verdadeira ou falsa. Uma pergunta não se enquadra nessa definição."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual é a negação da proposição 'Se chove, então faz frio'?",
    "options": [
      "a) Se não chove, então não faz frio.",
      "b) Chove e não faz frio.",
      "c) Não chove e não faz frio.",
      "d) Não faz frio e chove."
    ],
    "answer": "b) Chove e não faz frio.",
    "explanation": "A negação de uma condicional 'Se P, então Q' é 'P e não Q'. Portanto, a negação de 'Se chove, então faz frio' é 'Chove e não faz frio'."
  },
  {
    topic: "Raciocínio Lógico",
    question: "A proposição '2 + 2 = 5 ou 3 + 3 = 6' é:",
    "options": [
      "a) Verdadeira.",
      "b) Falsa.",
      "c) Uma tautologia.",
      "d) Uma contradição."
    ],
    "answer": "a) Verdadeira.",
    "explanation": "Em uma disjunção ('ou'), a proposição composta é verdadeira se pelo menos uma das proposições simples for verdadeira. '2 + 2 = 5' é falsa, mas '3 + 3 = 6' é verdadeira, então a proposição composta é verdadeira."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual dos seguintes conectivos é representado pelo símbolo '∧'?",
    "options": [
      "a) ou",
      "b) se...então",
      "c) e",
      "d) ou...ou"
    ],
    "answer": "c) e",
    "explanation": "O símbolo '∧' representa a conjunção, ou seja, o conectivo 'e'."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Se a proposição 'A prova é fácil' é falsa, e a proposição 'Eu passei' é verdadeira, qual o valor lógico da proposição 'A prova é fácil e eu passei'?",
    "options": [
      "a) Verdadeiro.",
      "b) Falso.",
      "c) Depende do meu desempenho.",
      "d) Não pode ser determinado."
    ],
    "answer": "b) Falso.",
    "explanation": "Em uma conjunção ('e'), se uma das proposições simples é falsa, a proposição composta inteira também será falsa."
  },
  {
    topic: "Raciocínio Lógico",
    question: "A proposição 'Se o candidato não ler o edital, então será eliminado' é falsa se:",
    "options": [
      "a) O candidato não ler o edital e não for eliminado.",
      "b) O candidato ler o edital e for eliminado.",
      "c) O candidato não ler o edital e for eliminado.",
      "d) O candidato ler o edital e não for eliminado."
    ],
    "answer": "a) O candidato não ler o edital e não for eliminado.",
    "explanation": "Uma proposição condicional ('Se P, então Q') só é falsa quando o antecedente (P) é verdadeiro e o consequente (Q) é falso."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual dos seguintes é um exemplo de 'sentença aberta'?",
    "options": [
      "a) x + 5 = 10.",
      "b) O céu é azul.",
      "c) 7 é um número par.",
      "d) Todos os gatos são pretos."
    ],
    "answer": "a) x + 5 = 10.",
    "explanation": "Uma sentença aberta é uma expressão que não pode ser considerada verdadeira ou falsa por si só, pois contém uma variável ('x') cujo valor não é definido."
  },
  {
    topic: "Raciocínio Lógico",
    question: "A proposição 'Todos os profissionais de TI trabalham no SEBRAE' é:",
    "options": [
      "a) Uma tautologia.",
      "b) Verdadeira.",
      "c) Falsa.",
      "d) Uma proposição aberta."
    ],
    "answer": "c) Falsa.",
    "explanation": "Esta proposição é falsa, pois existem profissionais de TI que não trabalham no SEBRAE. Uma proposição é falsa se houver pelo menos um contraexemplo."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual a negação da proposição 'Nenhum funcionário está presente'?",
    "options": [
      "a) Todos os funcionários estão presentes.",
      "b) Alguns funcionários não estão presentes.",
      "c) Pelo menos um funcionário está presente.",
      "d) Nenhuma das alternativas."
    ],
    "answer": "c) Pelo menos um funcionário está presente.",
    "explanation": "A negação de 'Nenhum A é B' é 'Algum A é B', ou 'Pelo menos um A é B'."
  },
  {
    topic: "Raciocínio Lógico",
    question: "A proposição 'Se o processo seletivo fosse justo, então eu passaria' é uma:",
    "options": [
      "a) Disjunção.",
      "b) Conjunção.",
      "c) Condicional.",
      "d) Bicondicional."
    ],
    answer: "c) Condicional.",
    "explanation": "A estrutura 'Se... então' é característica de uma proposição condicional."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual o valor lógico da proposição 'Brasília é a capital do Brasil e 2 + 2 = 4'?",
    "options": [
      "a) Verdadeiro.",
      "b) Falso.",
      "c) Indeterminado.",
      "d) Falso, porque a segunda parte é uma tautologia."
    ],
    "answer": "a) Verdadeiro.",
    "explanation": "Em uma conjunção ('e'), se ambas as proposições simples são verdadeiras, a proposição composta também é verdadeira."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual a negação da proposição 'O candidato A ou o candidato B será aprovado'?",
    "options": [
      "a) O candidato A não será aprovado e o candidato B não será aprovado.",
      "b) O candidato A e o candidato B serão aprovados.",
      "c) O candidato A não será aprovado ou o candidato B não será aprovado.",
      "d) O candidato A não será aprovado."
    ],
    "answer": "a) O candidato A não será aprovado e o candidato B não será aprovado.",
    "explanation": "A negação de uma disjunção ('ou') é a conjunção ('e') das negações das proposições simples. (¬P ∧ ¬Q)."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Se a proposição 'P' é verdadeira e a proposição 'Q' é falsa, qual o valor lógico de 'P ↔ Q'?",
    "options": [
      "a) Verdadeiro.",
      "b) Falso.",
      "c) Depende da ordem das proposições.",
      "d) A proposição não tem sentido."
    ],
    "answer": "b) Falso.",
    "explanation": "Em uma bicondicional ('↔'), a proposição só é verdadeira se ambas as proposições simples tiverem o mesmo valor lógico."
  },
  {
    topic: "Raciocínio Lógico",
    question: "O que é uma 'tautologia'?",
    "options": [
      "a) Uma proposição que é sempre falsa.",
      "b) Uma proposição que é sempre verdadeira.",
      "c) Uma proposição que pode ser verdadeira ou falsa.",
      "d) Uma proposição que não tem valor lógico."
    ],
    "answer": "b) Uma proposição que é sempre verdadeira.",
    "explanation": "Uma tautologia é uma proposição composta que é sempre verdadeira, independentemente dos valores de verdade das proposições simples que a compõem."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Se a proposição 'P' é falsa e a proposição 'Q' é verdadeira, qual o valor lógico de 'P → Q'?",
    "options": [
      "a) Verdadeiro.",
      "b) Falso.",
      "c) Indeterminado.",
      "d) Falso, pois a primeira parte é falsa."
    ],
    "answer": "a) Verdadeiro.",
    "explanation": "Uma proposição condicional 'P → Q' só é falsa quando 'P' é verdadeiro e 'Q' é falso. Nos outros casos, é sempre verdadeira."
  },
  {
    topic: "Raciocínio Lógico",
    question: "Qual a negação da proposição 'O edital é claro ou a prova é fácil'?",
    "options": [
      "a) O edital é claro e a prova é fácil.",
      "b) O edital não é claro ou a prova não é fácil.",
      "c) O edital não é claro e a prova não é fácil.",
      "d) Se o edital não é claro, então a prova não é fácil."
    ],
    "answer": "c) O edital não é claro e a prova não é fácil.",
    "explanation": "A negação de uma disjunção ('ou') é a conjunção das negações. (¬P ∧ ¬Q)."
  },
  {
    topic: "Raciocínio Lógico",
    question: "A proposição 'Não é verdade que a FAPETEC é a organizadora e o SEBRAE é o contratante' equivale a:",
    "options": [
      "a) A FAPETEC não é a organizadora e o SEBRAE não é o contratante.",
      "b) A FAPETEC não é a organizadora ou o SEBRAE não é o contratante.",
      "c) Se a FAPETEC não é a organizadora, então o SEBRAE não é o contratante.",
      "d) A FAPETEC é a organizadora ou o SEBRAE é o contratante."
    ],
    "answer": "b) A FAPETEC não é a organizadora ou o SEBRAE não é o contratante.",
    "explanation": "A negação de uma conjunção é a disjunção das negações, conforme as Leis de De Morgan."
  },

  // --- Conhecimentos SEBRAE (20 questões) ---
  {
    topic: "Conhecimentos SEBRAE",
    question: "De acordo com o edital, qual é a natureza jurídica do SEBRAE?",
    options: [
      "a) É uma empresa privada com fins lucrativos.",
      "b) É uma autarquia pública, vinculada ao governo.",
      "c) É um serviço social autônomo, pessoa jurídica de direito privado.",
      "d) É uma sociedade de economia mista."
    ],
    answer: "c) É um serviço social autônomo, pessoa jurídica de direito privado.",
    explanation: "O edital e a lei que criou o SEBRAE o classificam como um 'serviço social autônomo', uma pessoa jurídica de direito privado, sem fins lucrativos."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual das atribuições a seguir NÃO é uma atribuição do Analista Técnico II, segundo o edital?",
    options: [
      "a) Definir métodos, fluxos e padrões de informações.",
      "b) Contribuir em projetos de análise de dados e IA.",
      "c) Negociar prazos e recursos junto a outras instituições.",
      "d) Fazer a gestão de contratos de estagiários."
    ],
    answer": "d) Fazer a gestão de contratos de estagiários.",
    "explanation": "O edital menciona a gestão ou fiscalização de contratos, mas não especifica a gestão de contratos de estagiários. A opção 'd' não é uma atribuição explícita mencionada nos documentos fornecidos."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "De acordo com o edital, o SEBRAE Roraima:",
    "options": [
      "a) Não tem autonomia para cancelar o processo seletivo.",
      "b) É obrigado a realizar concurso público.",
      "c) Pode contratar por tempo indeterminado sob o regime CLT.",
      "d) Não oferece plano de saúde aos contratados."
    ],
    "answer": "c) Pode contratar por tempo indeterminado sob o regime CLT.",
    "explanation": "O edital esclarece que a relação de emprego é regida pela CLT e que a contratação será por prazo indeterminado, sem a necessidade de concurso público por ser uma instituição de direito privado."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual é a finalidade principal do Código de Ética do Sistema SEBRAE?",
    "options": [
      "a) Regular a contratação de pessoal.",
      "b) Estabelecer diretrizes de conduta para os colaboradores.",
      "c) Definir o planejamento estratégico da instituição.",
      "d) Determinar os salários e benefícios dos funcionários."
    ],
    "answer": "b) Estabelecer diretrizes de conduta para os colaboradores.",
    "explanation": "O Código de Ética do SEBRAE serve para orientar a conduta e os valores que os colaboradores devem seguir em suas atividades profissionais."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Segundo o edital, a nota final no Processo Seletivo para a vaga AN03 é o somatório das notas de quais etapas?",
    "options": [
      "a) Prova objetiva e prova discursiva.",
      "b) Avaliação de conhecimentos, análise curricular e documental, e entrevista.",
      "c) Avaliação de conhecimentos, análise curricular e documental, avaliação de habilidades e entrevista.",
      "d) Apenas a prova objetiva."
    ],
    "answer": "c) Avaliação de conhecimentos, análise curricular e documental, avaliação de habilidades e entrevista.",
    "explanation": "O edital para a vaga AN03 detalha que a nota final é a soma das pontuações obtidas na avaliação de conhecimentos, análise curricular e documental, avaliação de habilidades (Pitch) e entrevista individual."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual o prazo de validade do banco de reserva para as pessoas candidatas aprovadas?",
    "options": [
      "a) 6 meses.",
      "b) 1 ano.",
      "c) 2 anos.",
      "d) 5 anos."
    ],
    "answer": "b) 1 ano.",
    "explanation": "O edital estabelece que as pessoas candidatas aprovadas comporão um banco de reserva pelo prazo de 1 (um) ano, a contar da publicação do resultado final."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual o regime de contratação para os selecionados no processo seletivo?",
    "options": [
      "a) Estatuário.",
      "b) Temporário, com duração máxima de 2 anos.",
      "c) CLT - Consolidação das Leis Trabalhistas, por prazo indeterminado.",
      "d) Autônomo, sem vínculo empregatício."
    ],
    "answer": "c) CLT - Consolidação das Leis Trabalhistas, por prazo indeterminado.",
    "explanation": "O edital especifica que a relação de emprego é regida pela CLT, com contrato por prazo indeterminado."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual das seguintes afirmações sobre o SEBRAE está correta, de acordo com o edital?",
    "options": [
      "a) É uma empresa com fins lucrativos.",
      "b) É uma instituição que não possui autonomia.",
      "c) Possui proteção constitucional contra interferência estatal.",
      "d) É uma autarquia federal."
    ],
    "answer": "c) Possui proteção constitucional contra interferência estatal.",
    "explanation": "O edital menciona que o SEBRAE possui proteção constitucional contra qualquer tipo de interferência estatal em seu funcionamento."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual das seguintes etapas do processo seletivo para a vaga AN03 é classificatória e eliminatória?",
    "options": [
      "a) Análise de Perfil.",
      "b) Avaliação de Habilidades (Pitch).",
      "c) Dinâmica de grupo.",
      "d) Prova discursiva."
    ],
    "answer": "b) Avaliação de Habilidades (Pitch).",
    "explanation": "A tabela do edital para a vaga AN03 mostra que a Avaliação de Habilidades (Pitch) é uma etapa eliminatória e classificatória."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Segundo o edital, o que acontece se o candidato não aceitar as condições de convocação?",
    "options": [
      "a) O candidato permanece no banco de reserva.",
      "b) O candidato é automaticamente eliminado do processo seletivo.",
      "c) O candidato perde 50% de sua pontuação.",
      "d) O candidato pode recorrer da decisão."
    ],
    "answer": "b) O candidato é automaticamente eliminado do processo seletivo.",
    "explanation": "O edital é claro ao afirmar que a pessoa que não aceitar as condições de convocação estará, automaticamente, eliminada do processo seletivo."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "O que o edital define como a principal responsabilidade do candidato durante o processo seletivo?",
    "options": [
      "a) Entrar em contato com o SEBRAE para tirar dúvidas.",
      "b) Aguardar o contato individual por telefone ou e-mail.",
      "c) Acompanhar todas as etapas da seleção no portal da FAPETEC.",
      "d) Enviar os documentos por correio."
    ],
    "answer": "c) Acompanhar todas as etapas da seleção no portal da FAPETEC.",
    "explanation": "O edital enfatiza que o acompanhamento de todas as etapas é de inteira responsabilidade do candidato, que deve consultar o portal da FAPETEC."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual o período mínimo que a pessoa contratada deve permanecer na cidade/município da vaga?",
    "options": [
      "a) 6 meses.",
      "b) 12 meses.",
      "c) 24 meses.",
      "d) 36 meses."
    ],
    "answer": "b) 12 meses.",
    "explanation": "De acordo com o item 4.6 do edital, a pessoa que aceitar as condições oferecidas deverá permanecer por um período mínimo de 12 (doze) meses na cidade/município da vaga."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual das seguintes afirmações sobre o Processo Seletivo do SEBRAE/RR está correta?",
    "options": [
      "a) Não é permitido o uso de notebook para realizar as provas.",
      "b) As etapas de seleção são realizadas presencialmente.",
      "c) Os resultados são divulgados por ordem alfabética.",
      "d) O SEBRAE/RR e a FAPETEC não se responsabilizam por publicações de terceiros."
    ],
    "answer": "d) O SEBRAE/RR e a FAPETEC não se responsabilizam por publicações de terceiros.",
    "explanation": "O edital deixa claro que o SEBRAE/RR e a FAPETEC não se responsabilizam por quaisquer cursos, textos, apostilas e outras publicações referentes ao Processo Seletivo, que não sejam oficiais."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual a principal diferença entre o processo seletivo do SEBRAE e um concurso público, segundo o edital?",
    "options": [
      "a) O SEBRAE não oferece benefícios.",
      "b) A contratação do SEBRAE não garante estabilidade.",
      "c) O SEBRAE não permite recursos.",
      "d) Apenas a duração do contrato."
    ],
    "answer": "b) A contratação do SEBRAE não garante estabilidade.",
    "explanation": "O edital destaca que o SEBRAE não tem o dever de realizar concurso público e que a contratação não acarreta estabilidade."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual das seguintes informações o candidato NÃO pode alterar após a finalização do cadastro de inscrição?",
    "options": [
      "a) Nome.",
      "b) Endereço.",
      "c) Vaga de interesse.",
      "d) Telefone de contato."
    ],
    "answer": "c) Vaga de interesse.",
    "explanation": "O edital afirma que 'Uma vez finalizado o preenchimento do cadastro eletrônico nenhuma informação poderá ser alterada, excluída ou inserida', e em outro ponto, que o candidato só pode se inscrever para uma única vaga. Se ele finalizou a inscrição, não pode mudar a vaga."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "O que acontece se a inexatidão das declarações for verificada somente após a contratação?",
    "options": [
      "a) O candidato recebe uma advertência.",
      "b) A contratação é mantida, mas com ressalvas.",
      "c) A contratação é anulada.",
      "d) O candidato paga uma multa."
    ],
    "answer": "c) A contratação é anulada.",
    "explanation": "O edital afirma que a inexatidão das declarações, mesmo que verificada posteriormente, 'eliminará a pessoa candidata do processo seletivo, anulando-se todos os atos e efeitos decorrentes'."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual o papel da FAPETEC no processo seletivo?",
    "options": [
      "a) Apenas elaborar as questões das provas.",
      "b) Apenas divulgar os resultados.",
      "c) A FAPETEC é a empresa contratada para executar o processo seletivo.",
      "d) A FAPETEC é responsável por tomar as decisões finais de contratação."
    ],
    "answer": "c) A FAPETEC é a empresa contratada para executar o processo seletivo.",
    "explanation": "O edital explica que o processo seletivo será executado pela FAPETEC, instituição contratada pelo SEBRAE Roraima para esse fim."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Qual o valor da taxa de inscrição, conforme o edital?",
    "options": [
      "a) R$ 50,00.",
      "b) R$ 70,00.",
      "c) R$ 80,00.",
      "d) R$ 100,00."
    ],
    "answer": "b) R$ 70,00.",
    "explanation": "O edital informa que o valor da taxa de inscrição é de R$ 70,00."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Para qual das vagas a avaliação de conhecimentos não possui prova discursiva?",
    "options": [
      "a) AN01.",
      "b) AN02.",
      "c) AN03.",
      "d) Nenhuma das alternativas."
    ],
    "answer": "c) AN03.",
    "explanation": "O anexo II do edital detalha que a avaliação para as vagas AN01 e AN02 tem prova objetiva e discursiva, enquanto a vaga AN03 tem apenas prova objetiva."
  },
  {
    topic: "Conhecimentos SEBRAE",
    question: "Segundo o edital, o que acontece se o candidato zerar em algum dos conteúdos da prova objetiva?",
    "options": [
      "a) Ele ainda pode ser aprovado, dependendo da nota total.",
      "b) Ele pode fazer uma nova prova.",
      "c) Ele é automaticamente desclassificado, independentemente da nota total.",
      "d) Ele perde 50% dos pontos daquele conteúdo."
    ],
    "answer": "c) Ele é automaticamente desclassificado, independentemente da nota total.",
    "explanation": "O edital diz: 'Não será habilitado o candidato que zerar em algum conteúdo, independentemente de sua pontuação total'."
  },

  // --- Conhecimentos Específicos (20 questões) ---
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das seguintes tecnologias é um exemplo de ferramenta para visualização de dados, de acordo com o edital?",
    options: [
      "a) SQL",
      "b) Python",
      "c) Power BI",
      "d) MySQL"
    ],
    answer": "c) Power BI",
    "explanation": "O edital lista especificamente 'Power BI ou QlikSense' como ferramentas de visualização de dados."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Um analista precisa criar um roteiro para automatizar a extração e o carregamento de dados de uma fonte para um banco de dados. Qual conceito é mais relevante para essa tarefa, conforme o edital?",
    "options": [
      "a) Análise de dados.",
      "b) ETL (Extract, Transform, Load).",
      "c) Segurança de redes.",
      "d) Topologia de rede."
    ],
    "answer": "b) ETL (Extract, Transform, Load).",
    "explanation": "ETL é a sigla para 'Extract, Transform, Load', que são os processos de extração de dados, transformação e carregamento em um destino, exatamente a tarefa descrita."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das linguagens de programação a seguir é mencionada no edital para o desenvolvimento de software?",
    "options": [
      "a) C++",
      "b) Ruby",
      "c) PHP",
      "d) Go"
    ],
    "answer": "c) PHP",
    "explanation": "O edital menciona PHP, Javascript, Java e Python como linguagens de programação requeridas."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual a principal finalidade de um sistema de gerenciamento de banco de dados (SGBD) relacional?",
    "options": [
      "a) Armazenar dados em formato de documentos.",
      "b) Gerenciar bancos de dados que armazenam dados em tabelas com relações entre si.",
      "c) Armazenar dados de forma não estruturada.",
      "d) Servir como um sistema operacional."
    ],
    "answer": "b) Gerenciar bancos de dados que armazenam dados em tabelas com relações entre si.",
    "explanation": "SGBDs relacionais são projetados para gerenciar dados organizados em tabelas, onde as relações entre os dados são bem definidas."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual dos seguintes sistemas de gerenciamento de banco de dados é um exemplo de banco de dados não-relacional, de acordo com a lista do edital?",
    "options": [
      "a) MySQL",
      "b) SQL Server",
      "c) Oracle",
      "d) Mongo DB"
    ],
    "answer": "d) Mongo DB",
    "explanation": "O edital lista o Mongo DB como um exemplo de banco de dados não-relacional (NoSQL)."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "O que é 'MLOps'?",
    "options": [
      "a) Apenas o desenvolvimento de modelos de machine learning.",
      "b) Operações para a implantação, gestão e monitoramento de modelos de machine learning em produção.",
      "c) Um sistema operacional para servidores de IA.",
      "d) Uma linguagem de programação para análise de dados."
    ],
    "answer": "b) Operações para a implantação, gestão e monitoramento de modelos de machine learning em produção.",
    "explanation": "MLOps é a disciplina que une desenvolvimento de modelos (Machine Learning) e operações (DevOps) para gerenciar o ciclo de vida dos modelos de forma eficiente."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das atribuições de um Analista Técnico II está relacionada à automação de processos?",
    "options": [
      "a) Fazer gestão de contratos.",
      "b) Contribuir em projetos de automação de processos.",
      "c) Realizar apresentações para clientes.",
      "d) Elaborar pareceres técnicos."
    ],
    "answer": "b) Contribuir em projetos de automação de processos.",
    "explanation": "Uma das atribuições listadas no edital é 'Contribuir em projetos de automação de processos', o que se relaciona diretamente com a elaboração de scripts."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "O que é uma 'topologia de rede'?",
    "options": [
      "a) A velocidade da conexão de internet.",
      "b) O layout físico ou lógico da rede.",
      "c) O protocolo de segurança usado.",
      "d) A marca do roteador."
    ],
    "answer": "b) O layout físico ou lógico da rede.",
    "explanation": "Topologia de rede se refere à forma como os dispositivos estão conectados uns aos outros em uma rede, seja fisicamente (cabos) ou logicamente."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual o principal papel de um 'gateway' em uma rede?",
    "options": [
      "a) Proteger a rede contra vírus.",
      "b) Servir como ponto de entrada e saída de dados para outras redes.",
      "c) Gerenciar o banco de dados.",
      "d) Autenticar usuários."
    ],
    "answer": "b) Servir como ponto de entrada e saída de dados para outras redes.",
    "explanation": "O gateway atua como uma 'porta' que permite que uma rede se comunique com outra rede, como a internet."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das seguintes opções é uma atribuição do Analista Técnico II relacionada à segurança?",
    "options": [
      "a) Realizar apresentações para clientes.",
      "b) Analisar dados de mercado e tendências.",
      "c) Definir regras de firewall e políticas de segurança.",
      "d) Fazer a gestão de contratos."
    ],
    "answer": "c) Definir regras de firewall e políticas de segurança.",
    "explanation": "O edital menciona 'Regras de firewall, políticas de segurança e protocolos de compartilhamento' como um conhecimento específico, e 'Definir métodos, fluxos e padrões de informações' como uma atribuição."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das linguagens listadas no edital é mais utilizada para análise e manipulação de dados?",
    "options": [
      "a) Java",
      "b) JavaScript",
      "c) PHP",
      "d) Python"
    ],
    "answer": "d) Python",
    "explanation": "O edital lista Python e R como ferramentas de análise de dados, sendo Python uma das mais populares para essa finalidade."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual o principal objetivo de um 'script para automatização de rotinas'?",
    "options": [
      "a) Criar interfaces gráficas de usuário.",
      "b) Substituir completamente um sistema operacional.",
      "c) Reduzir a carga de trabalho manual e minimizar erros.",
      "d) Apenas extrair dados de uma fonte."
    ],
    "answer": "c) Reduzir a carga de trabalho manual e minimizar erros.",
    "explanation": "O objetivo da automação de rotinas é justamente tornar tarefas repetitivas mais rápidas e menos suscetíveis a erros humanos."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual o principal objetivo da 'Alfabetização em IA' para o Analista Técnico II?",
    "options": [
      "a) Desenvolver algoritmos de IA do zero.",
      "b) Entender os conceitos básicos de IA e como aplicá-los para melhorar processos.",
      "c) Apenas ler artigos científicos sobre IA.",
      "d) Apenas usar ferramentas de IA sem entender a teoria."
    ],
    "answer": "b) Entender os conceitos básicos de IA e como aplicá-los para melhorar processos.",
    "explanation": "A alfabetização em IA significa ter o conhecimento básico para entender o que é IA e como ela pode ser usada para otimizar o trabalho e os processos da empresa."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das seguintes atribuições está relacionada à gestão de contratos?",
    "options": [
      "a) Elaborar pareceres técnicos.",
      "b) Analisar dados e documentos pertinentes à sua área de atuação.",
      "c) Fazer gestão ou fiscalização de contratos.",
      "d) Realizar apresentações e palestras."
    ],
    "answer": "c) Fazer gestão ou fiscalização de contratos.",
    "explanation": "A atribuição de 'Fazer Gestão ou Fiscalização de Contratos' é mencionada explicitamente no edital."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual das seguintes ferramentas de visualização de dados é mencionada no edital?",
    "options": [
      "a) Tableau",
      "b) QlikSense",
      "c) Grafana",
      "d) D3.js"
    ],
    "answer": "b) QlikSense",
    "explanation": "O edital menciona 'Power BI ou QlikSense' como ferramentas de visualização de dados. As outras opções não são mencionadas."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual dos seguintes é um exemplo de banco de dados relacional, segundo o edital?",
    "options": [
      "a) Mongo DB",
      "b) Apache Cassandra",
      "c) MySQL",
      "d) Redis"
    ],
    "answer": "c) MySQL",
    "explanation": "O edital lista o MySQL, SQL Server e Oracle como exemplos de bancos de dados relacionais."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "O que é 'Administração de sistemas operacionais'?",
    "options": [
      "a) Apenas a instalação de um sistema operacional.",
      "b) A gestão de usuários e permissões.",
      "c) A manutenção, configuração e gerenciamento de um sistema operacional e seus serviços.",
      "d) Apenas o desenvolvimento de scripts de automação."
    ],
    "answer": "c) A manutenção, configuração e gerenciamento de um sistema operacional e seus serviços.",
    "explanation": "A administração de sistemas operacionais é a prática de gerenciar o ciclo de vida de um SO, desde a instalação e configuração até o gerenciamento e segurança."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual a principal diferença entre um banco de dados relacional e um não-relacional?",
    "options": [
      "a) Bancos relacionais são mais rápidos que não-relacionais.",
      "b) Bancos relacionais usam tabelas e relacionamentos, enquanto os não-relacionais usam outros formatos, como documentos.",
      "c) Bancos não-relacionais são mais seguros que os relacionais.",
      "d) Bancos relacionais só podem ser usados em servidores Linux."
    ],
    "answer": "b) Bancos relacionais usam tabelas e relacionamentos, enquanto os não-relacionais usam outros formatos, como documentos.",
    "explanation": "A principal característica dos bancos relacionais é a organização dos dados em tabelas e as relações entre elas, enquanto os não-relacionais (NoSQL) usam outros modelos, como documentos, grafos e colunas."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "Qual o papel do 'SQL' na gestão de bancos de dados?",
    "options": [
      "a) É um sistema operacional.",
      "b) É uma linguagem de programação para o desenvolvimento de sites.",
      "c) É a linguagem usada para manipular e consultar dados em bancos de dados relacionais.",
      "d) É uma ferramenta de visualização de dados."
    ],
    "answer": "c) É a linguagem usada para manipular e consultar dados em bancos de dados relacionais.",
    "explanation": "SQL (Structured Query Language) é a linguagem padrão para gerenciar dados em SGBDs relacionais."
  },
  {
    topic: "Conhecimentos Específicos",
    question: "O que são 'políticas de segurança' em redes?",
    "options": [
      "a) O conjunto de regras e procedimentos para proteger a rede e os dados.",
      "b) O nome do software de antivírus usado na rede.",
      "c) As senhas de acesso aos servidores.",
      "d) As regras de acesso à internet."
    ],
    "answer": "a) O conjunto de regras e procedimentos para proteger a rede e os dados.",
    "explanation": "Políticas de segurança são um conjunto de diretrizes que definem como os ativos de informação devem ser protegidos, incluindo regras para acesso, uso e proteção de dados."
  }
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [userAnswers, setUserAnswers] = useState({});
  const [quizToRender, setQuizToRender] = useState([]);

  // Função para embaralhar um array
  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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

  useEffect(() => {
    const proportions = {
      "Língua Portuguesa": 10,
      "LGPD": 5,
      "Raciocínio Lógico": 5,
      "Conhecimentos SEBRAE": 5,
      "Conhecimentos Específicos": 25
    };
    
    // Assegura que o quizData esteja disponível
    if (quizData.length > 0) {
      const randomizedQuiz = getRandomQuiz(quizData, proportions);
      setQuizToRender(randomizedQuiz);
    }
  }, [quizData]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
    const isCorrect = option === quizToRender[currentQuestionIndex].answer;
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
    if (currentQuestionIndex < quizToRender.length - 1) {
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

  if (quizToRender.length === 0) {
    return <p>Carregando quiz...</p>;
  }

  const currentQuestion = quizToRender[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / quizToRender.length) * 100;

  const getTopicStats = () => {
    const stats = {};
    const topics = ["Língua Portuguesa", "LGPD", "Raciocínio Lógico", "Conhecimentos SEBRAE", "Conhecimentos Específicos"];
    
    topics.forEach(topic => {
      stats[topic] = { total: 0, correct: 0 };
    });

    quizToRender.forEach(q => {
        stats[q.topic].total += 1;
    });

    Object.keys(userAnswers).forEach(index => {
      const question = quizToRender[index];
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
              <p className="text-lg">Você acertou <span className="font-semibold">{score}</span> de <span className="font-semibold">{quizToRender.length}</span> perguntas.</p>
              <p className="text-lg">Sua pontuação: <span className="font-semibold">{((score / quizToRender.length) * 100).toFixed(0)}%</span></p>
              
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
                {quizToRender.map((q, index) => (
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
              <CardTitle>Questão {currentQuestionIndex + 1} de {quizToRender.length}</CardTitle>
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
                {currentQuestionIndex < quizToRender.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
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
