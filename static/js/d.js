    const params = new URLSearchParams(window.location.search);
    const namaPaket = params.get('paket') || 'Umum';
    const hargaPaket = params.get('harga') || '0';

    document.getElementById('judul-display').innerText = "Donasi " + namaPaket.toUpperCase();
    document.getElementById('harga-display').innerText = hargaPaket;

    const body = document.body;
    const gambarDiv = document.getElementById('gambar-paket');

    // Update BG dan Gambar Kecil
    if(namaPaket.includes('iftar')) {
        body.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('static/img/iftar-bg.jpg')"; 
        gambarDiv.innerHTML = `<img src="static/img/iftar.jpg" style="width:100%; height:100%; object-fit:cover;">`;
    } 
    else if(namaPaket.includes('quran')) {
        body.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('static/img/quran-bg.jpg')";
        gambarDiv.innerHTML = `<img src="static/img/quran.jpg" style="width:100%; height:100%; object-fit:cover;">`;
        document.getElementById('deskripsi-paket').innerText = "Bantu santri menghafal Al-Qur'an dengan menyediakan mushaf yang layak.";
    } 
    else if(namaPaket.includes('wakaf')) {
        body.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('static/img/wakaf-bg.jpg')";
        gambarDiv.innerHTML = `<img src="static/img/wakaf.jpg" style="width:100%; height:100%; object-fit:cover;">`;
        document.getElementById('deskripsi-paket').innerText = "Sedekah jariyah untuk pembangunan kampus cabang baru.";
    }

    // Logic Form
    document.getElementById('form-donasi').onsubmit = function(e) {
        e.preventDefault();
        const btn = document.querySelector('button');
        btn.innerText = "Sedang Mengirim...";
        btn.disabled = true;

        setTimeout(() => {
            Swal.fire({
                title: 'Terima Kasih!',
                text: 'Konfirmasi donasi Anda telah kami terima. Semoga menjadi amal jariyah.',
                icon: 'success',
                confirmButtonText: 'Kembali ke Beranda',
                confirmButtonColor: '#006644',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'donasi.html'; 
                }
            });
        }, 1500);
    };