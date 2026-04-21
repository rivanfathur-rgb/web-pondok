    /* ============================================================
       SCRIPT KHUSUS PENDAFTARAN (URL BERBEDA)
       Navigasi & Loading sudah di-handle static/js/global-nav2.js
       ============================================================ */

    // URL KHUSUS PENDAFTARAN (Database Santri Baru)
    const pendaftaranURL = 'https://script.google.com/macros/s/AKfycbyHRmav_94qs7vglAEBvKEERouJ4V6cajHZsrx2l9I_mfpHlfxWzy1K3K3tWNK7u4R8dA/exec';
    
    const form = document.getElementById('formDaftar');
    const btnKirim = document.getElementById('btnKirim');
    const modal = document.getElementById('customModal');
    const modalYakin = document.getElementById('modalYakin');
    const modalBatal = document.getElementById('modalBatal');
    const successModal = document.getElementById('customSuccess');
    const successOk = document.getElementById('successOk');

    // 1. FUNGSI KIRIM DATA
    function kirimData() {
        modal.classList.remove('modal-active'); 
        btnKirim.disabled = true;
        btnKirim.innerText = "⏳ Sedang Memproses...";
        
        fetch(pendaftaranURL, { method: 'POST', body: new FormData(form)})
            .then(response => response.text()) 
            .then(result => {
                // A. BOT DETECTION 
                if (result === "Bot Detected") {
                    eksekusiBlokirBot();
                } 
                // B. CEK DUPLIKAT
                else if (result === "DUPLICATE_ALL") {
                    Swal.fire({ icon: 'warning', title: 'Santri Sudah Terdaftar', text: 'Data nama dan nomor WA ini sudah ada di database.', confirmButtonColor: '#006644' });
                    resetBtn();
                } 
                else if (result === "DUPLICATE_NAME") {
                    Swal.fire({ icon: 'error', title: 'Nama Sudah Ada', text: 'Gunakan nama lengkap (tambahkan bin/binti) jika Anda orang yang berbeda.', confirmButtonColor: '#006644' });
                    resetBtn();
                } 
                // C. LOGIKA SUKSES
                else if (result === "Sukses") {
                    successModal.classList.remove('hidden');
                    setTimeout(() => { successModal.classList.add('modal-active'); }, 10);
                    form.reset();
                    resetBtn();
                } 
                else {
                    alert("Respon Server: " + result);
                    resetBtn();
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error: " + error.message);
                resetBtn();
            });
    }

    function resetBtn() {
        btnKirim.disabled = false;
        btnKirim.innerText = "Daftar Sekarang";
    }

    function eksekusiBlokirBot() {
        document.body.innerHTML = `
            <div style="height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; background: #0f172a; color: white; text-align: center; position: fixed; top: 0; left: 0; z-index: 9999;">
                <div style="padding: 40px; border-radius: 20px; border: 1px solid #ff4d4d; background: rgba(255, 0, 0, 0.1);">
                    <h1 style="color: #ff4d4d;">🛡️ BOT DETECTED</h1>
                    <p>Akses diblokir. Mengalihkan dalam <span id="detik">3</span> detik...</p>
                </div>
            </div>`;
        let countdown = 3;
        const interval = setInterval(() => {
            countdown--;
            document.getElementById('detik').innerText = countdown;
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = "https://www.google.com";
            }
        }, 1000);
    }

    // 2. EVENT LISTENERS
    form.addEventListener('submit', e => {
        e.preventDefault();
        modal.classList.add('modal-active');
    });

    modalYakin.addEventListener('click', kirimData);

    modalBatal.addEventListener('click', () => {
        modal.classList.remove('modal-active');
    });

    successOk.addEventListener('click', () => {
        successModal.classList.remove('modal-active');
        setTimeout(() => { successModal.classList.add('hidden'); }, 250);
    });