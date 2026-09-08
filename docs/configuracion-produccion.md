# Configuración de producción — dominio, correo y anti-bot

Guion operativo para conectar `pagaza.mx` a producción. El sitio ya está desplegado y `READY` en
Vercel; el formulario da 503 sólo por falta de credenciales. **No falta código.**

El dominio vive en **Google Cloud DNS** en la cuenta del cliente (`ns-cloud-a{1..4}.googledomains.com`)
y tiene **Google Workspace activo** (`a@pagaza.mx` es un buzón real). Los registros de abajo se
crean en esa consola, sin tocar el correo.

---

## 🔴 Lo que NO se toca

Editar cualquiera de estos rompe el correo del despacho, en vivo:

| Registro | Valor actual | Por qué no se toca |
|---|---|---|
| **MX** de la raíz | `aspmx.l.google.com` + `alt1..4.aspmx.l.google.com` | Entrega de Google Workspace. Es el buzón `a@pagaza.mx`. |
| **TXT SPF** de la raíz | `v=spf1 include:_spf.google.com ~all` | SPF admite **un solo** registro. Fusionarlo mal manda el correo legítimo a spam. Resend NO lo necesita: su SPF vive dentro de `send.pagaza.mx`. |
| **Nameservers** | `ns-cloud-a{1..4}.googledomains.com` | La zona se edita, no se migra. |

Todo lo que se agrega abajo son registros **nuevos**: subdominios bajo `send` y el apex/`www` que
hoy no existen. Ninguno pisa un registro existente.

---

## Registros a crear (en orden)

### 1. Correo transaccional — subdominio `send.pagaza.mx` (Resend)

Se verifica un **subdominio de envío**, no la raíz. Resend crea ahí sus propios SPF/DKIM sin tocar
Workspace. El remitente pasa a `no-reply@send.pagaza.mx`; el `replyTo` sigue siendo el prospecto,
así que responder desde el buzón del despacho funciona igual.

| # | Nombre (host) | Tipo | Valor | TTL |
|---|---|---|---|---|
| 1 | `resend._domainkey.send` | TXT | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/YzD1theYqbokuwreNwrEbNF2sMmyMeh3ZKkvl9kAAvUU48eH4nyshIIWuV+ho/alCJ8Pi0S9D8dwk3TSrYaYICgn4FRDxDfT1gp1yb3VYM78D20TTbZHDZtd7OYsyKXmSlQYWK6WiRnXEIsGyzmxREU3EGu4o+nrQh0Fz5oNqwIDAQAB` | 3600 |
| 2 | `rsend.send` | CNAME | `rsend.forge.rmta.net.` | 3600 |
| 3 | `send.send` | CNAME | `send.forge.rmta.net.` | 3600 |

> En Google Cloud DNS el nombre completo queda `resend._domainkey.send.pagaza.mx.`,
> `rsend.send.pagaza.mx.`, `send.send.pagaza.mx.`. "Enable Receiving" en Resend queda **OFF**
> (no hace falta inbound).

### 2. Web — apex y `www` (Vercel)

| # | Nombre (host) | Tipo | Valor | TTL |
|---|---|---|---|---|
| 4 | `@` (apex `pagaza.mx`) | A | `216.198.79.1` | 3600 |
| 5 | `www` | CNAME | `010a2a1a51848be8.vercel-dns-017.com.` | 3600 |

> Valores *legacy* que Vercel confirma que siguen funcionando, por si la consola no acepta los de
> arriba: A `76.76.21.21` y CNAME `cname.vercel-dns.com.`.
>
> ⚠️ **Conectar el apex publica el sitio en ese instante.** La protección de Vercel está en
> `all_except_custom_domains` — no aplica a dominios personalizados. Los bloqueadores de contenido
> están cerrados (ver "Publicar" abajo), así que publicar es el plan.
> `www` está configurado en Vercel como redirect 308 → `pagaza.mx`.

### 3. DMARC — opcional, recomendado (monitoreo)

| # | Nombre (host) | Tipo | Valor | TTL |
|---|---|---|---|---|
| 6 | `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:a@pagaza.mx` | 3600 |

> Va en la **raíz**, no bajo `send`. `p=none` es sólo monitoreo: no cambia la entrega de ningún
> correo, sólo pide reportes. Si el cliente prefiere no añadir nada a la raíz, se omite.

---

## Después de pegar los registros

1. **Resend** → botón *Verify DNS Records*. Tarda minutos. Cuando pase a `Verified`:
2. **Vercel → Environment Variables** → cambiar `CONTACT_FROM_EMAIL` de `onboarding@resend.dev` a
   `no-reply@send.pagaza.mx` (Production + Preview).
3. **Vercel → Deployments** → *Redeploy* de producción (sin caché). El `from` sólo cambia tras el
   redeploy.
4. **Vercel → Domains** → *Refresh* en `pagaza.mx` y `www.pagaza.mx` hasta que digan
   `Valid Configuration`. El certificado TLS lo emite Vercel solo (no hay CAA que estorbe).
5. **Prueba de aceptación:** enviar un lead desde `https://pagaza.mx/es` y verlo llegar a
   `a@pagaza.mx`.

---

## Verificación (PowerShell)

```powershell
# El correo del despacho sigue intacto — debe devolver los MX de Google:
Resolve-DnsName pagaza.mx -Type MX

# SPF de la raíz sin cambios — un único TXT v=spf1 ...google.com:
Resolve-DnsName pagaza.mx -Type TXT

# Registros nuevos de Resend:
Resolve-DnsName resend._domainkey.send.pagaza.mx -Type TXT
Resolve-DnsName rsend.send.pagaza.mx -Type CNAME
Resolve-DnsName send.send.pagaza.mx  -Type CNAME

# Web:
Resolve-DnsName pagaza.mx      -Type A       # → 216.198.79.1
Resolve-DnsName www.pagaza.mx  -Type CNAME   # → *.vercel-dns-017.com
```

Formulario en producción (después del redeploy con el `from` verificado):

```powershell
# Falta el token de Turnstile → 400
curl -i -X POST https://pagaza.mx/api/contact -H "Content-Type: application/json" `
  -d '{"nombre":"x","email":"x@x.com","mensaje":"hola mundo prueba","consent":true}'

# 6 envíos seguidos → el 4.º+ responde 429 con Retry-After
# Honeypot (_hp) lleno → 200 sin enviar nada
# Alta de newsletter → visible en la audiencia de Resend
```

Recorrido completo de aceptación: lead real recibido en `a@pagaza.mx` · `429` tras el límite ·
`_hp` lleno → `200` · sin token → `400` · alta de newsletter en la audiencia · el mismo recorrido
en `/en`.

---

## Publicar

Conectar `pagaza.mx` **publica el sitio**. Los dos bloqueadores de contenido que estaban abiertos
quedaron cerrados por confirmación del cliente (2026-09-08):

- **Aviso de Privacidad** ([src/content/legal.ts](../src/content/legal.ts)) — la redacción es del
  propio despacho y el cliente confirma que es la que quiere. Sin cambios.
- **Cargos del equipo** — revisados y confirmados por el despacho. Sin cambios.

No hay nada que esperar: se pega el DNS en la llamada y el sitio queda público. (Si en el futuro se
quisiera montar el dominio sin publicar, se cambia `ssoProtection.deploymentType` de
`all_except_custom_domains` a `all` en Vercel; hoy no aplica.)
