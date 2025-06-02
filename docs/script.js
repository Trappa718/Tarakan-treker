document.addEventListener('DOMContentLoaded', () => {
    const totalElement = document.getElementById('total');
    const addButton = document.getElementById('add');
    const historyElement = document.getElementById('history');
    const resetButton = document.getElementById('reset');
    
    // Загружаем данные из localStorage
    let total = parseInt(localStorage.getItem('tarakanTotal')) || 0;
    let history = JSON.parse(localStorage.getItem('tarakanHistory')) || [];
    
    // Обновляем отображение
    updateDisplay();
    
    // Обработчик кнопки +1
    addButton.addEventListener('click', () => {
        total++;
        const now = new Date();
        const event = {
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            timestamp: now.getTime()
        };
        history.unshift(event);
        
        saveData();
        updateDisplay();
        
        // Анимация
        addButton.textContent = '✓ Добавлено';
        setTimeout(() => {
            addButton.textContent = '+1 таракан';
        }, 1000);
    });
    
    // Обработчик кнопки сброса
    resetButton.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите сбросить счетчик и историю?')) {
            total = 0;
            history = [];
            saveData();
            updateDisplay();
        }
    });
    
    function updateDisplay() {
        totalElement.textContent = total;
        
        // Очищаем историю
        historyElement.innerHTML = '';
        
        // Добавляем элементы истории
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span>${item.date} ${item.time}</span>
                <span>+1</span>
            `;
            historyElement.appendChild(historyItem);
        });
    }
    
    function saveData() {
        localStorage.setItem('tarakanTotal', total);
        localStorage.setItem('tarakanHistory', JSON.stringify(history));
    }
    
    // Регистрируем Service Worker для PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});
