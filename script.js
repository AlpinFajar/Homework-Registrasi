// Object untuk menyimpan data pendaftar
let pendaftar = [];

// Fungsi untuk membuka tab
function openTab(event, tabName) {
    const tabContents = document.getElementsByClassName("tabcontent");
    for (const tabContent of tabContents) {
        tabContent.style.display = "none";
    }

    const tabLinks = document.getElementsByClassName("tablinks");
    for (const tabLink of tabLinks) {
        tabLink.className = tabLink.className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Fungsi untuk menambahkan pendaftar ke tabel
function addPendaftar(nama, umur, uang) {
    pendaftar.push({ nama, umur, uang });
}

// Fungsi untuk menghitung rata-rata umur dan uang sangu
function hitungRataRata() {
    const totalUmur = pendaftar.reduce((acc, p) => acc + p.umur, 0);
    const totalUang = pendaftar.reduce((acc, p) => acc + p.uang, 0);
    const rataRataUmur = totalUmur / pendaftar.length;
    const rataRataUang = totalUang / pendaftar.length;
    return { rataRataUmur, rataRataUang };
}

// Fungsi untuk menampilkan data pendaftar dan resume
function updateListPendaftar() {
    const table = document.getElementById("pendaftarTable");
    const resume = document.getElementById("resume");

    table.innerHTML = ""; // Mengosongkan tabel
    resume.innerHTML = ""; // Mengosongkan resume

    if (pendaftar.length === 0) {
        resume.textContent = "Tidak ada pendaftar.";
    } else {
        // Menampilkan data pendaftar dalam tabel
        for (const p of pendaftar) {
            const row = table.insertRow();
            const cellNama = row.insertCell(0);
            const cellUmur = row.insertCell(1);
            const cellUang = row.insertCell(2);

            cellNama.textContent = p.nama;
            cellUmur.textContent = p.umur;
            cellUang.textContent = p.uang;
        }

        // Menampilkan resume
        const { rataRataUmur, rataRataUang } = hitungRataRata();
        resume.textContent = `Rata-rata pendaftar memiliki uang sangu sebesar ${rataRataUang.toFixed(2)} dengan rata-rata umur ${rataRataUmur.toFixed(2)}`;
    }
}

// Event listener untuk form submission
const form = document.getElementById("registrationForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const umur = parseInt(document.getElementById("umur").value);
    const uang = parseInt(document.getElementById("uang").value);

    if (nama.length < 10 || umur < 25 || uang < 100000 || uang > 1000000) {
        alert("Data tidak valid. Periksa kembali input Anda.");
        return;
    }

    addPendaftar(nama, umur, uang);
    form.reset();
    updateListPendaftar();
});

// Default: Buka tab Registrasi
document.getElementsByClassName("tablinks")[0].click();
