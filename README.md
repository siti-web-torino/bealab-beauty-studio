# Bealab – Beauty Studio

Sito vetrina dimostrativo in italiano, sviluppato con Vite e JavaScript. Non richiede database, account o chiavi API. Include una sezione dedicata alla squadra, menu mobile, dettagli dei trattamenti, collegamenti WhatsApp e telefono, mappa caricata su richiesta e spazio privacy.

## Demo online su Vercel

La demo pubblica è disponibile su **https://bealab-beauty-studio.vercel.app/** e il repository è `siti-web-torino/bealab-beauty-studio`. Vercel è collegato a GitHub: i push su `main` avviano la pubblicazione. Il progetto usa il framework Vite, `npm run build` e la directory di output `dist`; su Vercel il percorso base deve restare `/` (non impostare `VITE_BASE_PATH` al percorso GitHub Pages). Verificare il completamento della pubblicazione prima di condividere una modifica.

La demo resta `noindex,nofollow`. I metadati di condivisione puntano all’indirizzo Vercel; impostando `SITE_URL` al dominio definitivo la build aggiorna URL e sitemap e abilita l’indicizzazione, da fare dopo la conferma dei contenuti e dei dati legali.

## Pubblicazione alternativa su GitHub Pages

È predisposta la pubblicazione tramite GitHub Pages. Il proprietario deve attivarla una sola volta:

1. Aprire **Settings → Pages** nel repository GitHub.
2. In **Build and deployment → Source**, scegliere **GitHub Actions**.
3. Aprire **Actions → Pubblica demo Bealab**, premere **Run workflow**, scegliere `main` e confermare. Se un’esecuzione è già fallita prima dell’attivazione di Pages, usare **Re-run all jobs** oppure avviare una nuova esecuzione.

Dopo la prima pubblicazione riuscita, GitHub mostra il collegamento nelle impostazioni Pages. L’indirizzo previsto, senza dominio personalizzato, è `https://siti-web-torino.github.io/bealab-beauty-studio/`. Ogni successivo push su `main` ricompila e pubblica automaticamente il sito: non occorre riscaricare lo ZIP, basta riaprire o aggiornare lo stesso link dopo il completamento dell’azione. Un’eventuale esecuzione fallita va risolta dalla scheda Actions.

La build legge il percorso da GitHub Pages per servire correttamente immagini, font e script anche nella sottocartella del progetto. Questa pubblicazione è una demo pubblicamente accessibile; resta esclusa dall’indicizzazione con `noindex,nofollow`, senza attivare `SITE_URL`. I dati legali e le informazioni commerciali ancora da verificare vanno completati prima di usarla come sito definitivo.

Se GitHub richiede un piano a pagamento per Pages nel repository privato, verificare le opzioni dell’account: non cambiare automaticamente la visibilità del repository. La configurazione del workflow non prova che Pages sia già attivo o che la prima pubblicazione sia riuscita.

## Vedere il sito senza installare nulla

1. Su GitHub premi il pulsante verde **Code**, poi **Download ZIP**.
2. Estrai completamente la cartella ZIP sul computer.
3. Apri **APRI-IL-SITO.html** con un doppio clic (Chrome, Edge, Firefox o Safari).

Questo file contiene già immagini, font e funzionalità della demo: non richiede Node.js o un server. WhatsApp, telefono e mappa usano i rispettivi servizi esterni quando li selezioni. La visualizzazione del file su GitHub mostra il codice: per vedere il sito va prima scaricato e aperto nel browser. Questa demo locale non pubblica il sito su Internet.

`APRI-IL-SITO.html` è un’istantanea della demo; dopo eventuali modifiche ai sorgenti va rigenerata. Per lo sviluppo ordinario usare i comandi seguenti.

## Sviluppo

Node.js >= 22.12 (verificato con Node 24) e npm.

```sh
cd /workspace/bealab-beauty-studio
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --port 5173 --strictPort
```

