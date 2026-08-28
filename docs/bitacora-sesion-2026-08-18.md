# Bitácora de sesión — 18 de agosto de 2026

> Registro completo de una sesión de trabajo remota (Claude Code en la nube). Está escrito para que
> al abrir la computadora local sepas **exactamente** qué se tocó, por qué, qué se verificó y qué
> quedó pendiente, sin tener que reconstruirlo del diff.

---

## 0. Lo mínimo que necesitas saber

|                        |                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Rama**               | `claude/resumen-progreso-2ln2be` (creada en esta sesión, ya pusheada)                                 |
| **Base**               | `c879a53` — _Merge pull request #22 from Brota-mx/auditoria-diseno-impeccable_ (2-ago-2026)           |
| **Commit de trabajo**  | `b28d116` — _feat(equipo,redes,newsletter): comentarios del cliente de agosto + fix del pin en móvil_ |
| **Alcance**            | 23 archivos · +854 / −55 líneas · 7 archivos nuevos                                                   |
| **Estado de CI local** | typecheck ✅ · lint ✅ · build ✅ · 70/70 e2e ✅                                                      |
| **PR**                 | **No se creó ninguno.** Nadie lo pidió.                                                               |

Para ponerte al día en local:

```bash
git fetch origin claude/resumen-progreso-2ln2be
git checkout claude/resumen-progreso-2ln2be
pnpm install --frozen-lockfile
npx playwright install chromium   # ver §7, trampa 1
pnpm dev
```

---

## 1. Qué se pidió

Dos mensajes del usuario en esta sesión.

**Mensaje 1 —** «Crea una rama y dame un resumen de dónde nos quedamos.»
Se creó la rama y se entregó el resumen en el chat (no quedó en el repo; su contenido está
resumido en §2 de este documento).

**Mensaje 2 —** Cinco peticiones del cliente, acompañadas de dos capturas de pantalla:

1. En el menú desplegable de sectores, agregar **"Otro"**.
2. Al lado de Newsletter, arriba, falta el espacio de **"Nuestro equipo"**. Dejarlo listo o
   verificar si ya está; dejar el borrador hecho — **aún falta que el cliente pase las fotos**.
3. En el apartado de **newsletter**, agregar un ejemplo de cómo se vería (lo solicita el cliente).
   Como referencia, una captura de la sección "Publicaciones y eventos" de **Galicia** (fondo
   oscuro, acento dorado, pestañas ACTUALIZACIONES / COLABORACIONES / COMUNICADOS / ENTREVISTAS,
   carrusel de tarjetas con categoría + fecha + titular + foto).
4. **El mapa en móvil:** los clientes reportan que el pin aparece "en Canadá". Verificarlo.
5. Agregar **redes sociales** e iconos de Facebook, Instagram y X. Instagram:
   `https://www.instagram.com/p/DbUfzETDfGf/?igsh=bWxrejkxanA1ODdv`

La segunda captura (la del formulario en móvil, con el desplegable de sectores abierto) es el
contexto de la petición 1.

---

## 2. Estado en que se encontró el proyecto

