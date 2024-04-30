document.getElementById('bt1').addEventListener('click', function() {
    fetch('/') // Предполагается, что '/' - это конечная точка, возвращающая данные об авторах
        .then(response => response.json())
        .then(data_authors => {
            // Предполагается, что data - это массив авторов
            // Преобразуйте данные в строку для отображения в алерте
            const dataString = JSON.stringify(data_authors);
            alert(dataString);
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
});