Ogni attività cloud dispone già di un ambiente isolato: usare questo checkout; non creare worktree, salvo richiesta esplicita.

```sh
npm run build
npm run preview -- --port 4173 --strictPort
```

La cartella `dist/` è distribuibile su hosting statico. Non contiene segreti. L’avvio del server va ripetuto in ogni nuova sessione: i processi non sono conservati dallo snapshot dell’ambiente.

## Aggiornare il sito

- `src/content.js`: contatti, anno di apertura, orari, squadra, servizi, foto, social, recensioni autorizzate e informazioni legali. Gli orari vuoti mostrano un invito a contattare il centro; nessun orario è stato inventato. L’anno 2022, i nomi Giulia, Alessia, Ilenia e Marika e il ruolo di Giulia come titolare provengono dal post ufficiale fornito dall’utente. Non sono attribuite specializzazioni o qualifiche non confermate alle altre persone.
- Il profilo Instagram `@bealab_beautystudio`, fornito dal titolare del progetto, è collegato nella sezione appuntamenti (“Scrivici su Instagram”), nei contatti e nel footer con un URL senza parametri di tracciamento. Non vengono caricati widget o contenuti di Instagram prima del clic. Non è presente una pagina Facebook.
- I cinque servizi manicure sono quelli comunicati dal centro: manicure classica, con semipermanente, con smaltogel, con copertura in gel o acrilico e ricostruzione unghie con gel o acrilico.
- La scheda **Epilazione** usa i servizi e i materiali comunicati dal cliente: cera tradizionale e CocoCera, l’originale ceretta brasiliana, per tutti i tipi di pelle, anche quelle più delicate. Include la dichiarazione “Nel 2026 siamo diventate Exclusive Point CocoCera”, la foto della squadra con il riconoscimento e quella dei prodotti.
- `public/images/epilazione/` e `public/videos/cococera-preparazione.mp4`: fotografie originali del centro in WebP e video fornito dal cliente (circa 11 secondi, senza audio). Il video H.264 è stato mantenuto senza ricompressione, con metadati spostati all’inizio per la riproduzione; si avvia solo su richiesta, con controlli e `playsinline`, e viene messo in pausa chiudendo la scheda o aprendo una foto. Gli originali sono conservati fuori dal checkout in `/workspace/bealab-assets/epilazione-originals/`.
- La scheda **Pedicure** riporta la descrizione e i quattro servizi comunicati dal cliente: pedicure curativo ed estetico, con semipermanente, con smalto normale, taglio unghie e applicazione smalto. Usa soltanto la foto originale dei prodotti e accessori del centro fornita nell’archivio `1.rar`, in `public/images/pedicure/`, con miniatura separata e ingrandimento dell’immagine intera. Non ripete la foto in una galleria e non mostra frecce superflue per l’unica immagine. L’originale è conservato fuori dal checkout in `/workspace/bealab-assets/pedicure-originals/`. Le sette schede mantengono larghezze uniformi: da 1101 px sono disposte su due righe di quattro e tre, con la seconda riga centrata; sui tablet seguono tre, due e due schede, e sui telefoni due colonne con l’ultima scheda centrata.
- La scheda **Ciglia & Sopracciglia** riporta descrizione e quattro servizi della chat del cliente: laminazione ciglia coreana, laminazione sopracciglia coreana, extension ciglia, definizione e tinta sopracciglia. `src/sguardo-photos.js` elenca tutte le 15 fotografie reali; le prime sei sono tre confronti prima/dopo (due laminazioni e un’extension effetto Mascara), poi sono disponibili le composizioni già fornite dal centro, gli altri lavori e la cabina. “Vedi tutte le foto” espande la galleria completa. I confronti non vengono ritagliati. I file sono in `public/images/sguardo/`; il video H.264 senza audio, di circa 9 secondi, in `public/videos/laminazione-ciglia-coreana.mp4` si avvia su richiesta e si ferma chiudendo la scheda o aprendo una foto. Gli originali e la tabella delle associazioni sono conservati fuori dal checkout in `/workspace/bealab-assets/`: gli orari provengono dalla chat e, per i messaggi nello stesso secondo, la sequenza è inferita dai suffissi dei nomi originali; l’esportazione non contiene un collegamento esplicito fra testo e file.
- La nuova scheda **Epilazione Laser** presenta il laser al diodo Esthelogue, la consulenza e prova gratuita e le tre fasi comunicate dal cliente (anamnesi, protocollo e trattamenti). `public/images/laser/` contiene le quattro foto ricevute: macchinario, cabina e due composizioni prima/dopo con il numero di sedute riportato negli originali. Le immagini complete sono ingrandibili e le miniature dei confronti non vengono ritagliate. Gli originali sono conservati fuori dal checkout in `/workspace/bealab-assets/laser-originals/`.
- La scheda **Viso & benessere** riporta i sette servizi comunicati dal cliente, distinti in due pulizie viso (Basic e Superior Experience) e cinque rituali (Antigravità, Esfoliante, Occhi & Labbra, Illuminante e Purificante). Evidenzia la consulenza gratuita prima di ogni percorso. La foto reale del cliente, in `public/images/viso/`, sostituisce la precedente copertina illustrativa e si può ingrandire senza ripeterla in una galleria. L’originale è conservato fuori dal checkout in `/workspace/bealab-assets/viso-originals/`.
- La scheda **Corpo & benessere** riporta i quattro massaggi e le descrizioni comunicati dal cliente (relax, decontratturante schiena/cervicale, drenante e Padabhyanga). “Trattamenti corpo” presenta il percorso personalizzato e la consulenza gratuita, con un collegamento WhatsApp dedicato. La gratuità riguarda la consulenza.
- `public/images/corpo/`: le due foto reali fornite dal cliente, con versioni WebP e miniature. La copertina mostra il lettino; la galleria include anche il dettaglio con asciugamano, ciotola e luci soffuse. Gli originali sono conservati fuori dal checkout in `/workspace/bealab-assets/corpo-originals/`.
- `src/manicure-photos.js`: ordine e descrizioni delle 18 foto reali dei lavori, fornite dal cliente. La copertina è il rosa lattiginoso con dettaglio zebrato; la selezione iniziale della galleria comprende french animalier, marrone a pois e viola/turchese con fiorellini. Le foto natalizie e di Halloween sono incluse nella raccolta completa.
- `src/gallery.js`: nella scheda manicure vengono mostrate tre foto selezionate; “Vedi tutti i lavori” espande la raccolta completa. La vista ingrandita mostra le foto intere, con frecce, tasti destra/sinistra e scorrimento orizzontale su touchscreen. Escape chiude prima la foto e lascia aperta la scheda. Le altre miniature vengono inserite al primo ampliamento e le immagini grandi vengono richieste solo aprendo una foto. La stessa galleria supporta titoli specifici per Corpo & benessere e mostra direttamente entrambe le foto, senza un controllo di espansione superfluo.
- `src/main.js`: testi editoriali, struttura e interazioni.
- `src/motion.js`: breve introduzione con logo e petali rosa/lilla ispirati alla peonia Bealab, ingresso progressivo dei contenuti, indicatore di lettura, lieve movimento delle foto su desktop e apertura animata dei dettagli. L’introduzione dura circa due secondi e compare una sola volta per scheda (tramite `sessionStorage`, se disponibile); si può saltare con “Entra”, Escape, Tab o scorrendo e non compare accedendo direttamente a una sezione. La prima sezione resta visibile sotto la dissolvenza dell’introduzione, senza una seconda animazione di ingresso. Gli effetti rispettano `prefers-reduced-motion`, anche se la preferenza cambia durante la visita; le interazioni legate al puntatore sono limitate ai dispositivi con mouse.
- `src/style.css`: palette, tipografia, animazioni e responsive.
- `public/images/manicure/`: versioni WebP delle 18 fotografie originali del cliente, con miniature separate per il sito e immagini grandi per la vista ingrandita. Le foto non sono state ritoccate o rigenerate; gli originali ricevuti sono conservati fuori dal checkout in `/workspace/bealab-assets/manicure-originals/`.
- `public/images/`: immagini WebP locali, sostituibili mantenendo gli stessi nomi. I ritratti `team-*.webp` sono adattamenti realizzati con uno strumento di editing generativo a partire dalle fotografie fornite in chat: non sono copie identiche dei file originali. Per la sezione squadra si usano i ritratti già approvati da Giulia, con le quattro presentazioni fornite nella chat del 25 novembre. Le foto originali `bealab-squadra.webp` e `bealab-cabina.webp` mostrano il team e la cabina nelle prime due sezioni del sito. Le fotografie diverse dai lavori manicure, dai materiali CocoCera, dalle foto laser, dai materiali Ciglia & Sopracciglia, dalla foto Pedicure, dalle foto Corpo & benessere, da Viso & benessere, dalla foto della cabina e dalle foto del team sono illustrazioni generate per la demo, non immagini del salone o prove di trattamenti effettivamente eseguiti. Le risorse di lavoro sono conservate fuori dal checkout in `/workspace/generated_images`.
- `public/images/logo-bealab.webp`: adattamento con sfondo trasparente del logo fornito, ottenuto con lo stesso strumento generativo; per l’identità ufficiale usare il file originale. La palette del sito riprende rosa peonia, lilla e fucsia dal post ufficiale condiviso dall’utente.
- `index.html`: metadati SEO e Open Graph.

