/* ini buat animasi angka berapa santri ustad dll */
const counters = document.querySelectorAll('.counter');
    const speed = 200; // Makin besar angkanya, makin lambat jalannya

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Hitung pertambahan angka
                    const inc = target / speed;

                    if (count < target) {
                        // Tambah angka dan bulatkan ke atas
                        counter.innerText = Math.ceil(count + inc);
                        // Jalankan ulang fungsi setiap 1 milidetik
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                // Berhenti mengamati setelah animasi jalan sekali
                observer.unobserve(counter);
            }
        });
    };

    const observerOptions = {
        threshold: 0.5 // Animasi jalan kalau 50% bagian angka sudah kelihatan di layar
    };

    const observer = new IntersectionObserver(startCounter, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
