document.addEventListener('DOMContentLoaded', () => {
	// --- ЧАСТЬ 1: АНИМАЦИЯ ПЕЧАТИ (Осталась без изменений) ---
	const codeElement = document.getElementById('bio-code')
	const typingSpeed = 30
	const lineDelay = 150

	const bioCodeLines = [
		"<span class='comment'># -*- coding: utf-8 -*-</span>",
		"<span class='comment'># Загрузка жизненно важных модулей</span>",
		"<span class='keyword'>from</span> datetime <span class='keyword'>import</span> date",
		'',
		"<span class='keyword'>class</span> <span class='class-name'>Person</span>:",
		"    <span class='comment'># Инициализация личности</span>",
		"    <span class='keyword'>def</span> <span class='function-name'>__init__</span>(<span class='variable'>self</span>):",
		"        <span class='variable'>self</span>.name = <span class='string'>'Алексей'</span>",
		"        <span class='variable'>self</span>.surname = <span class='string'>'Иванов'</span>",
		"        <span class='variable'>self</span>.birth_date = date(<span class='number'>1998</span>, <span class='number'>5</span>, <span class='number'>21</span>)",
		"        <span class='variable'>self</span>.location = <span class='string'>'Санкт-Петербург, Россия'</span>",
		"        <span class='variable'>self</span>.contacts = {",
		"            <span class='string'>'email'</span>: <span class='string'>'alex.ivanov@email.com'</span>,",
		"            <span class='string'>'telegram'</span>: <span class='string'>'@alexdev'</span>",
		'        }',
		"        <span class='variable'>self</span>.skill_stack = []",
		'',
		"    <span class='comment'># Определение образовательной траектории</span>",
		"    <span class='keyword'>def</span> <span class='function-name'>add_education</span>(<span class='variable'>self</span>, university, faculty, year):",
		"        <span class='variable'>self</span>.education = <span class='string'>f'{university}, {faculty} ({year})'</span>",
		'',
		"    <span class='comment'># Накопление профессиональных навыков</span>",
		"    <span class='keyword'>def</span> <span class='function-name'>acquire_skills</span>(<span class='variable'>self</span>, skills):",
		"        <span class='variable'>self</span>.skill_stack.extend(skills)",
		'',
		"    <span class='comment'># Вывод итоговой информации</span>",
		"    <span class='keyword'>def</span> <span class='function-name'>get_summary</span>(<span class='variable'>self</span>):",
		"        age = (date.today() - <span class='variable'>self</span>.birth_date).days // <span class='number'>365</span>",
		"        <span class='function-name'>print</span>(<span class='string'>f'USER: {<span class='variable'>self</span>.name} {<span class='variable'>self</span>.surname}, {age} лет'</span>)",
		"        <span class='function-name'>print</span>(<span class='string'>f'LOCATION: {<span class='variable'>self</span>.location}'</span>)",
		"        <span class='function-name'>print</span>(<span class='string'>f'EDUCATION: {<span class='variable'>self</span>.education}'</span>)",
		"        <span class='function-name'>print</span>(<span class='string'>'SKILLS:'</span>)",
		"        <span class='keyword'>for</span> skill <span class='keyword'>in</span> <span class='variable'>self</span>.skill_stack:",
		"            <span class='function-name'>print</span>(<span class='string'>f'  - {skill}'</span>)",
		'',
		"<span class='comment'># --- Исполняемый блок ---</span>",
		'me = Person()',
		'me.add_education(',
		"    university=<span class='string'>'СПбГУ'</span>,",
		"    faculty=<span class='string'>'Информационные технологии'</span>,",
		"    year=<span class='number'>2020</span>",
		')',
		'me.acquire_skills([',
		"    <span class='string'>'Python (Django, FastAPI)'</span>,",
		"    <span class='string'>'JavaScript (React, Node.js)'</span>,",
		"    <span class='string'>'SQL & NoSQL Databases'</span>,",
		"    <span class='string'>'Docker & CI/CD'</span>",
		'])',
		'',
		"me.get_summary() <span class='comment'># Запуск системы</span>",
	]

	let lineIndex = 0
	let fullHtml = ''
	const cursor = "<span class='cursor'></span>"

	function typeLine() {
		if (lineIndex >= bioCodeLines.length) {
			codeElement.innerHTML = fullHtml
			return
		}
		const line = bioCodeLines[lineIndex]
		let charIndex = 0
		let tempLineHtml = ''
		function typeChar() {
			if (charIndex < line.length) {
				if (line[charIndex] === '<') {
					const tagEndIndex = line.indexOf('>', charIndex)
					tempLineHtml += line.substring(charIndex, tagEndIndex + 1)
					charIndex = tagEndIndex
				} else {
					tempLineHtml += line[charIndex]
				}
				codeElement.innerHTML = fullHtml + tempLineHtml + cursor
				charIndex++
				setTimeout(typeChar, typingSpeed)
			} else {
				fullHtml += line + '\n'
				lineIndex++
				setTimeout(typeLine, lineDelay)
			}
		}
		typeChar()
	}

	// --- ЧАСТЬ 2: АНИМАЦИЯ ФОНА В СТИЛЕ "МАТРИЦЫ" ---
	const canvas = document.getElementById('background-canvas')
	const ctx = canvas.getContext('2d')

	let drops
	let fontSize = 16
	let columns

	// Символы для анимации
	const characters =
		'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const charArray = characters.split('')

	function setupMatrix() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		columns = Math.floor(canvas.width / fontSize)
		drops = []
		for (let x = 0; x < columns; x++) {
			drops[x] = 1
		}
	}

	function drawMatrix() {
		// Полупрозрачный фон для создания эффекта затухания
		ctx.fillStyle = 'rgba(26, 32, 44, 0.05)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		ctx.fillStyle = '#4ec9b0' // Цвет символов (бирюзовый)
		ctx.font = fontSize + 'px monospace'

		for (let i = 0; i < drops.length; i++) {
			const text = charArray[Math.floor(Math.random() * charArray.length)]
			ctx.fillText(text, i * fontSize, drops[i] * fontSize)

			// Сбрасываем "каплю" наверх после того, как она пересечет экран
			if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
				drops[i] = 0
			}
			drops[i]++
		}
	}

	let animationFrameId
	function animateMatrix() {
		drawMatrix()
		animationFrameId = requestAnimationFrame(animateMatrix)
	}

	function init() {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
		}
		setupMatrix()
		animateMatrix()
	}

	window.addEventListener('resize', init)

	init()
	typeLine() // Запуск анимации печати
})
