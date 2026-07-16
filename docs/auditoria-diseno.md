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

---

## Ronda 2 — auditoría ampliada (persuasión · ventas · SEO · compliance · competencia · a11y)

Segundo panel de 6 especialistas. Confirma y profundiza lo anterior; suma dimensiones nuevas.

### Persuasión / copywriting (las palabras)
- El copy oscila entre aforístico-elegante y administrativo-burocrático ("a la brevedad", "desahogo exprés"), y es **auto-referencial** (habla de "la firma", no del patrimonio del lector).
- **Hero propuesto:** *"Cuando la autoridad va por tu patrimonio, la estrategia lo decide todo."* + subhead funcional ("Despacho fiscalista boutique en CDMX. Blindamos empresas y patrimonios de alto perfil…"). CTA unificado: **"Agendar consulta confidencial"** / botón "Solicitar consulta".
- Los gatillos miedo→alivio (cuentas congeladas, CSD, doble tributación) están redactados como acta — reescribir para que el terror/alivio se sienta. Los `puntos` de pilares son boilerplate de consultora → volverlos beneficios específicos (fideicomisos, "detectar la contingencia antes que la autoridad").

### Posicionamiento / ventas (embudo de leads de alto ticket)
- **Contradicción raíz:** el sitio está construido como folleto full-service (10 sectores + 10 alianzas + "red 360°") pero el negocio es una **boutique selectiva**. La amplitud diluye el premium y atrae al cliente chico. → comprimir Alianzas, reencuadrar Sectores como "arenas donde ganamos", señal de selectividad ("aceptamos un número limitado de asuntos").
- **Embudo binario** (una sola conversión al fondo, sin micro-conversiones, sin carril de urgencia, sin agendado real). El sitio **no califica** el lead (no capta monto/urgencia). Falta **segmentación por dolor** (corporativo con auditoría · patrimonio en planeación · PEP en crisis) con puertas de entrada distintas.
- **Posicionamiento propuesto:** *"La boutique fiscal donde el socio —no un asociado— diseña la estrategia que convierte una contingencia millonaria en riesgo controlado. No litigamos todo: elegimos los asuntos donde la estrategia decide."*

### SEO (más allá de lo técnico, que está OK)
- 🔴 Toda la maquinaria SEO sirve a **2 URLs** (one-page). Migrar a **arquitectura de páginas temáticas** (pilares + 10 sectores como rutas `/servicios/*`, `/sectores/[sector]` con template dinámico — **el contenido ya está tipado bilingüe**).
- 🔴 **E-E-A-T ausente** (es contenido YMYL legal-fiscal: Google exige autoridad del autor/socio con credenciales) + **SEO local incompleto** (Google Business Profile, geo, horarios, `sameAs` — hoy omitidos) + **cero contenido de dolor** ("qué hacer si el SAT congela cuentas", "restricción de CSD") donde está el lead urgente.
- Competidores (Basham, Chevez, Parás, Turanzas) rankean con páginas de servicio dedicadas; despachos chicos ganan las búsquedas de dolor con guías. `sitemap.ts` marca todo "modificado hoy" (ruido); `keywords` meta Google la ignora.

### Compliance de claims + privacidad (riesgo legal real — México)
- 🔴 **NO existe Aviso de Privacidad** — el formulario capta datos personales (LFPDPPP lo exige, reforma 2025). Falta aviso + consentimiento + política. **Hueco legal accionable antes de lanzar.**
- 🔴 **"Nunca perdemos" / "we never lose" + cifras** = posible **garantía de resultado / publicidad engañosa** (art. 32 LFPC / PROFECO + ética profesional). Reencuadrar hacia el estándar/proceso + **disclaimer** de resultados y conservar soporte documental de las cifras.
- 🔴 El campo **"mensaje"** invita a verter info sensible/autoincriminatoria sin privilegio formado → microadvertencia ("no incluyas cifras exactas ni detalles sensibles en este primer mensaje").
- 🟡 Divulgar analytics/terceros (Vercel/Resend/Upstash/Cloudflare) en el aviso; suavizar "aislar activos ante el fisco" (lectura AML); identificar responsable + retención en el footer.

### Competencia / benchmark (Chevez, Basham, SMPS, Turanzas, Kostelanetz, Lombard Odier)
- La big-law fiscal MX es **institucional y sin rostro**; las boutiques de élite **venden al socio**. Pagaza (boutique) hoy oculta al socio → tira su mayor ventaja.
- **#1 déficit vs. toda la categoría: cero prueba social** (todos muestran rankings Chambers/Legal 500/badges o "recognitions").
- **Leapfrog:** el socio al frente (rostro + carta firmada + línea directa) que big-law **no puede copiar** + cifras con restraint (contexto + disclaimer + cifras institucionales) + textura B/N de alta factura. Falta **thought leadership** ("Perspectivas") y narrativa de legado.

### Accesibilidad (verificada, cuantitativa) — el sitio está BIEN, con gaps acotados
- ✅ Sin barreras de teclado, contraste mayormente OK (calculado), Radix/skip-link/reduced-motion/landmarks correctos.
- ✅ **Corregido en esta rama:** número de sector `bronze-ink/50` (2.17:1, reprobaba) → `/80`; y el **mensaje de éxito** ahora tiene `role="status"` + foco (antes no se anunciaba a lectores de pantalla — 4.1.3).
- Pendiente (form): errores de campo con `aria-describedby`+live (hoy contaminan el nombre); `required`/`aria-required` + leyenda; submit no deshabilitado / aviso Turnstile asociado; probar el reto con NVDA/VoiceOver.

---

## Cómo se conecta (mapa de esfuerzo)

- **Mayor ROI inmediato (copy/contenido, bajo esfuerzo):** #3 (Hero funcional), #5 (sacar la prueba),
  #6 (stat agregado), #11 (formulario consultivo), #12 (suavizar el claim).
- **Mayor impacto de marca (necesita assets/decisiones):** #1 (el socio), #2 (fotografía),
  cerrar la dirección de identidad (bronce/azul).
- **Refinamiento de sistema:** #8, #10, #13, #14.

Ninguno es un problema técnico: el código está limpio y accesible. Son decisiones de **dirección de
arte y contenido**, varias dependientes de datos del cliente.
