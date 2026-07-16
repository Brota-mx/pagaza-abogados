# Auditoría de diseño — Pagaza Abogados Tributarios

> Auditoría multi-agente (diseño visual · UX/conversión · marca · marketing · narrativa/imagen)
> del sitio construido (fases 1–11), 2026-07-16. Público objetivo: patrimonios altos, directores,
> PEPs. Objetivo: convertir visitantes de alto perfil en consultas. Este documento prioriza las
> **áreas de oportunidad**; varias requieren **datos que solo el cliente tiene** (marcados 🔑).

## Veredicto en una línea

El sitio está **impecablemente ejecutado a nivel técnico** (código limpio, accesible, SSG, seguro),
pero como pieza de marca y de conversión se lee hoy como una **plantilla premium sobria**, no como
el despacho de élite que factura casos de $55M. Dos causas raíz: **(1)** la identidad construida
**contradice el logo real**, y **(2)** el sitio apuesta todo a la tipografía, **sin fotografía, sin
rostro del socio y sin prueba social**. La buena noticia: casi nada es problema de código; son
decisiones de dirección de arte y de contenido que hoy no están tomadas al nivel del cliente objetivo.

---

## Causa raíz de la brecha de marca (importante)

El brief escrito (`work/complemento pdf.md §2.2` → `docs/contenido-fuente.md §1.2`) **describió mal
el logo**: dice "P serifada… letras talladas de la Suprema Corte", y su paleta lista solo azul
marino, gris y negro carbón. **La realidad** (`work/LOGO.jpeg`): el logo es **"PAGAZA" en sans-serif
geométrico AZUL** (`#123B73`, muestreado) + "ABOGADOS TRIBUTARIOS", **sin serif, sin punto, sin
bronce**. Se construyó desde el texto del brief en vez del asset real, y **el bronce se inventó**.

---

## Prioridad 0 — YA CORREGIDO en esta rama (`fix-marca-logo-real`)

- ✅ **Wordmark real:** Header, Footer, favicon y OG ahora usan **"PAGAZA" en sans geométrico
  (Montserrat), sin punto, sin bronce**, con la bajada "ABOGADOS TRIBUTARIOS". Token `--color-brand
#123b73` (azul del logo). Logo real en `public/brand/logo-pagaza.jpg`.
- Pendiente de decisión del cliente para cerrar la marca (ver 🔑 abajo).

---

## Áreas de oportunidad (priorizadas por impacto en conversión)

### 🔴 ALTO

1. **El socio es invisible — y este público compra a la persona, no a la marca.**
   No hay sección "El socio", ni foto, ni bio, ni credenciales de Alfonso Pagaza (solo su nombre
   junto al teléfono). Es la **mayor fuga de confianza y de conversión**. 🔑 _Requiere: retrato
   editorial B/N + credenciales reales (años, formación, cargos —ex-SAT/PRODECON vale oro—,
   membresías IFA/ANADE, reconocimientos Chambers/Legal500)._

2. **Cero fotografía / cero materia.** Sitio 100% tipográfico sobre color plano. El BLUEPRINT pedía
   fotografía B/N alto contraste (fachada SCJN, biblioteca jurídica, mármol) — no se implementó. Es
   lo que más separa "élite" de "plantilla". 🔑 _Requiere: sesión fotográfica editorial o stock B/N
   MUY curado (arquitectónico/atmosférico — nunca cliché legal: mazos, balanzas, apretones)._
   Dirección de arte: B/N alto contraste, **duotono navy** (sombras `#101b2d`), grano fino, overlay
   navy 40–60% bajo texto.

3. **El Hero no dice qué hacen ni para quién (falla el test de 5 segundos).** "La estrategia correcta
   siempre gana" es un aforismo, no una propuesta. Añadir una línea funcional: _"Defensa y blindaje
   patrimonial ante el SAT y cualquier acto de autoridad — para empresas y patrimonios de alto
   perfil."_ Y darle atmósfera (imagen de fondo). Implementable con copy (bajo esfuerzo).

4. **Arquitectura de conversión pobre:** un solo CTA genérico ("Agendar consulta") repetido, **sin
   CTA en el cuerpo** (5 secciones sin llamada a la acción), **CTA invisible en móvil** (escondido en
   el menú), y **"Agendar" no agenda** (aterriza en un formulario de contacto → promesa rota). Falta
   una vía de **urgencia** (WhatsApp/llamada) para el ejecutivo con las cuentas congeladas.
   Recomendado: CTA a media página tras Sectores, CTA sticky en móvil, reetiquetar a _"Solicitar
   consulta confidencial"_, y CTA de urgencia. 🔑 _Requiere: confirmar el WhatsApp; decidir si se
   integra agendado real (Cal.com/Calendly)._

### 🟡 MEDIO

5. **La prueba está escondida.** Los casos con cifra y el copy más persuasivo (descongelamiento de
   cuentas, doble tributación, reactivación de CSD) viven **colapsados** en el acordeón de Sectores
   (solo Textil abre por defecto). Sacar 3–4 casos insignia a la superficie como tarjetas de
   resultado, y una lista "**Situaciones que atendemos**" (auto-identificación del dolor) arriba.

