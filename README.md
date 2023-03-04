# Proyecto final del curso React JS de Coderhouse

Proyecto: [HiddenRecords - CoderHouse](https://hiddenrecords.netlify.app/)

## Objetivo

Desarrollar una app de un e-commerce para poder vender productos de un rubro a elección.

## Contexto del proyecto

La app que desarrollé es para la venta de albúmes en formato vinil. Hay una variedad albúmes
de diferentes artistas y géneros musicales.

## Tecnologías y dependencias

El proyecto utiliza las siguientes tecnologías

- Frontend: *React v18.2.0*

- Backend: *Firebase*

- Base de datos: *Firestore de Firebase*

Las dependencias utilizadas en el proyecto son:

- *tailwindcss v3.2.4*: Framework de css para facilitar los estilos de la aplicación.

- *@headlessui/react v1.7.12*: Para la creación de componentes UI con Tailwind CSS.

- *@heroicons/react v2.0.13*: Para los íconos utilizados.

- *react-router-dom v18.2.0*: Sistema de routing para la navegación de la aplicación.

- *firebase*: Para poder utilizar Firebase como backend y Firestore como base de datos.


## Arquitectura y procesos

El proyecto utiliza *Context* para manejar el estado de la aplicación. Específicamente se utiliza
para el estado del Carrito de compra, el cual es utilizado en múltiples componentes.

Entre los procesos desarrollados para la aplicación se encuentran:

- Creación de servicios para agregar y actualizar información de Firestore. Algunas de las funciones dentro de estos servicios: *getAlbum*, *getAlbums*, *checkInventory*, *updateInventory*, *getOrder* y *addOrder*.

- Agregar productos al carrito de compra.

- Generar orden de compra.

- Visualizar información una orden de compra utilizando su id.

- Validar disponibilidad de inventario por producto.

- Modificar inventario.

## Funcionalidades

### Ver catálogo

- Cuando se accede a la ruta *'/'* se visualizan todos los productos en forma de cuadrícula.

- Al hacer hover sobre los productos se despliega mayor información: nombre del albúm y nombre
del artista.

- Al hacer click sobre cualquier producto se redirecciona a la ruta *'/item/:id'*, en donde se puede
ver el detalle del producto y realizar funciones como agregar al carrito.

### Ver detalle del producto

- Al ingresar a la ruta */item/:id*, se muestra en detalle la información del producto seleccionado.

- Información mostrada: título del albúm, nombre del artista, descripción, portada del albúm,
precio, stock disponible.

- El usuario puede aumentar o disminuir la cantidad de productos deseados, dependiendo del stock
disponible y si ya tiene el mismos producto agregado al carrito.

- Al dar click en en el botón Agregar al carrito, la información del carrito es actualizada. El botón
de carrito en el navbar se actualiza para mostrar la cantidad de artículos actuales.

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

#### 2. Formulario y proceso de compra

- Cuanda haya al menos un producto en el carrito se activará la opción del formulario de compra,
en donde el usuario tiene que ingresar sus datos (nombre, teléfono, correo y confirmar correo)
para activar el botón de Realizar compra.

- Los campos de correo y confirmar correo tienen una validación para verificar si contienen los
mismo valores.

- Al dar click al botón de Realizar compra, se ejecuta el siguiente proceso:

    1. Validación de disponibilidad de los productos en el inventario.
    Esto se realiza revisando el stock de cada producto en Firebase.

    2. Se presentatn dos posibles escenarios:

        a) En caso de que todos los productos del carrito estén disponibles,
    se procede a generar una orden de compra y guardarla en Firebase. Esto regresa
    un id de la orden de compra al usuario en la sección Resumen de Orden de compra.
        
        b) En caso de que uno o varios productos no estén disponibles, se actualiza la sección
    de Lista de productos del carrito de compra. Ahora esa sección contiene los productos disponibles
    y los productos no disponibles. Si el usuario desea continuar la compra con los productos
    disponibles entonces da click en el botón de Realizar compra, y se repite el proceso de validación.

    3. Se realiza una actualización del stock de cada producto seleccionado en Firebase. 


#### 3. Resumen de Orden de compra

- Se visualiza una vista previa de la orden de compra.

- Los campos se actualizan al momento en que usuario ingresa sus datos.

- Al generar una orden de compra de manera satisfactoria, la visualización cambia de color
para indicar que la compra se hizo con éxito. Se muestra el id de la orden de compra, el cual
puede copiarse como texto o dando click al ícono de 'copiar en portapapeles'.

### Buscar orden de compra

- Cuando el usuario generó una orden de compra exitosa y tiene el id, puede ingresarlo
en el campo de esta sección.

- La información mostrada es información no sensible, como la lista de productos de la orden y 
la fecha en que se generó la orden. La información del comprador no es mostrada.

## Modelado de datos

Se crearon 2 colecciones en Firestore para almacenar la información:

1. *albums*: Los documentos creados en esta colección contienen información del producto. Posee el siguiente formato:

        album_data: {
            artist: string,
            description: string,
            genre: string,
            picture_url: string,
            title: string
        },
        price: number,
        stock: number
    
2. *orders*: Los documentos creados en esta colección contienen información de la orden de compra. Posee el siguiente formato:

        buyer: {
            name: string,
            phone: string,
            email: string,
            confirmEmail: string
        },
        items: [
            {
                album_data: { ... },
                price: number,
                stock: number
            },
            ...
        ],
        total: number
