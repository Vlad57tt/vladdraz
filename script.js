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
                            
                            // Добавляем эффект наведения для строк кода
                            const allCodeLines = document.querySelectorAll('.code-content div');
                            allCodeLines.forEach(line => {
                                line.addEventListener('mouseenter', function() {
                                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                });
                                line.addEventListener('mouseleave', function() {
                                    this.style.backgroundColor = 'transparent';
                                });
                            });
                        }, 1000);
                    }, 500);
                }
            }, lineDelay);
            
            // Увеличиваем задержку для следующей строки
            // Случайная задержка между 80 и 200 мс для более реалистичного эффекта
            lineDelay += Math.floor(Math.random() * 120) + 80;
        });
    }

    // Запускаем анимацию с небольшой задержкой после загрузки страницы
    setTimeout(typeCode, 600);
    
    // Добавляем обработчики для ссылок в коде
    document.querySelectorAll('.py-string a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.borderBottom = '1px solid';
            this.style.opacity = '0.9';
        });
        link.addEventListener('mouseleave', function() {
            this.style.borderBottom = '1px dashed';
            this.style.opacity = '1';
        });
    });
    
    // Добавляем эффект для панели информации
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                infoPanel.style.transform = 'translateY(-5px)';
            } else {
                infoPanel.style.transform = 'translateY(0)';
            }
        });
    }
});