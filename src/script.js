 // вытаскиваем нужные нам элементы
const input = document.querySelector('input')
const btnadd = document.querySelector('.add')
const btnedit = document.querySelector('.edit')
const tasklist = document.querySelector('.task-list')

// переменная для проверки активно редактирование или нет
let checkEdit = false

// функция обновления статуса кнопки Редактирования
function updateStatus() {
    if (tasklist.children.length === 0)
        {
            btnedit.disabled = true
            checkEdit = false
            btnedit.textContent = 'Удалять'
        }
        else if (tasklist.children.length > 0)
        {
            btnedit.disabled = false
        }
}

 // обновляю статус кнопки редактирования
updateStatus()

btnadd.addEventListener('click', function(){
    if (input.value.trim() != "") 
    {   
        // присваиваю переменной text значение из input
        const text = input.value.trim()

        // создаю элемент button и li
        let delete_btn = document.createElement('img')
        delete_btn.addEventListener('click', function() {
            this.parentElement.remove()
             // обновляю статус кнопки редактирования
            updateStatus()
        })

        // Создаю элемент li
        let li = document.createElement('li')
        // сразу же кидаю на него обработчик дабл-клика, чтобы можно было редактировать сам текст
        li.addEventListener('dblclick', function() {
            // сохраняю старый текст
            let old_text = li.textContent
            // слздаю новый input
            let edit_text = document.createElement('input')
            // очищаю текст в li
            li.textContent = ""
            // добавляю в него ранее созданный input
            li.appendChild(edit_text)
            // присваиваю input старый текст
            edit_text.value = old_text
            // делаю на этом input фокус
            edit_text.focus()

            // обработчик нажатия клавиши Enter
            edit_text.addEventListener('keydown', function(e) {
                if (e.key === "Enter") {
                    // меняю текст в li на значение в input
                    li.textContent = edit_text.value
                    // возвращаю кнопку удаления, тоесть добавляю в li её снова, ведь когда мы чистили и присваивали текст для li, она исчезла
                    li.appendChild(delete_btn)
                }
            })
            // обработчик при потере фокуса
            edit_text.addEventListener('blur', function() {
                    // меняю текст в li на значение в input
                    li.textContent = edit_text.value
                    // возвращаю кнопку удаления, тоесть добавляю в li её снова, ведь когда мы чистили и присваивали текст для li, она исчезла
                    li.appendChild(delete_btn)
            })
        })

        // добавляю классы для стилизации.
        li.classList.add('list-item')
        delete_btn.classList.add('delete_btn')

        // присваиваю новому li значение из input
        li.textContent = text
        // Так как наша кнопка, это по факту Img, тоесть нам нужно указать путь с нашей иконкой через src
        delete_btn.src = 'assets/icons/delete.png'

        // добавляю li в ul список, затем в li добавляю button, очищаю input и делаю на нем фокус.
        tasklist.append(li)
        li.appendChild(delete_btn)
        input.value = "";
        input.focus();
        // обновляю статус кнопки редактирования
        updateStatus()
    } 
    else 
    {
        // выводит сообщение в браузер которое невозможно игнорировать, пока не нажмешь ОК
        alert('Введите задачу!');
        // очищаем input
        input.value = "";
        // делаем фокус на нём
        input.focus();   
    }
})

// обработчик при клике на кнопку Редактирования
btnedit.addEventListener('click', function(){

    // вытаскиваем наши кнопки удаления
    const delete_btn = document.querySelectorAll('.delete_btn') 
    // делаем проверку если, иначе если
    if (checkEdit === false) 
    {   
        // меняем текст кнопки на Отмена
        btnedit.textContent = "Отмена"
        // Назначаем статус true, тоесть режим редактирования включен
        checkEdit = true
        // простенький цикл, так как кнопок удаления у нас много, поэтому нужно всем менять стиль, а делается это через цикл foreach
        delete_btn.forEach(i => {
            i.style.display = 'block'
        })

    }
    else if (checkEdit === true)
    {
        // меняем текст кнопки на Удалять
        btnedit.textContent = "Удалять"
        // Назначаем статус false, тоесть режим редактирования выключен
        checkEdit = false
        // простенький цикл, так как кнопок удаления у нас много, поэтому нужно всем менять стиль, а делается это через цикл foreach
        delete_btn.forEach(i => {
            i.style.display = 'none'
        })
    }
})

// Имитирование нажатия кнопки добавить при помощи клавиши Enter, сделано для удобства пользователя
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      btnadd.click();
    }
  });