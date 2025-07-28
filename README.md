# 🍯 Docin de Caldas

_E-commerce de produtos artesanais da Serra da Mantiqueira._

---

## 🧰 Tecnologias Utilizadas

- **React** com Vite (SPA)
- **Firebase** (Auth, Firestore, Hosting, Functions)
- **Stripe** (Pagamentos com Checkout)
- **GitHub Actions** (Deploy contínuo)
- **Firestore Rules** para segurança

---

## 🚀 Funcionalidades

- 🛍️ Catálogo de produtos com imagem, descrição e preço
- 🛒 Carrinho de compras com cálculo de total
- 💳 Checkout via Stripe
- 🔐 Login e cadastro de usuários com Firebase Auth
- 📦 Registro de pedidos no Firestore
- 👤 Página de perfil do usuário
- ⚙️ Painel administrativo com cadastro e remoção de produtos
- 📑 Listagem de pedidos recebidos no admin

---

## 📦 Instalação Local

```bash
npm install
npm run dev
```

---

## 🔧 Firebase Configuration

Crie um arquivo `.env` com as variáveis:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Ou edite diretamente em `src/services/firebase.js`.

---

## ☁️ Deploy com GitHub Actions

Configure os seguintes **Secrets** no repositório:

- `GOOGLE_APPLICATION_CREDENTIALS_JSON` → conteúdo do JSON da Service Account
- `STRIPE_SECRET_KEY` → sua chave secreta do Stripe

> O deploy será feito automaticamente para Hosting e Functions.

---

## 🧾 Firebase Firestore Rules

```js
// Arquivo firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }

    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
  }
}
```

---

## 🧪 Testes Manuais

- Crie usuários e defina `admin: true` no Firestore
- Adicione produtos pela interface de administrador
- Faça login como usuário comum e realize compras
- Verifique os pedidos na aba admin

---

## 📁 Estrutura de Pastas

```
src/
├── pages/
├── components/
├── services/
├── assets/
functions/
.github/workflows/
firebase.json
firestore.rules
```

---

## 📬 Contato

Desenvolvido para Docin de Caldas ✨