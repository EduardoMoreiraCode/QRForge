function generateQRCode() {
    let website = document.getElementById("website").value.trim();

    if (!website) {
        alert("Please enter a valid URL");
        return;
    }

    if (!website.startsWith("https://")) {
        website = "https://" + website;
    }

    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, website);

    document.getElementById("qrcode-container").style.display = "block";
}

document.getElementById("website").addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        generateQRCode();
    }
})

function downloadQRCode() {
    let linkToDownload = document.getElementById("website").value.trim(); //nome do site
    let qrCodeImg = document.querySelector("#qrcode img"); //imagem para baixar
    let siteInput = document.getElementById("website");
    let qrcodeContainer = document.getElementById("qrcode"); //imagem para sumir
    if (qrCodeImg) {
        let siteName = String(linkToDownload).replace(/(^https?:\/\/|\/.*$)/g, "");
        let link = document.createElement("a");
        link.href = qrCodeImg.src;
        link.download = `qrcode-${siteName}.png`;
        link.click();

        qrcodeContainer.innerHTML = ""; //some com a img
        siteInput.value = ""; //zera o  input
    } else {
        alert("Gere um QR Code antes!");
    }
}