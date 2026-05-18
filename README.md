##AFFRIEND 
##🧑‍💻DESENVOLVEDOR CEO: Abraão Figueira 
##markdown

##AFFriend Code

O AFFriend Code é um editor de código online premium, integrado com Firebase, que permite criar, salvar, executar e compartilhar projetos em tempo real.  
Ele foi desenvolvido para oferecer uma experiência moderna e responsiva, com foco em educação digital, produtividade e colaboração.

🚀 ##Funcionalidades

- Editor em tempo real com suporte a JavaScript, HTML e CSS.  
- Integração com Firebase para autenticação, armazenamento e segurança.  
- Gestão de projetos: criar, salvar, abrir, apagar e publicar.  
- Visualização instantânea do código (preview integrado).  
- Tema claro/escuro com alternância dinâmica.  
- UI/UX premium com paleta AFFriend (branco, vermelho, preto).  
- Integração com Marketplace para listar e vender projetos.  

📦 Instalação

Clone o repositório:

`bash
git clone https://github.com/abraaofigueira8/AFFriend-Code.git
cd AFFriend-Code


##Instale as dependências:

`bash
npm install

⚙️##Configuração

1. Crie um projeto no Firebase.  
2. Ative Authentication (Email/Password).  
3. Configure o Realtime Database com regras de segurança.  
4. Crie um arquivo firebase-config.js com suas credenciais:

##CONFIGURAÇÃO DO GOOGLE 
const firebaseConfig = {
  apiKey: "SUAAPIKEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
`

▶️##Uso

Inicie o servidor local:
`bash
npm run dev

##Abra no navegador:
http://localhost:3000

📂 Estrutura

AFFriend-Code/
├── public/              # Assets estáticos
├── src/
│   ├── components/      # Componentes UI (Sidebar, AppBar, Editor)
│   ├── pages/           # Páginas (Dashboard, Meus Projetos, Marketplace)
│   ├── services/        # Firebase e APIs
│   └── styles/          # CSS/Tailwind
├── firebase-config.js   # Configuração Firebase
├── package.json
└── README.md

👨‍💻 Autor

Desenvolvido por Abraão Figueira  
Projeto AFFriend Code — Angola 🇦🇴

📜 Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para usar, modificar e distribuir.

