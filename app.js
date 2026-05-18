// ====================== CONFIGURAÇÃO FIREBASE ======================
const auth = firebase.auth();
const database = firebase.database();

// ====================== ELEMENTOS DA TELA ======================
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnGithub = document.getElementById("btnGithub");
const forgotLink = document.getElementById("forgotPassword");

// ====================== EVENTOS DOS BOTÕES ======================

// Login com Email e Senha
btnLogin.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Por favor, preencha email e senha.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login realizado com sucesso!");
            console.log("Usuário logado:", userCredential.user.email);
            // Aqui vamos redirecionar para a tela principal depois
            window.location.href = "dashboard.html";   
        })
        .catch((error) => {
            alert("Erro no login: " + error.message);
            console.error(error);
        });
});

// Cadastro com Email e Senha
// ==================== LOGIN ====================
btnLogin.addEventListener("click", () => {
    const email = edtEmail.GetText().trim();   // ou document.getElementById se estiveres em HTML puro
    const password = edtPass.GetText().trim();

    if (!email || !password) {
        showCustomAlert("Por favor, preenche o email e a senha.", "error");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem sucedido
            console.log("Login OK");
            // Redireciona ou esconde a tela de login
            window.location.href = "dashboard.html";   // ou layLogin.SetVisibility("Gone");
        })
        .catch((error) => {
            handleAuthError(error, "login");
        });
});

// ==================== CADASTRO (Criar Conta) ====================
btnCadastro.addEventListener("click", () => {
    const email = edtEmail.GetText().trim();
    const password = edtPass.GetText().trim();

    if (!email || !password) {
        showCustomAlert("Preenche o email e a senha.", "error");
        return;
    }

    if (password.length < 6) {
        showCustomAlert("A senha deve ter pelo menos 6 caracteres.", "error");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Conta criada com sucesso!");
            showCustomAlert("Conta criada com sucesso! Bem-vindo!", "success");
            // Redireciona automaticamente
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);
        })
        .catch((error) => {
            handleAuthError(error, "cadastro");
        });
});
// Esqueci a senha
forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email) {
        alert("Digite o seu email para redefinir a senha.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Email de redefinição de senha enviado! Verifique a sua caixa de entrada.");
        })
        .catch((error) => {
            alert("Erro ao enviar email: " + error.message);
        });
});

// ====================== LOGIN COM GOOGLE ======================
btnGoogle.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
});

// ====================== LOGIN COM GITHUB ======================
btnGithub.addEventListener("click", () => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithRedirect(provider);
});

// ====================== TRATAMENTO DO REDIRECT ======================
