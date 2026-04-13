// firebase 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    where
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

// menambah konfigurasi
const firebaseConfig = {
    apiKey: "AIzaSyD1SzPGurWmohpmdQiXu4fcGoGn9jZEM4s",
    authDomain: "insancemerlang-86b51.firebaseapp.com",
    projectId: "insancemerlang-86b51",
    storageBucket: "insancemerlang-86b51.firebasestorage.app",
    messagingSenderId: "639827268939",
    appId: "1:639827268939:web:d52a83c6d165eb4b0344ce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const tanamanCollection = collection(db, "tanaman")

// fungsi untuk login
export async function login() {
const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

const q = query(
  collection(db,"users")
  where("username","==", username),
  where("password","==",password)
)
  
  const querySnapshot = await getDocs(collection(db, "users"));

  let found = false

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    if (data.username === username && data.password === password) {
      found = true;
    }
  });

  if (found) {
    document.getElementById("status").innerText = "Login berhasil";
    // redirect
    window.location.href = "index.html";
  } else {
    document.getElementById("status").innerText = "Username atau password salah";
}}

//fungsi untum menampilkan daftar tanaman
export async function daftartanaman() {
  
  // ambil snapshot data dari koleksi tanaman 
  const snapshot = await getDocs(tanamanCollection)
  
  // ambil elemen tabel data
  const tabel = document.getElementById('tabeldata')
  
  // kosongkan isi tabel nya
  tabel.innerHTML = ""
  
  // loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
    
    // elemen nama tanaman
    const namatanaman = document.createElement("td")
    namatanaman.textContent = data.namatanaman
    
    //buat elemen kolom untuk nomor urut 
    const nomerurut = document.createElement("td")
    nomerurut.textContent = tabel.rows.length + 1
    
    // buat elemen kolom untuk warna
    const warna = document.createElement("td")
    warna.textContent = data.warna
    
    // buat elemen untuk kolom 
    const jenis = document.createElement("td")
    jenis.textContent = data.jenis
    
    // buat elemen kolom untuk aktor
    const aksi = document.createElement('td')
    aksi.textContent = data.aksi
    
    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement('td')
    
    // tombol edit
    const tombolEdit = document.createElement('a')
    tombolEdit.textContent = 'Edit'
    tombolEdit.href = 'edit.html?id=' + id
    tombolEdit.className = 'button edit'
    
    // tombol hapus
    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapustanaman(id)
    }
    
    // tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    // tambahkan kolom ke dalam baris
    baris.appendChild(nomerurut)
    baris.appendChild(namatanaman)
    baris.appendChild(warna)
    baris.appendChild(jenis)
    baris.appendChild(kolomAksi)
    
    // tambahkan baris ke aalam tabel
    tabel.appendChild(baris)
    
  })
}
    
    //fungsi untuk menghapus data tanaman
export async function hapustanaman(id){
    if (!confirm("yakin ingin menghapus data ini? "))return
    //menghapus dokumen tanaman berdasarkan id
    await deleteDoc(doc(db,"tanaman",id)) 
    
  //refresh data 
  await daftartanaman()
  }
  
  //fungsi untuk menambahkan tanaman baru
export async function tambahtanaman(data) {
  //ambil nilai dari from
  const namatanaman = document.getElementById('namatanaman').value
  const warna = document.getElementById('warna').value
  const jenis = document.getElementById('jenis').value
  
  // tambahkan data ke firestore
  await addDoc(tanamanCollection, {
    namatanaman: namatanaman,
    warna: warna,
    jenis: jenis
  })
  
  // alihkan ke halaman daftar tanaman
  window.location.href = 'daftar.html'
}
  

//fungsi untuk mengambil data tanaman bedasarkan id
  //agar data ditampilkan di form. ubah
  export async function ambiltanaman(id) {
    const docRef = doc(db, "tanaman", id)
    const docSnap = await getDoc(docRef)
    
    return await docSnap.data()
  }
  
    //fungsi untuk mengubah data tanaman
  export async function ubahtanaman(id, namatanaman, warna, jenis) {
    // mengubah data di firestore
    await updateDoc(doc(db, "tanaman", id), {
      namatanaman: namatanaman,
      warna: warna,
      aktor: jenis,
    })
    
    //alihkan ke halaman daftar tanaman
    window.location.href = 'daftar.html'
  }
  