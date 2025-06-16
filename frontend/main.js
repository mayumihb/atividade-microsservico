// API endpoints
const BASE_URL = "http://localhost/api/usuarios";
const BASE_RESERVA_URL = "http://localhost/api/reservas";
const BASE_SALA_URL = "http://localhost/api/salas";

// Cache para armazenar listas de dados
const dataCache = {
  usuarios: [],
  salas: [],
  reservas: []
};

// DOM Elements - Main navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const sectionTitle = document.getElementById('section-title');

// DOM Elements - Users
const getUsersBtn = document.getElementById('btn-get-users');
const usersOutput = document.getElementById('users-output');
const createUserForm = document.getElementById('create-user-form');
const createOutput = document.getElementById('create-output');

// DOM Elements - Reservations
const getReservasBtn = document.getElementById('btn-get-reservas');
const reservasOutput = document.getElementById('reservas-output');
const createReservaForm = document.getElementById('create-reserva-form');
const createReservaOutput = document.getElementById('create-reserva-output');
const usuarioSelect = document.getElementById('usuario-id');
const salaSelect = document.getElementById('sala-id');
const descricao = document.getElementById('descricao');
const dataReserva = document.getElementById('dataReserva');
const horaReserva = document.getElementById('horaReserva');
const duracao = document.getElementById('duracao');

// DOM Elements - Rooms
const getSalasBtn = document.getElementById('btn-get-salas');
const salasOutput = document.getElementById('salas-output');
const createSalaForm = document.getElementById('create-sala-form');
const createSalaOutput = document.getElementById('create-sala-output');

// Navigation functionality
navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Update active nav item
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Show corresponding section
    const sectionId = item.getAttribute('data-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    // Update section title
    sectionTitle.textContent = item.querySelector('span').textContent;
    
    // Refresh data for the active section
    if (sectionId === 'usuarios') {
      fetchUsers();
    } else if (sectionId === 'reservas') {
      fetchReservas();
      // Atualiza os dropdowns ao entrar na seção de reservas
      updateDropdowns();
    } else if (sectionId === 'salas') {
      fetchSalas();
    }
  });
});

// Format JSON output with syntax highlighting
function formatJson(json) {
  if (!json) return '';
  
  const obj = typeof json === 'string' ? JSON.parse(json) : json;
  return JSON.stringify(obj, null, 2);
}

// Display error with better formatting
function displayError(element, error) {
  element.innerHTML = `<span style="color: #ef4444;">❌ Erro: ${error.message}</span>`;
}

// Display success message
function displaySuccess(element, message) {
  element.innerHTML = `<span style="color: #10b981;">✅ Sucesso: ${message}</span>`;
  setTimeout(() => {
    element.textContent = '';
  }, 3000);
}

// API Calls with loading indicators
async function apiCall(url, options = {}, outputElement) {
  outputElement.innerHTML = '<span style="color: #3b82f6;">⏳ Carregando...</span>';
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    displayError(outputElement, err);
    throw err;
  }
}