I font Cormorant Garamond e DM Sans sono serviti localmente tramite Fontsource. Le icone sono Lucide (ISC); i font includono le rispettive licenze SIL OFL nei pacchetti installati. Non sono presenti analytics o pixel pubblicitari.

## Prima della pubblicazione

1. Confermare i servizi, gli orari e le informazioni commerciali con il proprietario.
2. Sostituire le immagini illustrative con foto autorizzate, se disponibili, e aggiornare le relative diciture.
3. Il collegamento alle recensioni in `studio.googleReviewsUrl` usa la scheda Google Maps verificata confrontando nome, indirizzo e telefono. Le tre testimonianze sono trascritte dagli screenshot forniti dall’utente, con i cognomi abbreviati come richiesto; l’apertura della scheda non sostituisce la conferma del proprietario sui materiali usati.
4. I dati d’impresa forniti dalla titolare sono in `studio.legal` e gli orari con decorrenza gennaio 2027 in `studio.hours`. Per completare l’informativa privacy occorre confermare prassi del centro, conservazione dei dati e condizioni dell’hosting. La mappa non comporta richieste a Google prima del clic; la scelta non viene memorizzata.
5. Impostare `SITE_URL` al dominio HTTPS definitivo e compilare:

```sh
SITE_URL=https://DOMINIO-VERIFICATO npm run build
```

Il comando produce `dist/sitemap.xml`, `robots.txt`, URL canonico e Open Graph assoluti. Senza `SITE_URL` la demo resta `noindex,nofollow`, `robots.txt` vieta l’indicizzazione e non viene inventato un dominio per la sitemap. Il dominio dell’esempio è un segnaposto da sostituire.

6. Pubblicare il contenuto di `dist/` su un hosting statico e verificare HTTPS, collegamenti e anteprime social sul dominio reale. Lo sviluppo e il salvataggio della configurazione cloud non pubblicano automaticamente il sito né effettuano push su GitHub.

## Verifiche

La compilazione controlla il bundle. Il flusso è stato verificato con Chromium/Playwright su desktop e smartphone: menu, collegamenti interni, dettagli dei cinque trattamenti, WhatsApp senza testo precompilato, chiusura delle finestre con il tasto Escape, privacy e caricamento differito della mappa. Le aperture dei servizi esterni non costituiscono una verifica delle loro funzionalità o della scheda Google ufficiale.
