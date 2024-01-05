let selector = document.querySelector("#tel")
let im = new Inputmask("+7(999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("#form")
var form = document.getElementById("form");

validation
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Введите имя!"
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!"
    }
  ])
  .addField("#tel", [
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length > 0)
      },
      errorMessage: 'Введите телефон'
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length === 10)
      },
      errorMessage: 'Введите телефон полностью'
    }
  ])
  .onSuccess(async function () {
    let data = {
      name: document.getElementById("name").value,
      tel: selector.inputmask.unmaskedvalue(),
      house: form.elements["house"].value,
      design: form.elements["design"].value,
      houseSize: form.elements["houseSize"].value,
    }

    let response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })

    // let result = await response.text()

    // alert(result)

    window.location.href = 'https://verst.ruso.md/gimpelmann/?popup';
  })




let selectorTwo = document.querySelector("#tel-two")
let imTwo = new Inputmask("+7(999) 999-99-99")
imTwo.mask(selectorTwo)

let validationTwo = new JustValidate("#form-two")

validationTwo
  .addField("#name-two", [
    {
      rule: "required",
      errorMessage: "Введите имя!"
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!"
    }
  ])
  .addField("#tel-two", [
    {
      validator: (value) => {
        const phone = selectorTwo.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length > 0)
      },
      errorMessage: 'Введите телефон'
    },
    {
      validator: (value) => {
        const phone = selectorTwo.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length === 10)
      },
      errorMessage: 'Введите телефон полностью'
    }
  ])
  .onSuccess(async function () {
    let data = {
      name: document.getElementById("name-two").value,
      tel: selectorTwo.inputmask.unmaskedvalue()
    }

    let response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })

    // let result = await response.text()

    // alert(result)

    window.location.href = 'https://verst.ruso.md/gimpelmann/?popup';
  })




let selectorThree = document.querySelector("#tel-three")
let imThree = new Inputmask("+7(999) 999-99-99")
imThree.mask(selectorThree)

let validationThree = new JustValidate("#form-three")

validationThree
  .addField("#name-three", [
    {
      rule: "required",
      errorMessage: "Введите имя!"
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!"
    }
  ])
  .addField("#tel-three", [
    {
      validator: (value) => {
        const phone = selectorThree.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length > 0)
      },
      errorMessage: 'Введите телефон'
    },
    {
      validator: (value) => {
        const phone = selectorThree.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length === 10)
      },
      errorMessage: 'Введите телефон полностью'
    }
  ])
  .onSuccess(async function () {
    let data = {
      name: document.getElementById("name-three").value,
      tel: selectorThree.inputmask.unmaskedvalue()
    }

    let response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })

    // let result = await response.text()

    // alert(result)

    window.location.href = 'https://verst.ruso.md/gimpelmann/?popup';
  })




let selectorFour = document.querySelector("#tel-four")
let imFour = new Inputmask("+7(999) 999-99-99")
imFour.mask(selectorFour)

let validationFour = new JustValidate("#form-four")

validationFour
  .addField("#name-four", [
    {
      rule: "required",
      errorMessage: "Введите имя!"
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!"
    }
  ])
  .addField("#tel-four", [
    {
      validator: (value) => {
        const phone = selectorFour.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length > 0)
      },
      errorMessage: 'Введите телефон'
    },
    {
      validator: (value) => {
        const phone = selectorFour.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length === 10)
      },
      errorMessage: 'Введите телефон полностью'
    }
  ])
  .onSuccess(async function () {
    let data = {
      name: document.getElementById("name-four").value,
      tel: selectorFour.inputmask.unmaskedvalue()
    }

    let response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })

    // let result = await response.text()

    // alert(result)

    window.location.href = 'https://verst.ruso.md/gimpelmann/?popup';
  })
