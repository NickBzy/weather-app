import "../styles/styles.css"
import "../styles/weather.css"
import {
  hideWelcomePage,
  showWeatherModal,
  displayCurrentWeather,
  displayUpcomingWeather,
  errorFetching,
  resetError,
} from "./domManipulator"
import { fetchWeather } from "./apiService"

const topInput = document.querySelector("#top-search")
const topLabel = document.querySelector(".top label")
const topMessage = document.querySelector(".top-error-msg")
const bottomInput = document.querySelector("#main-search")
const bottomLabel = document.querySelector(".main label")
const bottomMessage = document.querySelector(".main-error-msg")

function checkValidity(input, label, message) {
  input.addEventListener("blur", function () {
    message.innerHTML = ""
    label.classList.remove("filled")
    if (input.value !== "") {
      label.classList.add("filled")
    } else {
      message.innerHTML = ""
      return
    }
    if (!input.checkValidity()) {
      if (/\d/.test(input.value)) {
        message.innerHTML = "Numbers are not allowed."
      } else {
        message.innerHTML = input.validationMessage
      }
    }
  })
}

async function useApi(city, unit) {
  try {
    const data = await fetchWeather(city, unit)
    return data
  } catch (err) {
    console.error(err)
  }
}

function search() {
  const topSearch = document.querySelector(".top .search")
  const topInput = document.querySelector("#top-search")
  topSearch.addEventListener("click", async function (event) {
    try {
      // DISPLAY TOP CONTAINER FOR CURRENT WEATHER

      const data = await useApi(topInput.value.trim(), "c")
      console.log(data)
      const city = data.resolvedAddress
      const timezone = data.timezone
      const date = data.days[0].datetime
      const temp = data.days[0].temp
      const minTemp = data.days[0].tempmin
      const maxTemp = data.days[0].tempmax
      const conditions = data.days[0].conditions
      displayCurrentWeather(
        city,
        timezone,
        date,
        temp,
        minTemp,
        maxTemp,
        conditions
      )
      resetError()
      hideWelcomePage()
      showWeatherModal()

      // DISPLAY BOTTOM CONTAINER FOR UPCOMING WEATHER
      for (let i = 1; i < 6; i++) {
        const date = data.days[i].datetime
        const condition = data.days[i].conditions
        const low = data.days[i].tempmin
        const high = data.days[i].tempmax
        displayUpcomingWeather(i, date, condition, low, high)
      }
    } catch (error) {
      errorFetching()
      console.error("Error fetching weather:", error)
    }
  })

  const mainSearch = document.querySelector(".main .search")
  const mainInput = document.querySelector("#main-search")
  mainSearch.addEventListener("click", async function (event) {
    try {
      // DISPLAY TOP CONTAINER FOR CURRENT WEATHER
      const data = await useApi(mainInput.value.trim(), "c")
      console.log(data)
      const city = data.resolvedAddress
      const timezone = data.timezone
      const date = data.days[0].datetime
      const temp = data.days[0].temp
      const minTemp = data.days[0].tempmin
      const maxTemp = data.days[0].tempmax
      const conditions = data.days[0].conditions
      displayCurrentWeather(
        city,
        timezone,
        date,
        temp,
        minTemp,
        maxTemp,
        conditions
      )

      resetError()
      hideWelcomePage()
      showWeatherModal()

      // DISPLAY BOTTOM CONTAINER FOR UPCOMING WEATHER
      for (let i = 1; i < 6; i++) {
        const date = data.days[i].datetime
        const condition = data.days[i].conditions
        const low = data.days[i].tempmin
        const high = data.days[i].tempmax
        displayUpcomingWeather(i, date, condition, low, high)
      }
    } catch (error) {
      errorFetching()
      console.error("Error fetching weather:", error)
    }
  })

  topInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      event.preventDefault()
      try {
        // DISPLAY TOP CONTAINER FOR CURRENT WEATHER
        const data = await useApi(topInput.value.trim(), "c")
        console.log(data)
        const city = data.resolvedAddress
        const timezone = data.timezone
        const date = data.days[0].datetime
        const temp = data.days[0].temp
        const minTemp = data.days[0].tempmin
        const maxTemp = data.days[0].tempmax
        const conditions = data.days[0].conditions
        displayCurrentWeather(
          city,
          timezone,
          date,
          temp,
          minTemp,
          maxTemp,
          conditions
        )

        resetError()
        hideWelcomePage()
        showWeatherModal()

        // DISPLAY BOTTOM CONTAINER FOR UPCOMING WEATHER
        for (let i = 1; i < 6; i++) {
          const date = data.days[i].datetime
          const condition = data.days[i].conditions
          const low = data.days[i].tempmin
          const high = data.days[i].tempmax
          displayUpcomingWeather(i, date, condition, low, high)
        }
      } catch (error) {
        errorFetching()
        console.error("Error fetching weather:", error)
      }
    }
  })

  mainInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      event.preventDefault()
      try {
        // DISPLAY TOP CONTAINER FOR CURRENT WEATHER
        const data = await useApi(mainInput.value.trim(), "c")
        console.log(data)
        const city = data.resolvedAddress
        const timezone = data.timezone
        const date = data.days[0].datetime
        const temp = data.days[0].temp
        const minTemp = data.days[0].tempmin
        const maxTemp = data.days[0].tempmax
        const conditions = data.days[0].conditions
        displayCurrentWeather(
          city,
          timezone,
          date,
          temp,
          minTemp,
          maxTemp,
          conditions
        )

        resetError()
        hideWelcomePage()
        showWeatherModal()

        // DISPLAY BOTTOM CONTAINER FOR UPCOMING WEATHER
        for (let i = 1; i < 6; i++) {
          const date = data.days[i].datetime
          const condition = data.days[i].conditions
          const low = data.days[i].tempmin
          const high = data.days[i].tempmax
          displayUpcomingWeather(i, date, condition, low, high)
        }
      } catch (error) {
        errorFetching()
        console.error("Error fetching weather:", error)
      }
    }
  })
}

checkValidity(topInput, topLabel, topMessage)
checkValidity(bottomInput, bottomLabel, bottomMessage)
search()