// Formatar data para exibição
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// Formatar horário para exibição
function formatTime(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// USERS FUNCTIONALITY

// Fetch all users
async function fetchUsers() {
  try {
    const users = await apiCall(BASE_URL, {}, usersOutput);
    // Armazena os usuários no cache
    dataCache.usuarios = users;
    
    // Exibe os usuários em formato de tabela
    displayUsersTable(users);
    
    return users;
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

// Exibir usuários em formato de tabela
function displayUsersTable(users) {
  if (!users || users.length === 0) {
    usersOutput.innerHTML = '<p>Nenhum usuário encontrado.</p>';
    return;
  }
  
  const table = document.createElement('table');
  table.className = 'data-table';
  
  // Cabeçalho da tabela
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Email</th>
      <th>Endereço</th>
    </tr>
  `;
  
  // Corpo da tabela
  const tbody = document.createElement('tbody');
  
  users.forEach(user => {
    console.log(user)
    const endereco = user.endereco ? 
    `${user.endereco.rua}, ${user.endereco.numero} - ${user.endereco.cidade}` : 
    'Não informado';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${endereco}</td>
    `;
    tbody.appendChild(tr);
  });
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  // Limpa o conteúdo anterior e adiciona a tabela
  usersOutput.innerHTML = '';
  usersOutput.appendChild(table);
}

// Create new user
createUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    endereco: {
      rua: document.getElementById('rua').value.trim(),
      numero: document.getElementById('numero').value.trim(),
      cidade: document.getElementById('cidade').value.trim()
    }
  };
  
  try {
    const newUser = await apiCall(
      BASE_URL, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      },
      createOutput
    );
    
    // Adiciona o novo usuário ao cache
    if (newUser) {
      dataCache.usuarios.push(newUser);
      // Atualiza a tabela de usuários
      displayUsersTable(dataCache.usuarios);
    }
    
    // Reset form and refresh users list
    createUserForm.reset();
    displaySuccess(createOutput, "Usuário cadastrado com sucesso!");
    // Atualiza os dropdowns de usuários em reservas
    updateUserDropdown();
  } catch (err) {
    console.error('Error creating user:', err);
  }
});

// SALAS FUNCTIONALITY

// Fetch all rooms
async function fetchSalas() {
  try {
    const salas = await apiCall(BASE_SALA_URL, {}, salasOutput);
    // Armazena as salas no cache
    dataCache.salas = salas;
    
    // Exibe as salas em formato de tabela
    displaySalasTable(salas);
    
    return salas;
  } catch (err) {
    console.error('Error fetching rooms:', err);
  }
}

// Exibir salas em formato de tabela
function displaySalasTable(salas) {
  if (!salas || salas.length === 0) {
    salasOutput.innerHTML = '<p>Nenhuma sala encontrada.</p>';
    return;
  }
  
  const table = document.createElement('table');
  table.className = 'data-table';
  
  // Cabeçalho da tabela
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Descrição</th>
      <th>Capacidade</th>
    </tr>
  `;
  
  // Corpo da tabela
  const tbody = document.createElement('tbody');
  
  salas.forEach(sala => {    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sala.id}</td>
      <td>${sala.descricao}</td>
      <td>${sala.capacidade} pessoas</td>
    `;
    tbody.appendChild(tr);
  });
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  // Limpa o conteúdo anterior e adiciona a tabela
  salasOutput.innerHTML = '';
  salasOutput.appendChild(table);
}

// Create new room
createSalaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    descricao: document.getElementById('descricao-sala').value.trim(),
    capacidade: parseInt(document.getElementById('capacidade').value, 10),
  };
  
  try {
    const newSala = await apiCall(
      BASE_SALA_URL, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      },
      createSalaOutput
    );
    
    // Adiciona a nova sala ao cache
    if (newSala) {
      dataCache.salas.push(newSala);
      // Atualiza a tabela de salas
      displaySalasTable(dataCache.salas);
    }
    
    // Reset form and refresh rooms list
    createSalaForm.reset();
    displaySuccess(createSalaOutput, "Sala cadastrada com sucesso!");
    // Atualiza os dropdowns de salas em reservas
    updateRoomDropdown();
  } catch (err) {
    console.error('Error creating room:', err);
  }
});

// RESERVAS FUNCTIONALITY

// Função para atualizar os dropdowns de usuários e salas
async function updateDropdowns() {
  try {
    // Garante que temos dados de usuários e salas
    if (!dataCache.usuarios.length) {
      await fetchUsers();
    }
    if (!dataCache.salas.length) {
      await fetchSalas();
    }
    
    updateUserDropdown();
    updateRoomDropdown();
  } catch (err) {
    console.error('Error updating dropdowns:', err);
  }
}

// Função para atualizar o dropdown de usuários
function updateUserDropdown() {
  usuarioSelect.innerHTML = '<option value="">Selecione um usuário</option>';
  
  dataCache.usuarios.forEach(usuario => {
    const option = document.createElement('option');
    option.value = usuario.id;
    option.textContent = `${usuario.nome} (${usuario.email})`;
    usuarioSelect.appendChild(option);
  });
}

