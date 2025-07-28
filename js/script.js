/* ---------- Index --------- */

fetch('data/articulo.json')
    .then(response => response.json())
    .then(data => {
        let contenido = '';

        contenido += `<h2>${data.titulo}</h2>`;
        contenido += `<p>${data.introduccion}</p>`;

        data.noticia.forEach(seccion => {
            contenido += `<h3>${seccion.titulo}</h3>`;
            contenido += '<ul>';
            seccion.contenido.forEach(item => {
                contenido += `<li>${item}</li>`;
            });
            contenido += '</ul>';
        });

        contenido += `<p><strong>${data.conclusion}</strong></p>`;

        document.getElementById('noticias').innerHTML = contenido;
    })
    .catch(error => {
        console.error('Error al cargar las noticias:', error);
    });

/* ---------- Presupuesto --------- */

const formulario = document.getElementById("formulario")
const nombre = document.getElementById("nombre")
const direccion = document.getElementById("direccion")
const telefono = document.getElementById("telefono")
const correo = document.getElementById("correo")

let valida ={
    nombre: false,
    direccion: false,
    telefono: false,
    correo: false
}

nombre.addEventListener("blur", ()=>{  
    let name_re = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/

    if(nombre.value == "" || nombre.value == null){
        valida.nombre = false
        setErrorFor(nombre, "El nombre esta en blanco.")
    }else{
        if(!name_re.exec(nombre.value)){
            valida.nombre = false
            setErrorFor(nombre, "El nombre a de tener de 2 a 20 letras y no tener numeros.")
        }else{
            valida.nombre = true
            setSuccessFor(nombre)
        }
    }
})
direccion.addEventListener("blur", ()=>{
    let direccion_re = /^[A-ZÁÉÍÓÚÑa-záéíóúñ0-9ºª°.,\- ]{5,100}$/

    if(direccion.value == "" || direccion.value == null){
        valida.direccion = false
        setErrorFor(direccion, "La direccion esta vacia.")
    }else{
        if(!direccion_re.exec(direccion.value)){
            valida.direccion = false
            setErrorFor(direccion, "La direccion a de ser de minimo 5 a 100 caracteres.")
        }else{
            valida.direccion = true
            setSuccessFor(direccion)
        }
    }
})
telefono.addEventListener("blur", ()=>{
    let telefono_re = /^(\+34)?[6|7|9]\d{8}$/;

    if(telefono.value == "" || telefono.value == null){
        valida.telefono = false
        setErrorFor(telefono, "El telefono esta vacia.")
    }else{
        if(!telefono_re.exec(telefono.value)){
            valida.telefono = false
            setErrorFor(telefono, "El telefono a de tener 6 dijitos")
        }else{
            valida.telefono = true
            setSuccessFor(telefono)
        }
    }
})
correo.addEventListener("blur", ()=>{  
    let correo_re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(correo.value == "" || correo.value == null){
        valida.correo = false
        setErrorFor(correo, "El correo esta en blanco.")
    }else{
        if(!correo_re.exec(correo.value)){
            valida.correo = false
            setErrorFor(correo, "El correo a de tener de 2 a 20 letras una @ y un .com .es")
        }else{
            valida.correo = true
            setSuccessFor(correo)
        }
    }
})

formulario.addEventListener("submit", (e)=>{
    e.preventDefault() 
    let errorV = false

    for(const property in valida){
        if(valida[property] == false){
            errorV = true
        }
    }
    if(!errorV){
        formulario.submit()
    }
})

function setErrorFor(input, mensaje){
    const formControl = input.parentElement
    const small = formControl.querySelector("small")
    formControl.className = "form-control error"
    small.innerText = mensaje
}

function setSuccessFor(input){
    const formControl = input.parentElement
    formControl.className = "form-control success"
}

let carrito = [];

const selectorProducto = document.getElementById("seleccion-producto");
const botonAnadirCarrito = document.getElementById("anadir-al-carrito");
const contenedorArticulosCarrito = document.getElementById("articulos-carrito");
const elementoTotalFinal = document.getElementById("total-final");

botonAnadirCarrito.addEventListener("click", () => {
    const opcionSeleccionada = selectorProducto.options[selectorProducto.selectedIndex];
    const valorSeleccionado = opcionSeleccionada.value;

    if (!valorSeleccionado) {
        alert("Selecciona un producto válido");
        return;
    }

    const [nombreProducto, precioProducto] = valorSeleccionado.split(":");
    const precio = parseFloat(precioProducto);

    carrito.push({ nombre: nombreProducto, precio });

    actualizarCarrito();
});

function actualizarCarrito() {
    contenedorArticulosCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        const articuloCarrito = document.createElement("div");
        articuloCarrito.classList.add("articulo-carrito");
        articuloCarrito.innerHTML = `
            ${producto.nombre} - ${producto.precio.toFixed(2)}€
            <button class="eliminar-articulo" data-index="${index}">Eliminar</button>
        `;
        contenedorArticulosCarrito.appendChild(articuloCarrito);
    });

    document.querySelectorAll(".eliminar-articulo").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            eliminarArticulo(index);
        });
    });

    actualizarTotalFinal();
}

function eliminarArticulo(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarTotalFinal() {
    let total = carrito.reduce((suma, item) => suma + item.precio, 0);

    const plazoInput = document.getElementById("plazo");
    const plazo = parseInt(plazoInput.value);

    if (!isNaN(plazo)) {
        if (plazo >= 7 && plazo <= 30) {
            total *= 0.90;
        } else if (plazo > 30) {
            total *= 0.80;
        }
    }

    const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked");
    extrasSeleccionados.forEach((checkbox) => {
        const [, precioExtra] = checkbox.value.split(":");
        total += parseFloat(precioExtra);
    });

    const radioDescuentoSeleccionado = document.querySelector('input[name="descuento"]:checked');
    if (radioDescuentoSeleccionado) {
        const valorDescuento = parseFloat(radioDescuentoSeleccionado.value);
        total -= total * valorDescuento;
    }

    elementoTotalFinal.textContent = `Total final: ${total.toFixed(2)}€`;
}
const plazoInput = document.getElementById("plazo");
plazoInput.addEventListener("input", actualizarTotalFinal);

document.querySelectorAll(".checkbox-extra").forEach((checkbox) => {
    checkbox.addEventListener("change", actualizarTotalFinal);
});

document.querySelectorAll('input[name="descuento"]').forEach((radio) => {
    radio.addEventListener("change", actualizarTotalFinal);
});

