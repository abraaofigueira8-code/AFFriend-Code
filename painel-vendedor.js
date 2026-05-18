const db = firebase.database();
let vendas = [];

firebase.auth().onAuthStateChanged(async user => {
  if (!user) return;

  const snap = await db.ref("compras").orderByChild("sellerId").equalTo(user.uid).once("value");

  vendas = [];
  snap.forEach(child => vendas.push(child.val()));

  atualizarDashboard();
  renderTabela();
});

function atualizarDashboard() {
  document.getElementById("totalVendas").textContent = vendas.length;

  const receita = vendas.reduce((acc, v) => acc + Number(v.price), 0);
  document.getElementById("totalReceita").textContent = receita + " Kz";

  document.getElementById("totalProdutos").textContent = vendas.length;
}

function renderTabela() {
  const tbody = document.getElementById("tabelaVendas");
  tbody.innerHTML = "";

  vendas.forEach(v => {
    tbody.innerHTML += `
      <tr class="border-b">
        <td class="py-3">${v.productTitle}</td>
        <td class="py-3">${v.price} Kz</td>
        <td class="py-3">${v.buyerEmail}</td>
        <td class="py-3">${new Date(v.createdAt).toLocaleDateString()}</td>
      </tr>
    `;
  });
}

