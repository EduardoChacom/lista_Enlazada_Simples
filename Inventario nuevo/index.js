class Producto {
  constructor(codigo, nombre, cantidad, costo, siguiente) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.costo = costo;
  }
}

class Inventario {
  constructor() {
    this._productos = new Array();
  }

  agregarProducto(producto) {
    this._productos[this._productos = producto];
  }

  buscarProducto(codigoProducto) {
    if (this._productos.length == 0) return undefined;
    for (let i = 0; i < this._productos.length; i++) {
      const element = this._productos[i];
      if (element.codigo == codigoProducto) {
        return element;
      }
    }
    return null;
  }

  eliminarProducto(codigoProducto) {
    if(this.getIndex(codigoProducto) !== this._productos.length + 1) {
      for (let i = this.getIndex(codigoProducto); i < this._productos.length - 1; i++) {
        this._productos[i] = this._productos[i+1];
      }
      this._productos.pop(this._productos.length);
    }
    return this._productos

    // if (this._productos.length == 0) return;
    // for (let i = 0; i < this._productos.length; i++) {
    //   const element = this._productos[i];
    //   if (element?.codigo == codigoProducto) {
    //     this._productos[i] = null;
    //     for (let j = i; j < this._productos.length; j++) {
    //       this._productos[j] = this._productos[j + 1];
    //     }
    //     this._productos.length -= 1;
    //   }
    // }
  }

  getIndex(codigo){
    for (let i = 0; i < this._productos.length; i++) {
    if (codigo === this.producto[i.codigo])
    return i;
    }
    return this._productos.length + 1;
  }

  listado() {
    if (this._productos.length == 0) return 'vacio';
    let string = '';
    for (let i = 0; i < this._productos.length; i++) {
      const element = this._productos[i];
      string += `\ncodigo: ${element.codigo}\nnombre: ${element.nombre}\ncantidad: ${element.cantidad}\ncosto: ${element.costo}\n`;
    }
    return string;
  }

  listadoInverso() {
    let aux = this._productos;
    let productosInverso = [];
    for (let i = this._productos.length - 1; i >= 0; i--) {
      productosInverso.push(this._productos[i]);
    }
    this._productos = productosInverso;
    let resultado = this.listado();
    this._productos = aux;
    return resultado;
  }
}

class Lista {
  constructor() {
    this.primero = null;
    this.ultimo = null;
  }

  AgregarNodo(nodo) {
    if (!this.primero) {
      this.primero = nodo;
      this.ultimo = nodo;
    } 
    if (!this.primero.siguiente) {
      this.primero.siguiente = nodo;
      this.ultimo = nodo;
    } else {
      let temp = this.ultimo;
      temp.siguiente = nodo;
      this.ultimo = nodo;
    }
  }

  AgreagarNodoAlInicio(nodo) {
    nodo.siguiente = this.primero;
    this.primero = nodo;
  }

  Insertar(pos, nodo) {
    let i,d;
    i = 1;
    if (pos != 1) {
      function bucle(n) {
        i++;
        if (i == pos) {
          nodo.siguiente = n.siguiente;
          n.siguiente = nodo;
          d = true;
        }else{
          if (n.siguiente) return bucle(n.siguiente);
        }
      }
      bucle(this.primero);
      if (pos >= i && d == null) {
        this.AgregarNodo(nodo);
      }
    } else {
      this.AgreagarNodoAlInicio(nodo);
    }
  }

  ExtraerPrimero() {
    let temporal = this.primero;
    this.primero = this.primero.siguiente;
    return temporal;
  }

  ExtraerUltimo() {
    let nodo = this.primero;
    while (nodo.siguiente.siguiente) {
      nodo = nodo.siguiente;
    }
    let temp
    temp = nodo.siguiente
    nodo.siguiente = null;
    return temp;
  }

  Listar() {
    if (this.primero === null) {
      return null;
    } else {
      return this.CicloParaListar("", this.primero);
    }
  }

  ListarEnReversa() {
    if (this.primero === null) {
      return null;
    } else {
      return this.CicloParaListarInverso(this.primero);
    }
  }

  CicloParaListar(x, nodo) {
    x = x + `codigo: ${nodo.codigo}\nnombre: ${nodo.nombre}\ncantidad: ${nodo.cantidad}\ncosto: ${nodo.costo}\n\n`;
    if (nodo.siguiente != null) {
      return this.CicloParaListar(x, nodo.siguiente);
    }
    return x;
  }

