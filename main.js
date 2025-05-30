function validateForm(name, phone, option, message) {
	const errors = [];

	// Имя: только русские буквы и от 2 до 30 символов
	const nameRegex = /^[А-Яа-яЁё\s-]{2,30}$/;
	if (!nameRegex.test(name.trim())) {
		errors.push(
			"Имя должно содержать только русские буквы (от 2 до 30 символов)."
		);
	}

	// Телефон: в формате +7 (XXX) XXX-XX-XX
	const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
	if (!phoneRegex.test(phone.trim())) {
		errors.push(
			"Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX."
		);
	}

	// Опция: выбрана, не default
	if (option === "default") {
		errors.push("Пожалуйста, выберите опцию из списка.");
	}

	// // Сообщение: не пустое
	// if (message.trim() === "") {
	//   errors.push("Пожалуйста, введите сообщение.");
	// }

	return errors;
}

function formatPhoneInput(input) {
	input.addEventListener("input", function (e) {
		let value = input.value.replace(/\D/g, ""); // удаляем все нецифры

		if (value.startsWith("8")) {
			value = "7" + value.slice(1);
		}

		if (!value.startsWith("7")) {
			value = "7" + value;
		}

		// ограничим длину 11 символами (7 + 10 цифр)
		value = value.substring(0, 11);

		let formatted = "+7";

		if (value.length > 1) {
			formatted += " (" + value.substring(1, 4);
		}
		if (value.length >= 4) {
			formatted += ") " + value.substring(4, 7);
		}
		if (value.length >= 7) {
			formatted += "-" + value.substring(7, 9);
		}
		if (value.length >= 9) {
			formatted += "-" + value.substring(9, 11);
		}

		input.value = formatted;
	});
}

function smoothScrollTo(elementId) {
	const targetElement = document.getElementById(elementId);

	if (targetElement) {
		targetElement.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	} else {
		console.warn("Элемент с селектором " + elementId + " не найден.");
	}
}

function sendFormData(name, phone, option, message) {
	const formData = new FormData();
	formData.append("name", name);
	formData.append("phone", phone);
	formData.append("option", option);
	formData.append("text", message);

	fetch("https://794f-2a0b-4140-b05a-00-2.ngrok-free.app/send-message/", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "success") {
				alert("Сообщение успешно отправлено!");
			} else {
				alert("Ошибка при отправке: " + JSON.stringify(data.detail));
			}
		})
		.catch((error) => {
			console.error("Ошибка:", error);
			alert("Произошла ошибка при отправке формы.");
		});
}

const phoneInput = document.getElementById("phoneInput");
formatPhoneInput(phoneInput);

document.getElementById("myForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const name = document.getElementById("nameInput").value;
	const phone = document.getElementById("phoneInput").value;
	const option = document.getElementById("optionSelect").value;
	const message = document.getElementById("messageTextarea").value;

	const errors = validateForm(name, phone, option, message);

	if (errors.length > 0) {
		alert(errors.join("\n"));
	} else {
		sendFormData(name, phone, option, message);
		alert("Форма успешно отправлена!");
	}
});

document.getElementById("header-btn").addEventListener("click", () => {
	smoothScrollTo("myForm");
});
document.getElementById("hero-section-btn").addEventListener("click", () => {
	smoothScrollTo("myForm");
});
document.getElementById("learning-btn").addEventListener("click", () => {
	smoothScrollTo("myForm");
});
document.getElementById("link-about").addEventListener("click", () => {
	smoothScrollTo("about");
});
document.getElementById("link-advantages").addEventListener("click", () => {
	smoothScrollTo("advantages");
});
document.getElementById("link-learning").addEventListener("click", () => {
	smoothScrollTo("learning");
});
document.getElementById("link-pricing").addEventListener("click", () => {
	smoothScrollTo("pricing");
});

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const totalSlides = slide.length;

function updateSliderPosition() {
	slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
	if (currentIndex < totalSlides - 1) {
		currentIndex++;
	} else {
		currentIndex = 0; // Возврат к первому слайду
	}
	updateSliderPosition();
});

prevBtn.addEventListener("click", () => {
	if (currentIndex > 0) {
		currentIndex--;
	} else {
		currentIndex = totalSlides - 1; // Переход на последний слайд
	}
	updateSliderPosition();
});