Antes de tocar nada: árbol limpio, sin PRs abiertos, último trabajo del 2-ago-2026 (PR #22).

Fases 1–11 del `BLUEPRINT.md` cerradas, más ~13 fases extra de revisión con el cliente
(commits `fase-12` … `fase-24`). El sitio estaba desplegado en
`pagaza-abogados-jegonvas-projects.vercel.app` con **Deployment Protection activa**.

Tres hallazgos del reconocimiento que condicionaron el trabajo:

- **`src/content/site.ts:6-9`** ya anticipaba la sección de equipo:
  > _"⚠️ Ya no existe `socio`. El cliente pidió expresamente que su nombre no aparezca en el sitio
  > ('contacto → no pongan mi nombre solo el despacho', nota del 19-jul-2026)… Está preparando una
  > sección de equipo con fotos; cuando llegue, el nombre volverá ahí."_
- **`src/lib/seo.ts:42-44`** documentaba que `founder` se había retirado del JSON-LD por esa misma
  petición.
- **`e2e/smoke.spec.ts`** tenía un test, `"el nombre del socio ya no aparece"`, que hacía
  `not.toContainText("Alfonso")` sobre todo el `<body>`.

Es decir: la petición 2 **revierte** una decisión anterior del cliente, y hacerlo obligaba a tocar
esos tres puntos de forma coordinada. No era una sección nueva cualquiera.

---

## 3. Preguntas que se hicieron y qué respondiste

Antes de escribir código se plantearon cuatro decisiones que no se podían resolver leyendo el
código. Tus respuestas, literales:

| Pregunta                                                                                  | Respuesta                                                                              |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Formato del ejemplo de newsletter (muestra vs. archivo tipo Galicia)                      | **«El que más recomiendes»** → decisión delegada                                       |
| Cómo dejar el borrador de equipo                                                          | **«Montado con placeholders»**                                                         |
| ¿La sección de equipo incluye a Alfonso? (choca con la nota del 19-jul y con un test e2e) | **«Sí, va en equipo»**                                                                 |
| Redes: solo tengo un enlace a un _post_, no al perfil; faltan FB y X                      | **`https://www.instagram.com/pagaza_abogados`** … «el de X y Facebook aún no lo pasan» |

**Nota sobre Instagram:** el enlace que llegó era a un post (`/p/DbUfzETDfGf/`) con parámetro de
tracking. Se intentó resolver el handle automáticamente, pero `www.instagram.com` está bloqueado
por el proxy de red del entorno, así que se preguntó. En `site.ts` quedó guardado el **perfil**
limpio, que es lo que debe abrir un icono del sitio.

---

## 4. Plan aprobado

Se trabajó en modo plan: exploración → diseño → aprobación → implementación. El plan aprobado
cubría cinco frentes más una restricción transversal.

### Restricción ética que gobernó todo el trabajo de contenido

> **No se inventan credenciales, años de experiencia, cargos previos, membresías, reconocimientos
> ni semblanzas de Alfonso Pagaza ni de ninguna persona real. Tampoco publicaciones fechadas que
> parezcan noticias reales.** Todo texto de relleno debe ser evidentemente provisional para
> cualquiera que lo lea — no un texto verosímil que nadie note que es falso.

Razón: es un despacho fiscal. Una credencial inventada en su sitio no es un detalle de maqueta, es
un riesgo profesional real para ellos.

### Orden de ejecución

Se ordenó por radio de impacto creciente, para que cada fase partiera de una base verde:
**mapa → "Otro" → redes → muestra de newsletter → equipo → barrido final.**
El equipo fue al final porque toca `NAV_SECTIONS`, el orden de secciones (un test con `toEqual`
estricto), el JSON-LD y el test de "Alfonso".

---

## 5. Qué se hizo, punto por punto

### 5.1 Pin del mapa en móvil — **las coordenadas estaban bien**

**Diagnóstico.** `PINES_OFICINAS` (`src/components/ui/CoverageMap.tsx`) era correcto. Verificado por
dos vías independientes:

1. **Mercator inverso:** el aspect-ratio que implican esas coordenadas (1.344) cuadra con el real
   de `public/images/mapa-mexico.png` (1500 × 1130 = 1.327) dentro del **1.2 %**.
2. **Inspección visual ampliada:** se renderizó el mapa a 4× con una cruz roja en la coordenada de
   Ciudad Juárez. Cae exactamente en el codo donde la frontera recta de Nuevo México se encuentra
   con el Río Bravo — que es, literalmente, Ciudad Juárez / El Paso.

**La causa real era el render.** El contenedor del pin era un `flex flex-col` con
`-translate-y-1/2`, que centraba el **conjunto punto + etiqueta** (~37 px de alto en móvil) sobre
la coordenada. Eso dejaba el punto ~14.5 px **por encima** de su posición real. Ese desplazamiento
es en **píxeles fijos**, mientras que la coordenada es un **porcentaje** — así que el error crecía
al encoger la pantalla.

**Medición real, tomada contra el código roto antes de arreglarlo** (pin de Ciudad de México, que
es el primero que evalúa el test; el pin de Juárez arrastra el mismo desplazamiento absoluto):

| Viewport | Alto del mapa | `y` esperado | `y` medido | Error       |
| -------- | ------------- | ------------ | ---------- | ----------- |
| 375 px   | ~282 px       | 74.3 %       | 69.2 %     | **5.14 pp** |
| 768 px   | ~578 px       | 74.3 %       | 71.7 %     | 2.59 pp     |
| 1440 px  | ~1085 px      | 74.3 %       | 72.9 %     | 1.38 pp     |

Por eso solo se notaba en móvil, y por eso le tocaba a Juárez y no a CDMX: Juárez está definido en
`y = 19.5 %`, a un paso de la frontera, y el recorte del mapa incluye buena parte del sur de EE. UU.
en el cuadrante superior. Cinco puntos porcentuales lo cruzan. CDMX sufre el mismo error absoluto
pero, en el centro del país, no cruza ninguna silueta reconocible y nadie lo nota.

**El fix.** Cada sede pasa a ser un contenedor **sin dimensiones** colocado exactamente en su
coordenada porcentual, del que cuelgan punto y etiqueta en posición absoluta. El punto se centra
sobre el origen usando **su propio tamaño** (10 px fijos), así que su posición ya no depende ni del
texto de la etiqueta ni del ancho de la pantalla.

De paso, la etiqueta se oculta bajo `md`: sobre un mapa de 375 px una píldora como "Ciudad de
México" ocupa ~24 % del ancho. El bloque entero es `aria-hidden` y las direcciones completas viven
como texto accesible en Footer y Contacto, así que ocultarla no quita información, solo ruido.

**No recalcular `PINES_OFICINAS`.** Queda una advertencia `⚠️` en el propio archivo para que el
próximo que vea un pin descuadrado no "corrija" unos números que están bien.

### 5.2 Opción "Otro" en el desplegable de sector

**El riesgo era un fallo mudo.** `SECTOR_IDS` (`src/lib/validation.ts`) es la lista que valida el
formulario con `z.enum`, y era una copia a mano de los ids de `content/sectores.ts`. Si se añade una
opción al desplegable sin añadirla al enum, Zod la rechaza, React Hook Form **nunca dispara el
submit**, y el usuario ve un botón que no hace nada — sin ningún mensaje de error.

Se cerró por dos capas:

- **Por tipos.** Se exporta `SECTOR_OTRO` y el `<option>` lo importa **del mismo módulo que define
  el enum**, así un typo es error de compilación. Además `Sector["id"]` pasa a tiparse contra
  `SectorId`, de modo que las dos listas paralelas ya no pueden divergir sin romper la compilación.
- **Por test.** Un e2e envía el formulario completo con "Otro" seleccionado y exige el estado de
  éxito. Es el guardián permanente de esa clase de bug.

**No se tocó `content/sectores.ts`** a propósito: añadir una entrada ahí rompería el test de 12
sectores y el copy que dice literalmente "doce industrias". "Otro" no es una industria, es la salida
del formulario para quien no encaja.

**De paso**, el correo interno dejó de imprimir el id crudo. Antes decía `Sector: farmaceutico`;
ahora `Sector: Farmacéutico (farmaceutico)` — etiqueta legible para triar el lead, más el id entre
paréntesis para poder cruzarlo con la telemetría del reporter (que sigue enviando el id crudo a
propósito: es una clave de analítica, traducirla rompería la serie histórica).

### 5.3 Sección "Nuestro equipo"

Montada y enlazada donde la pidió el cliente: **la barra transparente de la primera pantalla**, que
antes tenía solo `Inicio | Newsletter` y ahora tiene `Inicio | Newsletter | Equipo`. También entra
en `NAV_SECTIONS`, así que aparece sola en el header sólido, el menú móvil y el nav del footer.
En la página va **entre Alianzas y Newsletter** (el cliente los agrupó al pedirlos juntos arriba, y
Contacto debe seguir cerrando la página).

**Cómo se protegió el contenido provisional.** El cliente aún no manda fotos ni semblanzas, y se
decidió publicar el borrador. Tres mecanismos para que el marcador **no pueda** pasar por dato real:

1. **`semblanzaPendiente` es una constante única compartida**, no un campo `bio` por persona. Para
   escribir un texto propio hay que añadir un campo y quitar la bandera `provisional`, y eso se ve
   en el diff. Con un `bio` por persona, alguien podría rellenar una semblanza "plausible" sin que
   nadie lo notara.
2. **La tarjeta pinta un rótulo visible** — "TEXTO PROVISIONAL" — y el indicador es la **palabra**,
   no un matiz de color (WCAG: el color nunca como único indicador).
3. **Un test de trinquete** exige que ese rótulo siga presente. Cuando lleguen las semblanzas
   reales el test se pondrá rojo y obligará a quitarlo a conciencia, en vez de que el marcador se
   quede olvidado en producción.

**Solo hay una tarjeta**, la de Alfonso Pagaza. No se inventaron colegas ni plazas anónimas para
rellenar la retícula. Los únicos datos publicados son **nombre y cargo**, ambos verificados en
`docs/contenido-fuente.md` §5 ("Socio fundador / director: Alfonso Pagaza") y con la traducción ya
fijada en `docs/glosario-es-en.md:95` (_Founding Partner_). El retrato es un monograma "AP" sobre
navy; cuando llegue la foto se rellena el campo `retrato` y el componente cambia solo.

**Efectos colaterales, resueltos en el mismo commit:**

- El test `"el nombre del socio ya no aparece"` **no se borró**: se invirtió con precisión. Ahora
  afirma que "Alfonso Pagaza" aparece en `#equipo` **y no** en `#contacto` ni en el `<footer>` —
  que era el fondo real de la petición del 19-jul ("contacto → no pongan mi nombre, solo el
  despacho"). El contacto sigue siendo institucional.
- `founder` vuelve al JSON-LD, derivado de `content/equipo.ts` para que el dato estructurado no
  pueda divergir de lo que la página muestra. **Solo nombre y cargo.** Nunca la semblanza: emitir un
  marcador de posición como `description` sería exactamente publicar un placeholder como si fuera
  dato.
- La lista de ids de secciones del e2e (`toEqual` estricto) suma `"equipo"` en su posición.

### 5.4 Muestra del newsletter

**La decisión que delegaste.** Se implementó una **vista previa de un envío de ejemplo**, no el
archivo de publicaciones con pestañas y carrusel de la captura de Galicia.

Razones:

- El despacho **no tiene publicaciones reales**. Un archivo con cuatro pestañas (Actualizaciones /
  Colaboraciones / Comunicados / Entrevistas) sería un archivo falso, y habría que rellenarlo con
  contenido inventado que después habría que sustituir.
- El cliente pidió literalmente _"un ejemplo de cómo se vería"_, que es la muestra, no el archivo.

De Galicia se tomó **el lenguaje de tarjeta** (eyebrow de categoría + titular serif), adaptado a
navy/steel **sin el dorado** — que se removió del sistema a propósito hace meses. Si más adelante
publican de verdad, esta muestra es el punto de partida natural del archivo.

**Dos decisiones que evitan fabricar noticias:**

- **Sin fechas.** Galicia pone una fecha en cada tarjeta, pero una fecha concreta convierte la
  muestra en una noticia falsa en cuanto alguien la ve fuera de contexto. La ranura se ocupa con el
  **formato** (`DD.MM.AAAA` / `DD.MM.YYYY`), que conserva el ritmo tipográfico y es imposible de
  confundir con un dato — el equivalente tipográfico de un wireframe.
- **Titulares formulados como tema, no como suceso.** Nada de cifras, autoridades concretas ni
  números de criterio. Son asuntos perennes de la práctica fiscal.

**Accesibilidad:** la muestra va en un `<figure>` con `<figcaption>` **visible** que dice "Ejemplo
de envío — contenido ilustrativo". Así la advertencia queda asociada semánticamente a las tarjetas
y la recibe también quien use lector de pantalla. Las tarjetas son **inertes a propósito**: no hay
destino al que enlazar, así que no reciben foco ni tienen hover de elevación — parecer pulsables
sería una promesa falsa.

`Newsletter` era la única sección sin prop `locale` (usaba solo `getTranslations`). Como ahora
consume contenido bilingüe de `content/*`, pasa a recibir `locale` como todas las demás.

### 5.5 Redes sociales

- **Solo se renderiza la red que tiene URL real.** Hoy, únicamente Instagram. `SiteInfo.redes` es un
  `Partial<Record<RedSocial, string>>`, de modo que la **ausencia es el estado por defecto**.
  Facebook y X quedan preparados: añadirlos es **una línea** en `src/content/site.ts` y aparecen
  solos en el footer y en el `sameAs` del JSON-LD, sin tocar ningún componente. Cero enlaces rotos,
  cero iconos que apunten a la home.
- **`src/lib/redes.ts` es fuente única** de orden y omisión, compartida por los iconos del footer y
  por el `sameAs`. Duplicar el filtro "omitir las vacías" en dos sitios es como se acaba publicando
  en datos estructurados un perfil que la interfaz no muestra, o al revés.
- **Los iconos.** `lucide-react` sí trae `Instagram` y `Facebook` en estilo trazo, y se usan. Pero
  **su export `X` es la cruz de cerrar** — la misma que usa el menú móvil del Header — y `Twitter`
  es el pájaro anterior al rebranding. Así que el glifo de X se dibuja en el propio componente, en
  el mismo registro de trazo, en vez de incrustar la marca sólida oficial (mezclar una marca sólida
  con iconos de trazo 1.5 px rompe el sistema visual).
- **Ubicación:** al final de la columna de contacto del **Footer** (aparece en todas las páginas,
  incluidas las legales) y en el bloque "O contáctanos directo" de **Contacto**.
- **Accesibilidad:** área táctil de 44 px, `aria-label` compuesto con plantilla ICU
  (`"{red} (abre en una pestaña nueva)"`) porque un `<a>` que solo contiene un SVG `aria-hidden` no
  tiene nombre accesible.
- **`sameAs` solo si hay perfiles de verdad.** Un array vacío contradiría la política declarada en
  `seo.ts:22-25` ("mejor omitir que inventar").

---

## 6. Inventario de archivos

### Nuevos (7)

| Archivo                                     | Qué es                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/content/equipo.ts`                     | Contenido de la sección de equipo. **Lleva la regla dura escrita en la cabecera.** |
| `src/content/newsletter.ts`                 | Muestra del boletín. Cabecera `⚠️` marcando que es ilustrativo.                    |
| `src/components/sections/Equipo.tsx`        | Sección, calcada del patrón de `Capacidades.tsx`.                                  |
| `src/components/sections/EquipoMiembro.tsx` | Tarjeta de integrante (monograma o retrato).                                       |
| `src/components/ui/RedesSociales.tsx`       | Iconos de redes, con `tone` claro/oscuro.                                          |
| `src/lib/redes.ts`                          | Orden y omisión de redes. Fuente única.                                            |
| `e2e/mapa.spec.ts`                          | Test geométrico de los pines a tres anchos.                                        |

### Modificados (16)

| Archivo                                  | Cambio                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/ui/CoverageMap.tsx`      | Fix del ancla del pin + `data-punto` (gancho del test) + advertencia sobre las coordenadas.                                                                  |
| `src/lib/validation.ts`                  | `SECTOR_OTRO`, `"otro"` en `SECTOR_IDS`, tipo `SectorId`.                                                                                                    |
| `src/content/types.ts`                   | `Sector.id` tipado contra el enum; tipos `MiembroEquipo`, `EquipoContent`, `PiezaNewsletter`, `NewsletterMuestra`, `RedSocial`; campo `redes` en `SiteInfo`. |
| `src/components/forms/ContactForm.tsx`   | `<option>` de "Otro" importando `SECTOR_OTRO`; `SectorOption.value` tipado.                                                                                  |
| `src/lib/resend.ts`                      | `etiquetaSector()`; volcado del cuerpo del correo en dev.                                                                                                    |
| `src/lib/seo.ts`                         | `founder` derivado de `equipo.ts`; `sameAs` condicional.                                                                                                     |
| `src/components/sections/Newsletter.tsx` | Muestra en `<figure>`; recibe `locale`.                                                                                                                      |
| `src/components/layout/Header.tsx`       | `ENLACES_PORTADA` mapeado; `gap` ajustado para móvil.                                                                                                        |
| `src/components/layout/Footer.tsx`       | Bloque de redes.                                                                                                                                             |
| `src/components/sections/Contacto.tsx`   | Bloque de redes.                                                                                                                                             |
| `src/content/site.ts`                    | `redes` con Instagram; `equipo` en `NAV_SECTIONS`.                                                                                                           |
| `src/app/(sitio)/[locale]/page.tsx`      | Monta `<Equipo>`; pasa `locale` a `<Newsletter>`.                                                                                                            |
| `src/messages/{es,en}.json`              | `nav.equipo`, `form.sectorOtro`, namespace `redes`.                                                                                                          |
| `e2e/smoke.spec.ts`                      | 2 tests actualizados + 7 nuevos.                                                                                                                             |
| `README.md`                              | Lista de secciones, checklist de go-live, sección Estado.                                                                                                    |

### Claves de i18n añadidas

```
nav.equipo          "Equipo" / "Team"
form.sectorOtro     "Otro" / "Other"
redes.titulo        "Redes" / "Social"
redes.enlace        "{red} (abre en una pestaña nueva)" / "{red} (opens in a new tab)"
```

Todo lo demás (titulares de la muestra, semblanzas, rótulos de la sección de equipo) vive en
`src/content/*` y **no** en `messages/*`. Motivo técnico además del de convención: `layout.tsx` pasa
**todos** los mensajes al `NextIntlClientProvider`, así que cada cadena de `messages/*.json` viaja
al navegador en los dos idiomas. En `content/*` cuesta 0 KB de bundle.

---

## 7. Verificación — qué se corrió y qué dio

Todo lo de abajo se ejecutó de verdad en esta sesión. Ningún resultado está estimado.

| Comprobación                                    | Resultado                                                                                                               |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `npx tsc --noEmit`                              | ✅ sin errores                                                                                                          |
| `pnpm lint`                                     | ✅ _No ESLint warnings or errors_                                                                                       |
| `pnpm build`                                    | ✅ `/[locale]` sigue `●` (SSG); los únicos `ƒ` son los que ya existían (`[...rest]`, `/api/contact`, `/api/newsletter`) |
| `pnpm test:e2e` (desktop + mobile)              | ✅ **70 passed, 2 skipped, 0 failed** (1.7 min)                                                                         |
| Test del mapa **antes** del fix                 | ❌ falla en los tres anchos — así se midió el bug                                                                       |
| Test del mapa **después** del fix               | ✅ los tres anchos dentro de 0.5 pp                                                                                     |
| `POST /api/contact` con `sector=farmaceutico`   | ✅ HTTP 200 · correo: `Sector:   Farmacéutico (farmaceutico)`                                                           |
| `POST /api/contact` con `sector=otro` (vía e2e) | ✅ HTTP 200 · correo: `Sector:   Otro / no especificado (otro)`                                                         |
| Header a 320 / 375 px                           | ✅ sin desbordamiento (`scrollWidth <= clientWidth`) y sin solape con el selector de idioma                             |
| Revisión visual                                 | Capturas de equipo, newsletter, footer y mapa a 1440 y 375 px                                                           |

Los 2 tests saltados son los `test.skip` por proyecto que ya existían (uno solo corre en móvil, otro
solo en escritorio).

**Nota metodológica sobre el test del mapa:** se escribió y se corrió **contra el código con el
bug** antes de arreglar nada, y se confirmó que fallaba. Un test que pasa antes y después no
verifica nada.

---

## 8. Trampas del entorno (para que no las repitas en local)

Cosas que costaron tiempo en el contenedor remoto. En tu máquina, algunas no aplican.

1. **Playwright pedía un Chromium que no estaba.** El entorno remoto trae el build **1194** y
   `@playwright/test` de este proyecto quiere el **1228**. Se resolvió con un config de override
   **fuera del repo** (en el scratchpad de la sesión, ya desaparecido) que apuntaba a
   `executablePath: /opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
   **En tu máquina no necesitas nada de eso**: basta `npx playwright install chromium`.
   `playwright.config.ts` **no se modificó** por esta razón — es un problema de entorno, no del
   proyecto.

2. **`pnpm build` con el dev server corriendo corrompe `.next`.** El build sobrescribe el
   directorio y el dev server empieza a devolver 500 con
   `ENOENT: ... vendor-chunks/lucide-react@...js`. Cuesta un rato entender que el código está bien y
   el servidor no. **Baja el dev server antes de construir**, o usa directorios separados.

3. **`www.instagram.com` está bloqueado** por el proxy de egress del entorno remoto, así que no se
   pudo resolver el handle desde el enlace al post. En local no tendrás ese límite.

4. **Churn de formato preexistente.** Al correr Prettier aparecieron cambios en
   `NewsletterForm.tsx` y `Capacidades.tsx` que **no** tenían que ver con este trabajo (deriva de
   formato ya commiteada). **Se revirtieron** para no ensuciar el diff. Si corres `pnpm format` en
   local volverán a aparecer; es esperado y ajeno a esta rama.

---

## 9. Qué queda pendiente

### Bloqueantes que dependen del cliente

- 🔴 **Fotografías y semblanzas del equipo.** La sección está montada con marcadores. Solo el
  nombre y el cargo del socio fundador son datos verificados. **No desactives Deployment Protection
  antes de sustituir esto**, o el sitio público mostrará los marcadores. Al hacerlo, el test de
  trinquete se pondrá rojo — es intencional: quita el rótulo a conciencia.
- 🔴 **Validación legal del Aviso de Privacidad y del Aviso Legal** (pendiente de antes de esta
  sesión, sin cambios). Sin esto el sitio no debe hacerse público: los formularios ya recaban datos
  personales.
- **Perfiles de Facebook y X.** Cuando lleguen: una línea en `src/content/site.ts`.
- **Contenido real del boletín**, si quieren pasar de la muestra a publicaciones de verdad.
- **Secretos reales en Vercel** (Resend, Upstash, Turnstile en cuentas de Brota), dominio
  `pagaza.mx` y verificación de Resend. Todo esto ya estaba pendiente.

### Decisiones discutibles que tomé y podrías querer revertir

1. **El rótulo del nav dice "Equipo", no "Nuestro equipo".** Es una concesión al ancho de 375 px:
   con el texto largo, los tres enlaces más el selector de idioma no caben. El `<h2>` de la sección
   sí dice "Nuestro equipo". Si el cliente insiste en el rótulo largo arriba, hay que rediseñar esa
   barra en móvil (p. ej. ocultando "Inicio").
2. **Muestra en vez de archivo de publicaciones.** Es mi interpretación de la referencia de Galicia.
   Si el cliente esperaba la sección completa con pestañas, hay que rehacer este punto — pero
   entonces necesitan entregar contenido real que publicar.
3. **`DD.MM.AAAA` en la ranura de fecha** de las tarjetas. Resuelve el riesgo de fabricar noticias
   fechadas, pero es una elección tipográfica poco convencional. Alternativa: suprimir la ranura.
4. **Las píldoras del mapa se ocultan bajo `md`.** Defendible porque el mapa es decorativo y las
   sedes están en texto accesible; si prefieres conservar texto en móvil, la alternativa es añadir
   abreviaturas ("CDMX", "Cd. Juárez").
5. **Solo Alfonso en el equipo**, sin plazas anónimas de relleno. La retícula queda con una tarjeta.
6. **Redes también en Contacto**, no solo en el Footer. Un argumento razonable en contra es que un
   enlace saliente junto al formulario compite con la conversión.
7. **`Sector["id"]` ahora depende de `lib/validation`.** Mata una clase entera de bugs a cambio de
   que `content/` importe de `lib/`. No hay ciclo (`validation` solo importa `zod`).

---

## 10. Dónde está cada cosa si quieres auditarla

```bash
# El fix del mapa y su razonamiento completo
git show b28d116 -- src/components/ui/CoverageMap.tsx

# La regla dura sobre contenido inventado
sed -n '1,40p' src/content/equipo.ts

# Por qué la muestra del newsletter no lleva fechas
sed -n '1,30p' src/content/newsletter.ts

# La doble asimetría del enum de sectores
sed -n '1,40p' src/lib/validation.ts

# Los tests nuevos
git diff main..HEAD -- e2e/
```

---

_Bitácora generada al cierre de la sesión del 18-ago-2026. La rama es
`claude/resumen-progreso-2ln2be`; el trabajo está en el commit `b28d116`. No se abrió PR._
