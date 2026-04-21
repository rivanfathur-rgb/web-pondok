    /* ============================================================
       SCRIPT KHUSUS UPLOAD-KARYA.HTML
       Variabel G_BASE_URL diambil dari static/js/global-nav2.js
       ============================================================ */

    const form = document.getElementById('uk-main-form');
    const btnOtp = document.getElementById('uk-btn-get-otp');
    const otpSection = document.getElementById('uk-otp-section');

    // 1. MINTA OTP (GET Request ke Telegram Admin via Apps Script)
    if (btnOtp) {
        btnOtp.addEventListener('click', () => {
            const penulis = document.getElementById('uk-penulis').value;
            const judul = document.getElementById('uk-judul').value;
            const kategori = document.getElementById('uk-kategori').value;
            const ringkasan = document.getElementById('uk-ringkasan').value;
            const gambar = document.getElementById('uk-gambar').value;
            const isi = document.getElementById('uk-isi').value;

            // Validasi input utama
            if(!penulis || !judul || !ringkasan || !isi) {
                Swal.fire('Perhatian!', 'Lengkapi data penulis, judul, ringkasan, dan isi artikel terlebih dahulu.', 'warning');
                return;
            }

            btnOtp.disabled = true;
            btnOtp.innerText = "Mengirim Request...";

            // Parameter menggunakan G_BASE_URL
            const params = `?action=requestOTP` +
                           `&penulis=${encodeURIComponent(penulis)}` +
                           `&judul=${encodeURIComponent(judul)}` +
                           `&kategori=${encodeURIComponent(kategori)}` +
                           `&ringkasan=${encodeURIComponent(ringkasan)}` +
                           `&gambar=${encodeURIComponent(gambar)}` +
                           `&isi=${encodeURIComponent(isi)}`;

            fetch(G_BASE_URL + params)
                .then(res => res.json())
                .then(response => {
                    if(response.result === "success") {
                        Swal.fire('Berhasil!', 'Request terkirim. Segera hubungi Admin untuk mendapatkan kode OTP!', 'success');
                        otpSection.style.display = 'block'; 
                        btnOtp.style.display = 'none';      
                    } else {
                        Swal.fire('Error', 'Gagal kirim request: ' + response.message, 'error');
                        btnOtp.disabled = false;
                        btnOtp.innerText = "Minta Kode OTP dari Admin";
                    }
                })
                .catch((err) => {
                    console.error("OTP Error:", err);
                    Swal.fire('Error', 'Koneksi gagal. Pastikan static/js/global-nav2.js sudah terpasang dengan benar.', 'error');
                    btnOtp.disabled = false;
                    btnOtp.innerText = "Minta Kode OTP dari Admin";
                });
        });
    }

    // 2. KIRIM DATA FINAL (POST Request)
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault(); 
            
            Swal.fire({ 
                title: 'Menerbitkan...', 
                text: 'Sedang memverifikasi OTP dan menyimpan artikel...',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading() }
            });

            const bodyData = new URLSearchParams(new FormData(form));

            fetch(G_BASE_URL, { 
                method: 'POST', 
                body: bodyData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res => res.json())
            .then(response => {
                if(response.result === "success") {
                    Swal.fire('Sukses!', 'Artikel Anda berhasil diposting!', 'success')
                    .then(() => { 
                        window.location.href = 'pendidikan.html'; 
                    });
                } else {
                    Swal.fire('Gagal!', response.message, 'error');
                }
            })
            .catch((err) => {
                console.error("Submit Error:", err);
                Swal.fire('Error', 'Terjadi kesalahan sistem saat menyimpan data.', 'error');
            });
        });
    }