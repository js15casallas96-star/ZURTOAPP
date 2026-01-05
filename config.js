const ZURTO_URL = "https://pvedrhxzhfxgosuecczz.supabase.co"; 
const ZURTO_KEY = "sb_publishable_3KUGa57mxOhfXJxZp7BlIg_pfvBWlsn";

// Esta función es la que "pinta" la app con el color del cliente
function aplicarBranding() {
    const config = JSON.parse(localStorage.getItem('config_marca'));

    if (config) {
        // 1. Cambiar el nombre en el encabezado
        const elNombre = document.getElementById('marca-nombre');
        if (elNombre) elNombre.innerText = config.nombre;

        // 2. Cambiar los colores de fondo (encabezado y botones)
        const color = config.color;
        
        // Buscamos todos los elementos que tengan clase de azul y les ponemos el nuevo color
        const elementosBG = document.querySelectorAll('.bg-blue-600');
        elementosBG.forEach(el => el.style.backgroundColor = color);

        const elementosTexto = document.querySelectorAll('.text-blue-600');
        elementosTexto.forEach(el => el.style.color = color);
    }
}

// Función para enviar el pedido a la base de datos
async function enviarPedidoASupabase(montoTotal, detalleProductos) {
    const nombreNegocio = localStorage.getItem('negocio_activo') || "Comercio Desconocido";
    const config = JSON.parse(localStorage.getItem('config_marca')) || { nombre: "Halegria" };

    try {
        const respuesta = await fetch(`${ZURTO_URL}/rest/v1/pedidos`, {
            method: "POST",
            headers: {
                "apikey": ZURTO_KEY,
                "Authorization": `Bearer ${ZURTO_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            body: JSON.stringify({
                cliente: nombreNegocio,
                total: montoTotal,
                items: `[${config.nombre.toUpperCase()}] ` + detalleProductos,
                estado: "Pendiente"
            })
        });

        if (respuesta.ok) {
            alert(`✅ Pedido enviado a ${config.nombre}`);
            window.location.reload();
        }
    } catch (error) {
        alert("❌ Error al enviar el pedido");
    }
}