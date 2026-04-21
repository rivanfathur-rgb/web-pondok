    document.addEventListener('DOMContentLoaded', function() {
        const btnWakaf = document.getElementById('btnWakaf');
        
        if(btnWakaf) {
            btnWakaf.addEventListener('click', function() {
                // Arahin ke halaman donasi
                window.location.href = 'donasi.html'; 
                
            });
        }
    });