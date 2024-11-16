## **Backend (Spring Boot API)**

### **Descripción**

Este proyecto implementa una API RESTful para gestionar información de buses. Los endpoints proporcionan funcionalidad para obtener una lista de buses y obtener información detallada de un bus específico por su ID.

### **Requisitos**

- **Java**: 23 o superior
- **Spring Boot**: 3.3.5 o superior
- **Base de Datos**: MySQL (o compatible)
- **Dependencias**:
    - Spring Web
    - Spring Data JPA
    - Spring Boot DevTools
    - MySQL Driver

### **Estructura del Proyecto**


``` bash
/backend
	/src
		     /main
		            /java
		                     /com.example.bus_api
			                            /controller
				                            - BusController.java
				                            - MarcaController.java
										/model
											- Bus.java                
											- Marca.java              
										/repository                 
											- BusRepository.java
											- MarcaRepository.java
								- BusApiApplication 
							/resources
							         - static
							         - templates
							         - application.properties   
	- pom.xml
	- setup.sql
```

### **Instalación**

1. **Clonar el repositorio**:    
    `git clone https://github.com/tu-usuario/mi-proyecto-backend.git cd mi-proyecto-backend`
    
2. **Configurar la base de datos**: Crea una base de datos para el proyecto con Mysql. Luego, configura las credenciales en el archivo `application.properties`:
    
```properties
spring.application.name=Bus API  
spring.datasource.url=jdbc:mysql://localhost:3306/bus_db  
spring.datasource.username= tu_usuario  
spring.datasource.password= tu_contraseña
  
# Configuración de JPA  
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
spring.jpa.properties.hibernate.format_sql=true
```

    
3. **Ejecutar el servidor**:
    
    - Usa Maven para ejecutar el proyecto:
```Maven
mvn spring-boot:run
```
        
4. **Probar los endpoints**:
    
    - **GET** `/bus?page={page}&size={size}`: Obtiene la lista de todos los buses.
    - **GET** `/bus/{id}`: Obtiene la información de un bus por su ID.

### **Endpoints**

1. **GET /bus?page={page}&size={size}**: Devuelve la lista de buses paginada.

    - Respuesta: JSON con una lista de buses.
    - Ejemplo:

	```json
	{
    "content": [
        {
            "id": 3,
            "numeroBus": "67890",
            "placa": "DEF-456",
            "fechaCreacion": "2024-11-16T09:15:05",
            "caracteristicas": "Prueba_456",
            "marca": {
                "id": 3,
                "nombre": "Fiat"
            },
            "activo": true
        }
    ],
    "pageable": {
        "pageNumber": 2,
        "pageSize": 1,
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },

        "offset": 2,
        "paged": true,
        "unpaged": false
    },
    "totalPages": 3,
    "totalElements": 3,
    "last": true,
    "size": 1,
    "number": 2,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "numberOfElements": 1,
    "first": false,
    "empty": false
}
```


        
2. **GET /bus/{id}**: Devuelve la información de un bus por su ID.

    - Respuesta: JSON con los detalles del bus.
    - Ejemplo:

```json
{
    "id": 1,
    "numeroBus": "12345",
    "placa": "ABC-123",
    "fechaCreacion": "2024-11-16T04:41:14",
    "caracteristicas": "Prueba_123",
    "marca": {
        "id": 1,
        "nombre": "Volvo"
    },
    "activo": true
}
```

### **Consideraciones adicionales**

- **Relación entre buses y marcas**: La marca de cada bus se guarda en una tabla separada y se asocia con el bus a través de una relación de clave foránea.

---

## **Frontend (React)**

### **Descripción**

Este proyecto es una aplicación en React que consume la API RESTful desarrollada en el backend para mostrar la lista de buses en una tabla y permitir la visualización de información detallada al seleccionar un bus específico.

### **Requisitos**

- **React**: 18.3.1
- **Dependencias**:
    - React
    - Axios (para hacer peticiones HTTP)

### **Estructura del Proyecto**

```bash
/frontend
	/public
		- favicon.ico
		- index.html
		- logo192.png
		- logo512.png
		- manifest.json
	/src
		- App.css
		- App.js
		- index.css
		- index.js
		- logo.svg
		- reportWebVitals.js
	- package.json
	- package-lock.json
```

### **Instalación**

1. **Clonar el repositorio**:

    `git clone https://github.com/tu-usuario/mi-proyecto-frontend.git cd mi-proyecto-frontend`
    
2. **Instalar las dependencias**:

    `npm install`
    
3. **Ejecutar el servidor de desarrollo**:    
    `npm start`
    

### **Consumo de la API**

- La aplicación realiza peticiones `GET` al endpoint `/bus` para obtener los datos de la lista de buses. Para mostrar los detalles de un bus, se hace una solicitud `GET` al endpoint `/bus/{id}`.

### **Componentes Principales**

1. **Buses**: Componente que muestra la lista paginadaa de buses en una tabla. Utiliza `useEffect` y `fetch` para obtener los datos desde la API.

```js
useEffect(() => {  
  axios.get(`http://localhost:8080/bus?page=${page}&size=${size}`)  
      .then(response => {  
        setBuses(response.data.content);  
        setTotalPages(response.data.totalPages);  
      })  
      .catch(error => {  
        console.error('Error getting buses: ', error);  
      });  
}, [page]);
```


2. **showBusDetails**: Componente que muestra la información detallada de un bus cuando se selecciona de la lista.
    
```js
const showBusDetails = (id) => {  
    axios.get(`http://localhost:8080/bus/${id}`)  
        .then(response => {  
            setSelectedBus(response.data);  
        })  
        .catch(error => {  
            console.error('Error getting bus details: ', error);  
        })  
};
```

### **Estado de la Aplicación**

- Se usa `useState` para manejar el estado de la lista de buses y los detalles del bus seleccionado.

### **Opciones Avanzadas**

- **Consumo del Endpoint `/bus/{id}`**: Al hacer clic en un bus, se muestra un alert o un modal con los detalles del bus.