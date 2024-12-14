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

        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        let tempImage = new Image();
        tempImage.crossOrigin = "anonymous";
        tempImage.src = qrCodeImg.src;

        tempImage.onload = function () {
            canvas.width = tempImage.naturalWidth || tempImage.width;
            canvas.height = tempImage.naturalHeight || tempImage.height;

            context.drawImage(tempImage, 0, 0);

            canvas.toBlob(blob => {
                if(!blob) {
                    alert("Erro ao gerar a imagem do QR Code.");
                    return;
                }

                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `qrcode-${siteName}.png`;

                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                URL.revokeObjectURL(link.href);
            }, "image/png")
        };
        tempImage.onerror = function () {
            alert("Erro ao carregar imagem do QR Code.");
        } 
    } else {
        alert("Gere um QR Code antes!");
    }
}
