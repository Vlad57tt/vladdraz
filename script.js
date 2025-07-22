document.addEventListener('DOMContentLoaded', () => {
	const codeElement = document.getElementById('bio-code')
	const typingSpeed = 30
	const lineDelay = 150

	// Массив строк с биографией, ссылки оформлены как <a>
	const bioCodeLines = [
		"<span class='comment'># Загрузка жизни</span>",
		"<span class='keyword'>from</span> datetime <span class='keyword'>import</span> date",
		"<span class='keyword'>from</span> config <span class='keyword'>import</span> *",
		'',
		"<span class='keyword'>class</span> <span class='class-name'>Person</span>:",
		"    <span class='comment'># Инициализация личности</span>",
		"    <span class='keyword'>def</span> <span class='function-name'>__init__</span>(<span class='variable'>self</span>):",
		"        <span class='variable'>self</span>.name = <span class='string'>'Vladislav'</span>",
		"        <span class='variable'>self</span>.username = <span class='string'>'Vladdraz and others'</span>",
		"        <span class='variable'>self</span>.location = <span class='string'>'Бомбас, Россия'</span>",
		"        <span class='variable'>self</span>.contacts = {",
		"            <span class='string'>'Telegram'</span>: <a class='string' href='https://t.me/trainee_developer' target='_blank'>'@trainee_developer'</a>,",
		"            <span class='string'>'X (ex Twitter)'</span>: <a class='string' href='https://x.com/Vladdraaz' target='_blank'>'@Vladdraaz'</a>,",
		"            <span class='string'>'Steam'</span>: <a class='string' href='https://steamcommunity.com/id/pps_/' target='_blank'>'Parker'</a>,",
		"            <span class='string'>'Max??!!??'</span>: <a class='string' id='image-trigger' href='#' target='_blank'>'Click to message with me!'</a>",
		'        }',
		"        <span class='variable'>self</span>.skill_stack = [zero]",
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

	// Хакерский фон: синие и зелёные цифры и символы
	const canvas = document.getElementById('background-canvas')
	const ctx = canvas.getContext('2d')
	let drops
	let fontSize = 18
	let columns
	const green = '#00ff99'
	const blue = '#00bfff'
	const characters = '01 23456789'
	const symbols = '!@#$%^&*()_+-=<>?'
	const charArray = (characters + symbols).split('')

	function setupHackerBG() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		columns = Math.floor(canvas.width / fontSize)
		drops = []
		for (let x = 0; x < columns; x++) drops[x] = 1
	}

	function drawHackerBG() {
		ctx.fillStyle = 'rgba(15,32,39,0.08)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.font = fontSize + 'px monospace'
		for (let i = 0; i < drops.length; i++) {
			const text = charArray[Math.floor(Math.random() * charArray.length)]
			ctx.fillStyle = Math.random() > 0.5 ? green : blue
			ctx.fillText(text, i * fontSize, drops[i] * fontSize)
			if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
				drops[i] = 0
			}
			drops[i]++
		}
	}

	let animationFrameId
	function animateHackerBG() {
		drawHackerBG()
		animationFrameId = requestAnimationFrame(animateHackerBG)
	}

	function init() {
		if (animationFrameId) cancelAnimationFrame(animationFrameId)
		setupHackerBG()
		animateHackerBG()
	}

	function setupModal() {
		const modalOverlay = document.getElementById('modal-overlay')
		const imageModal = document.getElementById('image-modal')
		const closeModal = document.getElementById('close-modal')

		const hideModal = () => {
			imageModal.style.display = 'none'
			modalOverlay.style.opacity = '0'
			setTimeout(() => {
				modalOverlay.style.display = 'none'
			}, 500) // Время должно совпадать с transition в CSS
		}

		codeElement.addEventListener('click', e => {
			const trigger = e.target.closest('#image-trigger')
			if (!trigger) return

			e.preventDefault()
			modalOverlay.style.display = 'block'
			setTimeout(() => {
				modalOverlay.style.opacity = '1'
			}, 10) // Небольшая задержка для срабатывания transition

			setTimeout(() => {
				imageModal.style.display = 'block'
			}, 1000)
		})

		if (closeModal) {
			closeModal.addEventListener('click', hideModal)
		}

		if (modalOverlay) {
			modalOverlay.addEventListener('click', hideModal)
		}
	}

	window.addEventListener('resize', init)

	init()
	typeLine()
	setupModal()
})
