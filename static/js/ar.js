    document.addEventListener('DOMContentLoaded', function () {
        // 1. AMBIL PARAMETER DARI URL
        const urlParams = new URLSearchParams(window.location.search);
        const idDicari = urlParams.get('id');
        const tipeKonten = urlParams.get('type') || 'artikel'; 

        if (!idDicari) {
            console.error("ID tidak ditemukan di URL");
            return;
        }

        // Pakai G_BASE_URL dari static/js/global-nav.js
        // Tentukan Action berdasarkan tipe konten
        const actionDetail = (tipeKonten === 'warta') ? 'getDetailWarta' : 'getDetail';
        const actionList = (tipeKonten === 'warta') ? 'getWarta' : 'getArticles';
        const tagLabel = (tipeKonten === 'warta') ? "Warta Pondok" : "Mingguan Menulis";

        // 2. AMBIL DETAIL KONTEN
        fetch(`${G_BASE_URL}?action=${actionDetail}&id=${idDicari}`)
            .then(res => res.json())
            .then(artikel => {
                if (artikel) {
                    document.getElementById('pageTitle').innerText = artikel.judul + " - Nama Pondok";
                    document.getElementById('bigTitle').innerText = artikel.judul;
                    document.getElementById('articleTag').innerText = `${tagLabel} - ${artikel.kategori}`;
                    document.getElementById('authorName').innerText = artikel.penulis || "Admin";
                    document.getElementById('articleDate').innerText = artikel.tanggal;
                    document.getElementById('articleBody').innerHTML = artikel.isi;

                    const imgElement = document.getElementById('mainImage');
                    imgElement.style.opacity = "0";
                    imgElement.style.transition = "opacity 0.5s ease-in-out";
                    imgElement.src = artikel.gambar;
                    imgElement.onload = () => imgElement.style.opacity = "1";
                }
            })
            .catch(err => console.error("Gagal muat detail:", err));

        // 3. AMBIL REKOMENDASI (Sidebar)
        fetch(`${G_BASE_URL}?action=${actionList}`)
            .then(res => res.json())
            .then(data => {
                const sidebarWadah = document.getElementById('sidebarGrid');
                const saran = data.filter(a => a.id != idDicari).slice(0, 6);

                let htmlSidebar = "";
                saran.forEach(item => {
                    htmlSidebar += `
                        <div class="side-card">
                            <div class="side-card-image">
                                <img src="${item.gambar}" alt="Gambar" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250?text=Gambar+Side'">
                                <span class="side-tag">${item.kategori}</span>
                            </div>
                            <div class="side-card-body">
                                <h3>${item.judul}</h3>
                                <a href="template-artikel.html?id=${item.id}&type=${tipeKonten}" class="btn-side-nulis"> Baca <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>`;
                });
                sidebarWadah.innerHTML = htmlSidebar;
            })
            .catch(err => console.error("Gagal muat sidebar:", err));
    });