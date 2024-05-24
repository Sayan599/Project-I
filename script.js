const checkBoxList = document.querySelectorAll(".custom-checkbox");
const List = document.querySelectorAll(".goal-container");

const allInputFields = document.querySelectorAll(".goal-input");
const error = document.querySelector(".error-label");
const progress = document.querySelector(".progress-value");
const progressText = document.querySelector("#completed-text");



checkBoxList.forEach((val) => {
    val.addEventListener("click", (e) => {
        const checkboxFilled = [...allInputFields].every((val) => {
            return (val.value !== "")
        })
        if (checkboxFilled) {
            let count = 0;
            error.style.display = "none";
            val.closest(".goal-container").classList.toggle("completed")
            List.forEach((each) => {
                if (each.classList.contains("completed")) {
                    count++;
                }
            })
            let cal = (count * 100) / 3;
            progress.style.width = `${cal}%`;
            progressText.innerHTML = `${count}/3 Completed`
        }
        else {
            error.style.display = "block";
        }
    })
})