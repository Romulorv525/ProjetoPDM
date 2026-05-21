# 📋 Projeto Mobile — Firebase + Expo

> Aplicativo de tarefas desenvolvido para a disciplina de **Desenvolvimento Mobile** no IFSULDEMINAS.
> Utiliza **React Native**, **Expo Router**, **Firebase Authentication** e **Cloud Firestore**.

---

## ✨ Funcionalidades

- 🔐 Login e cadastro com e-mail e senha (Firebase Auth)
- ✅ Lista de tarefas com **checkbox de conclusão** salvo no Firestore
- 🎨 Cor de fundo personalizável via dropdown, **persistida no Firestore**
- 📷 Seleção de imagem da galeria
- 🚪 Logout com redirecionamento automático para o login
- 🌙 Tema escuro coeso em todas as telas

---

## 🛠 Tecnologias

| Tecnologia | Versão |
|---|---|
| React Native | 0.81.5 |
| Expo | ~54.0.33 |
| Expo Router | ~6.0.23 |
| Firebase | latest |
| TypeScript | ~5.9.2 |

---

## ⚙️ Como configurar e rodar

### 1. Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- [Expo Go](https://expo.dev/go) instalado no celular
- Conta Google para acessar o Firebase

---

### 2. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

---

### 3. Instalar as dependências

```bash
npm install
npm install firebase
```

---

### 4. Configurar o Firebase

#### 4.1 Criar o projeto
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **Adicionar projeto** e dê um nome
3. Clique em **Criar projeto**

#### 4.2 Registrar o app Web
1. Na página inicial do projeto, clique no ícone **</>** (Web)
2. Dê um apelido ao app e clique em **Registrar app**
3. Copie o bloco `firebaseConfig` exibido
4. Clique em **Continuar para o console**

> ⚠️ Na hora de copiar, selecione a opção **npm**, não CDN. O código correto começa com `import`, não com `<script>`.

#### 4.3 Ativar Authentication
1. Menu lateral → **Criação > Authentication**
2. Clique em **Vamos começar**
3. Selecione **E-mail/senha**, ative e salve

#### 4.4 Criar o Firestore
1. Menu lateral → **Criação > Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Modo de teste** e clique em **Avançar**
4. Selecione uma região e clique em **Criar**

---

### 5. Preencher as credenciais

Crie um arquivo chamado **`FirebaseConfig.ts`** na raiz do projeto com o seguinte conteúdo, substituindo os valores pelos do seu projeto:

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:abcdef1234567890",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
```

> 🔒 **Este arquivo não está no repositório** por razões de segurança (ele está no `.gitignore`). Cada pessoa que clonar o projeto precisa criar o seu próprio com as credenciais do seu Firebase.

---

### 6. Rodar o projeto

```bash
npx expo start
```

Escaneie o QR code com o **Expo Go** no celular.  
Certifique-se de que o celular e o computador estão **na mesma rede Wi-Fi**.

---

## 📁 Estrutura de arquivos

```
projeto-final/
├── FirebaseConfig.ts          # ⚠️ Não incluso no repo — crie o seu
├── app/
│   ├── index.tsx              # Tela de login/cadastro
│   ├── _layout.tsx            # Layout raiz
│   └── (tabs)/
│       ├── _layout.tsx        # Layout das abas + botão sair
│       ├── home.tsx           # Tela inicial (foto + cor de fundo)
│       ├── firebase-to-do.tsx # Lista de tarefas com checkbox
│       └── about.tsx          # Sobre o app
├── Components/
│   ├── Button.tsx
│   ├── DropdownFirestore.tsx  # Dropdown com persistência no Firestore
│   ├── ImageViewer.tsx
│   └── ModalMenu.tsx
└── assets/
```

---

## 🗄 Coleções no Firestore

O app cria automaticamente as seguintes coleções:

| Coleção | Campos | Criada quando |
|---|---|---|
| `tasks` | `title`, `completed`, `createdAt` | Ao adicionar a primeira tarefa |
| `settings` | `value` (cor hex) | Ao escolher uma cor no dropdown |

---

## 🐛 Erros comuns

| Erro | Solução |
|---|---|
| Tela branca ao abrir | `FirebaseConfig.ts` ausente ou com valores placeholder |
| `auth/configuration-not-found` | Authentication não ativado no console |
| Tarefas não salvam | Firestore não criado ou regras bloqueando escrita |
| `Cannot find module 'firebase/...'` | Rode `npm install firebase` |
| `Network request failed` | Celular e computador em redes Wi-Fi diferentes |
| Dropdown não muda a cor | Verifique as regras de segurança do Firestore |

---

## 🔒 Segurança

O `FirebaseConfig.ts` está listado no `.gitignore` e **nunca deve ser enviado ao GitHub**.  
Para produção, configure as regras do Firestore para exigir autenticação:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📚 Links úteis

- [Documentação Firebase Web](https://firebase.google.com/docs/web/setup)
- [Documentação Expo](https://docs.expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [Console Firebase](https://console.firebase.google.com)