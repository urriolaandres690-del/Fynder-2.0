window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1000);

});

const menuToggle = document.querySelector(".menu-toggle");

const menu = document.querySelector(".menu");

if(menuToggle){

    menuToggle.addEventListener("click", () => {

        menu.classList.toggle("active");

    });

}

const elementos = document.querySelectorAll(".animado");

function mostrarElementos(){

    elementos.forEach((el,index)=>{

        const top = el.getBoundingClientRect().top;

        const altura = window.innerHeight;

        if(top < altura - 100){

            setTimeout(()=>{

                el.classList.add("visible");

            },index * 100);

        }

    });

}

window.addEventListener("scroll", mostrarElementos);

window.addEventListener("load", mostrarElementos);

const secciones = document.querySelectorAll("section");

const links = document.querySelectorAll(".menu a");

window.addEventListener("scroll",()=>{

    let actual = "";

    secciones.forEach(sec=>{

        const top = sec.offsetTop;

        if(window.scrollY >= top - 150){

            actual = sec.getAttribute("id");

        }

    });

    links.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + actual){

            link.classList.add("active");

        }

    });

});

const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        btnTop.style.display = "block";

    }else{

        btnTop.style.display = "none";

    }

});

btnTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

const preguntas = document.querySelectorAll(".faq-question");

preguntas.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const item = btn.parentElement;

        item.classList.toggle("active");

    });

});

const contadores = document.querySelectorAll(".contador");

const iniciarContador = () => {

    contadores.forEach(contador => {

        const objetivo = +contador.dataset.target;

        let actual = 0;

        const incremento = objetivo / 100;

        const actualizar = () => {

            actual += incremento;

            if(actual < objetivo){

                contador.textContent = Math.floor(actual);

                requestAnimationFrame(actualizar);

            }else{

                contador.textContent = objetivo;

            }

        };

        actualizar();

    });

};

let contadorIniciado = false;

window.addEventListener("scroll",()=>{

    const stats = document.querySelector(".stats");

    if(!stats) return;

    const top = stats.getBoundingClientRect().top;

    if(top < window.innerHeight && !contadorIniciado){

        contadorIniciado = true;

        iniciarContador();

    }

});

const darkBtn = document.getElementById("darkModeBtn");

if(darkBtn){

    darkBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "darkMode",

            document.body.classList.contains("dark")

        );

    });

}

if(localStorage.getItem("darkMode") === "true"){

    document.body.classList.add("dark");

}

const imagenes = document.querySelectorAll(".galeria-grid img");

const modal = document.getElementById("modalImagen");

const imgModal = document.getElementById("imgModal");

const cerrar = document.querySelector(".cerrar-modal");

imagenes.forEach(img=>{

    img.addEventListener("click",()=>{

        modal.style.display = "flex";

        imgModal.src = img.src;

    });

});

if(cerrar){

    cerrar.addEventListener("click",()=>{

        modal.style.display = "none";

    });

}

window.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.style.display = "none";

    }

});

function mostrarToast(texto){

    const toast = document.getElementById("toast");

    toast.textContent = texto;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

const formulario = document.querySelector(".formulario");

if(formulario){

    formulario.addEventListener("submit",(e)=>{

        e.preventDefault();

        mostrarToast("Formulario enviado correctamente");

        formulario.reset();

    });

}

const newsletter = document.querySelector(".newsletter-form");

if(newsletter){

    newsletter.addEventListener("submit",(e)=>{

        e.preventDefault();

        mostrarToast("Suscripción realizada");

        newsletter.reset();

    });

}

window.addEventListener("scroll",()=>{

    const hero = document.querySelector(".hero");

    if(hero){

        hero.style.backgroundPositionY =
        window.scrollY * 0.5 + "px";

    }

});

const cards = document.querySelectorAll(

    ".card,.producto,.beneficio,.testimonio"

);

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 10;

        const rotateX = (0.5 - y / rect.height) * 10;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = "";

    });

});

const barra = document.createElement("div");

barra.style.position = "fixed";
barra.style.top = "0";
barra.style.left = "0";
barra.style.height = "5px";
barra.style.width = "0%";
barra.style.zIndex = "999999";
barra.style.background = "#4f46e5";

document.body.appendChild(barra);

window.addEventListener("scroll",()=>{

    const total =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const progreso =
    (window.pageYOffset / total) * 100;

    barra.style.width = progreso + "%";

});

console.log("Visualizando.js cargado correctamente");
