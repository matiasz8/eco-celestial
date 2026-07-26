# UC-003: Agregar Nueva Canción

## Información del Caso de Uso

| Campo | Valor |
|-------|-------|
| **ID** | UC-003 |
| **Nombre** | Agregar Nueva Canción |
| **Actor Principal** | Coordinador Musical |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

---

## 1. Descripción

El usuario desea agregar una nueva canción al cancionero personal con su letra, acordes y metadatos asociados.

## 2. Flujos de Eventos

### 2.1 Flujo Principal: Modo Texto Libre

1. El usuario navega a /add
2. El usuario ingresa el título de la canción
3. El usuario selecciona "Modo Texto Libre"
4. El usuario pega la letra con acordes en el formato:
   ```
   [Acordes]
   [Letra]
   [Acordes]
   [Letra]
   ```
5. El usuario (opcionalmente) agrega estribillo
6. El usuario (opcionalmente) agrega categorías
7. El usuario hace clic en "Guardar"
8. El sistema almacena en localStorage
9. El sistema muestra confirmación

### 2.2 Flujo: Modo Estructurado

1. El usuario selecciona "Modo Estructurado"
2. El usuario agrega estrofas individualmente con el botón "+ Agregar Estrofa"
3. Para cada estrofa, el usuario ingresa acordes y letra
4. El usuario (opcionalmente) activa y completa el estribillo
5. El usuario guarda la canción

### 2.3 Flujo Alternativo: Error de Validación

1. El usuario intenta guardar sin título
2. El sistema muestra error: "El título es requerido"
3. El usuario corrige y vuelve a intentar

## 3. Criterios de Aceptación

```gherkin
Feature: Agregar canción

  Scenario: Agregar canción válida
    Given el usuario está en /add
    When el usuario completa título y letra
    And hace clic en "Guardar"
    Then la canción se almacena en localStorage
    And se muestra mensaje de éxito

  Scenario: Validación de campos requeridos
    Given el usuario está en /add
    When el usuario hace clic en "Guardar" sin título
    Then se muestra error "El título es requerido"
    And la canción NO se guarda

  Scenario: Agregar estribillo
    Given el usuario está agregando una canción
    When el usuario activa "Estribillo"
    And completa el contenido del estribillo
    Then el estribillo se guarda separado de la letra principal

  Scenario: Asignar categorías
    Given el usuario está agregando una canción
    When el usuario selecciona "Comunión" y "Tiempo Ordinario"
    Then la canción se guarda con esas categorías
    And es filtrable por esas categorías
```

## 4. Formato de Entrada

### Texto Libre
```
Do          Sol          La          Fa
Gloria a Dios en las alturas
Re          Sol          Do
Y paz en la tierra a los hombres

Do          Sol          La          Fa
Te alabamos, te bendecimos
Re          Sol          Do
Te adoramos, te glorificamos
```

### Estructurado
- Estrofa 1: [textarea individual]
- Estrofa 2: [textarea individual]
- Estribillo: [textarea opcional]

## 5. Requisitos de Validación

| Campo | Requisito | Error |
|-------|-----------|-------|
| Título | Requerido, min 2 caracteres | "El título es requerido" |
| Letra | Requerido al menos 1 estrofa | "La letra es requerida" |
| Estribillo | Opcional, pero si está activo debe tener contenido | "Completa el estribillo" |

---

*Caso de uso registrado por Eco Celestial Team*