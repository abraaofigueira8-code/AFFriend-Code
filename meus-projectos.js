// Inicializar Firebase (certifique-se que firebase-config.js já foi incluído antes)
const db = firebase.database();

firebase.auth().onAuthStateChanged(user => {
  if (!user) return window.location.href = "login.html";
  carregarProjetos(user.uid);
});

function carregarProjetos(uid) {
  const lista = document.getElementById("listaProjetos");
  const sem = document.getElementById("semProjetos");

  db.ref(`users/${uid}/projects`).once("value").then(snapshot => {
    lista.innerHTML = "";
    if (!snapshot.exists()) {
      sem.classList.remove("hidden");
      return;
    }
    sem.classList.add("hidden");

    snapshot.forEach(child => {
      const proj = child.val();
      const card = criarCardProjeto(uid, child.key, proj);
      lista.appendChild(card);
    });
  });
}

function criarCardProjeto(uid, nome, proj) {
  const div = document.createElement("div");
  div.className = "bg-white shadow rounded-xl p-5 flex flex-col gap-4";

  div.innerHTML = `
    <h3 class="text-lg font-semibold text-gray-800">${proj.title || nome}</h3>
    <p class="text-sm text-gray-500">${proj.description || "Sem descrição"}</p>
    <div class="flex gap-2 mt-2">
      <button onclick="abrirEditor('${nome}')" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500">
        <i class="fas fa-code mr-1"></i> Abrir
      </button>
      <button onclick="apagarProjeto('${uid}','${nome}')" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
        <i class="fas fa-trash mr-1"></i> Apagar
      </button>
      <button onclick="venderProjeto('${uid}','${nome}')" class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-500">
        <i class="fas fa-store mr-1"></i> Vender
      </button>
    </div>
  `;
  return div;
}

function abrirEditor(nome) {
  // redireciona para o editor com query string
  window.location.href = `dashboard.html?project=${encodeURIComponent(nome)}`;
}

function apagarProjeto(uid, nome) {
  if (!confirm(`Apagar projeto "${nome}"?`)) return;
  db.ref(`users/${uid}/projects/${nome}`).remove()
    .then(() => carregarProjetos(uid))
    .catch(err => alert("Erro ao apagar: " + err.message));
}

function venderProjeto(uid, nome) {
  db.ref(`users/${uid}/projects/${nome}`).once("value").then(snap => {
    if (!snap.exists()) return alert("Projeto não encontrado.");
    const proj = snap.val();

    const ref = db.ref("marketplace").push();
    ref.set({
      id: ref.key,
      title: proj.title || nome,
      description: proj.description || "",
      category: "Projetos",
      price: proj.price || 0,
      emoji: "💡",
      type: "project",
      images: proj.image ? [proj.image] : [],
      sellerId: uid,
      createdAt: Date.now()
    }).then(() => alert(`✅ Projeto "${nome}" listado no Marketplace!`))
      .catch(err => alert("Erro ao vender: " + err.message));
  });
}