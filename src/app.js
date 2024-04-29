
async function login() {
    const email = document.getElementById('signinemailInput').value;
    const password = document.getElementById('signinpasswordInput').value;

    // JSON dosyasından üye bilgilerini al
    const response = await fetch('uyeler.json');
    const data = await response.json();
    const members = data.uyeler;

    // Kullanıcının girdiği e-posta ve şifreyi kontrol et
    const user = members.find(member => member.email === email && member.sifre === password);

    if (user) {
        alert('Başarılı bir şekilde giriş yapıldı.');
    } else {
        alert('E-posta veya şifre yanlış. Lütfen tekrar deneyin.');
    }
}

async function uyeOl() {
    const ad = document.getElementById('adInput').value;
    const soyad = document.getElementById('soyadInput').value;
    const email = document.getElementById('emailInput').value;
    const sifre = document.getElementById('passwordInput').value;
  
    const checkboxChecked = document.getElementById('checkboxInput').checked;

    // Tüm alanların doldurulup doldurulmadığını ve checkbox'un işaretli olup olmadığını kontrol et
    if (ad && soyad && email && sifre  && checkboxChecked) {
        // JSON dosyasından üyeleri al
        const response = await fetch('uyeler.json');
        const data = await response.json();
        const members = data.uyeler;

        // Yeni üye oluştur
        const yeniUye = {
            id: members.length + 1,
            ad: ad,
            soyad: soyad,
            email: email,
            sifre: sifre
        };

        // Yeni üyeyi JSON dosyasına ekle
        members.push(yeniUye);

        // JSON dosyasını güncelle
        const updatedData = { uyeler: members };
        await fetch('uyeler.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        alert('Başarıyla üye oldunuz!');
    } else {
        alert('Lütfen tüm alanları doldurun, şifreleri doğru girin ve sözleşmeyi kabul edin.');
    }
}