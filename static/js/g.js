    // 1. KONFIGURASI SISTEM UDAH DI FILE static/js/global-nav2.js, JADI GAK PERLU DITULIS LAGI DISINI
    // 2. FUNGSI AMBIL DATA (GET)
    function muatArtikel() {
        const wadah = document.getElementById('daftarArtikel');
        wadah.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">⏳ Memuat karya santri...</p>`;

        fetch(`${G_BASE_URL}?action=getArticles`)
            .then(response => response.json())
            .then(data => {
                let semuaKartu = "";
                if (!data || data.length === 0) {
                    wadah.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Belum ada tulisan santri minggu ini.</p>`;
                    return;
                }

                // Urutan terbaru di atas
                data.reverse().forEach(item => {
                    semuaKartu += `
                        <div class="artikel-card">
                            <div class="card-image">
                                <img src="${item.gambar}" alt="${item.judul}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.src='https://via.placeholder.com/400x250?text=Gambar+Berita'">
                                <span class="tag-kategori">${item.kategori}</span>
                            </div>
                            <div class="card-body">
                                <div class="meta-data">
                                    <span><i class="far fa-user"></i> ${item.penulis}</span>
                                    <span><i class="far fa-calendar-alt"></i> ${item.tanggal}</span>
                                </div>
                                <h3>${item.judul}</h3>
                                <p>${item.ringkasan}</p>
                                <a href="template-artikel.html?id=${item.id}" class="btn-baca">
                                    Baca Selengkapnya
                                </a>
                            </div>
                        </div>`;
                });
                wadah.innerHTML = semuaKartu;
            })
            .catch(error => {
                console.error("Error:", error);
                wadah.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Gagal memuat data. Periksa koneksi atau URL Script.</p>`;
            });
    }