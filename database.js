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
    }
};