6. **Solo 2 de 10 sectores tienen cifra, y falta el número ancla agregado.** La sección promete
   "credibilidad con cifras" pero incumple. Añadir un stat agregado tipo _"$— M en contingencias
   neutralizadas · +XX años · XX grupos asesorados"_. 🔑 _Requiere: montos reales de más casos y el
   dato agregado._

7. **Cero prueba social apropiada para el segmento.** Sin rankings, membresías, medios ni
   testimonios. Hay formas legítimas sin romper confidencialidad (sellos Chambers/Legal500,
   membresías, "citado en El Economista", testimonio anónimo específico). 🔑 _Requiere: datos reales._

8. **Monotonía estructural:** Compromiso, Pilares y Metodología son **el mismo módulo de 3 columnas
   repetido 3×** con copy duplicado, y llegan **antes** de la prueba. Comprimir/fusionar, variar la
   composición (Metodología como secuencia horizontal 01→02→03), y **reordenar** para que los casos
   lleguen antes: Hero → Servicios → **Casos** → El socio → método → Contacto.

9. **La "Dimensión Social" (pro-bono) — el alma de la marca — está enterrada** como sector #10 en el
   acordeón. El brief pedía representarla con escultura de mármol (La Piedad). Sacarla a **sección
   propia** con imagen y composición distinta: es la prueba de carácter que valora este público.

10. **El mapa de cobertura es un grafo abstracto de 3 nodos**, no un mapa. Subcomunica el alcance.
    Sustituir por un mapa estilizado de México (siluetas SVG libres existen) o un grabado
    cartográfico en duotono navy con pines de marca.

11. **Formulario transaccional donde debería ser consultivo.** "Enviar mensaje" incoherente con
    "Agendar"; `mensaje` obligatorio obliga a redactar un tema sensible en frío; falta refuerzo de
    **confidencialidad** en el punto de fricción y **WhatsApp**. Hacer `mensaje` opcional o
    convertirlo en "Motivo" (auditoría · CSD · cuentas aseguradas · planeación).

### ⚪ BAJO (pero atender)

12. **Riesgo del claim absoluto "nunca perdemos" / "we never lose".** Para un comprador jurídico
    sofisticado resta credibilidad y roza normas de publicidad de servicios profesionales. Suavizar
    hacia el proceso/estándar sin perder fuerza ("Definimos el éxito antes de empezar").

13. **Consistencia de sistema:** el CTA primario cambia de color (bronce en hero/header, navy en el
    submit) y no usa el componente `Button` (drift); la numeración 01/02/03 tiene 3 tratamientos
    distintos; la regla bronce hairline está sobreusada hasta volverse papel tapiz; la marca de agua
    "P" es casi invisible (opacidad 0.025). Centralizar CTA en `Button`, unificar el índice numérico,
    bajar la frecuencia del hairline.

14. **Tipografía gratuita y ubicua** (EB Garamond + Inter). Como no hay foto, la tipografía carga
    toda la identidad y no diferencia. Considerar (presupuesto permitiendo) una serif display con más
    carácter/licencia, y subir la escala display de las secciones ancla.

---

## Dirección de identidad recomendada (a validar con el cliente)

- **Wordmark = el logo real, intocable** (sans + azul, sin punto/bronce) — ya aplicado.
- **Un solo azul, el del logo** (`#123B73`, a confirmar con el vector). Reservar un navy más oscuro
  solo para fondos.
- **Bronce: fuera por defecto → monocromo-azul disciplinado** (más discreto, más fiel, mejor
  posicionado para un público que valora la discreción). **Excepción condicional:** si la papelería
  física usa **foil dorado real**, el bronce sobrevive como acento secundario restringido (nunca en
  el wordmark).
- **EB Garamond se queda solo para titulares editoriales** (sostiene la narrativa "SCJN/mármol"),
  jamás para el wordmark.

## 🔑 Preguntas para cerrar con el cliente (bloquean las decisiones de marca/contenido)

1. ¿Existe **manual de marca / logo vectorial** (AI/EPS/SVG)? → fija el hex azul exacto y si el serif
   editorial está permitido.
2. ¿La **papelería usa foil dorado**? → decide si el bronce vive o muere.
3. ¿Hay **variante de icono/isotipo** del logo (para favicon/marca de agua)?
4. **Datos del socio:** foto editorial + credenciales (años, formación, cargos, membresías,
   reconocimientos).
5. **Fotografía:** ¿sesión editorial propia (fachada Prado Sur 525, interior, socio) o stock curado?
6. **WhatsApp:** ¿el `(55) 78-91-88-65` es WhatsApp Business? ¿número/horario?
7. **Cifras/prueba:** montos reales de más casos, número agregado, rankings/membresías/medios reales.

## Cómo se conecta (mapa de esfuerzo)

- **Mayor ROI inmediato (copy/contenido, bajo esfuerzo):** #3 (Hero funcional), #5 (sacar la prueba),
  #6 (stat agregado), #11 (formulario consultivo), #12 (suavizar el claim).
- **Mayor impacto de marca (necesita assets/decisiones):** #1 (el socio), #2 (fotografía),
  cerrar la dirección de identidad (bronce/azul).
- **Refinamiento de sistema:** #8, #10, #13, #14.

Ninguno es un problema técnico: el código está limpio y accesible. Son decisiones de **dirección de
arte y contenido**, varias dependientes de datos del cliente.
