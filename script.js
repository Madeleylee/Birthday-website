
/* =========================================================
   CONFIGURACIÓN
========================================================= */


/*
    Número de toques necesarios para llenar el gorrito.

    Puedes cambiarlo si quieres que sea más fácil o difícil.
*/

const MAX_HAT_CLICKS = 20;


/*
    Frases que aparecerán al descubrir cada foto.

    ✏️ CAMBIA ESTAS FRASES POR RECUERDOS VUESTROS.
*/

const memoryCaptions = [

    "Nuestro primera foto juntos🥰",

    "Nuestra primera navidad juntos🎄",

    "Nuestro primer viaje juntos✈️",

    "Nosotros siempre siendo chicles, pegados y felices💞",

    "Qué suerte tener tantos momentos contigo😍",

    "Y todavía nos quedan muchísimos recuerdos por crear juntos💖"

];



/* =========================================================
   VARIABLES
========================================================= */


let hatClicks = 0;


/*
    Guarda cuántas fotografías ha descubierto.
*/

let discoveredMemories = new Set();


/*
    Guarda en qué misión está.

    0 = ninguna
    1 = misión 1
    2 = misión 2
*/

let currentMission = 0;



/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */


const birthdayHat =
    document.getElementById("birthday-hat");


const progressFill =
    document.getElementById("progress-fill");


const progressText =
    document.getElementById("progress-text");


const tapMessage =
    document.getElementById("tap-message");


const startScreen =
    document.getElementById("birthday-start");


const mainPage =
    document.getElementById("main-page");


const confettiContainer =
    document.getElementById("confetti-container");



/* =========================================================
   GORRITO DE CUMPLEAÑOS
========================================================= */


/*
    Cada vez que se toca el gorrito:
    1. Aumentamos los toques.
    2. Actualizamos la barra.
    3. Hacemos una pequeña animación.
*/

birthdayHat.addEventListener("click", () => {


    // Evitamos superar el máximo

    if (hatClicks >= MAX_HAT_CLICKS) {
        return;
    }


    // Aumentamos el contador

    hatClicks++;


    // Calculamos el porcentaje

    const percentage =
        Math.round(
            (hatClicks / MAX_HAT_CLICKS) * 100
        );


    // Actualizamos la barra

    progressFill.style.width =
        `${percentage}% `;


    // Actualizamos el texto

    progressText.textContent =
        `${percentage}% `;


    // Animación del gorrito

    birthdayHat.animate(
        [
            {
                transform:
                    "scale(1) rotate(0deg)"
            },

            {
                transform:
                    "scale(1.12) rotate(-5deg)"
            },

            {
                transform:
                    "scale(1) rotate(0deg)"
            }
        ],
        {
            duration: 180,
            easing: "ease-out"
        }
    );


    /*
        Pequeña partícula cada vez que lo toca.
    */

    createSmallHeart();


    /*
        Cuando llega al 100%,
        comienza la celebración.
    */

    if (hatClicks >= MAX_HAT_CLICKS) {

        completeBirthdayStart();

    }

});



/* =========================================================
   COMPLETAR EL GORRITO
========================================================= */


// function completeBirthdayStart() {


//     // Evitamos más clics

//     birthdayHat.disabled = true;


//     // Animación final

//     birthdayHat.classList.add(
//         "hat-complete"
//     );


//     tapMessage.textContent =
//         "¡Listo! 🎉";


//     // Lanzamos confeti

//     createConfetti();


//     /*
//         Esperamos un poco para que
//         el confeti pueda verse antes
//         de mostrar la página.
//     */

//     setTimeout(() => {


//         // Ocultamos pantalla inicial

//         startScreen.classList.add(
//             "hidden"
//         );


//         // Mostramos la página

//         mainPage.classList.remove(
//             "hidden"
//         );


//         // Permitimos hacer scroll

//         document.body.classList.remove(
//             "locked"
//         );


//         // Comenzamos arriba

