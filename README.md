
# Quiz Interativo para o Processo Seletivo SEBRAE/RR

Este projeto é um quiz interativo desenvolvido para auxiliar nos estudos para o processo seletivo do **SEBRAE/RR**.  
Ele aborda os principais tópicos cobrados no edital, oferecendo uma forma dinâmica e visual de testar o conhecimento.

## Funcionalidades

- **Simulação da Prova**: Seleção aleatória de 50 questões de um banco maior, mantendo a proporção exata da prova oficial.
- **Proporção da Prova**: Distribuição de questões respeitando a proporção **2-1-1-1-5**, garantindo foco nos tópicos mais importantes:
  - 10 questões de **Língua Portuguesa**
  - 5 questões de **LGPD**
  - 5 questões de **Raciocínio Lógico**
  - 5 questões de **Conhecimentos SEBRAE**
  - 25 questões de **Conhecimentos Específicos**
- **Temas Personalizáveis**: Alternância entre tema claro e escuro.
- **Finalização a Qualquer Momento**: Botão **"Finalizar Teste"** permite encerrar o quiz antes do término e ir para a tela de resultados.
- **Feedback Visual e Estatístico**: Pontuação total, gráfico de pizza por tópico e gabarito completo com explicações.
- **Banco de Dados em JSON**: 100 questões armazenadas em `quizData.json`, permitindo edição sem alterar o código.
- **Desenvolvido em React**: Experiência fluida e reativa.

## Como Usar

Você pode rodar este projeto de duas maneiras: **localmente** ou **online** via GitHub Pages.

### 1. Rodando Localmente

Pré-requisitos: **Node.js** e **npm** instalados.


## Clone o repositório
```bash
git clone https://github.com/rivaed/quizseb.git
```

## Entre no diretório
```bash
cd quizseb
```

## Instale as dependências
```bash
npm install
```

## Inicie a aplicação
```bash
npm start
```

A aplicação será executada em:
[http://localhost:3000](http://localhost:3000)

### 2. Rodando com GitHub Pages

O projeto já está configurado para execução no GitHub Pages.
Certifique-se de que os arquivos `index.html`, `app.js` e `quizData.json` estejam na raiz do repositório.

O quiz estará disponível em:
[https://rivaed.github.io/quizseb/](https://rivaed.github.io/quizseb/)

## Contribuição

Contribuições são sempre bem-vindas!
Se encontrar um erro, tiver sugestões de melhoria ou quiser adicionar novas questões, abra uma **issue** ou envie um **pull request**.

## Autor
**[rivaed](https://github.com/rivaed)**


