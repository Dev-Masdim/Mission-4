const textHari = document.getElementById("hari-ini");
const textTanggal = document.getElementById("tanggal-ini");

const waktuSekarang = new Date();

const namaHari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const hariIni = namaHari[waktuSekarang.getDay()];

const opsiTanggal = { day: "numeric", month: "long", year: "numeric" };

const tanggalIni = waktuSekarang.toLocaleDateString("id-ID", opsiTanggal);

textHari.textContent = `Hari: ${hariIni}`;
textTanggal.textContent = `Tanggal: ${tanggalIni}`;

const btnSubmit = document.getElementById("btn-submit");
const inputTugas = document.getElementById("todo-input");
const tbodyToDo = document.getElementById("todo-body");
const tbodyDone = document.getElementById("done-body");
const btnDeleteAll = document.getElementById("btn-delete-all");

btnSubmit.addEventListener("click", function () {
  const nilaiTugas = inputTugas.value;

  const prioritasDipilih = document.querySelector(
    'input[name="priority"]:checked',
  );

  if (nilaiTugas.trim() === "") {
    alert("Tugas tidak boleh kosong!");
    return; // Hentikan fungsi di sini
  }
  if (!prioritasDipilih) {
    alert("Pilih level prioritas terlebih dahulu!");
    return; // Hentikan fungsi di sini
  }

  const barisBaru = document.createElement("tr");

  barisBaru.innerHTML = `
        <td><input type="checkbox" class="cek-status"></td>
        <td class="teks-tugas">${nilaiTugas}</td>
        <td>${prioritasDipilih.value}</td>
        <td><button class="btn-delete">Delete</button></td>
    `;

  tbodyToDo.appendChild(barisBaru);

  inputTugas.value = "";
  prioritasDipilih.checked = false;

  berikanAksiKeTombolBaru(barisBaru);
});

function berikanAksiKeTombolBaru(baris) {
  const checkbox = baris.querySelector(".cek-status");

  const tombolDelete = baris.querySelector(".btn-delete");

  const teksTugas = baris.querySelector(".teks-tugas");

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      teksTugas.classList.add("task-done");
      tbodyDone.appendChild(baris);
    } else {
      teksTugas.classList.remove("task-done");
      tbodyToDo.appendChild(baris);
    }
  });

  tombolDelete.addEventListener("click", function () {
    baris.remove();
  });
}

btnDeleteAll.addEventListener("click", function () {
  if (confirm("Apakah Anda yakin ingin menghapus SEMUA tugas?")) {
    tbodyDone.innerHTML = "";
  }
});
