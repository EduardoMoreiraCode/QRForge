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
    let qrCodeImg = document.querySelector("#qrcode img"); //imagem para baixar
    let siteInput = document.getElementById("website");
    let linkToDownload = siteInput.value.trim(); //nome do site
    let qrcodeContainer = document.getElementById("qrcode"); //imagem para sumir


    if (qrCodeImg) {
        let siteName = String(linkToDownload).replace(/(^https?:\/\/|\/.*$)/g, "");

        // let canvas = document.createElement("canvas");
        // let context = canvas.getContext("2d");

        // canvas.width = qrCodeImg.width;
        // canvas.height = qrCodeImg.height;

        // context.drawImage(qrCodeImg, 0, 0);

        // let imageDataURL = canvas.toDataURL("image/png");

        fetch(qrCodeImg.src).then(response => response.blob()).then(blob => {
            let blobURL = URL.createObjectURL(blob);

            let link = document.createElement("a");
            link.href = blobURL;
            link.download = `qrcode-${siteName}.png`;
            link.click();

            qrcodeContainer.innerHTML = ""; //some com a img
            siteInput.value = ""; //zera o  input

            URL.revokeObjectURL(blobURL);
        })
        .catch(() => alert("Falha no download. Por favor tente novamente."));
    } else {
        alert("Gere um QR Code antes!");
    }
}
