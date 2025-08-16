// --- LÓGICA DA APLICAÇÃO (CLIENT-SIDE) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIÁVEIS GLOBAIS ---
    let currentUser = null;
    let currentCart = [];
    let currentProduct = null;
    let currentQuantity = 1;
    let isScannerActive = false;
    let scannerTargetInput = null;
    let pairableProductsList = [];
    let currentPayments = [];
    let productForStockAdjustment = null;

    // --- ATRIBUIÇÃO DE ELEMENTOS DA UI (depois de injetados pelo views.js) ---
    const loginView = document.getElementById('login-view');
    const appView = document.getElementById('app-view');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtnConfig = document.getElementById('logout-btn-config');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const keepLoggedInCheckbox = document.getElementById('keep-logged-in');
    const loginError = document.getElementById('login-error');
    const codeInput = document.getElementById('code-input');
    const scanCodeBtn = document.getElementById('scan-code-btn');
    const productInfo = document.getElementById('product-info');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const finalizeSaleBtn = document.getElementById('finalize-sale-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const historyContent = document.getElementById('history-content');
    const exportSalesBtn = document.getElementById('export-sales-btn');
    const exportDataBtn = document.getElementById('export-data-btn');
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const closeAlertBtn = document.getElementById('close-alert-btn');
    const confirmModal = document.getElementById('confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');
    const scannerModal = document.getElementById('scanner-modal');
    const closeScannerBtn = document.getElementById('close-scanner-btn');
    const addProductModal = document.getElementById('add-product-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeAddProductBtn = document.getElementById('close-add-product-btn');
    const addProductForm = document.getElementById('add-product-form');
    const scanNewCodeBtn = document.getElementById('scan-new-code-btn');
    const decreaseQtyBtn = document.getElementById('decrease-qty-btn');
    const increaseQtyBtn = document.getElementById('increase-qty-btn');
    const productQuantitySpan = document.getElementById('product-quantity');
    const cancelAddBtn = document.getElementById('cancel-add-btn');
    const discountInfo = document.getElementById('discount-info');
    const discountAmountSpan = document.getElementById('discount-amount');
    const historyDateInput = document.getElementById('history-date');
    const historyTotalSpan = document.getElementById('history-total');
    const addProductScannerContainer = document.getElementById('add-product-scanner-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const adminTabBtn = document.getElementById('admin-tab-btn');
    const historyUserFilterContainer = document.getElementById('history-user-filter-container');
    const historyUserFilter = document.getElementById('history-user-filter');
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserModal = document.getElementById('add-user-modal');
    const closeAddUserBtn = document.getElementById('close-add-user-btn');
    const addUserForm = document.getElementById('add-user-form');
    const currentUserInfo = document.getElementById('current-user-info');
    const pairProductBtn = document.getElementById('pair-product-btn');
    const pairProductModal = document.getElementById('pair-product-modal');
    const closePairProductBtn = document.getElementById('close-pair-product-btn');
    const pairCategorySelect = document.getElementById('pair-category');
    const pairSubcategorySelect = document.getElementById('pair-subcategory');
    const pairSubsubcategoryContainer = document.getElementById('pair-subsubcategory-container');
    const pairSubsubcategorySelect = document.getElementById('pair-subsubcategory');
    const pairProductSelect = document.getElementById('pair-product');
    const pairedProductInfo = document.getElementById('paired-product-info');
    const pairedProductName = document.getElementById('paired-product-name');
    const pairedProductCod = document.getElementById('paired-product-cod');
    const pairedProductCurrentBarcode = document.getElementById('paired-product-current-barcode');
    const newBarcodePairInput = document.getElementById('new-barcode-pair');
    const scanNewBarcodePairBtn = document.getElementById('scan-new-barcode-pair-btn');
    const savePairBtn = document.getElementById('save-pair-btn');
    const pairProductScannerContainer = document.getElementById('pair-product-scanner-container');
    const paymentEntries = document.getElementById('payment-entries');
    const paymentMethodSelect = document.getElementById('payment-method-select');
    const paymentAmountInput = document.getElementById('payment-amount-input');
    const addPaymentBtn = document.getElementById('add-payment-btn');
    const cartSubtotalSpan = document.getElementById('cart-subtotal');
    const totalPaidSpan = document.getElementById('total-paid');
    const remainingBalanceSpan = document.getElementById('remaining-balance');
    const installmentsContainer = document.getElementById('installments-container');
    const installmentsSelect = document.getElementById('installments-select');
    const adjustStockBtn = document.getElementById('adjust-stock-btn');
    const adjustStockModal = document.getElementById('adjust-stock-modal');
    const closeAdjustStockBtn = document.getElementById('close-adjust-stock-btn');
    const adjustStockCodeInput = document.getElementById('adjust-stock-code-input');
    const scanAdjustStockBtn = document.getElementById('scan-adjust-stock-btn');
    const adjustStockProductInfo = document.getElementById('adjust-stock-product-info');
    const adjustStockProductName = document.getElementById('adjust-stock-product-name');
    const adjustStockCurrentStock = document.getElementById('adjust-stock-current-stock');
    const adjustStockControls = document.getElementById('adjust-stock-controls');
    const adjustStockNewStock = document.getElementById('adjust-stock-new-stock');
    const saveStockAdjustmentBtn = document.getElementById('save-stock-adjustment-btn');
    const adjustStockScannerContainer = document.getElementById('adjust-stock-scanner-container');
    const stockDecreaseBtn = document.getElementById('stock-decrease-btn');
    const stockIncreaseBtn = document.getElementById('stock-increase-btn');
    const exportDataModal = document.getElementById('export-data-modal');
    const closeExportDataBtn = document.getElementById('close-export-data-btn');
    const exportAllDataBtn = document.getElementById('export-all-data-btn');
    const importFileInput = document.getElementById('import-file-input');
    const importDataBtn = document.getElementById('import-data-btn');

    // --- FUNÇÕES AUXILIARES ---
    function showAlert(message) {
        alertMessage.textContent = message;
        alertModal.classList.remove('hidden');
    }

    function showConfirm(message, callback) {
        confirmMessage.textContent = message;
        confirmModal.classList.remove('hidden');
        confirmYesBtn.onclick = () => {
            confirmModal.classList.add('hidden');
            callback(true);
        };
        confirmNoBtn.onclick = () => {
            confirmModal.classList.add('hidden');
            callback(false);
        };
    }

    // --- LÓGICA DE AUTENTICAÇÃO E NAVEGAÇÃO ---
    function login() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        loginError.textContent = '';
        if (!username || !password) {
            loginError.textContent = 'Utilizador e senha são obrigatórios.';
            return;
        }
        
        const users = DB.get('users');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            if (keepLoggedInCheckbox.checked) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            }
            currentUser = user;
            showAppView();
        } else {
            loginError.textContent = 'Utilizador ou senha inválidos.';
        }
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInUser');
        showLoginView();
    }

    function showAppView() {
        loginView.classList.add('hidden');
        appView.classList.remove('hidden');
        currentUserInfo.textContent = `${currentUser.username} (${currentUser.role})`;
        if (currentUser.role === 'admin') {
            adminTabBtn.classList.remove('hidden');
            historyUserFilterContainer.classList.remove('hidden');
            populateUserFilter();
        } else {
            adminTabBtn.classList.add('hidden');
            historyUserFilterContainer.classList.add('hidden');
        }
        switchTab('vender-view');
        startNewSale();
    }

    function showLoginView() {
        appView.classList.add('hidden');
        loginView.classList.remove('hidden');
        usernameInput.value = '';
        passwordInput.value = '';
    }

    function checkLoggedInState() {
        let savedUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            showAppView();
        } else {
            showLoginView();
        }
    }
    
    function switchTab(tabId) {
        tabContents.forEach(content => content.classList.add('hidden'));
        tabButtons.forEach(button => button.classList.remove('tab-active'));
        document.getElementById(tabId).classList.remove('hidden');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('tab-active');
        if (tabId === 'historico-view') {
            historyDateInput.valueAsDate = new Date();
            showHistory();
        }
    }

    // --- LÓGICA DE VENDAS ---
    function lookupProduct(identifier) {
        if (!identifier) return;
        const products = DB.get('products');
        const product = products.find(p => p.cod === identifier || p.barcode === identifier);
        const foundControls = document.getElementById('product-found-controls');
        const notFoundControls = document.getElementById('product-not-found-controls');
        const registerNewProductLink = document.getElementById('register-new-product-link');
        const notFoundMessage = document.getElementById('product-not-found-message');

        if (product) {
            currentProduct = product;
            productName.textContent = product.name;
            productPrice.textContent = `R$ ${product.price.toFixed(2)}`;
            currentQuantity = 1;
            productQuantitySpan.textContent = currentQuantity;
            foundControls.classList.remove('hidden');
            notFoundControls.classList.add('hidden');
        } else {
            currentProduct = null;
            foundControls.classList.add('hidden');
            notFoundControls.classList.remove('hidden');
            if (currentUser.role === 'admin') {
                notFoundMessage.textContent = 'Produto não encontrado. Deseja registá-lo?';
                registerNewProductLink.classList.remove('hidden');
            } else {
                notFoundMessage.textContent = 'Produto não encontrado.';
                registerNewProductLink.classList.add('hidden');
            }
        }
        productInfo.classList.remove('hidden');
    }

    function addToCart() {
        if (currentProduct) {
            const existingItem = currentCart.find(item => item.cod === currentProduct.cod);
            if (existingItem) {
                existingItem.quantity += currentQuantity;
            } else {
                currentCart.push({ ...currentProduct, quantity: currentQuantity });
            }
            updateCartUI();
            resetProductLookup();
        }
    }

    function resetProductLookup() {
        currentProduct = null;
        codeInput.value = '';
        productInfo.classList.add('hidden');
        document.getElementById('product-found-controls').classList.add('hidden');
        document.getElementById('product-not-found-controls').classList.add('hidden');
        codeInput.focus();
    }

    function removeFromCart(code) {
        currentCart = currentCart.filter(item => item.cod !== code);
        updateCartUI();
    }

    function updateCartUI() {
        if (currentCart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center">Carrinho vazio</p>';
        } else {
            cartItems.innerHTML = '';
            currentCart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'relative flex justify-between items-center p-2 bg-gray-50 rounded';
                itemElement.innerHTML = `
                    <div><p class="font-medium text-sm">${item.name}</p><p class="text-xs text-gray-600">${item.quantity} x R$ ${item.price.toFixed(2)}</p></div>
                    <p class="font-semibold text-sm">R$ ${(item.quantity * item.price).toFixed(2)}</p>
                    <button class="remove-from-cart-btn absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs" data-code="${item.cod}">&times;</button>`;
                cartItems.appendChild(itemElement);
            });
        }
        updateSaleTotals();
    }

    function addPayment() {
        const method = paymentMethodSelect.value;
        const amount = parseFloat(paymentAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
            showAlert('Por favor, insira um valor de pagamento válido.');
            return;
        }
        const payment = { method, amount };
        if (method === 'Cartão de Crédito') {
            payment.installments = installmentsSelect.value;
        }
        currentPayments.push(payment);
        paymentAmountInput.value = '';
        updatePaymentsUI();
        updateSaleTotals();
    }

    function removePayment(index) {
        currentPayments.splice(index, 1);
        updatePaymentsUI();
        updateSaleTotals();
    }

    function updatePaymentsUI() {
        paymentEntries.innerHTML = '';
        currentPayments.forEach((payment, index) => {
            const paymentElement = document.createElement('div');
            paymentElement.className = 'flex justify-between items-center p-2 bg-gray-100 rounded text-sm';
            let paymentText = payment.method;
            if (payment.installments) {
                paymentText += ` (${payment.installments})`;
            }
            paymentElement.innerHTML = `
                <div><span class="font-medium">${paymentText}</span></div>
                <div class="flex items-center gap-2"><span class="font-semibold">R$ ${payment.amount.toFixed(2)}</span><button class="remove-payment-btn w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs" data-index="${index}">&times;</button></div>`;
            paymentEntries.appendChild(paymentElement);
        });
    }

    function updateSaleTotals() {
        const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let finalTotal = subtotal;
        let discount = 0;
        const hasCashOrPix = currentPayments.some(p => p.method === 'Dinheiro' || p.method === 'Pix');
        if (hasCashOrPix && subtotal > 0) {
            discount = subtotal * 0.05;
            finalTotal = subtotal - discount;
            discountAmountSpan.textContent = `- R$ ${discount.toFixed(2)}`;
            discountInfo.classList.remove('hidden');
        } else {
            discountInfo.classList.add('hidden');
        }
        const totalPaid = currentPayments.reduce((sum, p) => sum + p.amount, 0);
        const remaining = finalTotal - totalPaid;
        cartSubtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
        cartTotal.textContent = `R$ ${finalTotal.toFixed(2)}`;
        totalPaidSpan.textContent = `R$ ${totalPaid.toFixed(2)}`;
        remainingBalanceSpan.textContent = `R$ ${remaining.toFixed(2)}`;
        remainingBalanceSpan.classList.toggle('text-red-600', remaining > 0);
        remainingBalanceSpan.classList.toggle('text-green-600', remaining <= 0);
        const isFullyPaid = Math.abs(remaining) < 0.01;
        finalizeSaleBtn.disabled = currentCart.length === 0 || !isFullyPaid;
    }

    function finalizeSale() {
        if (currentCart.length === 0 || currentPayments.length === 0) return;
        const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let finalTotal = subtotal;
        if (currentPayments.some(p => p.method === 'Dinheiro' || p.method === 'Pix')) {
            finalTotal = subtotal * 0.95;
        }
        const allSales = DB.get('sales');
        const newSaleId = (allSales.length > 0 ? Math.max(...allSales.map(s => s.id)) : 0) + 1;
        const saleData = { id: newSaleId, userId: currentUser.username, timestamp: new Date().toISOString(), items: currentCart, total: finalTotal, payments: currentPayments };
        allSales.push(saleData);
        DB.set('sales', allSales);
        let products = DB.get('products');
        currentCart.forEach(cartItem => {
            const productIndex = products.findIndex(p => p.cod === cartItem.cod);
            if (productIndex !== -1 && products[productIndex].estoque != null) {
                products[productIndex].estoque -= cartItem.quantity;
            }
        });
        DB.set('products', products);
        showAlert('Venda finalizada e guardada localmente!');
        startNewSale();
    }

    function startNewSale() {
        currentCart = [];
        currentPayments = [];
        updateCartUI();
        updatePaymentsUI();
        resetProductLookup();
    }

    // --- LÓGICA DO HISTÓRICO ---
    function populateUserFilter() {
        const users = DB.get('users');
        historyUserFilter.innerHTML = '<option value="all">Todos os Funcionários</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = `${user.username} (${user.role})`;
            historyUserFilter.appendChild(option);
        });
    }

    function showHistory() {
        const selectedDate = historyDateInput.value;
        let allSales = DB.get('sales');
        if (selectedDate) {
            allSales = allSales.filter(sale => sale.timestamp.startsWith(selectedDate));
        }
        if (currentUser.role !== 'admin') {
            allSales = allSales.filter(sale => sale.userId === currentUser.username);
        } else {
            const selectedUser = historyUserFilter.value;
            if (selectedUser !== 'all') {
                allSales = allSales.filter(sale => sale.userId === selectedUser);
            }
        }
        allSales.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        historyContent.innerHTML = '';
        let totalSalesValue = 0;
        if (allSales.length === 0) {
            historyContent.innerHTML = '<p class="text-gray-500">Nenhuma venda registada para esta data/filtro.</p>';
        } else {
            allSales.forEach(sale => {
                totalSalesValue += sale.total;
                const saleElement = document.createElement('div');
                saleElement.className = 'p-3 border rounded-lg bg-gray-50';
                const itemsHtml = sale.items.map(item => `<li class="text-xs">${item.quantity}x ${item.name}</li>`).join('');
                const paymentsHtml = sale.payments.map(p => {
                    let text = p.method + (p.installments ? ` (${p.installments})` : '');
                    text += `: R$ ${p.amount.toFixed(2)}`;
                    return `<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">${text}</span>`;
                }).join(' ');
                const saleTimestamp = new Date(sale.timestamp);
                saleElement.innerHTML = `
                    <div class="flex justify-between font-semibold text-sm">
                        <p>Venda #${sale.id.toString().padStart(4, '0')} - ${saleTimestamp.toLocaleDateString('pt-BR')} ${saleTimestamp.toLocaleTimeString('pt-BR')}</p>
                        <p>Total: R$ ${sale.total.toFixed(2)}</p>
                    </div>
                    <div class="text-xs text-gray-600 mt-1"><span>Vendedor: ${sale.userId}</span></div>
                    <div class="mt-2 text-xs"><p class="font-semibold mb-1">Pagamentos:</p><div class="flex flex-wrap gap-2">${paymentsHtml}</div></div>
                    <div class="mt-2 text-xs"><p class="font-semibold mb-1">Itens:</p><ul class="list-disc list-inside">${itemsHtml}</ul></div>`;
                historyContent.appendChild(saleElement);
            });
        }
        historyTotalSpan.textContent = `R$ ${totalSalesValue.toFixed(2)}`;
    }
    
    // --- LÓGICA DE ADMINISTRAÇÃO ---
    function addNewProduct(event) {
        event.preventDefault();
        stopScanner();
        const cod = document.getElementById('new-cod').value.trim();
        const name = document.getElementById('new-product-name').value.trim();
        const price = parseFloat(document.getElementById('new-product-price').value);
        const barcode = document.getElementById('new-barcode').value.trim();
        const category = document.getElementById('new-category').value.trim();
        const subcategory = document.getElementById('new-subcategory').value.trim();
        const subsubcategory = document.getElementById('new-subsubcategory').value.trim();
        const estoque = parseInt(document.getElementById('new-estoque').value, 10) || null;
        if (!cod || !name || isNaN(price) || price <= 0) {
            showAlert('Por favor, preencha os campos obrigatórios (Código, Nome, Preço) corretamente.');
            return;
        }
        let products = DB.get('products');
        if (products.some(p => p.cod === cod)) {
            showAlert('Já existe um produto com este código.');
            return;
        }
        const newProduct = { cod, name, price, barcode, category, subcategory, subsubcategory, estoque, prc_total: null };
        products.push(newProduct);
        DB.set('products', products);
        showAlert('Produto registado com sucesso localmente.');
        addProductForm.reset();
        addProductModal.classList.add('hidden');
    }

    function saveProductPairing() {
        const cod = pairProductSelect.value;
        const newBarcode = newBarcodePairInput.value.trim();
        if(!cod || !newBarcode) {
            showAlert('Selecione um produto e forneça um novo código de barras.');
            return;
        }
        let products = DB.get('products');
        const productIndex = products.findIndex(p => p.cod === cod);
        if (productIndex === -1) {
            showAlert('Produto não encontrado para casar o código.');
            return;
        }
        products[productIndex].barcode = newBarcode;
        DB.set('products', products);
        showAlert('Código de barras associado com sucesso localmente!');
        pairProductModal.classList.add('hidden');
    }

    function saveStockAdjustment() {
        if (!productForStockAdjustment) return;
        const newStock = parseInt(adjustStockNewStock.value, 10);
        if (isNaN(newStock) || newStock < 0) {
            showAlert('Por favor, insira um valor de estoque válido.');
            return;
        }
        let products = DB.get('products');
        const productIndex = products.findIndex(p => p.cod === productForStockAdjustment.cod);
        if (productIndex === -1) {
            showAlert('Produto não encontrado para ajustar o estoque.');
            return;
        }
        products[productIndex].estoque = newStock;
        DB.set('products', products);
        showAlert('Estoque atualizado com sucesso localmente!');
        adjustStockModal.classList.add('hidden');
    }

    function addNewUser(event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const newRole = document.getElementById('new-role').value;
        if (!newUsername || !newPassword) {
            showAlert('Nome de utilizador e senha são obrigatórios.');
            return;
        }
        let users = DB.get('users');
        if (users.some(u => u.username === newUsername)) {
            showAlert('Já existe um utilizador com este nome.');
            return;
        }
        users.push({ username: newUsername, password: newPassword, role: newRole });
        DB.set('users', users);
        showAlert('Utilizador registado com sucesso localmente.');
        addUserForm.reset();
        addUserModal.classList.add('hidden');
        if (document.querySelector('.tab-active').dataset.tab === 'historico-view') {
            populateUserFilter();
        }
    }
    
    function exportSalesToCSV() {
        const sales = DB.get('sales');
        if (sales.length === 0) {
            showAlert("Nenhuma venda para exportar.");
            return;
        }
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID Venda;Data;Vendedor;Total Venda;Cod Produto;Nome Produto;Quantidade;Preço Unitário;Subtotal Item;Método Pagamento;Valor Pago;Parcelas\r\n";
        sales.forEach(sale => {
            const saleDate = new Date(sale.timestamp).toLocaleString('pt-BR');
            const saleBaseRow = `${sale.id};${saleDate};${sale.userId};${sale.total.toFixed(2)}`;
            sale.items.forEach((item, itemIndex) => {
                let row = `${saleBaseRow};${item.cod};"${item.name}";${item.quantity};${item.price.toFixed(2)};${(item.quantity * item.price).toFixed(2)}`;
                if (itemIndex < sale.payments.length) {
                    const payment = sale.payments[itemIndex];
                    row += `;${payment.method};${payment.amount.toFixed(2)};${payment.installments || ''}`;
                } else {
                    row += ";;;";
                }
                csvContent += row + "\r\n";
            });
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `relatorio_vendas_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    function exportAllData() {
        const allData = { products: DB.get('products'), users: DB.get('users'), sales: DB.get('sales') };
        const jsonString = JSON.stringify(allData, null, 2);
        const blob = new Blob([jsonString], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup_dados_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showAlert('Backup de dados exportado com sucesso!');
    }

    function importAllData(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.products && data.users) {
                    showConfirm("Tem a certeza que deseja substituir todos os dados locais por este backup?", (confirmed) => {
                        if (confirmed) {
                            DB.set('products', data.products);
                            DB.set('users', data.users);
                            DB.set('sales', data.sales || []);
                            localStorage.setItem('db_initialized', 'true');
                            showAlert('Dados importados com sucesso! A aplicação será recarregada.');
                            setTimeout(() => location.reload(), 1500);
                        }
                    });
                } else {
                    showAlert('Arquivo de backup inválido.');
                }
            } catch (err) {
                showAlert(`Erro ao ler o arquivo: ${err.message}`);
            }
        };
        reader.readAsText(file);
    }

    // --- LÓGICA DOS MODAIS DE ADMIN ---
    function openPairModal() {
        resetPairProductModal();
        pairProductModal.classList.remove('hidden');
        const products = DB.get('products');
        const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            pairCategorySelect.appendChild(option);
        });
    }
    
    function resetPairProductModal() {
        pairCategorySelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairSubcategorySelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairSubsubcategorySelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairProductSelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairSubcategorySelect.disabled = true;
        pairSubsubcategoryContainer.classList.add('hidden');
        pairSubsubcategorySelect.disabled = true;
        pairProductSelect.disabled = true;
        pairedProductInfo.classList.add('hidden');
        newBarcodePairInput.value = '';
        savePairBtn.disabled = true;
        pairableProductsList = [];
    }

    function populateSubcategories() {
        const selectedCategory = pairCategorySelect.value;
        pairSubcategorySelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairSubsubcategorySelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairProductSelect.innerHTML = '<option value="">-- Escolha --</option>';
        if (!selectedCategory) return;
        const products = DB.get('products');
        const subcategories = [...new Set(products.filter(p => p.category === selectedCategory && p.subcategory).map(p => p.subcategory))].sort();
        subcategories.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            pairSubcategorySelect.appendChild(option);
        });
        pairSubcategorySelect.disabled = false;
    }

    function populateSubsubcategories() {
        const selectedCategory = pairCategorySelect.value;
        const selectedSubcategory = pairSubcategorySelect.value;
        pairSubsubcategorySelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairProductSelect.innerHTML = '<option value="">-- Escolha --</option>';
        if (!selectedSubcategory) return;
        const products = DB.get('products');
        const subsubcategories = [...new Set(products.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory && p.subsubcategory).map(p => p.subsubcategory))].sort();
        if (subsubcategories.length > 0) {
            pairSubsubcategoryContainer.classList.remove('hidden');
            pairSubsubcategorySelect.disabled = false;
            pairSubsubcategorySelect.innerHTML = '<option value="">-- Produtos sem Sub-Subcategoria --</option>';
            subsubcategories.forEach(subsub => {
                const option = document.createElement('option');
                option.value = subsub;
                option.textContent = subsub;
                pairSubsubcategorySelect.appendChild(option);
            });
        } else {
            pairSubsubcategoryContainer.classList.add('hidden');
            populateProducts();
        }
    }

    function populateProducts() {
        const selectedCategory = pairCategorySelect.value;
        const selectedSubcategory = pairSubcategorySelect.value;
        const selectedSubsubcategory = pairSubsubcategorySelect.value || null;
        if (!selectedCategory || !selectedSubcategory) return;
        let products = DB.get('products');
        pairableProductsList = products.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory && (selectedSubsubcategory ? p.subsubcategory === selectedSubsubcategory : !p.subsubcategory)).sort((a, b) => a.name.localeCompare(b.name));
        pairProductSelect.innerHTML = '<option value="">-- Escolha --</option>';
        pairableProductsList.forEach(prod => {
            const option = document.createElement('option');
            option.value = prod.cod;
            option.textContent = prod.name;
            pairProductSelect.appendChild(option);
        });
        pairProductSelect.disabled = false;
    }

    function showSelectedProductInfo() {
        const selectedCod = pairProductSelect.value;
        if (!selectedCod) {
            pairedProductInfo.classList.add('hidden');
            savePairBtn.disabled = true;
            return;
        }
        const product = pairableProductsList.find(p => p.cod === selectedCod);
        if (product) {
            pairedProductName.textContent = product.name;
            pairedProductCod.textContent = `Cód: ${product.cod}`;
            pairedProductCurrentBarcode.textContent = `Barcode Atual: ${product.barcode || 'Nenhum'}`;
            pairedProductInfo.classList.remove('hidden');
            savePairBtn.disabled = false;
        }
    }

    function openAdjustStockModal() {
        productForStockAdjustment = null;
        adjustStockCodeInput.value = '';
        adjustStockProductInfo.classList.add('hidden');
        adjustStockControls.classList.add('hidden');
        adjustStockNewStock.value = '';
        saveStockAdjustmentBtn.disabled = true;
        adjustStockModal.classList.remove('hidden');
    }

    function lookupProductForStock(identifier) {
        if (!identifier) return;
        const products = DB.get('products');
        productForStockAdjustment = products.find(p => p.cod === identifier || p.barcode === identifier);
        if (productForStockAdjustment) {
            adjustStockProductName.textContent = productForStockAdjustment.name;
            adjustStockCurrentStock.textContent = productForStockAdjustment.estoque ?? 'N/A';
            adjustStockNewStock.value = productForStockAdjustment.estoque ?? 0;
            adjustStockProductInfo.classList.remove('hidden');
            adjustStockControls.classList.remove('hidden');
            saveStockAdjustmentBtn.disabled = false;
        } else {
            showAlert('Produto não encontrado.');
            productForStockAdjustment = null;
            adjustStockProductInfo.classList.add('hidden');
            adjustStockControls.classList.add('hidden');
            saveStockAdjustmentBtn.disabled = true;
        }
    }

    // --- LÓGICA DO SCANNER ---
    async function requestCameraPermission(target) {
        scannerTargetInput = target;
        if (!navigator.mediaDevices?.getUserMedia) {
            return showAlert('O seu navegador não suporta o acesso à câmara.');
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            stream.getTracks().forEach(track => track.stop());
            const viewportId = `#${target.closest('.modal-bg, #app-view').querySelector('.scanner-viewport')?.id}`;
            if (target.id === 'new-cod') addProductScannerContainer.classList.remove('hidden');
            else if (target.id === 'new-barcode-pair') pairProductScannerContainer.classList.remove('hidden');
            else if (target.id === 'adjust-stock-code-input') adjustStockScannerContainer.classList.remove('hidden');
            else scannerModal.classList.remove('hidden');
            startScanner(viewportId);
        } catch (error) {
            let msg = 'A permissão da câmara é necessária.';
            if (error.name === 'NotAllowedError') msg = 'Você negou o acesso à câmara.';
            else if (error.name === 'NotFoundError') msg = 'Nenhuma câmara foi encontrada.';
            showAlert(msg);
        }
    }

    function startScanner(viewportSelector) {
        Quagga.init({
            inputStream: { name: "Live", type: "LiveStream", target: document.querySelector(viewportSelector), constraints: { facingMode: "environment" } },
            locator: { patchSize: "medium", halfSample: true },
            numOfWorkers: navigator.hardwareConcurrency || 4,
            decoder: { readers: ["ean_reader"], multiple: false },
            locate: true
        }, (err) => {
            if (err) { showAlert('Erro ao iniciar a câmara.'); return; }
            Quagga.start();
            isScannerActive = true;
        });
    }

    function stopScanner() {
        if (isScannerActive) {
            Quagga.stop();
            isScannerActive = false;
        }
        [scannerModal, addProductScannerContainer, pairProductScannerContainer, adjustStockScannerContainer].forEach(el => el.classList.add('hidden'));
    }

    Quagga.onDetected((result) => {
        if (result?.codeResult?.code) {
            const code = result.codeResult.code;
            if (scannerTargetInput) {
                scannerTargetInput.value = code;
                const event = new Event('keypress');
                event.key = 'Enter';
                scannerTargetInput.dispatchEvent(event);
            }
            if ('vibrate' in navigator) navigator.vibrate(100);
            stopScanner();
        }
    });

    // --- EVENT LISTENERS ---
    loginBtn.addEventListener('click', login);
    passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') login(); });
    logoutBtnConfig.addEventListener('click', logout);
    codeInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') lookupProduct(codeInput.value.trim()); });
    scanCodeBtn.addEventListener('click', () => requestCameraPermission(codeInput));
    scanNewCodeBtn.addEventListener('click', () => requestCameraPermission(document.getElementById('new-cod')));
    addToCartBtn.addEventListener('click', addToCart);
    finalizeSaleBtn.addEventListener('click', finalizeSale);
    clearCartBtn.addEventListener('click', () => { if (currentCart.length > 0) showConfirm("Limpar o carrinho e pagamentos?", (c) => c && startNewSale()); else startNewSale(); });
    exportSalesBtn.addEventListener('click', exportSalesToCSV);
    exportDataBtn.addEventListener('click', () => exportDataModal.classList.remove('hidden'));
    closeExportDataBtn.addEventListener('click', () => exportDataModal.classList.add('hidden'));
    exportAllDataBtn.addEventListener('click', exportAllData);
    importFileInput.addEventListener('change', (e) => { importDataBtn.disabled = !e.target.files.length; });
    importDataBtn.addEventListener('click', () => importAllData({ target: importFileInput }));
    document.getElementById('register-new-product-link').addEventListener('click', () => {
        const code = codeInput.value.trim();
        addProductModal.classList.remove('hidden');
        document.getElementById('new-cod').value = code;
        document.getElementById('new-barcode').value = code;
        resetProductLookup();
    });
    closeAlertBtn.addEventListener('click', () => alertModal.classList.add('hidden'));
    closeScannerBtn.addEventListener('click', stopScanner);
    addProductBtn.addEventListener('click', () => addProductModal.classList.remove('hidden'));
    closeAddProductBtn.addEventListener('click', () => { stopScanner(); addProductModal.classList.add('hidden'); });
    addUserBtn.addEventListener('click', () => addUserModal.classList.remove('hidden'));
    closeAddUserBtn.addEventListener('click', () => addUserModal.classList.add('hidden'));
    addProductForm.addEventListener('submit', addNewProduct);
    addUserForm.addEventListener('submit', addNewUser);
    historyDateInput.addEventListener('change', showHistory);
    historyUserFilter.addEventListener('change', showHistory);
    cancelAddBtn.addEventListener('click', resetProductLookup);
    increaseQtyBtn.addEventListener('click', () => { currentQuantity++; productQuantitySpan.textContent = currentQuantity; });
    decreaseQtyBtn.addEventListener('click', () => { if (currentQuantity > 1) { currentQuantity--; productQuantitySpan.textContent = currentQuantity; } });
    cartItems.addEventListener('click', (e) => { if (e.target.classList.contains('remove-from-cart-btn')) removeFromCart(e.target.dataset.code); });
    tabButtons.forEach(button => button.addEventListener('click', () => switchTab(button.dataset.tab)));
    addPaymentBtn.addEventListener('click', addPayment);
    paymentEntries.addEventListener('click', (e) => { if (e.target.classList.contains('remove-payment-btn')) removePayment(parseInt(e.target.dataset.index, 10)); });
    paymentMethodSelect.addEventListener('change', () => installmentsContainer.classList.toggle('hidden', paymentMethodSelect.value !== 'Cartão de Crédito'));
    pairProductBtn.addEventListener('click', openPairModal);
    closePairProductBtn.addEventListener('click', () => { stopScanner(); pairProductModal.classList.add('hidden'); });
    pairCategorySelect.addEventListener('change', populateSubcategories);
    pairSubcategorySelect.addEventListener('change', populateSubsubcategories);
    pairSubsubcategorySelect.addEventListener('change', populateProducts);
    pairProductSelect.addEventListener('change', showSelectedProductInfo);
    scanNewBarcodePairBtn.addEventListener('click', () => requestCameraPermission(newBarcodePairInput));
    savePairBtn.addEventListener('click', saveProductPairing);
    adjustStockBtn.addEventListener('click', openAdjustStockModal);
    closeAdjustStockBtn.addEventListener('click', () => { stopScanner(); adjustStockModal.classList.add('hidden'); });
    adjustStockCodeInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') lookupProductForStock(adjustStockCodeInput.value.trim()); });
    scanAdjustStockBtn.addEventListener('click', () => requestCameraPermission(adjustStockCodeInput));
    saveStockAdjustmentBtn.addEventListener('click', saveStockAdjustment);
    stockDecreaseBtn.addEventListener('click', () => { const val = parseInt(adjustStockNewStock.value, 10) || 0; if (val > 0) adjustStockNewStock.value = val - 1; });
    stockIncreaseBtn.addEventListener('click', () => { const val = parseInt(adjustStockNewStock.value, 10) || 0; adjustStockNewStock.value = val + 1; });

    // --- INICIALIZAÇÃO ---
    DB.init();
    checkLoggedInState();
    
    // --- SERVICE WORKER ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then(reg => {
                console.log('ServiceWorker registrado com sucesso.', reg);
            }).catch(err => {
                console.error('Falha no registro do ServiceWorker:', err);
            });
        });
    }
})
