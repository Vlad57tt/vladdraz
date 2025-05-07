document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const codeContent = document.querySelector('.code-content');
    const highlightWarning = document.querySelector('.highlight-warning');

    // Сохраняем оригинальное содержимое кода
    const originalCodeHTML = codeContent.innerHTML;
    
    // Очищаем содержимое кода для анимации
    codeContent.innerHTML = '';
    
    // Добавляем курсор для эффекта печатания
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    codeContent.appendChild(cursor);

    // Настройка темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        themeToggle.checked = savedTheme === 'light-theme';
    } else {
        body.className = 'dark-theme';
        themeToggle.checked = false;
        localStorage.setItem('theme', 'dark-theme');
    }

    // Слушатель события изменения состояния чекбокса
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // Функция для анимации печатания кода
    function typeCode() {
        // Создаем временный div для парсинга HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalCodeHTML;
        
        // Получаем все строки кода (div элементы)
        const codeLines = Array.from(tempDiv.children);
        
        // Удаляем курсор перед началом анимации
        if (codeContent.querySelector('.typing-cursor')) {
            codeContent.querySelector('.typing-cursor').remove();
        }
        
        // Запускаем анимацию для каждой строки с задержкой
        let lineDelay = 0;
        
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                // Создаем новый div для строки
                const newLine = document.createElement('div');
                newLine.className = 'code-line';
                newLine.innerHTML = line.innerHTML;
                
                // Добавляем строку в контейнер
                codeContent.appendChild(newLine);
                
                // Прокручиваем вниз, чтобы видеть новую строку
                codeContent.scrollTop = codeContent.scrollHeight;
                
                // Если это последняя строка, добавляем курсор в конец
                if (index === codeLines.length - 1) {
                    setTimeout(() => {
                        const cursor = document.createElement('span');
                        cursor.className = 'typing-cursor';
                        codeContent.appendChild(cursor);
                        
                        // После завершения анимации кода, запускаем анимацию предупреждения
                        setTimeout(() => {
                            if (highlightWarning) {
                                highlightWarning.classList.add('animate-highlight');
                            }
                        }, 1000);
                    }, 500);
                }
            }, lineDelay);
            
            // Увеличиваем задержку для следующей строки
            // Случайная задержка между 100 и 300 мс для более реалистичного эффекта
            lineDelay += Math.floor(Math.random() * 200) + 100;
        });
    }

    // Запускаем анимацию с небольшой задержкой после загрузки страницы
    setTimeout(typeCode, 800);
});