//         window.scrollTo(0, 0);


//     }, 1600);

// }

function completeBirthdayStart() {

    birthdayHat.disabled = true;

    // Mostrar la página principal
    startScreen.classList.add("hidden");
    mainPage.classList.remove("hidden");

    document.body.classList.add("ready");

    // Ir a la primera sección
    goToSection("main-page");

    // 🎉 Lanzar confeti al entrar
    setTimeout(() => {
        createConfetti();
    }, 100);
}


/* =========================================================
   PEQUEÑOS CORAZONES
========================================================= */


function createSmallHeart() {


    const heart =
        document.createElement("span");


    heart.textContent = "❤️";


    heart.style.position =
        "fixed";


    heart.style.left =
        `${Math.random() * 100}% `;


    heart.style.bottom =
        "30%";


    heart.style.color =
        "rgba(246, 8, 8, 0.5)";


    heart.style.fontSize =
        `${50 + Math.random() * 50} px`;


    heart.style.pointerEvents =
        "none";


    heart.style.zIndex =
        "1500";


    document.body.appendChild(
        heart
    );


    heart.animate(
        [
            {
                transform:
                    "translateY(0) scale(1)",

                opacity: 1
            },

            {
                transform:
                    "translateY(-120px) scale(0.5)",

                opacity: 0
            }
        ],
        {
            duration: 900,

            easing: "ease-out"
        }
    );


    setTimeout(() => {

        heart.remove();

    }, 900);

}



/* =========================================================
   CONFETI
========================================================= */



function createConfetti() {
    
    const confettiContainer = document.querySelector(".confetti-container");

    if (!confettiContainer) return;

    // Limpiar confeti anterior
    confettiContainer.innerHTML = "";

    const pieces = 80;

    for (let i = 0; i < pieces; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        // Diferentes elementos para que se vea más bonito
        const symbols = ["🔴", "🟡", "🟠", "🟢", "🔵", "🟣"];

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "%";
        piece.style.animationDuration =
            (2.5 + Math.random() * 2) + "s";

        piece.style.animationDelay =
            Math.random() * 0.5 + "s";

        confettiContainer.appendChild(piece);
    }

    // Limpiar después de la animación
    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 5000);
}

/* =========================================================
   NAVEGACIÓN
========================================================= */


/*
    Lleva suavemente a una sección.
*/

function goToSection(sectionId) {


    const section =
        document.getElementById(
            sectionId
        );


    if (section.classList.contains("hidden-section")) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth"
    });

}


