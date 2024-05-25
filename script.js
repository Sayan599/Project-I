const checkBoxList = document.querySelectorAll(".custom-checkbox");
const List = document.querySelectorAll(".goal-container");

const allInputFields = document.querySelectorAll(".goal-input");
const error = document.querySelector(".error-label");
const progress = document.querySelector(".progress-value");
const progressText = document.querySelector("#completed-text");
const progressLabel = document.querySelector(".progress-label");

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: {
        name: "",
        completed: false
    },
    second: {
        name: "",
        completed: false
    }, third: {
        name: "",
        completed: false
    }
};
let quotes = {
    0: "Raise the bar by completing the goal",
    1: "Well begun is half done",
    2: "Just a step away",
    3: "Whoa! You just completed the goals, time for chill:D"
}
let completedGoalsCount = Object.values(allGoals).filter((val) => val.completed).length
progress.style.width = `${(completedGoalsCount * 100) / 3}%`;
progressLabel.innerText = `${quotes[completedGoalsCount]}`

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
        const checkboxFilled = [...allInputFields].every((val) => {
            return (val.value !== "")
        })
        if (checkboxFilled) {
            checkbox.closest(".goal-container").classList.toggle("completed")
            allGoals[checkbox.nextElementSibling.id].completed = !allGoals[checkbox.nextElementSibling.id].completed
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
            completedGoalsCount = Object.values(allGoals).filter((val) => val.completed).length
            progress.style.width = `${(completedGoalsCount * 100) / 3}%`;
            progressText.innerHTML = `${completedGoalsCount}/3 Completed`
            progressLabel.innerText = `${quotes[completedGoalsCount]}`
        }
        else {
            error.classList.add("show-error")
        }
    })
})

allInputFields.forEach((input) => {

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add("completed");
    }

    input.value = allGoals[input.id].name;
    input.addEventListener("focus", (e) => {
        error.classList.remove("show-error");
    })

    input.addEventListener("input", (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name;
            return;
        }

        console.log(input);
        allGoals[e.target.id] = {
            name: e.target.value,
            completed: false
        }
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    })

})