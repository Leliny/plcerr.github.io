document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');
    const coordinates = document.getElementById('coordinates');
    let rectangle = null; 

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Встановлюємо розміри контейнера відповідно до розмірів зображення
                    imageContainer.style.width = img.width + 'px';
                    imageContainer.style.height = img.height + 'px';

                    // Очищаємо вміст контейнера та додаємо зображення
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(img);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    imageContainer.addEventListener('click', function(event) {
        const rect = imageContainer.getBoundingClientRect();
        const imageX = rect.left + window.scrollX; 
        const imageY = rect.top + window.scrollY; 
        const x = Math.max(0, event.pageX - imageX);
        const y = Math.max(0, event.pageY - imageY);
        coordinates.innerText = `X: ${x}, Y: ${y}`;

        if (rectangle) {
            imageContainer.removeChild(rectangle);
        }

        rectangle = document.createElement('div');
        rectangle.classList.add('rectangle');
        rectangle.style.left = x + 'px';
        rectangle.style.top = y + 'px';
        rectangle.style.width = '100px'; // Задайте бажану ширину прямокутника
        rectangle.style.height = '40px';
        rectangle.style.borderWidth = '2px';
        rectangle.style.borderColor = 'red';
        imageContainer.appendChild(rectangle);
    });
});