function unlockSection(sectionId) {

    const section = document.getElementById(sectionId);

    // Mostrar la sección
    section.classList.remove("hidden-section");


    // Desplazarse hasta ella
    section.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================================
   RECUERDOS / FOTOS
========================================================= */


/*
    Abrir una fotografía.
*/

function openMemory(index) {


    // Guardamos que esta foto fue descubierta

    discoveredMemories.add(index);


    // Buscamos todas las tarjetas

    const cards =
        document.querySelectorAll(
            ".memory-card"
        );


    // Marcamos la tarjeta como descubierta

    if (cards[index]) {

        cards[index].classList.add(
            "discovered"
        );

    }


    /*
        Actualizamos el contador.
    */

    const memoryProgress =
        document.getElementById(
            "memory-progress"
        );


    memoryProgress.textContent =
        `${discoveredMemories.size} / 6 recuerdos descubiertos`;


    /*
        Ponemos la imagen correspondiente
        dentro del modal.
    */

    const image =
        document.getElementById(
            "modal-image"
        );


    image.src =
        `img/foto${index + 1}.jpeg`;


    /*
        Ponemos la frase correspondiente.
    */

    const caption =
        document.getElementById(
            "modal-caption"
        );


    caption.textContent =
        memoryCaptions[index];


    /*
        Mostramos el modal.
    */

    document
        .getElementById("memory-modal")
        .classList.remove("hidden");


    /*
        Si ya descubrió las 6,
        mostramos el botón para continuar.
    */

    if (discoveredMemories.size === 6) {

        document
            .getElementById("memories-next")
            .classList.remove("hidden");

    }

}



/* =========================================================
   CERRAR FOTO
========================================================= */


function closeMemory() {


    document
        .getElementById("memory-modal")
        .classList.add("hidden");

}


/* =========================================================
   FUNCION PARA VOLVER A LA MISIÓN ANTERIOR
========================================================= */
function goToPreviousMission(missionNumber) {

    if (missionNumber === 2) {

        document.getElementById("mission-two").classList.add("hidden");
        document.getElementById("mission-one").classList.remove("hidden");

}
}

/* =========================================================
   MISIONES
========================================================= */

/* =========================================================
    modal misión.
========================================================= */

function openMissionClue(missionNumber) {

    const modal = document.getElementById("mission-clue-modal");
    const clueNumber = document.getElementById("clue-number");
    const clueTitle = document.getElementById("clue-title");
    const clueText = document.getElementById("clue-text");
    const clueText2 = document.getElementById("clue-text2");
    if (missionNumber === 1) {

        clueNumber.textContent = "PISTA · MISIÓN 01";
        clueTitle.textContent = "💌";

        clueText.textContent =
            "No tendrás que ir muy lejos para encontrarlo. De hecho, ya tienes todo lo necesario delante de ti🔍";

        clueText2.textContent = 
            "Entre todo lo que he preparado para ti, hay algo que no está ahí simplemente para decorar. Busca bien… y deja que tu curiosidad haga el resto. ❤️";
            
    } else if (missionNumber === 2) {

        clueNumber.textContent = "PISTA · MISIÓN 02";
        clueTitle.textContent = "💌";

        clueText.textContent =
            "Para esta tendrás que descubrir algo que todavía no sabes que tienes👣";
        
        clueText2.textContent = 
            "👀 Hay un regalo esperándote en un lugar que quizá aún no hayas mirado. Ábrelo, descubre lo que hay dentro y fíjate bien… porque tu segundo tesoro está más cerca de lo que imaginas. ❤️";
    }

    modal.classList.remove("hidden");
}

function closeMissionClue() {

    document
        .getElementById("mission-clue-modal")
        .classList.add("hidden");
}

function backToMissionsIntro() {

    document.getElementById("mission-one").classList.add("hidden");

    document.getElementById("missions-intro").classList.remove("hidden");

    document.getElementById("missions-intro").scrollIntoView({
        behavior: "smooth"
    });
}

/*
    Primera pantalla de misiones.
*/
function startMissions() {
    // Guardamos que empieza la primera misión
    currentMission = 1;
    // Ocultamos introducción 
    document
        .querySelector(".mission-intro")
        .classList.add("hidden");
    // Mostramos misión 1 
    document
        .getElementById("mission-one")
        .classList.remove("hidden");
}


/* =========================================================
   COMPLETAR UNA MISIÓN
========================================================= */


function foundMission(missionNumber) {


    /*
        Pequeña celebración.
    */

    createConfetti();


    if (missionNumber === 1) {


        /*
            Misión 1 completada.
            Pasamos a la segunda.
        */

        document
            .getElementById("mission-one")
            .classList.add("hidden");


        currentMission = 2;


        setTimeout(() => {

            document
                .getElementById("mission-two")
                .classList.remove("hidden");

        }, 700);


    }


    else if (missionNumber === 2) {


        /*
            Las dos misiones están completadas.
        */

        document
            .getElementById("mission-two")
            .classList.add("hidden");


        currentMission = 0;


        setTimeout(() => {

            document
                .getElementById("missions-complete")
                .classList.remove("hidden");

        }, 700);

    }

}



/* =========================================================
   TECLA ESC PARA CERRAR LAS FOTOS
========================================================= */


document.addEventListener(
    "keydown",
    (event) => {


        if (event.key === "Escape") {

            closeMemory();

        }

    }
);
