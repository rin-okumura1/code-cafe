let carrousel = 0;


function mostrarImg(inicio){
    const diapositivas = document.querySelectorAll('.carrousel-item');
    const totalDiapositivas = diapositivas.length;

    if (inicio >= totalDiapositivas){
        inicio = 0;
    } else if(inicio<0){
        inicio = totalDiapositivas - 1;
    }

    const offset = -inicio*100;
    document.querySelector('.carrousel-inner').style.transform = `translateX(${offset}%)`;

    diapositivas.forEach((diapositiva, i) =>{diapositiva.classList.toggle('active', i === inicio);});
   
    carrousel = inicio;
}

function nextDiapositiva(){
    mostrarImg(carrousel + 1);
}

function prevDiapositiva(){
    mostrarImg(carrousel - 1);
}

document.addEventListener('DOMContentLoaded' ,() =>{mostrarImg(carrousel);});