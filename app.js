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
    let qrCodeImg = document.querySelector("#qrcode img"); //imagem do qrcode
    let siteInput = document.getElementById("website"); //input
    let linkToDownload = siteInput.value.trim(); //URL inserida
    let qrcodeContainer = document.getElementById("qrcode"); //container do qrcode


    if (qrCodeImg) {
        alert("QR Code Encontrado!");

        let siteName = String(linkToDownload).replace(/(^https?:\/\/|\/.*$)/g, "");
        alert(`Nome do site: ${siteName}`);

        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");

        canvas.width = qrCodeImg.naturalWidth || qrCodeImg.width;
        canvas.height = qrCodeImg.naturalHeight || qrCodeImg.height;

        context.drawImage(qrCodeImg, 0, 0);

        canvas.toBlob(blob => {
            if(!blob) {
                alert("Erro ao gerar blob");
                return;
            }

            alert("Imagem gerada com sucesso!");
            let blobURL = URL.createObjectURL(blob);

            let link = document.createElement("a");
            link.href = blobURL;
            link.download = `qrcode-${siteName}.png`;

            link.click();
            URL.revokeObjectURL(blobURL);
            
            qrcodeContainer.innerHTML = ""; //some com a img
            siteInput.value = ""; //zera o  input

        }, "image/png");     
    } else {
        alert("Gere um QR Code antes!");
    }
}
