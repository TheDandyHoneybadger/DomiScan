// --- DADOS INICIAIS EMBUTIDOS ---
// Estes dados são usados apenas na primeira vez que a aplicação é executada,
// para popular o armazenamento local.
const initialProductsData = [
    {"barcode":"789000000001","category":"Bebidas","subcategory":"Refrigerantes","subsubcategory":null,"cod":"789000000001","name":"Refrigerante 2L","price":8.5,"estoque":100,"prc_total":null},
    {"barcode":"789000000002","category":"Snacks","subcategory":"Salgados","subsubcategory":null,"cod":"789000000002","name":"Salgadinho 100g","price":5.75,"estoque":150,"prc_total":null}
];

const initialUsersData = [
    {"username":"admin","password":"admin","role":"admin"},
    {"username":"func","password":"123","role":"employee"}
];

// --- OBJETO DE GESTÃO DA BASE DE DADOS LOCAL ---
const DB = {
    /**
     * Obtém dados do localStorage.
     * @param {string} key A chave para os dados (ex: 'products', 'users').
     * @returns {Array} Os dados como um array. Retorna um array vazio se não encontrar nada.
     */
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (e) {
            console.error(`Erro ao ler a chave '${key}' do localStorage:`, e);
            return [];
        }
    },

    /**
     * Guarda dados no localStorage.
     * @param {string} key A chave para os dados (ex: 'products', 'users').
     * @param {Array|Object} data Os dados a serem guardados.
     */
    set: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`Erro ao guardar a chave '${key}' no localStorage:`, e);
        }
    },

    /**
     * Inicializa a base de dados. Se for a primeira execução,
     * popula o localStorage com os dados iniciais.
     */
    init: () => {
        console.log("A inicializar a base de dados local...");
        if (!localStorage.getItem('db_initialized')) {
            console.log("Nenhuma base de dados local encontrada. A popular com dados iniciais.");
            try {
                DB.set('products', initialProductsData);
                DB.set('users', initialUsersData);
                DB.set('sales', []);
                localStorage.setItem('db_initialized', 'true');
                console.log("Base de dados local inicializada com sucesso.");
            } catch (error) {
                console.error(`ERRO FATAL ao inicializar a base de dados: ${error.message}`);
                // Numa aplicação real, poderíamos mostrar uma mensagem de erro ao utilizador aqui.
            }
        } else {
            console.log("Base de dados local já existe.");
        }
    }
};