  CicloParaListarInverso(nodo) {
    if (nodo.siguiente) {
      return `${this.CicloParaListarInverso(nodo.siguiente)}\ncodigo: ${nodo.codigo}\nnombre: ${nodo.nombre}\ncantidad: ${nodo.cantidad}\ncosto: ${nodo.costo}\n\n`;
    } else {
      return `codigo: ${nodo.codigo}\nnombre: ${nodo.nombre}\ncantidad: ${nodo.cantidad}\ncosto: ${nodo.costo}\n\n`;
    }
  }
}

const inventario = new Inventario();
const btnAgregar = document.getElementById("btnAgregar");
const btnBuscar = document.getElementById("btnBuscar");

const tabla = document.getElementById("tabla");

const btnModoAgregar = document.getElementById("modoAgregar");
const btnModoBuscar = document.getElementById("modoBuscar");

const formAgregar = document.getElementById("formAgregar");
const formBuscar = document.getElementById("formBuscar");
const formContenedor = document.getElementById("formContenedor");


const inpBuscar = document.getElementById("buscar");
const busquedaContenedor = document.getElementById("busqueda");
const targetaBusqueda = document.getElementById("targetaBusqueda");
const busquedaLbCodigo = document.getElementById('busquedaCodigo');
const busquedaLbNombre = document.getElementById('busquedaNombre');
const busquedaLbCantidad = document.getElementById('busquedaCantidad');
const busquedaLbCosto = document.getElementById('busquedaCosto');

const btnEliminar = document.getElementById("eliminar");

const agregarInpCodigo = document.querySelector('#codigo');
const agregarInpNombre = document.querySelector('#nombre');
const agregarInpCantidad = document.querySelector('#cantidad');
const agregarInpCosto = document.querySelector('#costo');



formBuscar.remove();
targetaBusqueda.remove();


btnAgregar.addEventListener('click', function (e) {
  e.preventDefault();
  const existente = inventario.buscarProducto(parseInt(agregarInpCodigo.value));

  if (!existente) {
    const productoNuevo = new Producto(agregarInpCodigo.value, agregarInpNombre.value, agregarInpCantidad.value, agregarInpCosto.value);

    inventario.agregarProducto(productoNuevo);
    crearFilaDeTabla('Agregado', productoNuevo.codigo, productoNuevo.nombre);
  }
});

let codigo = 0;

btnBuscar.addEventListener('click', function (e) {
  e.preventDefault();
  codigo = inpBuscar.value;
  console.log(inventario.listado());
  console.log(inventario.listadoInverso());
  const producto = inventario.buscarProducto(codigo);

  if (producto) {
    busquedaLbCodigo.innerHTML = producto.codigo;
    busquedaLbNombre.innerHTML = producto.nombre;
    busquedaLbCantidad.innerHTML = producto.cantidad;
    busquedaLbCosto.innerHTML = producto.costo
    busquedaContenedor.append(targetaBusqueda);
  } else {
    targetaBusqueda.remove();
  }
});

btnEliminar.addEventListener('click', function (e) {
  e.preventDefault();
  const productoAEliminar = inventario.buscarProducto(codigo);
  crearFilaDeTabla('Eliminado', productoAEliminar.codigo, productoAEliminar.nombre);
  inventario.eliminarProducto(codigo);
  targetaBusqueda.remove();
});

btnModoBuscar.addEventListener("click", function (e) {
  e.preventDefault();

  formAgregar.remove();
  formContenedor.append(formBuscar);
});

btnModoAgregar.addEventListener("click", function (e) {
  e.preventDefault();

  formBuscar.remove();
  formContenedor.append(formAgregar);
});

function crearFilaDeTabla(accion, codigo, nombre) {
  const tRow = document.createElement('tr');
  const accionTDate = document.createElement('td');
  const codigoTDate = document.createElement('td');
  const nombreTDate = document.createElement('td');

  accionTDate.innerHTML = accion;
  codigoTDate.innerHTML = codigo;
  nombreTDate.innerHTML = nombre;

  tRow.append(accionTDate);
  tRow.append(codigoTDate);
  tRow.append(nombreTDate);

  tabla.prepend(tRow);
}


const l = new Lista();
let p = new Producto(1,1,1,1);
l.AgregarNodo(p);
p = new Producto(2,2,2,2);
l.AgregarNodo(p);
p = new Producto(3,3,3,3)
l.AgregarNodo(p);
console.log(l.Listar());
console.log(l.ListarEnReversa());
// console.log(l.ExtraerUltimo());
console.log(l.ExtraerPrimero());
console.log(l.Listar());
console.log(l.ListarEnReversa());
p = new Producto(10,3,3,3)
l.Insertar(4, p);
console.log("op insertar");
console.log(l.Listar());
console.log(l.ListarEnReversa());