// Função para atualizar o dropdown de salas
function updateRoomDropdown() {
  salaSelect.innerHTML = '<option value="">Selecione uma sala</option>';
  
  dataCache.salas.forEach(sala => {
    const option = document.createElement('option');
    option.value = sala.id;
    option.textContent = `${sala.descricao} (${sala.capacidade} pessoas)`;
    salaSelect.appendChild(option);
  });
}

// Fetch all Reservations
async function fetchReservas() {
  try {
    const reservas = await apiCall(BASE_RESERVA_URL, {}, reservasOutput);
    // Armazena as reservas no cache
    dataCache.reservas = reservas;
    
    // Exibe as reservas em formato de tabela
    displayReservasTable(reservas);
    
    return reservas;
  } catch (err) {
    console.error('Error fetching reservations:', err);
  }
}

// Exibir reservas em formato de tabela
function displayReservasTable(reservas) {
  if (!reservas || reservas.length === 0) {
    reservasOutput.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
    return;
  }
  
  const table = document.createElement('table');
  table.className = 'data-table';
  
  // Cabeçalho da tabela
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Descrição</th>
      <th>Usuário</th>
      <th>Sala</th>
      <th>Data</th>
      <th>Horário</th>
      <th>Duração</th>
      <th>Status</th>
    </tr>
  `;
  
  // Corpo da tabela
  const tbody = document.createElement('tbody');
  
  reservas.forEach(reserva => {
    // Busca informações detalhadas do usuário e sala
    const usuario = dataCache.usuarios.find(u => u.id === reserva.usuarioId) || { nome: 'Desconhecido' };
    const sala = dataCache.salas.find(s => s.id === reserva.salaId) || { descricao: 'Desconhecida' };
    
    const statusClass = reserva.status === 'ATIVA' ? 'active' : 
                        reserva.status === 'PENDENTE' ? 'pending' : 'cancelled';
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reserva.id}</td>
      <td>${reserva.descricao}</td>
      <td>${usuario.nome}</td>
      <td>${sala.descricao}</td>
      <td>${formatDate(reserva.dataReserva)}</td>
      <td>${formatTime(reserva.dataReserva)}</td>
      <td>${reserva.duracao || 1} hora(s)</td>
      <td><span class="status-badge ${statusClass}">${reserva.status || 'ATIVA'}</span></td>
    `;
    tbody.appendChild(tr);
  });
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  // Limpa o conteúdo anterior e adiciona a tabela
  reservasOutput.innerHTML = '';
  reservasOutput.appendChild(table);
}

// Create new reservation
createReservaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Combinando a data e hora para criar uma string ISO
  const dataHoraReserva = new Date(`${dataReserva.value}T${horaReserva.value}`);
  
  const payload = {
    usuarioId: parseInt(usuarioSelect.value, 10),
    salaId: parseInt(salaSelect.value, 10),
    descricao: descricao.value.trim(),
    dataReserva: dataHoraReserva.toISOString(),
    duracao: parseInt(duracao.value, 10),
    status: "ATIVA" // Status padrão para novas reservas
  };
  
  try {
    const newReserva = await apiCall(
      BASE_RESERVA_URL, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      },
      createReservaOutput
    );
    
    // Adiciona a nova reserva ao cache
    if (newReserva) {
      dataCache.reservas.push(newReserva);
      // Atualiza a tabela de reservas
      displayReservasTable(dataCache.reservas);
    }
    
    // Reset form and refresh reservations list
    createReservaForm.reset();
    displaySuccess(createReservaOutput, "Reserva cadastrada com sucesso!");
  } catch (err) {
    console.error('Error creating reservation:', err);
  }
});

// Event Listeners - Refresh buttons
getUsersBtn.addEventListener('click', fetchUsers);
getReservasBtn.addEventListener('click', () => {
  fetchReservas();
  updateDropdowns();
});
getSalasBtn.addEventListener('click', fetchSalas);

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchUsers(); // Load initial data for active section
  
  // Também podemos pré-carregar os dados das outras seções
  fetchSalas();
  fetchReservas();
});