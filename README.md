
# Table of contents
1. [Test 1](#test1)
2. [Test 2](#test2)
3. [Test 3](#test3)
# Proyecto final del curso React JS de Coderhouse

Proyecto: [HiddenRecords - CoderHouse](https://hiddenrecords.netlify.app/)

## Objetivo

Desarrollar una app de un e-commerce para poder vender productos de un rubro a elección.

## Modelado de datos

## Procesos

## Funcionalidades

### Ver catálogo

- Cuando se accede a la ruta *'/'* se visualizan todos los productos en forma de cuadrícula.

- Al hacer hover sobre los productos se despliega mayor información: nombre del albúm y nombre
del artista.

- Al hacer click sobre cualquier producto se redirecciona a la ruta *'/item/:id'*, en donde se puede
ver el detalle del producto y realizar funciones como agregar al carrito.

### Ver detalle del producto

#### Agregar al carrito

### Ver detalle del carrito de compra

- Se accede a la ruta *'/cart'* clickeando el ícono de carrito de compra ubicado en el navbar.

- El carrito de compra está dividido en tres secciones:

    1. Lista de productos del carrito de compra.

    2. Formulario de compra.

    3. Resumen de Orden de compra.

#### 1. Lista de productos del carrito de compra

- En esta sección se encuentra la lista de productos seleccionados, con la cantidad y el precio
total.

- En caso de que al realizar la validación de disponibilidad en el inventario, alguno(s) productos
ya no se encuentren disponibles, se muestra un nuevo apartado con dichos productos.

#### 2. Formulario de compra

- Cuanda haya al menos un producto en el carrito se activará la opción del formulario de compra,
en donde el usuario tiene que ingresar sus datos (nombre, teléfono, correo y confirmar correo)
para activar el botón de Realizar compra.

- Los campos de correo y confirmar correo tienen una validación para verificar si contienen los
mismo valores.

- Al dar click al botón de Realizar compra, se ejecuta el siguiente proceso:

    1. Validación de disponibilidad de los productos en el inventario.
    Esto se realiza revisando el stock de cada producto en Firebase.

    2. En caso de que todos los productos del carrito estén disponibles,
    se procede a generar una orden de compra en Firebase. Esto regresa
    un id de la orden de compra

#### 3. Resumen de Orden de compra

- Cuando está en proceso de compra, se visualiza una vista previa de la orden de compra.

- Los campos se actualizan al momento en que usuario ingresa sus datos.

- 

#### Formulario del usuario

### Buscar orden de compra






## This is test 1 <a name="test1"></a>
