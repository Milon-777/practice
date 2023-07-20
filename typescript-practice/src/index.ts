interface IFormData {
    email: string;
    title: string;
    text: string;
    checkbox: boolean;
}
let formData: IFormData = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
};

// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом

const forms = document.querySelectorAll("form");
const email = document.getElementById("email") as HTMLInputElement;
const title = document.getElementById("title") as HTMLInputElement;
const text = document.getElementById("text") as HTMLTextAreaElement;
const checkbox = document.getElementById("checkbox") as HTMLInputElement;

forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formData = {
            email: email.value,
            title: title.value,
            text: text.value,
            checkbox: checkbox.checked,
        };
        if (validateFormData(formData)) {
            checkFormData(formData);
        }
    });
});

function validateFormData(data: IFormData): boolean {
    // Если каждое из свойств объекта data правдиво...
    if (isFilledFormData(data)) {
        return true;
    } else {
        console.log("Please, complete all fields");
        return false;
    }
}

function isFilledFormData(data: IFormData): data is IFormData {
    if (
        data.email !== "" &&
        data.title !== "" &&
        data.text !== "" &&
        data.checkbox !== false
    ) {
        return true;
    } else {
        return false;
    }
}

function checkFormData(data: IFormData): void {
    const { email } = data;
    const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];

    // Если email совпадает хотя бы с одним из массива
    if (emails.find((e) => e === email) !== undefined) {
        console.log("This email is already exist");
    } else {
        console.log("Posting data...");
    }
}
