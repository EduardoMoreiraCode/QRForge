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


    if(!linkToDownload) {
        alert("Gere um QR Code antes de baixar!");
        return;
    }

    let siteName = String(linkToDownload).replace(/(^https?:\/\/|\/.*$)/g, "");

    const qrCanvas = document.createElement("canvas");
    const qrContext = qrCanvas.getContext("2d");

    const qrSize = 1024;
    qrCanvas.width = qrSize;
    qrCanvas.height = qrSize;

    const qrCode = new QRCode(qrcodeContainer, {
        text: linkToDownload,
        width: qrSize,
        height: qrSize,
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        const qrImg = qrcodeContainer.querySelector("canvas");

        if(qrImg) {
            qrImg.toBlob(function (blob) {
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
            }, "image/png");
        }
    }, 500);

    // let qrCodeCanvas = qrcodeContainer.querySelector("canvas");

    // if(qrCodeCanvas) {

    //     let tempCanvas = document.createElement("canvas");
    //     let tempContext = tempCanvas.getContext("2d");

    //     const scaleFactor = 6;
    //     tempCanvas.width = qrCodeCanvas.width * scaleFactor;
    //     tempCanvas.height = qrCodeCanvas.height * scaleFactor;

    //     tempContext.drawImage(qrCodeCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
    

    //     tempCanvas.toBlob(function (blob) {
    //         if(!blob) {
    //             alert("Erro ao gerar a imagem do QR Code.");
    //             return;
    //         }

    //         let link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         link.download = `qrcode-${siteName}.png`;

    //         link.style.display = "none";
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);

    //         URL.revokeObjectURL(link.href);
    //     }, "image/png");
    // } else {
    //     alert("Erro: Nenhum QR Code foi encontrado.");
    // }
}
