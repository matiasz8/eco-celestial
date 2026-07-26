# UC-002: Transponer Acordes de una Canción

## Información del Caso de Uso

| Campo | Valor |
|-------|-------|
| **ID** | UC-002 |
| **Nombre** | Transponer Acordes |
| **Actor Principal** | Músico Litúrgico |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

---

## 1. Descripción

El usuario necesita cambiar la tonalidad de una canción para adaptarla a su voz o instrumento. La transposición mueve todos los acordes el mismo número de semitonos.

## 2. Flujos de Eventos

### 2.1 Flujo Principal: Transposición Simple

1. El usuario selecciona una canción
2. El sistema muestra la canción con sus acordes originales
3. El usuario hace clic en "+½" (subir medio semitono)
4. El sistema recalcula todos los acordes
5. El usuario ve la canción transpuesta con el indicador "+1"

### 2.2 Flujo: Transposición por Tono Completo

1. El usuario necesita subir un tono completo (2 semitonos)
2. El usuario hace clic en "+1" dos veces
3. El sistema actualiza el offset a +2
4. Los acordes se muestran transpuestos 2 semitonos hacia arriba

### 2.3 Flujo: Reset a Tonalidad Original

1. El usuario tiene una canción transpuesta (+3)
2. El usuario hace clic en "Reset"
3. El sistema vuelve el offset a 0
4. Los acordes muestran la tonalidad original

### 2.4 Flujo: Cambio de Notación

1. El usuario tiene acordes en notación inglesa (C, D, E)
2. El usuario hace clic en "Español"
3. El sistema convierte a notación española (Do, Re, Mi)
4. La transposición se mantiene

## 3. Criterios de Aceptación

```gherkin
Feature: Transposición de acordes

  Scenario: Subir medio semitono
    Given el usuario tiene una canción en tono de "Do"
    When el usuario hace clic en "+½"
    Then todos los acordes se incrementan en 1 semitono
    And el indicador muestra "+1"

  Scenario: Bajar un tono completo
    Given el usuario tiene una canción con offset "+4"
    When el usuario hace clic en "-1"
    Then todos los acordes se decrementan en 2 semitonos
    And el indicador muestra "+2"

  Scenario: Límite máximo superior
    Given el usuario tiene offset "+12"
    When el usuario intenta subir más
    Then el botón "+½" está deshabilitado

  Scenario: Límite máximo inferior
    Given el usuario tiene offset "-12"
    When el usuario intenta bajar más
    Then el botón "-½" está deshabilitado

  Scenario: Reset a original
    Given el usuario tiene offset "+5"
    When el usuario hace clic en "Reset"
    Then el offset vuelve a 0
    And los acordes muestran la tonalidad original

  Scenario: Cambio de notación preserva transposición
    Given el usuario tiene offset "+2" en notación inglesa
    When el usuario cambia a notación española
    Then los acordes muestran la transposición correcta en español
```

## 4. Tabla de Transposición

| Original | +1 (½tono) | +2 (1 tono) | +3 | +4 | +5 | +6 | -1 | -2 |
|----------|------------|-------------|-----|-----|-----|-----|-----|-----|
| Do | Do# | Re | Re# | Mi | Fa | Fa# | Si | La# |
| Re | Re# | Mi | Fa | Fa# | Sol | Sol# | Do | Do# |
| Mi | Fa | Fa# | Sol | Sol# | La | La# | Re | Re# |
| Fa | Fa# | Sol | Sol# | La | La# | Si | Mi | Fa |
| Sol | Sol# | La | La# | Si | Do | Do# | Fa | Fa# |
| La | La# | Si | Do | Do# | Re | Re# | Sol | Sol# |
| Si | Do | Do# | Re | Re# | Mi | Fa | La | La# |

## 5. Requisitos Especiales

- **Precisión:** La transposición debe ser matemáticamente precisa
- **Rendimiento:** La actualización debe ser instantánea (< 50ms)
- **Soporte:** Manejar acordes con sufijos (Cm, C7, Csus4, etc.)
- **Preservación:** Mantener la notación del usuario al transponer

---

*Caso de uso registrado por Eco Celestial Team*