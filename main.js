document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');
    const coordinates = document.getElementById('coordinates');
    let dot = null; 

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
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

        
        if (dot) {
            imageContainer.removeChild(dot);
        }

        
        dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        imageContainer.appendChild(dot);
    });
});