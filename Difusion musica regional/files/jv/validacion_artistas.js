document.addEventListener('DOMContentLoaded', () => {

    const contenedor = document.getElementById('contenedor-artistas');
    const inputNombre = document.getElementById('busquedaNombre');
    const selectCiudad = document.getElementById('filtroCiudad');
    const selectGenero = document.getElementById('filtroGenero');
    const selectPlataforma = document.getElementById('filtroPlataforma');

    const artistasData = [
        {
            "nombre": "Flores del Naranjo",
            "genero": "Math Rock, Post Rock",
            "ciudad": "Puerto Montt",
            "imagen": "../imagen/Logos/logo flores del naranjo.jpg",
            "redes": {
                "soundcloud": "https://soundcloud.com/flores-del-naranjo",
                "instagram": "https://www.instagram.com/flores_del_naranjo/"
            }
        },
        {
            "nombre": "Avenida Caracoles",
            "genero": "Rock Alternativo",
            "ciudad": "Ancud",
            "imagen": "../imagen/Logos/logo avenida caracoles.png",
            "redes": {
                "soundcloud": "https://soundcloud.com/user-982663867",
                "instagram": "https://www.instagram.com/av.caracoles/"
            }
        },
        {
            "nombre": "MutanteStyle",
            "genero": "Hip-Hop, Rap",
            "ciudad": "Puerto Montt",
            "imagen": "../imagen/Logos/logo mutantestyle.jpg",
            "redes": {
                "soundcloud": "https://soundcloud.com/mutantestyle",
                "instagram": "https://www.instagram.com/mutantestyle_2004/?hl=es"
            }
        },
        {
            "nombre": "Felipe Wainraihgt Trío",
            "genero": "Jazz, Fusión",
            "ciudad": "Frutillar",
            "imagen": "../imagen/Logos/logo felipe wainraihgt trío.jpg",
            "redes": {
                "spotify": "https://open.spotify.com/intl-es/artist/4p0skZ9CC8vyL4tY2Tz2oz",
                "instagram": "https://www.instagram.com/felipewainraihgttrio"
            }
        },
        {
            "nombre": "Los Martinez",
            "genero": "Pop Rock",
            "ciudad": "Puerto Varas",
            "imagen": "../imagen/Logos/logo los martinez.png",
            "redes": {
                "spotify": "https://open.spotify.com/intl-es/artist/5Y81ncQ9yxMwd9hkLhNO93",
                "instagram": "https://www.instagram.com/losmartinez_banda/"
            }
        },
        {
            "nombre": "Grito Subterraneo",
            "genero": "Ska, Punk Rock",
            "ciudad": "Puerto Montt",
            "imagen": "../imagen/Logos/logo grito subterraneo.jpg",
            "redes": {
                "spotify": "https://open.spotify.com/intl-es/artist/2zhMIUmlkYxaMe6pcaXoyf",
                "instagram": "https://www.instagram.com/elgritosubterraneo/"
            }
        },
        {
            "nombre": "Sepulcrum",
            "genero": "Death Metal",
            "ciudad": "Puerto Montt",
            "imagen": "../imagen/Logos/logo sepulcrum.jpg",
            "redes": {
                "bandcamp": "https://sepulcrumdm.bandcamp.com/",
                "instagram": "https://www.instagram.com/_.sepulcrum._/"
            }
        },
        {
            "nombre": "Horns",
            "genero": "Black Metal",
            "ciudad": "Puerto Varas",
            "imagen": "../imagen/Logos/logo horns.jpg",
            "redes": {
                "bandcamp": "https://livingtemple.bandcamp.com/album/horns-totendienst-vi-antiphonae-omnes-mortum-et-animas-infernalis",
                "facebook": "https://www.facebook.com/ad.penumbraes/"
            }
        },
        {
            "nombre": "Maniaco",
            "genero": "Brutal Death Metal",
            "ciudad": "Osorno",
            "imagen": "../imagen/Logos/logo maniaco.jpg",
            "redes": {
                "bandcamp": "https://maniacoband.bandcamp.com/",
                "facebook": "https://www.facebook.com/vetemaband"
           
            }
        }

    ];

    console.log("✅ Base de datos de artistas cargada correctamente:", artistasData);

    mostrarArtistas(artistasData);

    function mostrarArtistas(artistas) {

        if (artistas.length === 0) {
            contenedor.innerHTML = `
                <div class="col-12 text-center text-muted py-5">
                    <i class="bi bi-emoji-frown display-1"></i>
                    <h3 class="mt-3">No se encontraron artistas con esos filtros.</h3>
                </div>`;
            return;
        }
        const html = artistas.map(artista => {
            let botones = '';
            const redes = artista.redes;

            if (redes.spotify) botones += `<a href="${redes.spotify}" target="_blank" class="btn btn-spotify"><i class="bi bi-spotify"></i> Spotify</a>`;
            if (redes.soundcloud) botones += `<a href="${redes.soundcloud}" target="_blank" class="btn btn-primary"><i class="bi bi-soundwave"></i> SoundCloud</a>`;
            if (redes.bandcamp) botones += `<a href="${redes.bandcamp}" target="_blank" class="btn btn-bandcamp"><i class="bi bi-music-note-list"></i> Bandcamp</a>`;
            if (redes.instagram) botones += `<a href="${redes.instagram}" target="_blank" class="btn btn-instagram"><i class="bi bi-instagram"></i> Instagram</a>`;
            if (redes.facebook) botones += `<a href="${redes.facebook}" target="_blank" class="btn btn-facebook"><i class="bi bi-facebook"></i> Facebook</a>`;

            return `
            <div class="col-md-6 col-lg-4">
                <div class="artist-card">
                    <img src="${artista.imagen}" class="artist-img" alt="Logo ${artista.nombre}">
                    <div class="artist-info">
                        <h3 class="artist-name">${artista.nombre}</h3>
                        <p class="artist-detail"><i class="bi bi-music-note-beamed"></i> Género: ${artista.genero}</p>
                        <p class="artist-detail"><i class="bi bi-geo-alt"></i> Ciudad: ${artista.ciudad}</p>
                        <p class="artist-detail"><i class="bi bi-link-45deg"></i> Encuéntralos en:</p>
                        <div class="social-buttons">${botones}</div>
                    </div>
                </div>
            </div>`;
        }).join("");

        contenedor.innerHTML = html;
    }

    function filtrarArtistas() {
        const texto = inputNombre.value.toLowerCase();
        const ciudad = selectCiudad.value;
        const genero = selectGenero.value.toLowerCase();
        const plataforma = selectPlataforma.value;

        const filtrados = artistasData.filter(artista => {

            const coincideNombre = artista.nombre.toLowerCase().includes(texto);
 
            const coincideCiudad = ciudad === "" || artista.ciudad === ciudad;
            
            const coincideGenero = genero === "" || artista.genero.toLowerCase().includes(genero);

            const coincidePlataforma = plataforma === "" || artista.redes[plataforma];

            return coincideNombre && coincideCiudad && coincideGenero && coincidePlataforma;
        });

        console.log(`Filtrando... Resultados encontrados: ${filtrados.length}`);
        mostrarArtistas(filtrados);
    }
    inputNombre.addEventListener('input', filtrarArtistas);
    selectCiudad.addEventListener('change', filtrarArtistas);
    selectGenero.addEventListener('change', filtrarArtistas);
    selectPlataforma.addEventListener('change', filtrarArtistas);
});